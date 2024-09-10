import { query } from "../../../database/mysql";
import { PedidoRepository } from '../../domain/PedidoRepository';
import { Pedido, ProductoPedido, Cliente } from '../../domain/Pedido';

export class MysqlPedidoRepository implements PedidoRepository {

  async crearPedido(pedido: Pedido): Promise<void> {
    try {
      await query('START TRANSACTION', []);

      await query(
        'INSERT INTO pedidos (id, cliente_nombre, cliente_direccion, cliente_telefono, fecha, total) VALUES (?, ?, ?, ?, ?, ?)',
        [pedido.id, pedido.cliente.nombre, pedido.cliente.direccion, pedido.cliente.telefono, pedido.fecha, pedido.total]
      );

      for (const productoPedido of pedido.productos) {
        await query(
          'INSERT INTO pedido_productos (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)',
          [pedido.id, productoPedido.productoId, productoPedido.cantidad]
        );

        await query(
          'UPDATE productos SET cantidad = cantidad - ? WHERE id = ?',
          [productoPedido.cantidad, productoPedido.productoId]
        );
      }

      await query('COMMIT', []);
    } catch (error) {
      await query('ROLLBACK', []);
      throw error;
    }
  }

  async obtenerPedidoPorId(id: string): Promise<Pedido | null> {
    const sqlPedido = 'SELECT * FROM pedidos WHERE id = ?';
    const paramsPedido = [id];

    try {
      const [result]: any = await query(sqlPedido, paramsPedido);

      if (!result || result.length === 0) {
        return null;
      }

      const pedidoData = result[0]; 

      const sqlProductos = 'SELECT * FROM pedido_productos WHERE pedido_id = ?';
      const paramsProductos = [id];

      const [productosResult]: any = await query(sqlProductos, paramsProductos);

      if (!productosResult || productosResult.length === 0) {
        return null; 
      }

      const productos = productosResult.map((producto: any) => new ProductoPedido(
        producto.producto_id,
        producto.cantidad
      ));

      const cliente = new Cliente(
        pedidoData.cliente_nombre,
        pedidoData.cliente_direccion,
        pedidoData.cliente_telefono
      );

      return new Pedido(
        pedidoData.id,
        productos,
        cliente,
        pedidoData.fecha,
        pedidoData.total
      );

    } catch (error) {
      console.error("Error al obtener el pedido:", error);
      return null;
    }
  }

  async actualizarPedido(pedido: Pedido): Promise<void> {
    try {
      await query('START TRANSACTION', []);

      await query(
        'UPDATE pedidos SET cliente_nombre = ?, cliente_direccion = ?, cliente_telefono = ?, fecha = ?, total = ? WHERE id = ?',
        [pedido.cliente.nombre, pedido.cliente.direccion, pedido.cliente.telefono, pedido.fecha, pedido.total, pedido.id]
      );

      await query(
        'DELETE FROM pedido_productos WHERE pedido_id = ?',
        [pedido.id]
      );

      for (const productoPedido of pedido.productos) {
        await query(
          'INSERT INTO pedido_productos (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)',
          [pedido.id, productoPedido.productoId, productoPedido.cantidad]
        );
      }

      await query('COMMIT', []);
    } catch (error) {
      await query('ROLLBACK', []);
      throw error;
    }
  }

  async eliminarPedido(id: string): Promise<boolean> {
    try {
      const sql = 'DELETE FROM pedidos WHERE id = ?';
      const params = [id];
      const [result]: any = await query(sql, params);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error al eliminar el pedido:", error);
      return false;
    }
  }
}

