export type Product = {
  id: string;
  name: string;
  description: string;
  price: number | null;
  image: string;
  category: string;
  featured?: boolean;
  showPrice?: boolean;
  available?: boolean;
};

export type StoreSettings = {
  storeName: string;
  storeTagline: string;
  whatsappNumber: string;
  showPricesGlobal: boolean;
  currency: string;
  primaryColor: string;
  heroImage: string;
  address: string;
  hours: string;
  instagram: string;
};

export type CatalogData = {
  products: Product[];
  settings: StoreSettings;
};

export type CartItem = {
  productId: string;
  qty: number;
};
