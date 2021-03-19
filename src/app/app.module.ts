import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AngularFireAuthModule } from "@angular/fire/auth"; // Permite trabajar con las autenticaciones
import { AngularFireModule } from "@angular/fire"; // Iniciar la conexión con Firebase
import { AngularFireStorageModule } from "@angular/fire/storage";
import { environment } from "src/environments/environment";
import { SendEmailComponent } from "./components/auth/send-email/send-email.component";
import { ComponentsModule } from "./components/components.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, SendEmailComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    ComponentsModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
