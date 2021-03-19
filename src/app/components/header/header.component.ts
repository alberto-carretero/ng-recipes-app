import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // public user$: Observable<any> = this.authService.afAuth.user;

  constructor(private authService: AuthService, private menuCtrl: MenuController, private router: Router) { }

  ngOnInit() {}

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  // async onLogout() {
  //   try {
  //     await this.authService.logout();
  //     this.router.navigate(['/login']);
  //   }
  //   catch (error){
  //     console.log('Logout error');
  //   }
  // }

  // onBack() {
  //   this.router.navigate(['/home']);
  // }

}
