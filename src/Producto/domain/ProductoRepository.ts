import { Product } from "./Producto";

export interface ProductRepository {
  getAll(): Promise<Product[] | null>;
  getById(productId: string): Promise<Product | null>;
  createProduct(
    nombre: string,
    descripcion: string, 
    precio: number,
    cantidad: number,    
    imagen: string
  ): Promise<Product | null>;
 deleteProduct(productId: string): Promise<boolean>;
  updateProduct(
      productId: string,
      nombre?: string,
      descripcion?: string, 
      precio?: number,
      cantidad?: number,    
      imagen?: string
  ): Promise<Product | null>;

}

