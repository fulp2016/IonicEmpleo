import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { LoginRegisterService } from './../../services/login-register.service';
import { VariablesGlobalesService } from 'src/app/services/variables-globales.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  UserData: any;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public global: VariablesGlobalesService,
    public LoginService: LoginRegisterService
  ) { }

  ionViewWillEnter() {
    if(this.global.CodPersonal!='0'){
      this.navCtrl.navigateRoot('/');
    }
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onLoginForm = this.formBuilder.group({
      'user': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async LoginUser(){    
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    this.LoginService.LoginUser(this.onLoginForm.value.user,this.onLoginForm.value.password)
    .subscribe(
        (res) => {
            this.UserData = res;
            loading.dismiss();
            if(this.UserData.COD_PERSONAL!=0){
              this.global.CodPersonal=this.UserData.COD_PERSONAL;
              this.global.UserName=this.UserData.NOMBRE;
              this.navCtrl.pop();
            } else {
              this.PassError();
            }
            
        },
        (error) =>{
            console.error(error);
            loading.dismiss();
        }
    )
  }

  async PassError() {
    const alert = await this.alertCtrl.create({
      header: 'Ups',
      message: 'Usuario o Contraseña Incorrecto.',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });
    await alert.present();
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: 'Forgot Password?',
      message: 'Enter you email address to send a reset link password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: 'Email was sended successfully.',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // // //
  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home-results');
  }

}
