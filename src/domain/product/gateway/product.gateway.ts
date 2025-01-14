//Descreve como deve ser os métodos da camada de contrato - Interfaces

import { Product } from "../entity/product";

export interface productGateway {
    save(product: Product): Promise<void>; //Salvar no BD
    list(): Promise<Product[]>; //Retornar todos os produtos
}