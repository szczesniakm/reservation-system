import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendError } from 'src/app/core/models/error';
import { LoginRequest } from 'src/app/core/models/types';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  errorMessage?: string;

  constructor(
    private fb:FormBuilder, 
    private authService: AuthenticationService, 
    private router: Router) {

      this.form = this.fb.group({
          username: ['',[Validators.required, Validators.minLength(3)]],
          password: ['',[Validators.required, Validators.minLength(4)]]
      });
  }

  ngOnInit(): void {
  }

  get username(): any {
    return this.form.get('username');
  }

  get password(): any {
    return this.form.get('password');
  }

  async login() {
    if(!this.form.valid) {
      return;
    }

    const loginRequest: LoginRequest = this.form.value;
    try {
      await this.authService.login(loginRequest);
      this.router.navigateByUrl('');
    } catch (error) {
      if (error instanceof BackendError) {
        this.errorMessage = error.message;
      }
    }
  }
}
