import { AbstractControl, ValidatorFn } from '@angular/forms';

// Validador para nombres (solo letras y espacios)
export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) return null;

    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const isValid = regex.test(value);
    return !isValid ? { 'invalidName': { value: control.value } } : null;
  };
}

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) return null;

    const regex = /^\d+$/;
    const isValid = regex.test(value);
    return !isValid ? { 'invalidName': { value: control.value } } : null;
  };
}

// Validador para contraseña fuerte
export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    return !isValid ? { 'weakPassword': { value: control.value } } : null;
  };
}

// Validador para confirmar contraseña
export function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirm_password')?.value;

  if (password == confirmPassword) {
    return null;
  } else {
    return { 'mismatch': true }
  }
}

export function emailFormatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) return null; // Si está vacío, no hay error (usar Validators.required para eso)

    // Regex para un email más estricto (ejemplo: nombre@dominio.com)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(value);

    return !isValid ? { 'invalidEmail': true } : null;
  };
}
