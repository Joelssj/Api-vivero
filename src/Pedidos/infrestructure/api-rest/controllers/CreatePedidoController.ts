import { Request, Response } from 'express';
import { CreatePedidoUseCase } from '../../../application/CreatePedidoUseCase';

export class CreatePedidoController {
  constructor(private readonly createPedidoUseCase: CreatePedidoUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const pedido = req.body; 
    try {
      await this.createPedidoUseCase.execute(pedido);
      res.status(201).send('Pedido creado con éxito');
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
