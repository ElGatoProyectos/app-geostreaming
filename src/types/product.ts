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
  price_role: number;
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

interface AccountOutType {
  is_active: boolean;
  email: string;
  password: string;
  pin: string;
  numb_profiles: number;
  numb_days_duration: number;
  status: string;
}

interface PriceOutType {
  role: number;
  price_role: number;
}

export interface ProductOutType {
  id: number;
  platform: string;
  accounts: AccountOutType[] | null;
  prices: PriceOutType[];
}
