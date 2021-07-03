import { Usuario } from './usuario.class';

export class Produto {
    id: string;
    name: string;
    description: string;
    quantity: number;
    imageUrl: string;
    created_at: string;
    updated_at: number;
    deleted_at: Date;
    constructor(id, name, description, quantity, imageUrl, created_at, updated_at,deleted_at) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at
    }
}
