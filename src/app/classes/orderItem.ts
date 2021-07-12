// NOTE:  This class is reduntant. But it is mandatory due to the payment api
//        to list all items with their amounts in an order
export class OrderItem {
  amount: number
  currency: string
  description: string
  quantity: number
  id: string
  image: string
}
