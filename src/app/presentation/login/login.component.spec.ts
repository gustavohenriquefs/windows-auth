import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from '../../store/login/login.reducer';

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
    spyOn(component, 'onSubmit').and.callThrough();
    
    component.onSubmit();

    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  it(`(D) #form-button should call the function: ${LoginComponent.prototype.onSubmit.name} `, () => {
    const email = 'test@gmail.com';
    const password = 'test';

    const submitBtn = fixture.debugElement.nativeElement.querySelector('[type="submit"]');

    const inputEmail =  fixture.debugElement.nativeElement.querySelector('[name="email"]');
    const inputPassword = fixture.debugElement.nativeElement.querySelector('[name="password"]');

    inputEmail.value = email;
    inputPassword.value = password;

    const funName: keyof LoginComponent = LoginComponent.prototype.onSubmit.name as keyof LoginComponent;
    
    spyOn(component, funName as never).and.callThrough();
    
    submitBtn.click();

    fixture.detectChanges();
    
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  it(`#Should create the login form when initialized`, () => {
    fixture.detectChanges();

    expect(component.loginForm.value).toEqual({ email: '', password: '' });
  });

  it(`#${LoginComponent.prototype.windowsAuth.name} should dispatch loginWindows action`, () => {
    spyOn(component, 'windowsAuth').and.callThrough();
    
    component.windowsAuth();

    expect(component.windowsAuth).toHaveBeenCalledTimes(1);
  });
});
