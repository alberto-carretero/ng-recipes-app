import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  public localStorageUser: any;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.localStorageUser = localStorage.getItem('user');

    if (this.localStorageUser) {
      this.router.navigate(['/home']);
    }
  }

  async onLogin() {
    const {email, password} = this.loginForm.value;
    try {
      const user = await this.authService.login(email, password);
      if (user && user.user.emailVerified) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home']);
      } else if (user) {
        this.router.navigate(['/verification-email']);
      } else {
        this.router.navigate(['/register']);
      }
    }
    catch (error) {
      console.log('Login error');
    }
  }

  async onGoogleLogin() {
    try {
      this.authService.loginGoogle();
      this.router.navigate(['/home']);
    }
    catch (error) {
      console.log('Login with Google error');
    }
  }

}