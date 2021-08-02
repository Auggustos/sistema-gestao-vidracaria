export class Vendas {
    created_at: string;
    updated_at: number;
    deleted_at: Date;
    customer: {
        id: string, name: string, phone: string, address: string, type: number,
        created_at: string
        deleted_at: Date
        updated_at: string
    }
    customer_id: string
    id: string
    itens: string
    paid: number
    payment_type: number
    value: number
    constructor(id, itens, paid, payment_type, value, customer_id, customer, created_at, updated_at, deleted_at) {
        this.created_at = created_at,
            this.updated_at = updated_at,
            this.customer_id = customer_id,
            this.deleted_at = deleted_at,
            this.customer = customer,
            this.id = id,
            this.itens = itens,
            this.paid = paid,
            this.payment_type = payment_type,
            this.value = value

    }
}