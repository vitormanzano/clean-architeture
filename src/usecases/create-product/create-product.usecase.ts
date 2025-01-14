import { productGateway } from "../../domain/product/gateway/product.gateway";
import { Product } from "../../domain/product/entity/product";
import { UseCase } from "../usecase"

export type CreateProductInputDto = {
    name:string,
    price: number
}

export type CreateProductOutputDto = {
    id: string;
}

export class CreateProductUseCase implements UseCase<CreateProductInputDto, CreateProductOutputDto> {

    private constructor(private readonly productGateway: productGateway) {}

    public static create(productGateway: productGateway) {
        return new CreateProductUseCase(productGateway);
    }

    public async execute( {name, price} : CreateProductInputDto): Promise<CreateProductOutputDto> {
        const aProduct = Product.create(name, price);

        await this.productGateway.save(aProduct);

        const output = this.presentOutput(aProduct);

        return output;
    }

    private presentOutput(product: Product): CreateProductOutputDto {
        const output: CreateProductOutputDto = {
            id: product.id
        }

        return output;
    }
}