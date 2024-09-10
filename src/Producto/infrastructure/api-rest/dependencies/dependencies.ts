import { CreateProductUseCase } from "../../../application/CreateProductUseCase";
import { GetAllProductUseCase } from "../../../application/GetAllProductUseCase";
import { GetByIdProductUseCase } from "../../../application/GetByIdProductUseCase";
import { CreateProductController } from "../controllers/CreateProductController";
import { GetAllProductController } from "../controllers/GetAllProductController";
import { GetByIdProductController } from "../controllers/GetByIdProductController";
import { MysqlProductRepository } from "../../adapters/MysqlProductRepository";
import { DeleteProductController } from "../controllers/DeleteProductController";
import { DeleteProductUseCase } from "../../../application/DeleteProductUseCase";
import { UpdateProductController } from "../controllers/UpdateProductController";
import { UpdateProductUseCase } from "../../../application/UpdateProductUseCase";

export const productRepository = new MysqlProductRepository();

export const createProductUseCase = new CreateProductUseCase(productRepository);
export const getAllUseCase = new GetAllProductUseCase(productRepository);
export const getByIdProductUseCase = new GetByIdProductUseCase(productRepository);
export const deleteProductUseCase = new DeleteProductUseCase(productRepository);
export const updateProductUseCase = new UpdateProductUseCase( productRepository);

export const createProductController = new CreateProductController(createProductUseCase);
export const getAllProductController = new GetAllProductController(getAllUseCase);
export const getByIdProductController = new GetByIdProductController(getByIdProductUseCase);
export const deleteProductController = new DeleteProductController(deleteProductUseCase);
export const updateProductController = new UpdateProductController(updateProductUseCase);
