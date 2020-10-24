import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public formSummitted = false;
  public loginForm = this.fb.group({
    user: [localStorage.getItem('user') || '', Validators.required],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (resp) => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('user', this.loginForm.get('user').value);
        } else {
          localStorage.removeItem('user');
        }
        this.router.navigateByUrl('/');
      },
      (err) => {
        swal.fire('Error', err.error.error, 'error');
      }
    );
  }
}
