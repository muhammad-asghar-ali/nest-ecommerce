export interface CreateOrderDto {
  products: {
    product: string;
    quantity: number;
  }[];
}
