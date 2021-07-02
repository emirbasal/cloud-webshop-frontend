import { Product } from './product'

export class Order {
    id: string
    amount: number
    items: Product[]
    currency: string
    email: string
    status: any
    cardNumber: number
}