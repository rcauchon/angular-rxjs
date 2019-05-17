import { Injectable } from '@angular/core';
import { Observable, fromEvent, pipe, of  } from 'rxjs';
import { map, pluck, bufferCount, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LotoService {

  constructor() { }

  /**
   * Buffering Observables
   */
  ticketCheckAgent(): Observable<any> {
    const winningTicket = 'ALA';

    const keypress$ =  fromEvent(document, 'keypress');

    return keypress$.pipe(
      pluck('key'),
      tap( key => console.log('key: ' + key)),
      bufferCount(3),
      map( (ticketChars: string[]) => {
        const ticket = ticketChars.join('');
        console.log('ticket: ' + ticket);
        return ticket;
      }),
      map( (ticket: string) => {
        if (ticket.toUpperCase() === winningTicket) {
          return { winner: true, ticket }
        } else {
          return {winner: false, ticket }
        }

      })
    )
  }
}
