import { Component, OnInit } from '@angular/core';
import { Injectable, inject } from '@angular/core';  
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent  implements OnInit {

    form = new FormGroup({
      id: new FormControl(''),
      image: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(500)
      ])
      
    });
  
    firebaseSvc = inject(FirebaseService);
    utilsSvc = inject(UtilsService);
    
  
user = {} as User;

    ngOnInit() {
      this.user = this.utilsSvc.getFromLocalStorage('user');
    }



// =============== Tomar/Seleccionar una imagen ==============
async takeImage (){
  const DataUrl = (await this.utilsSvc.takePicture('Imagen del producto')).dataUrl;
  this.form.controls.image.setValue(DataUrl);
}

  
    
    async submit() {
      if (this.form.valid) {

        let path = `users/${this.user.uid}/products`;


        const loading = await this.utilsSvc.loading();
        await loading.present();
  

// =============== Subir la imagen y obtener la URL ==============

let dataUrl = this.form.value.image;
let imagePath = `${this.user.uid}/${Date.now()}`;
let imageURL = await this.firebaseSvc.uploadImage(imagePath, dataUrl);

this.form.controls.image.setValue(imageURL);

  delete this.form.value.id;

        this.firebaseSvc.addDocument(path, this.form.value).then(async res => {
        
          this.utilsSvc.dismissModal ({success : true});
  
          this.utilsSvc.presentToast({
            message: 'producto creado exitosamente',
            duration: 2500,
            color: 'success',
            position: 'middle',
            icon: 'alert-circle-outline'
          });
        
        
        
        }).catch(error => {
          console.log(error);
  
          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2500,
            color: 'danger',
            position: 'middle',
            icon: 'alert-circle-outline'
          });
        }).finally(() => {
          loading.dismiss();
        });
      }
    }
  }
  
  
  
