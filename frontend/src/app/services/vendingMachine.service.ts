import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Beverage } from '../models/beverage.model';
import { Coin } from '../models/coin.model';
import { InsertCoinForm } from '../interfaces/insert-coin-form.interface';
import { RefillCoinsForm } from '../interfaces/refill-coins-form.interface';
import { RefillBeverageForm } from '../interfaces/refill-beverage-form.interface';

@Injectable({
  providedIn: 'root',
})
export class VendingMachineService {
  constructor(private http: HttpClient, private router: Router) {}

  get token(): string {
    return localStorage.getItem('jwtToken') || '';
  }
  get headers() {
    return {
      headers: {
        authorization: this.token,
      },
    };
  }

  getBeverages() {
    const url = environment.base_url;
    return this.http
      .get(url)
      .pipe(map((resp: { beverages: Beverage[] }) => resp.beverages));
  }

  getCoins() {
    const url = environment.base_url + '/coins';
    return this.http
      .get(url)
      .pipe(map((resp: { coins: Coin[] }) => resp.coins));
  }

  insertCoin(formData: InsertCoinForm) {
    const url = environment.base_url;
    return this.http
      .put(url, formData)
      .pipe(map((resp: { totalCurrentMoney: number }) => resp));
  }

  getTotalCurrentMoney() {
    const url = environment.base_url + '/totalCurrentMoney';
    return this.http
      .get(url)
      .pipe(
        map((resp: { totalCurrentMoney: number }) => resp.totalCurrentMoney)
      );
  }

  getRefund() {
    const url = environment.base_url + '/refund';
    return this.http
      .get(url)
      .pipe(map((resp: { returnChange: string }) => resp.returnChange));
  }

  selectProduct(beverageId: string) {
    const url = environment.base_url + '/' + beverageId;
    return this.http
      .put(url, {})
      .pipe(
        map((resp: { beverageObtained: string; returnChange: string }) => resp)
      );
  }

  refillCoins(formData: RefillCoinsForm) {
    const url = environment.base_url + '/refillCoin';
    return this.http
      .put(url, formData, this.headers)
      .pipe(map((resp: { coin: string; amount: number }) => resp));
  }

  refillBeverage(formData: RefillBeverageForm, beverageId: string) {
    const url = environment.base_url + '/refillBeverage/' + beverageId;
    return this.http
      .put(url, formData, this.headers)
      .pipe(map((resp: { product: string; stock: number }) => resp));
  }
}
