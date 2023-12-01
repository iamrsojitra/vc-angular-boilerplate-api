export interface ApiResponse {
  status: number;
  message: string;
  error: string | null;
  data?: any;
}

export interface CreatePartner {
  isActive: boolean;
  email: string;
  companyName: string;
  address: Partial<Address>;
  name: string;
  phoneNo: string;
  webAddress: string;
  currency: string;
  locale: string;
  uuid: string;
}

export interface Address {
  city: string;
  zip: string;
  country: string;
  street: string;
}
