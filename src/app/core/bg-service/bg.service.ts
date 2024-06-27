import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BgService {
  private backgroundSubject = new BehaviorSubject<string>('');
  background$ = this.backgroundSubject.asObservable();

  setBackground(backgroundImage: string) {
    this.backgroundSubject.next(backgroundImage);
  }
}


