import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from '../../store/login-page.reducer';

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
});
