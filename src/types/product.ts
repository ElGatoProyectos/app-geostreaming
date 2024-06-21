interface AccountInType {
  is_active: boolean;
  email: string;
  password: string;
  pin: string;
  numb_profiles: number;
  numb_days_duration: number;
  status: string;
}

interface PriceInType {
  role_id: number;
  price: number;
}

interface PlatformInType {
  name: string;
  description: string;
}

export interface ProductInType {
  platform: PlatformInType;
  accounts?: AccountInType[];
  prices: PriceInType[];
}

export interface AccountOutType {
  id: number;
  product_id: number;
  platform_id: number;
  is_active: boolean;
  email: string;
  password: string;
  pin: string;
  numb_profiles: number;
  numb_days_duration: number;
  status: string;
  createdAt: Date;
}

export interface PriceOutType {
  id: number;
  role_id: number;
  price: number;
  product_id: number;
}

interface PlatformOutType {
  id: number;
  name: string;
  description: string;
}

export interface ProductOutType {
  id: number;
  platform_id: number;
  platform: PlatformOutType;
  accounts?: AccountOutType[] | null;
  prices: PriceOutType[];
  createdAt: Date;
}

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
  status: string;
  createdAt: string;
}

export interface PriceUpdateInType {
  id?: number;
  role_id: number;
  price: string | number;
  product_id?: number;
}

export interface ProductUpdateInType {
  id: number;
  platform_id: number;
  platform: PlatformOutType;
  accounts?: AccountUpdateInType[] | null;
  price: PriceUpdateInType[];
  createdAt: string;
}
