import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authResponse : BehaviorSubject<AuthResponse | undefined> = new BehaviorSubject<AuthResponse | undefined>(undefined)

  get isLogged(): boolean {
    return !!this.authResponse.value
  }

  get currentUser() {
    return this.authResponse.value?.user
  }

  get token() {
    return this.authResponse.value?.accessToken
  }

  get isAdmin() {
    return this.currentUser?.admin
  }

  private readonly AUTH_KEY = "AUTH_RESPONSE"

  constructor(private readonly http: HttpClient) {
    const sessionResponse = sessionStorage.getItem(this.AUTH_KEY)
    if(sessionResponse)
      this.authResponse.next(JSON.parse(sessionResponse))


    this.authResponse.subscribe(response => {
      if(response) {
        sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(response))
      } else {
        sessionStorage.clear()
      }
    })
  }

  login(data: LoginData) {
    return this.http.post<AuthResponse>("/login", data)
      .pipe(tap(response => {
        this.authResponse.next(response)
      }))
  }

  logout() {
    this.authResponse.next(undefined)
  }

  register(data: User) {
    return this.http.post<AuthResponse>("/register", data)
  }
}

export interface LoginData {
  email: string
  password: string
}

export interface User extends LoginData {
  id: number
  username: string
  admin?: boolean
}

export interface AuthResponse {
  accessToken: string
  user: User
}
