import { Injectable } from '@angular/core';
import { HTTPService } from './http.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  private API_URL: string;
  constructor(private server: HTTPService) {
    this.API_URL = environment.login;
  }

  public login() {
    return this.server.post( this.API_URL, undefined ).pipe(map((token: any) => {
      this.setAccessToken(token.access_token);
    }));
  }

  public setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  public getAccessToken(): string {
    return localStorage.getItem('accessToken');
  }
}
