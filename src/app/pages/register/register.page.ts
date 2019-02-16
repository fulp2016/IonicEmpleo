import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController, AlertController } from '@ionic/angular';
import { VariablesGlobalesService } from 'src/app/services/variables-globales.service';
import { LoginRegisterService } from 'src/app/services/login-register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;
  UserData: any;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    public RegisterService: LoginRegisterService,
    public global: VariablesGlobalesService
  ) { }

  ionViewWillEnter() {
    if(this.global.CodPersonal!='0'){
      this.navCtrl.navigateRoot('/');
    }
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'nombre': [null, Validators.compose([
        Validators.required
      ])],
      'apellido1': [null, Validators.compose([
        Validators.required
      ])],
      'apellido2': [null, Validators.compose([
        Validators.required
      ])],
      'tipoDoc': [null, Validators.compose([
        Validators.required
      ])],
      'nif': [null, Validators.compose([
        Validators.required
      ])],
      'sexo': [null, Validators.compose([
        Validators.required
      ])],
      'FechaNac': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }


  async signUp(){    
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    this.RegisterService.RegisterUser(this.onRegisterForm.value)
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

  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }

  async PassError() {
    const alert = await this.alertCtrl.create({
      header: 'Ups',
      message: 'Error en el proceso de alta.',
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
}
