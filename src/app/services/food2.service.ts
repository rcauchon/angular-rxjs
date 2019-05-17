export const FOOD_LIST = [
  'apple', 'banana', 'cherry', 'eggs'
]

import { Injectable } from '@angular/core';

// RXJS 6
import { Observable, from, pipe, of, throwError, merge, interval } from 'rxjs';
import { map, mergeAll, flatMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { retry, retryWhen, delay, scan, take } from 'rxjs/operators';
import { mergeAnalyzedFiles } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Food2Service {

  constructor(private http: HttpClient) { }

  /**
   * Merging Observables
   */
  getFruits(): Observable<any> {
    const fruits = ['apple', 'banana', 'cherry'];

    const fruit$ = interval(2000)
    .pipe(
      map( time => 'Fruit: ' + fruits[Math.floor(Math.random() * fruits.length)])
    );
    return fruit$;
  }

  getVeggies(): Observable<any> {
    const veggies = ['spinach', 'carrot', 'onion'];

    const fruit$ = interval(2500)
    .pipe(
      map( time => 'Vegetable: ' + veggies[Math.floor(Math.random() * veggies.length)])
    );
    return fruit$;
  }

  getMeats(): Observable<any> {
    const meats = ['chicken', 'duck', 'beef', 'pork'];

    const meat$ = interval(1500)
    .pipe(
      map( time => 'Meat: ' + meats[Math.floor(Math.random() * meats.length)])
    );
    return meat$;
  }

  getRandomFoods(): Observable<any> {
    const random$ = merge(this.getFruits(),
     this.getVeggies(),
     this.getMeats());
    return random$;
  }

  /**
   * Handling Nested Observalbes with Flatmap
   */
  getFoods_l(): Observable<any> {
    const foodUrls = [
      'http://localhost:3456/api/foods/1',
      'http://localhost:3456/api/foods/2',
      'http://localhost:3456/api/foods/3'
    ]
    return from(foodUrls).pipe(
      flatMap( (url: string) => this.http.get(url))
    );
  }

}
