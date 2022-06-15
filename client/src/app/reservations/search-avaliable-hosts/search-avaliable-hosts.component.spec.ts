import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAvaliableHostsComponent } from './search-avaliable-hosts.component';

describe('SearchAvaliableHostsComponent', () => {
  let component: SearchAvaliableHostsComponent;
  let fixture: ComponentFixture<SearchAvaliableHostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAvaliableHostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAvaliableHostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
