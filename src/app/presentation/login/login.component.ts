import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs"; // Import the Observable module from the rxjs package
import { LoginModel } from "../../store/login";
import { login } from "../../store/login-page.actions";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login$: Observable<LoginModel>;

  constructor(private store: Store<{ login: LoginModel }>) {
    this.login$ = store.select('login');
  }
  
  public onSubmit(email: string, password: string) {
    this.store.dispatch(login({ email, password }));
  }
}
