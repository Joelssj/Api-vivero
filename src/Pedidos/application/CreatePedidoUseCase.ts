
import { PedidoRepository } from '../domain/PedidoRepository';
import { Pedido } from '../domain/Pedido';

export class CreatePedidoUseCase {
  constructor(private readonly pedidoRepository: PedidoRepository) {}

  async execute(pedido: Pedido): Promise<void> {
    await this.pedidoRepository.crearPedido(pedido);
  }
}
