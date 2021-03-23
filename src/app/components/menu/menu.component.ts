import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { Observable } from "rxjs";
import { MenuI } from "src/app/interfaces/menu";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  public user$: Observable<any> = this.authService.afAuth.user;
  public menuOptions: Observable<MenuI[]>;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.menuOptions = this.dataService.getMenuOptions();
  }

  async onLogout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.log("Logout error");
    }
  }
}
