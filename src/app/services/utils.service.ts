import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController); 
  toastCtrl = inject(ToastController);
  modalCtrl = inject(ModalController)
  router = inject(Router);




  
  async takePicture (promptLabelHeader: string) {
    return await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      promptLabelHeader,
      promptLabelPhoto: 'Selecciona una imagen',
      promptLabelPicture: 'Toma una foto'
    });
  
 
  };




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
async routerLink(url: string) {
  if (url === '/main/home') {
    // Obtener el usuario del localStorage
    const user = this.getFromLocalStorage('user');
    
    if (user?.role === 'admin') {
      return this.router.navigateByUrl('/main/admin-home');
    } else {
      return this.router.navigateByUrl('/main/home');
    }
  }
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


 //---------------- Modal -----------------------
 async presentModal(opts: ModalOptions) {
  const modal = await this.modalCtrl.create(opts);
 
  await modal.present();
 
  const { data }   = await modal.onWillDismiss();
  if (data) return data;
 }

 dismissModal(data?: any) {
  return this.modalCtrl.dismiss(data);
 }
}

