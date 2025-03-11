import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  login(data: LoginData) {
    return this.http.post<AuthResponse>("/login", data)
  }

  logout() {

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
