import { LoginFormData, LoginFormErrors } from '../types/auth.types';

export const validateLoginForm = (formData: LoginFormData): LoginFormErrors => {
  const errors: LoginFormErrors = { email: '', password: '' };
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
  if (!formData.email || !emailPattern.test(formData.email)) {
    errors.email = 'Podaj poprawny adres email';
  }
  
  if (!formData.password) {
    errors.password = 'Hasło jest wymagane';
  }
  
  return errors;
};

import { RegisterFormData, RegisterFormErrors } from '../types/auth.types'

export const validateRegisterForm = (formData: RegisterFormData): RegisterFormErrors => {
  const errors: RegisterFormErrors = {};
  
  if (!formData.firstName) errors.firstName = "Imię jest wymagane.";
  if (!formData.lastName) errors.lastName = "Nazwisko jest wymagane.";
  
  if (!formData.email) {
    errors.email = "Adres email jest wymagany.";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Nieprawidłowy format adresu email.";
  }
  
  if (!formData.password) {
    errors.password = "Hasło jest wymagane.";
  } else if (formData.password.length < 6) {
    errors.password = "Hasło musi mieć co najmniej 6 znaków.";
  } else if (!/[A-Z]/.test(formData.password)) {
    errors.password = "Hasło musi zawierać przynajmniej jedną wielką literę.";
  } else if (!/[0-9]/.test(formData.password)) {
    errors.password = "Hasło musi zawierać przynajmniej jedną cyfrę.";
  }
  
  return errors;
};