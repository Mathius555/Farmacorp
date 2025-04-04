import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);


  products: Product[] = [];
  ngOnInit() {
  }


user(): User{

return this.utilsSvc.getFromLocalStorage('user');

}

ionViewWillEnter() {
  this.getProducts();
}


   //============== Cerrar Sesion ==============
   singOut(){
    this.firebaseSvc.singOut();
  }


  // ================= Obtener productos ==================

  getProducts(){
    let path = `users/${this.user().uid}/products`;

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({

      next : (res: any) => {

        console.log(res);
        this.products = res;
        sub.unsubscribe();
      }
    })

  }

  // ============ Agregar o actualizar producto ==========

  addUpdateProduct(){

    this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal'
    })
  }

}
