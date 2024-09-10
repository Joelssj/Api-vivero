import express from "express";

import { createPedidoController } from "../dependencies/dependencies";


export const pedidoRouter = express.Router();

pedidoRouter.post('/pedido', createPedidoController.handle.bind(createPedidoController));
