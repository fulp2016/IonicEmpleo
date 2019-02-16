import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
    }).catch(() => {});
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
