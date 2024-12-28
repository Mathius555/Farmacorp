import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController); 
  toastCtrl = inject(ToastController);
  router = inject(Router);

  //----------------Loading---------------------

  loading() {
    return this.loadingCtrl.create({
      spinner: 'crescent'
    });
  }


  //----------------Toast---------------------
async presentToast(opts?: ToastOptions) {
  const toast = await this.toastCtrl.create(opts);
  toast.present();
}




//----------------Enrutador---------------------
routerLink (url: string) {
 return this.router.navigateByUrl(url);
}




//----------------Guardar elemento en Localstorage---------------------
saveInLocalStorage (key: string, value: any) {
  return localStorage.setItem(key, JSON.stringify(value))
 }



 //----------------Obtener elemento de Localstorage---------------------
getFromLocalStorage (key: string) {
  return JSON.parse (localStorage.getItem(key))
 }


}

