export class Pessoa {
    id: string;
    name: string;
    phone: string;
    address: string;
    type: number;
    constructor(id, name, phone, address, type) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.type = type;
    }
}