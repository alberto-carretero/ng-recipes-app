import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(public afAuth: AngularFireAuth) {}

   async login(email: string, password: string) {
    try{
        const result = await this.afAuth.signInWithEmailAndPassword(email, password);
        return result;
    }
    catch (error){
        console.log('Login error: ', error);
    }
   }

   async register(email: string, password: string) {
    try{
        const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
        this.sendVerificationEmail();
        return result;
    }
    catch (error){
        console.log('Register error: ', error);
    }
   }

   async logout() {
    try{
        const localStorageUser = localStorage.getItem('user');

        if (localStorageUser) {
            localStorage.removeItem('user');
        }
        await this.afAuth.signOut();
    }
    catch (error){
        console.log('Logout error: ', error);
    }
   }

//    getCurrentUser(){
//        return this.afAuth.authState.pipe(first()).toPromise();
//    }

   async sendVerificationEmail(): Promise<void> {
    try{
        return (await this.afAuth.currentUser).sendEmailVerification();
    }
    catch (error){
        console.log('Send verification email error: ', error);
    }
   }

   async resetPassword(email: string): Promise<void> {
    try{
        return await this.afAuth.sendPasswordResetEmail(email);
    }
    catch (error){
        console.log('Reset password error: ', error);
    }
   }

   async loginGoogle() {
    try{
        return await this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
    }
    catch (error){
        console.log('Login with Google error: ', error);
    }
   }
}