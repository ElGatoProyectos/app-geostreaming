type Account = {
  product_id: number;
  platform_id: number;
  is_active: boolean;
  email: string;
  password: string;
  pin: string;
  numb_profiles: number;
  numb_days_duration: number;
  status: string;
};

type Price = {
  user: number;
  distributor: number;
};

export type ProductType = {
  platform_id: number;
  accounts: Account[];
  price: Price;
  role_id: number;
};
