import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './users';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserService {

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() { }

  setUser(user: User) {
    this.userSubject.next(user);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }
}
