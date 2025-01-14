import { productGateway } from "../../domain/product/gateway/product.gateway";
import { Product } from "../../domain/product/entity/product";
import { UseCase } from "../usecase";

export type ListProductInputDto = void;

export type ListProductOutputDto = {
    products: {
        id: string;
        name: string;
        price: number;
        quantity: number
    }[];
}

export class ListProductUseCase implements UseCase<ListProductInputDto, ListProductOutputDto> {
    private constructor (private readonly productGateway: productGateway) {}

    public static create (productGateway: productGateway) {
        return new ListProductUseCase(productGateway);
    }

    public async execute(): Promise<ListProductOutputDto> {
        const aProducts = await this.productGateway.list();

        const output = this.presentOutput(aProducts);

        return output;  
    }

    private presentOutput(products: Product[]): ListProductOutputDto {
        return {
            products: products.map((p) => {
                return {
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    quantity: p.quantity
                }
            })
        }
    }
}