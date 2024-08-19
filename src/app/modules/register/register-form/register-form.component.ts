import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../core/api-users/users.service'
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    private register : UsersService
  ){}

  registerUser() {
    this.register.registerUser(this.parseToAPIReg(this.registerForm))
    .subscribe({
      next: (response) => {
        // Se almacena el usuario creado en LocaStorage para mantenerlo logeado
        console.log("Usuario registrado con éxito:", response);
        this.registerForm.reset()
      },
      error: (err) => {
        // Manejo del error
        console.error("Error al registrar usuario,", err);
      },
      complete: () => {
        // Opcional: MAneja la finalización de la llamada
        console.log("La solicitud de registro se ha completado");
      }
    }
    )
  }

  passwordMatchValidator(group: FormGroup){
    const password = group.get('pswd')?.value
    const confirmPassword = group.get('confirm-password')?.value
    return password === confirmPassword ? null : { mismatch: true }
  }

  registerForm = this.formBuilder.group({
    'first_name': ['', [Validators.required]],
    'last_name': ['', [Validators.required]],
    'user_name': ['', [Validators.required]],
    'email_address': ['', [Validators.required, Validators.email]],
    'pswd': ['', [Validators.required]],
    'confirm_password': ['', [Validators.required, this.passwordMatchValidator]],
    'checkbox': [false, [Validators.required, Validators.requiredTrue]]
  })

  onSubmit(){
    this.registerUser()
    // Crear home para usuarios logeados
    // this.router.navigate(['/home'])
  }

  parseToAPIReg(form : FormGroup){
    return {
      user_id: form.value.user_id,
      user_name: form.value.user_name,
      email_address: form.value.email_address,
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      pswd: form.value.pswd

    }
  }
}
