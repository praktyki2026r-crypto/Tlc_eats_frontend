export class In_Cart_Product{
    constructor(product_id, name, size, note, cost){
        this.id = 'id' + Math.random.toString(16).slice(2)
        this.product_id = product_id
        this.name = name
        this.size = size
        this.note = note
        this.cost = cost
    }
}