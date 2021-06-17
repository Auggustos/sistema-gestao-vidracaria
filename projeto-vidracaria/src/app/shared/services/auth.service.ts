import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';

@Injectable()
export class AuthService {

  private apiRoot = 'http://localhost:3000/';

  response;
  constructor(private http: HttpClient) { }

  private setSession(authResult) {
    this.response = authResult;
    const token = authResult.token;
    const payload = this.decode(token);
    const expiresAt = moment.unix(payload.exp);

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('usuario', authResult.user.nome);
    localStorage.setItem('usuario_id', authResult.user.id);
    localStorage.setItem('perfil', authResult.user.perfil);
    localStorage.setItem('userCelular', authResult.user.celular);
    localStorage.setItem('userEmail', authResult.user.email);
    localStorage.setItem('userEndereco', authResult.user.endereco);
    localStorage.setItem('userPagamentoCartao', authResult.user.pagamento_cartao);
    localStorage.setItem('userSobrenome', authResult.user.sobrenome);
    localStorage.setItem('carrinho', '');


  }

  private decode(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.log(`Nao foi possivel decodificar o token`)
    }
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  login(usuario: string, senha: string) {
    return this.http.post(
      this.apiRoot.concat('sessions'),
      { usuario, senha }
    ).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }

  signup(username: string, email: string, password1: string, password2: string) {
    // TODO: implement signup
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('carrinho');
  }

  refreshToken() {
    if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())) {
      return this.http.post(
        this.apiRoot.concat('refresh-token/'),
        { token: this.token }
      ).pipe(
        tap(response => this.setSession(response)),
        shareReplay(),
      ).subscribe();
    }
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getUser() {
    const retorno = localStorage.getItem('usuario');
    return retorno;
  }

  getUserId() {
    const retorno = localStorage.getItem('usuario_id');
    return retorno;
  }
  getPerfil() {
    const retorno = localStorage.getItem('perfil');
    return retorno;
  }

  getUserDados() {
    const retorno = localStorage.getItem('userDados');
    return retorno;
  }

  getUserCelular() {
    const retorno = localStorage.getItem('userCelular');
    return retorno;
  }
  getUserEmail() {
    const retorno = localStorage.getItem('userEmail');
    return retorno;
  }
  getUserEndereco() {
    const retorno = localStorage.getItem('userEndereco');
    return retorno;
  }
  getUserPagamentoCartao() {
    const retorno = localStorage.getItem('userPagamentoCartao');
    return retorno;
  }
  getUserSobrenome() {
    const retorno = localStorage.getItem('userSobrenome');
    return retorno;
  }
  setCarrinho(carrinho: string) {
    localStorage.setItem('carrinho', carrinho);
  }

  getCarrinho() {
    const retorno = localStorage.getItem('carrinho');
    return retorno;
  }

  limpaCarrinho() {
    localStorage.setItem('carrinho', '');
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      // this.authService.refreshToken();

      return true;
    } else {
      this.authService.logout();
      this.router.navigate(['login']);

      return false;
    }
  }
}

interface JWTPayload {
  user_id: number;
  username: string;
  email: string;
  exp: number;
}