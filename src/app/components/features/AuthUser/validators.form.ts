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

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) return null;

    // Permite letras, números, guiones bajos, guiones y puntos
    const regex = /^[a-zA-Z0-9_.-]+$/;
    const isValid = regex.test(value);

    return !isValid ? { 'invalidUsername': true } : null;
  };
}

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) return null;

    const regex = /^\d+$/;
    const isValid = regex.test(value);
    return !isValid ? { 'invalidNumber': { value: control.value } } : null;
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
  const password = control.get('credencial')?.value;
  const confirmPassword = control.get('confirm_credencial')?.value;

  if (password === confirmPassword) {
    return null;  // Válido
  } else {
    // Devuelve el error en el campo 'confirm_credencial'
    control.get('confirm_credencial')?.setErrors({ 'mismatch': true });
    return { 'mismatch': true };  // También marca el formulario como inválido
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

export function telefonoValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    // Si el valor está vacío, retornamos null (el validador required se encargará)
    if (!value || value.trim() === '') {
      return null;
    }

    // Limpiamos el número (eliminamos espacios, guiones, paréntesis, etc.)
    const cleanValue = value.replace(/[^\d]/g, '');

    // Expresión regular para números venezolanos válidos:
    // - Móviles: 04xx xxx xxxx (0412, 0414, 0416, 0424, 0426)
    // - Fijos: 02xx xxx xxxx
    // - Código de país: +58 o 0058 seguido de 10 dígitos
    const telefonoPattern = /^(04[1246]\d{8}|02\d{9}|(\+58|0058)\d{11})$/;

    // Validamos el formato
    if (!telefonoPattern.test(cleanValue)) {
      return { telefonoInvalido: true };
    }

    // Validamos la longitud mínima (10 dígitos para números locales)
    if (cleanValue.length < 10) {
      return { telefonoLongitudMinima: true };
    }

    // Si pasa todas las validaciones, retornamos null (sin errores)
    return null;
  };
}
