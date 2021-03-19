import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { }

  async onRegister() {
    const {email, password} = this.registerForm.value;

    try {
      const user = await this.authService.register(email, password);
      if (user) {
        this.router.navigate(['/verification-email']);
      }
    }
    catch (error) {
      console.log('Register error');
    }
  }

  // onGoogleregister() {}

}