import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigateByUrl('/');
  }

  validarToken(): Observable<boolean> {
    const jwtToken = localStorage.getItem('jwtToken') || '';
    return this.http
      .get(base_url + '/renewToken', {
        headers: { Authorization: jwtToken },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('jwtToken', resp.jwtToken);
        }),
        map((resp) => true),
        catchError((error) => of(false))
      );
  }

  login(formData: LoginForm) {
    return this.http.post(base_url + '/login', formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('jwtToken', resp.jwtToken);
      })
    );
  }
}
