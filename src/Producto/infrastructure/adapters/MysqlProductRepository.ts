// MysqlSensorRepository.ts
import { query } from "../../../database/mysql";
import { Product } from "../../domain/Producto";
import { ProductRepository } from "../../domain/ProductoRepository";

export class MysqlProductRepository implements ProductRepository {
  async getAll(): Promise<Product[] | null> {
    const sql = "SELECT * FROM productos"; 
    try {
      const [data]: any = await query(sql, []);
      const dataProducts = Object.values(JSON.parse(JSON.stringify(data)));

      return dataProducts.map(
        (producto: any) =>
          new Product(
            producto.id,
            producto.nombre,
            producto.descripcion,
            producto.precio,
            producto.cantidad,
            producto.imagen,
          )
      );
    } catch (error) {
      console.error("Error al obtener datos de los productos desde MySQL:", error);
      return null;
    }
  }

  async getById(productId: string): Promise<Product | null> {
    const sql = "SELECT * FROM productos WHERE id=?";
    const params: any[] = [productId];
    try {
      const [result]: any = await query(sql, params);
      return new Product(
        result[0].id,
        result[0].nombre,
        result[0].descripcion,
        result[0].precio,
        result[0].cantidad,
        result[0].imagen
      );
    } catch (error) {
      return null;
    }
  }

  async createProduct(
    nombre: string,
    descripcion: string, 
    precio: number,
    cantidad: number,    
    imagen: string
  ): Promise<Product | null> {
    const sql =
      "INSERT INTO productos (nombre, descripcion, precio, cantidad, imagen) VALUES (?, ?, ?, ?, ?)";
    const params: any[] = [nombre, descripcion, precio, cantidad, imagen];
    try {
      const [result]: any = await query(sql, params);
      return new Product(
        result.insertId,
        nombre,
        descripcion,
        precio,
        cantidad,
        imagen,
      );
    } catch (error) {
      return null;
    }
  }

  async deleteProduct(productId: string): Promise<boolean> {
    const sql = "DELETE FROM productos WHERE id=?";
    const params: any[] = [productId];
    try {
      const [result]: any = await query(sql, params);
      return result.affectedRows > 0;
    } catch (error) {
      return false;
    }
  }

  async updateProduct(
    id: string, 
    nombre?: string,
    descripcion?: string, 
    precio?: number,
    cantidad?: number,    
    imagen?: string
  ): Promise<Product | null> {
    const fieldsToUpdate: string[] = [];
    const params: any[] = [];

    if (nombre) {
      fieldsToUpdate.push("nombre = ?");
      params.push(nombre);
    }
    if (descripcion) {
      fieldsToUpdate.push("descripcion = ?");
      params.push(descripcion);
    }
    if (precio) {
      fieldsToUpdate.push("precio = ?");
      params.push(precio);
    }
    if (cantidad) {
      fieldsToUpdate.push("cantidad = ?");
      params.push(cantidad);
    }
    if (imagen) {
      fieldsToUpdate.push("imagen = ?");
      params.push(imagen);
    }
    
    params.push(id);

    const sql = `UPDATE productos SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;

    try {
      const [result]: any = await query(sql, params);
      if (result.affectedRows === 0) return null;
      
      const updatedProduct: any = await this.getById(id);
      return updatedProduct;
    } catch (error) {
      console.error("Error in updateProduct:", error);
      return null;
    }
  }


}





