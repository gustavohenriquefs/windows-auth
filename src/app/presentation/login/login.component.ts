import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs"; // Import the Observable module from the rxjs package
import { LoginModel } from "../../store/models/login";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { loginWindows, login } from "../../store/login-page/login-page.actions";
import { IconDefinition, faWindows } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

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
    this.store.dispatch(loginWindows({ email: '', password: '' }));
  }
  
  public onSubmit(email: string, password: string) {
    this.store.dispatch(login({ email, password }));
  }
}
