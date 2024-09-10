import { CreatePedidoUseCase } from "../../../application/CreatePedidoUseCase";
import { CreatePedidoController } from "../controllers/CreatePedidoController";
import { MysqlPedidoRepository } from "../../adapters/MysqlPedidoRepository";


export const pedidoRepository = new MysqlPedidoRepository();

export const createPedidoUseCase = new CreatePedidoUseCase(pedidoRepository);


export const createPedidoController = new CreatePedidoController(createPedidoUseCase);

