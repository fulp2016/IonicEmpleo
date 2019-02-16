import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, MenuController, AlertController } from '@ionic/angular';
import { VariablesGlobalesService } from 'src/app/services/variables-globales.service';
import { ProfileDataService } from './../../services/profile-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public PersonalData: any;
  public ExtraData: any;
  public onProfileForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    public global: VariablesGlobalesService,
    public ProfileData: ProfileDataService

    ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.onProfileForm = this.formBuilder.group({
      'nombre': [null],
      'apellido1': [null],
      'apellido2': [null],
      'email': [null],
      'domicilio': [null],
      'info_extra': [null],
    });
    this.getDataPersonal();
    this.getDataExtra();
  }

  async getDataPersonal() {
    const loading = await this.loadingController.create({
        message: 'Loading'
    });
    await loading.present();
    this.ProfileData.getPersonalData(this.global.CodPersonal)
    .subscribe(
        (res) => {
            this.PersonalData = res;
            loading.dismiss();
        },
        (error) =>{
            console.error(error);
            loading.dismiss();
        }
    )
  }

  async getDataExtra() {
    const loading = await this.loadingController.create({
        message: 'Loading'
    });
    await loading.present();
    this.ProfileData.getExtraData(this.global.CodPersonal)
    .subscribe(
        (res) => {
            this.ExtraData = res;
            if(this.ExtraData.CARNET_CONDUCIR=='S'){
              this.ExtraData.CarnetChecked = true;
            } else {
              this.ExtraData.CarnetChecked = false;
            }
            
            loading.dismiss();
        },
        (error) =>{
            console.error(error);
            loading.dismiss();
        }
    )
  }

  async sendData() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    this.ProfileData.ActProfileData(this.global.CodPersonal,this.onProfileForm.value)
    .subscribe(
        (res) => {
          loading.dismiss();
          if(res==true){
            this.ProfileOk()
          } else {
            this.ProfileErro();
          }
        },             
        (error) =>{
            console.error(error);
            this.ProfileErro();
            loading.dismiss();
        }
    )
  }

  async ProfileOk() {
    const alert = await this.alertCtrl.create({
      header: 'Genial!',
      message: 'Tu Perfil ha sido actualizado',
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

  async ProfileErro() {
    const alert = await this.alertCtrl.create({
      header: 'Ups!',
      message: 'Ha ocurrido un error en el proceso de actualización',
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
