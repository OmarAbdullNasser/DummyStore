export interface User {
  id: number | string;
  name?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  image?: string;
}

export interface AuthResponse extends User {
  accessToken: string;
  refreshToken?: string;
  token?: string;
}

export interface Product {
  id: number | string;
  title: string;
  description: string;
  price: number;
  image: string;
  category?: string;
}
