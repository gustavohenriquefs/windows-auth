import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconDefinition, faWindows } from '@fortawesome/free-brands-svg-icons';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { login, loginWindows } from "../../store/login-page/login-page.actions";
import { LoginModel } from "../../store/models/login";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login$: Observable<LoginModel>;
  loginForm!: FormGroup;
  faWindows: IconDefinition = faWindows;

  constructor(
    private store: Store<{ login: LoginModel }>,
    private fb: FormBuilder
  ) {
    this.login$ = store.select('login');

    this.createForm();
  }

  private createForm() {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  public windowsAuth() {
    this.store.dispatch(loginWindows());
  }
  
  public onSubmit(email: string, password: string) {
    this.store.dispatch(login({ email, password }));
  }
}
