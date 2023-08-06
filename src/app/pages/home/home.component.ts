import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/services/store.service';
import { Subscription } from 'rxjs';
const ROWS_HEIGHT: { [ id:number]:number }  = {
1:400, 3:335, 4:350
};
@Component({
  selector: 'app-home',
  templateUrl: `home.component.html`,
  styles: [
  ]
})
export class HomeComponent implements OnInit,  OnDestroy {


  constructor(private cartService: CartService,private storeService: StoreService )
  {

  }

  cols = 3
  rowHeight = ROWS_HEIGHT[this.cols]
  category:string | undefined

  products: Array<Product> | undefined;

  sort = 'desc';
  count = '12'

  productsSubscription:Subscription |undefined
  ngOnInit(): void {
    this.getProducts(); 
    
  }
  getProducts():void{

    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe((_products) => {
      this.products = _products;
    })
  }
  onColumnsCountChange(colsNum:any):void
{
   this.cols = colsNum;
   this.rowHeight = ROWS_HEIGHT[colsNum]

}
onShowCategory(category:string):void {

this.category = category;
this.getProducts();
}
onAddToCart(product:Product):void{

  this.cartService.addToCart({
    product:product.image,
    name:product.title,
    price: product.price,
    quantity:1,
    id:product.id
  })
}
ngOnDestroy(): void {
  if( this.productsSubscription)
  {
    this.productsSubscription.unsubscribe()
  }
 
}
onItemsCountChange(count:number):void
{
    this.count = count.toString();
    this.getProducts()

}
onSortChange(sort:string):void{
  this.sort = sort;
  this.getProducts()
}


}
