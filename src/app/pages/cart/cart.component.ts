import { Component, OnInit } from '@angular/core';
import {Cart, CartItem} from'src/app/models/cart.model'
import { CartService } from 'src/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit{

  constructor(private cartService:CartService)
{

}
cart:Cart ={
  items:[ ]
}

dataSource:Array<CartItem> = []
displayedColumns :Array<string> = [
  'product', 
  'name',
  'price',
  'quantity',
  'total',
  'action'
]

getTotal(items:Array<CartItem> ):number
{
    return items.map((item)=> item.price * item.quantity).reduce((prev, current)=> prev + current, 0)
}
  ngOnInit(): void { 
    this.cartService.cart.subscribe((_cart:Cart) => {
      this.cart = _cart
      this.dataSource = this.cart.items
})
  }


  onClearCart()
  {
    this.cartService.clearCart();

  }
  onRemoveFromCart(element:CartItem): void{
             this.cartService.removeFromCart(element)
  }
  onAddQuantity(element:CartItem):void
  {
   this.cartService.addToCart(element)
  }
 onRemoveQuantity(element:CartItem):void {
  this.cartService.removeQuantity(element)

 }
  

}
