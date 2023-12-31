import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from '../../store/login-page/login-page.reducer';

describe(LoginComponent.name, () => {
  let component!: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        StoreModule.forRoot({ login: loginReducer })
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`#${LoginComponent.name} should create`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${LoginComponent.prototype.onSubmit.name} should dispatch login action`, () => {
    const email = 'test@email';
    const password = 'test';

    spyOn(component, 'onSubmit').and.callThrough();
    
    component.onSubmit(email, password);

    expect(component.onSubmit).toHaveBeenCalledOnceWith(email, password);
  });

  it(`(D) #form-button should call the function: ${LoginComponent.prototype.onSubmit.name} `, () => {
    const email = 'test@';
    const password = 'test';

    const submitBtn = fixture.debugElement.nativeElement.querySelector('[type="submit"]');

    const inputEmail =  fixture.debugElement.nativeElement.querySelector('[name="email"]');
    const inputPassword = fixture.debugElement.nativeElement.querySelector('[name="password"]');

    inputEmail.value = email;
    inputPassword.value = password;

    const funName: keyof LoginComponent = LoginComponent.prototype.onSubmit.name as keyof LoginComponent;

    spyOn(component, funName as never).and.callThrough();
    
    submitBtn.click();
    
    expect(component.onSubmit).toHaveBeenCalledOnceWith(email, password);
  });

  it(`#Should create the login form when initialized`, () => {
    fixture.detectChanges();

    expect(component.loginForm.value).toEqual({ email: '', password: '' });
  });
});
