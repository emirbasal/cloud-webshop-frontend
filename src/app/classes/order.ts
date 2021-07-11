import { Product } from './product'
import { Card } from './card'

export class Order {
    // id: string
    amount: number
    currency: string
    email: string
    items: any[]
    status: string
    card: Card
}
