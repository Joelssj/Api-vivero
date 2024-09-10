import { Product } from "../domain/Producto";
import { ProductRepository } from "../domain/ProductoRepository";

export class GetByIdProductUseCase {
  constructor(readonly productRepository: ProductRepository) {}

  async run(id: string): Promise<Product | null> {
    try {
      const result = await this.productRepository.getById(id);
      return result;
    } catch (error) {
      return null;
    }
  }
}
