import { Component } from '@angular/core';

import { Platform, NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx'

import { Pages } from './interfaces/pages';

import { VariablesGlobalesService } from './services/variables-globales.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    public global: VariablesGlobalesService
  ) {

    this.appPages = [
      {
        title: 'My Profile',
        url: '/profile',
        direct: 'root',
        icon: 'contact'
      },
      {
        title: 'Listado Ofertas',
        url: '/listado-ofertas',
        direct: 'root',
        icon: 'list'
      },
      {
        title: 'About',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline'
      }
    ];

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.handlerNotifications();
    }).catch(() => {});
  }

  private handlerNotifications(){
    this.oneSignal.startInit('6b590092-d2be-4bda-8da2-0b3e69d12c9e','781550777394');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationOpened()
    .subscribe( async jsonData => {
      const alert = await this.alertCtrl.create({
        header: jsonData.notification.payload.title,
        message: jsonData.notification.payload.body,
        buttons: ['OK']
      });
      alert.present();
    });
    this.oneSignal.endInit();
  }

  goToProfile() {
    this.navCtrl.navigateRoot('profile');
  }

  logout() {
    this.global.CodPersonal = '0';
    this.global.UserName = '';
    this.navCtrl.navigateRoot('/');
  }

  goToLogin(){
    this.navCtrl.navigateForward('login');
  }

  goToRegistro(){
    this.navCtrl.navigateForward('register');
  }
}
