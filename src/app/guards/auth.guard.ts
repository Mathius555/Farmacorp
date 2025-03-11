import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const firebaseSvc = inject(FirebaseService);
  const utilsSvc = inject(UtilsService);
  const auth = firebaseSvc.getAuth().currentUser;

  if (!auth) {
    return true; 
  }


  const role = await firebaseSvc.getUserRole(auth.uid);
  
  if (role === 'admin') {
    utilsSvc.routerLink('/main/admin-home');
  } else {
    utilsSvc.routerLink('/main/home');
  }

  return false; 
};