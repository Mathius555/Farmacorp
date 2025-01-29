import { Injectable, inject } from '@angular/core';  
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, getDoc, doc} from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  //----------------------Autenticacion------------------------------

getAuth(){

return getAuth();
}

  //----------------------Acceder------------------------------------
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //----------------------Crear usuario------------------------------------
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //----------------------Actualizar usuario------------------------------------
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

//----------------------Enviar Email para restablecer contraseña------------------------------------
sendRecoveryEmail(email : string) {
  return sendPasswordResetEmail(getAuth(), email);
}




  //----------------------Base de datos------------------------------------

  //----------------------Setear un documento------------------------------------
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

//----------------------Obtener un documento------------------------------------
  async getDocument(path: string,) {
    return (await getDoc (doc(getFirestore(), path))).data();
  }

  //--------------------- Diferencias de roles y funciones ------------------------
  async getUserRole(uid: string): Promise<string> {
    try {
      const userDoc = await firstValueFrom(this.firestore.doc(`users/${uid}`).get());
      const userData = userDoc.data() as { role?: string } | undefined;
      
      if (userData && userData.role) {
        return userData.role;
      }
      return 'client'; // valor por defecto si no hay rol definido
      
    } catch (error) {
      console.error('Error getting user role:', error);
      return 'client';
    }
  }
}