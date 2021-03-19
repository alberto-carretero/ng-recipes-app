import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
})
export class SendEmailComponent {
  public user$: Observable<any> = this.authService.afAuth.user;

  constructor(private authService: AuthService) { }

  onSendVerificationEmail() {
    this.authService.sendVerificationEmail();
  }

}
