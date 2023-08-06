import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {Product} from 'src/app/models/product.model';
@Component({
  selector: 'app-product-box',
  templateUrl:`product-box.component.html`,
  styles: [
  ]
})
export class ProductBoxComponent {
@Input() fullWidthMode = false;
@Input() product : Product | undefined 
@Output()  addToCart = new EventEmitter()




OnInit():void {

}

onAddToCart():void
{
    this.addToCart.emit(this.product)
}
}
