export interface LoginFormErrors {
    email: string;
    password: string;
  }
  
  export interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
  }

  export interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  export interface RegisterFormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }