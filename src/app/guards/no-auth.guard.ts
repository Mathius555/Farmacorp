import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = async (route, state) => {
  const firebaseSvc = inject(FirebaseService);
  const utilsSvc = inject(UtilsService);
  const router = inject(Router);  // Inyecta el servicio Router para navegar

  const auth = firebaseSvc.getAuth().currentUser;

  // Verificamos si hay un usuario autenticado
  if (!auth) {
    return true; // Si no hay usuario autenticado, permite el acceso
  }

  try {
    // Asegúrate de que el método `getUserRole` esté bien implementado
    const role = await firebaseSvc.getUserRole(auth.uid);

    if (role === 'admin') {
      router.navigate(['/main/admin-home']); // Redirige a la página de admin
    } else {
      router.navigate(['/main/home']); // Redirige a la página de usuario
    }

    return false; // No permite el acceso si ya está autenticado
  } catch (error) {
    console.error('Error al verificar usuario:', error);
    return true; // En caso de error, permite el acceso
  }
};
