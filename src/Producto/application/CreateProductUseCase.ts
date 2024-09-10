import { Product } from "../domain/Producto";
import { ProductRepository } from "../domain/ProductoRepository";

export class CreateProductUseCase {
  constructor(readonly productRepository: ProductRepository) {}

async run(
  nombre: string,
  descripcion: string, 
  precio: number,
  cantidad: number,    
  imagen: string,
): Promise<Product | null> {
  try {
    const product = await this.productRepository.createProduct(
      nombre,
      descripcion,
      precio,
      cantidad,
      imagen,
    );
    return product;
  } catch (error) {
    return null;
  }
}
}
  
