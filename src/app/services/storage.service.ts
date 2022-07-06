import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private localStorage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this.localStorage = await this.storage.create();
  }

  async load(key: string) {
    try {
      const value = await this.storage.get(key);
      return value;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  save(key: string, value: any) {
    try {
      this.storage.set(key, value);
    } catch (error) {
      console.log(error);
    }
  }

  remove(key: string) {
    try {
      this.storage.remove(key);
    } catch (error) {
      console.log(error);
    }
  }
}
