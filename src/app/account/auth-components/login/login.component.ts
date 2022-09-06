import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpService } from '../../../shared-services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  akomaLoaderFlag: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.loginForm.controls;
  }

  signIn() {
    this.akomaLoaderFlag = true;
    this.http
      .postRequest('/auth/signin', {
        username: this.f['username'].value,
        password: this.f['password'].value,
      })
      .subscribe(
        (response: any) => {
          localStorage.setItem('user_access_token', response.access_token);
          localStorage.setItem('currentUser', response.username);
          this.akomaLoaderFlag = false;
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.akomaLoaderFlag = false;
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }
}
