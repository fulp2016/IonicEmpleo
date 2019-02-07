import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { VariablesGlobalesService } from 'src/app/services/variables-globales.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
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

  async signUp() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateRoot('/');
    });
  }

  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}
