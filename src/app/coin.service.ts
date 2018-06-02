import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CoinService {

  constructor(private http: HttpClient) { }

  addCoin(name: any, price: any) {
    console.log('addCoin service', name);
    const uri = 'http://localhost:8080/coins/add';
    const obj = {
      name: name,
      price: price
    };
    this.http
        .post(uri, obj)
        .subscribe(res => console.log('Done'));
  }

  editCoin(id: any) {
    console.log('editCoin', name);
    const uri = 'http://localhost:4000/coins/edit/' + id;
    return this
      .http
      .get(uri)
      .map(res => {
        return res;
      });
  }

  updateCoin(name: any, price: any, id: any) {
    console.log('updateCoin', name);
    const uri = 'http://localhost:4000/coins/update/' + id;
    const obj = {
      name: name,
      price: price
    };
    this
      .http
      .post(uri, obj)
      .subscribe(res => console.log('Done'));
  }

  deleteCoin(id: any) {
    const uri = 'http://localhost:4000/coins/delete/' + id;
    return this
      .http
      .get(uri)
      .map(res => {
        return res;
      });
  }
}
