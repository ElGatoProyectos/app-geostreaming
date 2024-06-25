import { ProductUpdateInType } from "./product";

export interface UserInType {
  ref_id?: number | null;
  role?: "USER" | "DISTRIBUTOR";
  full_name: string;
  dni?: string | null;
  phone: string;
  email: string;
  balance_in_cents: number;
  password: string;
  enabled: string;
}

export interface UserOutType extends UserInType {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface UserUpdateInType extends UserInType {
  id: number;
  products?: ProductUpdateInType[];
}
