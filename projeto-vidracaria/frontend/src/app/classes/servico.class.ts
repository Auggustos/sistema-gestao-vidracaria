export class Servico {
    created_at: Date;
    customer: {
        id: string, name: string, phone: string, address: string, type: number,
        created_at: string
        deleted_at: Date
        updated_at: string
    };
    customer_id: number;
    date: Date;
    deleted_at: Date;
    id: string;
    place: string;
    status: number;
    type: number;
    updated_at: Date;
    value: number;

    constructor(created_at, customer, customer_id, date, deleted_at, id, place, status, type, updated_at, value) {
        this.id = id;
        this.created_at = created_at;
        this.status = status;
        this.customer = customer;
        this.customer_id = customer_id;
        this.date = date;
        this.deleted_at = deleted_at;
        this.place = place;
        this.type = type;
        this.updated_at = updated_at;
        this.value = value;
    }
}