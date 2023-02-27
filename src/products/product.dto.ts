export interface CreateProductDto {
  title: string;
  description: string;
  image: string;
  price: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;
