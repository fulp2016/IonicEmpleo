import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginProvider } from './../../providers/login/login';
import { GlobalProvider } from "../../providers/global/global";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  myForm: FormGroup;
  UserData: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public LoginProv: LoginProvider,
    public global: GlobalProvider
    ) { 
      this.myForm = this.formBuilder.group({
        user: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  LoginUser(){    
    this.LoginProv.getLogin(this.myForm.value.user,this.myForm.value.password)
        .subscribe(
            (data) => {
                this.UserData = data;
                this.global.CodPersonal=this.UserData.COD_PERSONAL;
                this.global.UserName=this.UserData.NOMBRE;
                this.navCtrl.pop();
            },
            (error) => {
                console.error(error);
            }
        );
  }


}
