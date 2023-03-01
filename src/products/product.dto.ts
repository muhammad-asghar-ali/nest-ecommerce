export interface CreateProductDto {
  title: string;
  description: string;
  image: string;
  price: number;
}

export type UpdateProductDto = Partial<CreateProductDto>;
