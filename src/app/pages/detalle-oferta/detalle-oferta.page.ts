import { VariablesGlobalesService } from './../../services/variables-globales.service';
import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { OfertasProviderService } from 'src/app/services/ofertas-provider.service';

@Component({
  selector: 'app-detalle-oferta',
  templateUrl: './detalle-oferta.page.html',
  styleUrls: ['./detalle-oferta.page.scss'],
})
export class DetalleOfertaPage implements OnInit {

    @Input() idOferta: number;
    Detalle: any; 

  constructor(
    public loadingController: LoadingController,
    public Ofertas: OfertasProviderService,
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    public global: VariablesGlobalesService
    ) { }

  ngOnInit() {
    this.getData();
  }

    async getData() {
        const loading = await this.loadingController.create({
            message: 'Loading'
        });
        await loading.present();
        this.Ofertas.getDetalle(this.idOferta)
        .subscribe(
            (res) => {
                this.Detalle = res;
                loading.dismiss();
            },
            (error) =>{
                console.error(error);
                loading.dismiss();
            }
        )
    }

    closeModal() {
        this.modalCtrl.dismiss();
    }

    goToLogin(){
        this.modalCtrl.dismiss();
        this.navCtrl.navigateForward('login');
    }

}
