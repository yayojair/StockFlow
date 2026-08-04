import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginRequest } from '../../services/login/login.request';
import { LoginResponse, AuthLoginUser } from '../../services/login/login.response';
import { AuthService} from '../../services/login/auth.service';
import { TokenService } from '../../core/token.service';
import { MessageError } from '../../layout/error/error.component'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MessageError,
    FormsModule,
    MatTooltipModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class Login {

    private readonly fb = inject(FormBuilder);
    private readonly router = inject(Router);
    private readonly auth_service = inject(AuthService);
    private readonly token_service = inject(TokenService);

    //valida que los campos no esten vacios
    loginForm: FormGroup;

    title:string = '';

    //mensaje error o informacion
    textoError:string = '';
    mostrarError:boolean = false;

    //carga de pagina
    isLoading = true;

    //ocultar elementos html
    hide:boolean = true;

    constructor() {
        this.title = 'StockFlow';
        this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        rememberMe: [false]
        });
    }

    ngAfterViewInit():void{
      setTimeout(() => {
        this.isLoading = false;
      });
    }

    onSubmit():void {
      if(this.loginForm.invalid){
        this.loginForm.markAllAsTouched();
        return;
      }

      //poner pagina load
      this.isLoading = true;
      this.loginForm.disable();

      //obtener datos del formulario
      const datos = this.loginForm.value as LoginRequest;

      this.auth_service.login(datos).subscribe({

        next: (respuesta : LoginResponse) => {
          this.isLoading = false;
          this.loginForm.enable()
          this.token_service.guardarToken(respuesta.user.token);
          this.router.navigate(['/dashboard']);
        },
        error: (error_server) => {
          this.mostrarError = true;
          this.textoError = error_server.message;
        }
      });;

    }

    cerrar_mensaje(){
      this.loginForm.enable();
      this.isLoading = false;
      this.mostrarError = false;
    }
    

}


