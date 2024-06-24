import { ProductUpdateInType } from "./product";

export interface UserInType {
  ref_id?: number | null;
  role_id: number;
  full_name: string;
  dni?: string | null;
  phone: string;
  email: string;
  balance: number;
  password: string;
  enabled: string;
}

export interface UserOutType extends UserInType {
  id: number;
}

export interface UserUpdateInType extends UserInType {
  id: number;
  products?: ProductUpdateInType[];
}
