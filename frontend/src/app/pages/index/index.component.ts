import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VendingMachineService } from '../../services/vendingMachine.service';
import { Beverage } from '../../models/beverage.model';
import swal from 'sweetalert2';
import { Coin } from '../../models/coin.model';
import { FormBuilder, Validators } from '@angular/forms';
import { RefillBeverageForm } from '../../interfaces/refill-beverage-form.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit {
  public beverages: Beverage[] = [];
  public coins: Coin[] = [];
  public insertCoinForm = this.fb.group({
    coinId: [null, Validators.required],
  });

  public refillCoinsForm = this.fb.group({
    coinId: [null, Validators.required],
    amount: [0, [Validators.required, Validators.min(0)]],
  });

  public refillBeverageForm = this.fb.group({
    stock: [0, [Validators.required, Validators.min(0)]],
  });

  isLoggedin: boolean;
  totalCurrentMoney: number;

  constructor(
    private userService: UserService,
    private vendingMachineService: VendingMachineService,
    private fb: FormBuilder
  ) {}

  isLoggedIn() {
    if (localStorage.getItem('jwtToken') == null) {
      this.isLoggedin = false;
      return this.isLoggedin;
    } else {
      return true;
    }
  }

  logout() {
    this.userService.logout();
  }

  getBeverages() {
    this.vendingMachineService.getBeverages().subscribe((beverages) => {
      this.beverages = beverages;
    });
  }

  getCoins() {
    this.vendingMachineService.getCoins().subscribe((coins) => {
      this.coins = coins;
    });
  }

  getTotalCurrentMoney() {
    this.vendingMachineService
      .getTotalCurrentMoney()
      .subscribe((totalCurrentMoney) => {
        this.totalCurrentMoney = totalCurrentMoney;
      });
  }

  getRefund() {
    this.vendingMachineService.getRefund().subscribe(
      (returnChange) => {
        swal.fire('Dinero devuelto', returnChange, 'success').then((res) => {
          location.reload();
        });
      },
      (err) => {
        swal.fire('Error', err.error.error, 'error');
      }
    );
  }

  insertCoin() {
    this.vendingMachineService.insertCoin(this.insertCoinForm.value).subscribe(
      (resp) => {
        swal
          .fire(
            'Moneda insertada',
            'Total en la máquina: ' + resp.totalCurrentMoney + ' €',
            'success'
          )
          .then((res) => {
            location.reload();
          });
      },
      (err) => {
        swal.fire('Error', err.error.error, 'error');
      }
    );
  }

  selectProduct(beverage: Beverage) {
    this.vendingMachineService.selectProduct(beverage.id).subscribe(
      (resp) => {
        swal
          .fire(
            'Producto obtenido',
            resp.beverageObtained + '. Cambio: ' + resp.returnChange,
            'success'
          )
          .then((res) => {
            location.reload();
          });
      },
      (err) => {
        swal.fire('Error', err.error.error, 'error');
      }
    );
  }

  refillCoins() {
    this.vendingMachineService
      .refillCoins(this.refillCoinsForm.value)
      .subscribe(
        (resp) => {
          swal
            .fire(
              'Recarga de monedas realizado con éxito',
              'Moneda: ' + resp.coin + '. Cantidad actual: ' + resp.amount,
              'success'
            )
            .then((res) => {
              location.reload();
            });
        },
        (err) => {
          swal.fire('Error', err.error.error, 'error');
        }
      );
  }

  refillBeverage(beverage: Beverage) {
    this.vendingMachineService
      .refillBeverage(this.refillBeverageForm.value, beverage.id)
      .subscribe(
        (resp) => {
          swal
            .fire(
              'Recarga de bebida realizado con éxito',
              'Bebida: ' + resp.product + '. Stock actual: ' + resp.stock,
              'success'
            )
            .then((res) => {
              location.reload();
            });
        },
        (err) => {
          swal.fire('Error', err.error.error, 'error');
        }
      );
  }

  ngOnInit(): void {
    this.getBeverages();
    this.getCoins();
    this.getTotalCurrentMoney();
  }
}
