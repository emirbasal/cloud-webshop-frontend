import { Card } from './card'
import { Address } from './address'

export class Order {
    id: string
    amount: number
    currency: string
    email: string
    items: any[]
    status: string
    card: Card
    invoice: string
    address: Address
}
