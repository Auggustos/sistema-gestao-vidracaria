export class Produto {
    id: string;
    name: string;
    description: string;
    quantity: number;
    image_url: string;
    created_at: string;
    updated_at: number;
    deleted_at: Date;
    constructor(id, name, description, quantity,image_url, created_at, updated_at,deleted_at) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
        this.image_url = image_url;
    }
}
