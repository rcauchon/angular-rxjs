export const FOOD_LIST = [
  'apple', 'banana', 'cherry', 'eggs'
]

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS 6
import { Observable, from, pipe, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { retry, retryWhen, delay, scan, take } from 'rxjs/operators';

import { passOnlyStartsWithVowel } from '../operators/custom-operators';
import { JsonPipe } from '@angular/common';

import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient ) { }

  /*
   * Creating Observables in RxJS 6 using Pipeable Operators
   */
  getFoods(): Observable<string> {
    console.log(FOOD_LIST);
    return from(FOOD_LIST).pipe(
      map( food => food.toUpperCase())
    );
  }

  /**
   * Creating Custom Operators
   */
  getVowelFoods(): Observable<string>{
    return from(FOOD_LIST)
    .pipe(
      passOnlyStartsWithVowel(),
      map(food => food.toUpperCase())
    );
  }

  /**
   * Converting Objservables to Promises
   */
  getFoods_p(): Promise<any> {
    const myObs: Observable<any> = this.http.get('http://localhost:3456/api/foods')
    return myObs.toPromise();
  }

  /**
   * Handling Errors on the Observable Side
   */
  getFoods_e(): Observable<any> {

    return Observable.create( observer => {
      let index = 0;

      setInterval( () => {
        const nextFood = FOOD_LIST[index];
        if (nextFood) {
          observer.next(nextFood);
          index++;
        } else {
          observer.error(new Error('Array access error'));
        }
      }, 1000);
    }).pipe(
      catchError( err => {
      console.log('There is some error with the observable');
      return throwError('ERROR');
      })
    );
  }

  /**
   * Resubscribing to Observables Automatically
   */
  getFoods_r(): Observable<any> {
    const foods = ['apple', 'cherry', 'shoe', 'eggs'];
    return Observable.create ( observer => {
      for (let f of foods) {
        if (f === 'shoe') {
          observer.error('Thats not a valid food');
        }
        observer.next(f);
      }
      observer.complete();

    }).pipe(
      retry(3)
    );
  }

  /**
   * Resubscribing to Observables Based on Custom Logic
   */
  getFoods_rw(): Observable<any> {
    const foods = ['apple', 'cherry', 'shoe', 'eggs'];
    return Observable.create ( observer => {
      for (let f of foods) {
        if (f === 'shoe') {
          throw new Error('Thats not a valid food');
        } else {
          observer.next(f);
        }
      }
      observer.complete();

    }).pipe(
      retryWhen( (errors: Observable<any>) => {
        console.log('WRITE TO LOG SYSTEM: error detected. retrying in 3 seconds');
        return errors.pipe(
          delay(3000),
          take(3)
        )
      })
    );
  }
}
