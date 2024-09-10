import { Signale } from "signale";
import express from "express";
import { productRouter } from "./Producto/infrastructure/api-rest/routes/ProductRouter";
import { pedidoRouter } from "./Pedidos/infrestructure/api-rest/routes/PedidoRouter";
import 'dotenv/config';
import cors from 'cors';

const app = express();
const signale = new Signale();
app.use(express.json());
app.use(cors());
app.use("/productos", productRouter);
app.use("/pedidos", pedidoRouter);
const port = 3010;
const host = '0.0.0.0';

app.listen(port, host, () => {
  signale.success("Server online in port 3010");
});
