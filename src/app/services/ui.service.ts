import { Injectable } from '@angular/core';
import { NavController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(
    private toastController: ToastController,
    private navController: NavController
  ) {}

  async presentAlert(message: string, color: ToastOptions['color']) {
    const alert = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    alert.present();
  }

  navigateTo(url: string) {
    this.navController.navigateRoot(url, { animated: true });
  }
}
