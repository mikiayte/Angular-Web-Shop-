import { Component , OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import { StoreService } from 'src/services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filters',
  templateUrl: `filters.component.html`,
  styles: [
  ]
})

export class FiltersComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    if(this.categoriesSubscription)
    {
      this.categoriesSubscription.unsubscribe()
    }
  }

  constructor(private storeService: StoreService)
  {

  }
  categoriesSubscription: Subscription | undefined;
  categories : Array<string> | undefined

@Output() showCategory = new EventEmitter<string>();
ngOnInit(): void {
  this.categoriesSubscription = this.storeService.getAllCategories().subscribe((response) => {

    this.categories = response;
  });


}

  onShowCategory(category:string):void
  {
  this.showCategory.emit(category);
  } 
}
