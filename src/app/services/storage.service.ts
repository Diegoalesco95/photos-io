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

  async save(key: string, value: any) {
    await this.storage.set(key, value);
  }

  async remove(key: string) {
    try {
      await this.storage.remove(key);
    } catch (error) {
      console.log(error);
    }
  }
}
