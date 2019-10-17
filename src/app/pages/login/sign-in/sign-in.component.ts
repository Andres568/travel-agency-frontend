import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthService } from 'src/app/core/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  title = 'SIGN IN';
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService
    ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSignIn(entryUser: User) {
    const username: string = entryUser.username.trim();
    const password: string = entryUser.password.trim();
    this.authService.login(entryUser).subscribe(response => {
      console.log(response);

      this.authService.guardarUser(response);
      this.authService.guardarToken(response.token);
      const user = this.authService.user;
      this.router.navigate(['/home']);
      Swal.fire('Login', `Hola ${user.username}, has iniciado sesión con éxito!`, 'success');
    }, err => {
      if (err.status == 400) {
        Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    })
  }

  chargeUsers() {
    this.router.navigate(['/users']);
  }


  onSignUP() {
    this.router.navigate(['/sign-up']);
  }


}
