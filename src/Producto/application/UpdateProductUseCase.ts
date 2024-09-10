import { Product } from "../domain/Producto";
import { ProductRepository } from "../domain/ProductoRepository";

export class UpdateProductUseCase {
  constructor(readonly productRepository: ProductRepository) {}

  async run(
    id: string,
    nombre?: string,
    descripcion?: string, 
    precio?: number,
    cantidad?: number,    
    imagen?: string
  ): Promise<Product | null> {
    try {
      const product = await this.productRepository.updateProduct(
        id,
        nombre,
        descripcion,
        precio,
        cantidad,
        imagen,
      );
      return product;
    } catch (error) {
      console.error("Error in UpdateProductUseCase:", error);
      return null;
    }
  }
}
