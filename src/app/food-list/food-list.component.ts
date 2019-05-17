import { Component, OnInit } from '@angular/core';
import { Food2Service } from '../services/food2.service';


@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {

  fruits = [];
  foodList = [];
  constructor(private food2Service: Food2Service) { }

  ngOnInit() {
    this.demo_getFruits();
    this.demo_getFoods_links();
  }

  demo_getFruits(){
   this.food2Service.getRandomFoods()
   .subscribe(fruit => {
      console.log('Fruit: ' + fruit);
      this.fruits.push(fruit);
   });
  }

  demo_getFoods_links(){
    this.food2Service.getFoods_l()
    .subscribe(
      next => { console.log(next);
                this.foodList.push(next[0])
              }
    );
  }
}
