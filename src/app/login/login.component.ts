import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Login';
  userEmail!: string;
  userPassword!: string;
  rememberMe: boolean = false;
  showSpinner!: boolean;
  loginError!: string;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
console.log("test")
  }

  ngOnInit(): void {
  }

  login(): void {
    this.showSpinner = true;
    this.authService.logIn(this.userEmail, this.userPassword).subscribe(response => {
      if (response.status === 200 && !response.body.errorCode) {
        const component = this.route.snapshot.queryParamMap.get('returnUrl')?.toString();
        if (component !== undefined && component.length > 0) {
          const decodedComponent = decodeURIComponent(component);
          this.router.navigate([decodedComponent]);
          this.showSpinner = false;
          return;
        }
        this.router.navigate(['/admin']);
      } else {
        this.loginError = "email ou mot de passe erroné";
      }
    });
    this.showSpinner = false;
  }

}
