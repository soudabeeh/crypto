export interface SellOrders {
  orders: Order[];
  volume: string;
}

export interface Order {
  amount: string;
  price: string;
  remain: string;
  value: string;
}
