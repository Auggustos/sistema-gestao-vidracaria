import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Usuario } from '../../classes/usuario.class';
import { Observable, of } from 'rxjs';
import { Pessoa } from 'src/app/classes/pessoa.class';
import { Produto } from 'src/app/classes/produto.class';
//import { Pedido } from 'src/app/classes/Pedido.class';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  url = environment.API_URL;

  getProduto(id): Observable<any> {// retorna um produto específico
    return this.http.get<Produto>(`${this.url}/products/${id}`)
      .pipe();
  }
  getProdutos(): Observable<any> { // retorna todos os produtos
    return this.http.get<Produto[]>(`${this.url}/products`)
      .pipe();
  }

  postProdutos(body): Observable<any> { //cria um produto
    return this.http.post(`${this.url}/products`, body).pipe();
  }

  putProdutos(body, token): Observable<any> { //atualiza um produto
    return this.http.put(`${this.url}/products`, body, token).pipe();
  }

  deletaProduto(id): Observable<{}> { // deleta um produto
    return this.http.delete(`${this.url}/products/${id}`)
      .pipe();
  }

  getPessoa(id): Observable<any> { //retorna uma pessoa específica
    return this.http.get<any>(`${this.url}/customers/${id}`)
      .pipe();
  }
  getPessoas(): Observable<any> { // retorna todas as pessoas
    return this.http.get<any[]>(`${this.url}/customers`)
      .pipe();
  }

  postPessoa(body): Observable<any> { //cria uma pessoa

    return this.http.post(`${this.url}/customers`, body).pipe();
  }

  putPessoa(body, token): Observable<any> { //cria uma pessoa

    return this.http.put(`${this.url}/customers`, body, token).pipe();
  }

  deletaPessoa(id): Observable<{}> { // deleta uma pessoa
    return this.http.delete(`${this.url}/customers/${id}`)
      .pipe();
  }

  getVenda(id, token): Observable<any> { //retorna uma pessoa específica
    return this.http.get<any>(`${this.url}/sales/${id}`, token)
      .pipe();
  }
  getVendas(token): Observable<any> { // retorna todas as pessoas
    return this.http.get<any[]>(`${this.url}/sales`, token)
      .pipe();
  }

  postVenda(body, token): Observable<any> { //cria uma pessoa

    return this.http.post(`${this.url}/sales`, body, token).pipe();
  }

  putVenda(body, token): Observable<any> { //cria uma pessoa

    return this.http.put(`${this.url}/sales`, body, token).pipe();
  }

  deletaVenda(id, token): Observable<{}> { // deleta uma pessoa
    return this.http.delete(`${this.url}/sales/${id}`, token)
      .pipe();
  }

  getServico(id, token): Observable<any> { //retorna uma pessoa específica
    return this.http.get<any>(`${this.url}/services/${id}`, token)
      .pipe();
  }
  getServicos(token): Observable<any> { // retorna todas as pessoas
    return this.http.get<any[]>(`${this.url}/services`, token)
      .pipe();
  }

  postServico(body, token): Observable<any> { //cria uma pessoa

    return this.http.post(`${this.url}/services`, body, token).pipe();
  }

  putServico(body, token): Observable<any> { //cria uma pessoa

    return this.http.put(`${this.url}/services`, body, token).pipe();
  }

  deletaServico(id, token): Observable<{}> { // deleta uma pessoa
    return this.http.delete(`${this.url}/services/${id}`, token)
      .pipe();
  }
}
