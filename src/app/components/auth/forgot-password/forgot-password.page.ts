import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: 'forgot-password.page.html',
  styleUrls: ['forgot-password.page.scss'],
})
export class ForgotPasswordPage {

  resetPasswordForm = new FormGroup({
    userEmail: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { }

  async onReset() {
    try{
      const email = this.resetPasswordForm.value;
      await this.authService.resetPassword(email);
      this.router.navigate(['/login']);
    }
    catch (error) {
      console.log('Reset password error');
    }
  }
}