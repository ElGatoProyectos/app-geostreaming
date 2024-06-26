export interface AccountInType {
  is_active: boolean;
  email: string;
  password: string;
  pin: string;
  numb_profiles: number;
  numb_days_duration: number;
}

interface PlatformInType {
  img_url: string;
  name: string;
  description: string;
}

export interface ProductInType {
  platform: PlatformInType;
  accounts?: AccountInType[];
  status?: "IMMEDIATE_DELIVERY" | "UPON_REQUEST";
  price_in_cents: number;
  price_distributor_in_cents: number;
}

/* outtype */

interface PlatformOutType extends PlatformInType {
  id: number;
}

export interface AccountOutType {
  id: number;
  product_id: number;
  platform_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProductOutType {
  id: number;
  platform_id: number;
  platform: PlatformOutType;
  accounts?: AccountOutType[] | null;
  price_in_cents: number;
  price_distributor_in_cents: number;
  status: "IMMEDIATE_DELIVERY" | "UPON_REQUEST";
  created_at: Date;
  updated_at: Date;
}

/* UpdateInType */

interface AccountUpdateInType {
  id?: number;
  product_id?: number;
  platform_id?: number;
  is_active: boolean;
  email: string;
  password: string;
  pin: string;
  numb_profiles: number;
  numb_days_duration: number;
}

export interface ProductUpdateInType {
  id: number;
  platform_id: number;
  platform: PlatformOutType;
  accounts?: AccountUpdateInType[] | null;
  price_in_cents: number;
  price_distributor_in_cents: number;
  status: "IMMEDIATE_DELIVERY" | "UPON_REQUEST";
}
