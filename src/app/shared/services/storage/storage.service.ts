import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {}

  // private residence = new Subject<Residence>();

  // getResidence(): Observable<Residence> {
  //   return this.residence.asObservable();
  // }

  // setResidenceAsObservable(key: string, residence: Residence) {
  //   this.storage.set(key, JSON.stringify(residence));
  //   this.residence.next(residence);
  // }

  
}
