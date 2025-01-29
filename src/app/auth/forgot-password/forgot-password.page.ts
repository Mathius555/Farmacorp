import { Component, OnInit } from '@angular/core';
import { Injectable, inject } from '@angular/core';  
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../../models/user.model';
import { UtilsService } from '../../services/utils.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
     email: new FormControl('', [Validators.required, Validators.email]),

   });
 
   firebaseSvc = inject(FirebaseService);
   utilsSvc = inject(UtilsService)
 
   ngOnInit() {
   }
 
 
 
 async submit(){
 if (this.form.valid){
 
 const  loading = await this.utilsSvc.loading();
 await loading.present();
 
   this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res => {
    this.utilsSvc.presentToast({
      message: 'correo enviado con exito',
      duration: 1500,
      color: 'primary',
      position: 'middle',
      icon: 'real-outline'
    });

    this.utilsSvc.routerLink('/auth');
    this.form.reset();
 
 
   }).catch(error =>{
 
     console.log(error);
 
     this.utilsSvc.presentToast({
       message: error.message,
       duration: 2500,
       color: 'danger',
       position: 'middle',
       icon: 'alert-circle-outline'
     })
 
   }).finally(() => {
 
 loading.dismiss();
 
   })
 }
 
 }
 
 

 }