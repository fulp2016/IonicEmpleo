import { OfertasProvider } from './../../providers/ofertas/ofertas';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { LoginPage } from '../login/login';

/**
 * Generated class for the DetalleOfertaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
    selector: 'page-detalle-oferta',
    templateUrl: 'detalle-oferta.html',
})
export class DetalleOfertaPage {
    idOferta: number;
    Detalle: any;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public Ofertas: OfertasProvider,
        public global: GlobalProvider) {
        this.idOferta = this.navParams.get('idOferta');
    }

    ionViewDidLoad() {
        this.Ofertas.getDetalle(this.idOferta)
        .subscribe(
            (data) => {
                this.Detalle = data;
                console.log(this.Detalle);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    goLogin() {
        this.navCtrl.push(LoginPage)
    }

}
