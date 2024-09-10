import { Pedido } from "./Pedido";


export interface PedidoRepository {
    crearPedido(pedido: Pedido): Promise<void>;
    obtenerPedidoPorId(id: string): Promise<Pedido | null>;
    actualizarPedido(pedido: Pedido): Promise<void>;
  }
  