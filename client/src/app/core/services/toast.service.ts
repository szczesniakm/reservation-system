import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  error(message: string) {
    this.messageService.add({severity: 'error', detail: message, summary: 'Wystąpił błąd'});
  }

  success(message: string) {
    this.messageService.add({severity: 'success', detail: message, summary: 'Sukces'});
  }
}
