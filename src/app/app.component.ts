import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodService } from './services/food.service';
import { LotoService } from './services/loto.service';
import { Message } from './model/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('myModal') myModal;

  title = 'angular-rxjs';

  msg = new Message('', '', '', '');

  foods = [];
  foodsVowel = [];

  foodsjson = [];

  foodsE = [];

  foodsR = [];

  foodsRW = [];


  constructor(private foodService: FoodService, private lotoService: LotoService) { }

  ngOnInit(): void {
    console.log('call OnInit');
    this.demo_getFoods();
    this.demo_getVowelFoods();
    this.demo_getFoods_promise();
  //  this.demo_getFoods_e();
    this.demo_getFoods_r();
    this.demo_getFoods_rw();
    this.demo_listenForWinningTicket();
  }

  demo_listenForWinningTicket() {
    this.lotoService.ticketCheckAgent()
    .subscribe(
      next => {
        console.log('received emitted value: ' + next);
        this.msg.desc = 'received emitted value: ' + JSON.stringify(next);
        this.msg.name = 'Info';
        this.msg.status = 'info';
      },
      error => {
        console.log('received an error' + error);
        this.msg.desc = 'Error receiving foods';
        this.msg.name = 'Danger';
        this.msg.status = 'danger';
      },
      () => {
        console.log('received stream complete');
        this.msg.desc = 'Stream complete';
        this.msg.name = 'Success';
        this.msg.status = 'success';
      }
    );
  }
  demo_getFoods() {
    this.foodService.getFoods()
      .subscribe(food => {
        console.log('Value  received: ' + food);
        this.foods.push(food);
      }
      );
  }

  demo_getVowelFoods() {
    this.foodService.getVowelFoods()
      .subscribe(food => {
        console.log('Vowel Value received: ' + food);
        this.foodsVowel.push(food);
      }
      );
  }

  demo_getFoods_promise() {
    this.foodService.getFoods_p()
      .then(foods => {
        console.log(foods);
        this.foodsjson = foods;
      })
      .catch(err => console.log('Error getting foods:' + err));
  }

  demo_getFoods_e() {
    this.foodService.getFoods_e()
      .subscribe(
        next => {
          console.log('received emitted value: ' + next);
          this.msg.desc = 'received emitted value';
          this.msg.name = 'Info';
          this.msg.status = 'info';
          this.foodsE.push(next);
        },
        error => {
          console.log('received an error' + error);
          this.msg.desc = 'Error receiving foods';
          this.msg.name = 'Danger';
          this.msg.status = 'danger';
        },
        () => {
          console.log('received stream complete');
          this.msg.desc = 'Stream complete';
          this.msg.name = 'Success';
          this.msg.status = 'success';
        }
      );
  }

  demo_getFoods_r() {
    this.foodService.getFoods_r()
    .subscribe(
        next => { 
          console.log('received emitted value:' + next);
          this.msg.desc = 'received emitted value';
          this.msg.name = 'Info';
          this.msg.status = 'info';
          if (!this.foodsR.includes(next)){
            this.foodsR.push(next);
          }
        },
        error => {
          console.log('Got an error: ' + error);
          this.msg.desc = 'Got error receiving foods';
          this.msg.name = 'Danger';
          this.msg.status = 'danger';
        },
        () => {
          console.log('received stream complete');
          this.msg.desc = 'Stream complete';
          this.msg.name = 'Success';
          this.msg.status = 'success';
        }
    );
  }

  demo_getFoods_rw() {
    this.foodService.getFoods_rw()
    .subscribe(
        next => {
          console.log('received emitted value:' + next);
          this.msg.desc = 'received emitted value';
          this.msg.name = 'Info';
          this.msg.status = 'info';
          if (!this.foodsRW.includes(next)){
            this.foodsRW.push(next);
          }
        },
        error => {
          console.log('Got an error: ' + error);
          this.msg.desc = 'Got error receiving foods';
          this.msg.name = 'Danger';
          this.msg.status = 'danger';
        },
        () => {
          console.log('received stream complete');
          this.msg.desc = 'Stream complete';
          this.msg.name = 'Success';
          this.msg.status = 'success';
        }
    );
  }
}
