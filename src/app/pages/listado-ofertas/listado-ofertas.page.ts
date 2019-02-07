import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, MenuController, ModalController, PopoverController } from '@ionic/angular';
import { OfertasProviderService } from './../../services/ofertas-provider.service';
import { SearchFilterPage } from '../modal/search-filter/search-filter.page';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
import { DetalleOfertaPage } from './../detalle-oferta/detalle-oferta.page';

@Component({
  selector: 'app-listado-ofertas',
  templateUrl: './listado-ofertas.page.html',
  styleUrls: ['./listado-ofertas.page.scss'],
})
export class ListadoOfertasPage implements OnInit {

    ofertas: any;

    constructor(
        public navCtrl: NavController,
        public Ofertas: OfertasProviderService,
        public loadingController: LoadingController,
        public menuCtrl: MenuController,
        public popoverCtrl: PopoverController,
        //public alertCtrl: AlertController,
        public modalCtrl: ModalController
        //public toastCtrl: ToastController
        //public global: GlobalProvider
    ) { }

    ionViewWillEnter() {
        this.menuCtrl.enable(true);
    }

    ngOnInit() {
        this.getData();
    }

   /* goDetails(id:number) {
        this.navCtrl.navigateForward('detalle-oferta');
    }*/

    async goDetails(id:number) {
        const modal = await this.modalCtrl.create({
            component: DetalleOfertaPage,
            componentProps: { idOferta: id }
        });
        return await modal.present();
    }

    settings() {
        this.navCtrl.navigateForward('settings');
    }

    async getData() {
        const loading = await this.loadingController.create({
            message: 'Loading'
        });
        await loading.present();
        this.Ofertas.getOfertas()
        .subscribe(
            (res) => {
                this.ofertas = res;
                loading.dismiss();
            },
            (error) =>{
                console.error(error);
                loading.dismiss();
            }
        )
    }

    async searchFilter () {
        const modal = await this.modalCtrl.create({
            component: SearchFilterPage
        });
        return await modal.present();
    }

    async notifications(ev: any) {
        const popover = await this.popoverCtrl.create({
            component: NotificationsComponent,
            event: ev,
            animated: true,
            showBackdrop: true
        });
        return await popover.present();
    }

}
