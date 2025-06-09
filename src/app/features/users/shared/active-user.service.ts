import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './users';

const USER_KEY = 'activeUser';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserService {

  private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  user$ = this.userSubject.asObservable();

  constructor() { }

  setUser(user: User) {
    this.userSubject.next(user);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  clearUser() {
    this.userSubject.next(null);
    sessionStorage.removeItem(USER_KEY);
  }

  private getUserFromStorage(): User | null {
    const userJson = sessionStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }
}
