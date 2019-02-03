
import { OfertasProvider } from '../../providers/ofertas/ofertas';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from './../login/login';
import { DetalleOfertaPage } from './../detalle-oferta/detalle-oferta';
import { GlobalProvider } from '../../providers/global/global';
import { global } from '@angular/core/src/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ofertas: any;

  constructor(
    public navCtrl: NavController,
    public Ofertas: OfertasProvider,
    public global: GlobalProvider
    ) {}

    ionViewDidLoad(){
        this.Ofertas.getOfertas()
        .subscribe(
            (data) => {
                this.ofertas = data;
            },
            (error) =>{
                console.error(error);
            }
        )
    }

    goDetails(id:number) {
        this.navCtrl.push(DetalleOfertaPage, {
            idOferta: id,
        })
    }

    goProfile() {
        this.navCtrl.push(LoginPage)
    }

}
