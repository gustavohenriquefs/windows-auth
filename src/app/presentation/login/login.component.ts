import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconDefinition, faWindows } from '@fortawesome/free-brands-svg-icons';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { UserModel } from "../../domain/models/user.model";
import { UserActions } from "../../store/login/login.actions";

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
  login$: Observable<UserModel>;
  loginForm!: FormGroup;
  faWindows: IconDefinition = faWindows;

  constructor(
    private store: Store<{ login: UserModel }>,
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
    this.store.dispatch(UserActions.userWindowsLogin());
  }
  
  public onSubmit() {
    const { email, password } = this.loginForm.value;

    // this.store.dispatch(UserActions.userLogin({ login: { email, password } }));
  }
}
