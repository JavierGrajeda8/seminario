export interface User {
  uid: string;
  email: string;
  name?: string;
  phone?: number;
  phoneCountryCode?: number;
  type?: string;
  logginType?: string;
  password?: string;
}
