import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Usuario } from '../../classes/usuario.class';
import { Observable, of } from 'rxjs';
import { Produto } from 'src/app/classes/produto.class';
//import { Pedido } from 'src/app/classes/Pedido.class';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:3000";

  getProduto(id): Observable<any>{// retorna um produto específico
    return this.http.get<Produto>(`${this.url}/products/${id}`)
    .pipe();
  }
  getProdutos(): Observable<any> { // retorna todos os produtos
    return this.http.get<Produto[]>(`${this.url}/products`)
    .pipe();
  }

  postProdutos(body): Observable<any> { //cria um produto
    console.log(body)
    return this.http.post(`${this.url}/products`, body).pipe();
  }

  deletaProduto(id): Observable<{}> { // deleta um produto
    return this.http.delete(`${this.url}/products/${id}`)
      .pipe();
  }

  getPessoa(id): Observable<any>{ //retorna uma pessoa específica
    return this.http.get<Produto>(`${this.url}/customers/${id}`)
    .pipe();
  }
  getPessoas(): Observable<any> { // retorna todas as pessoas
    return this.http.get<Produto[]>(`${this.url}/customers`)
    .pipe();
  }

  postPessoa(body): Observable<any> { //cria uma pessoa
    console.log(body)
    return this.http.post(`${this.url}/customers`, body).pipe();
  }

  deletaPessoa(id): Observable<{}> { // deleta uma pessoa
    return this.http.delete(`${this.url}/customers/${id}`)
      .pipe();
  }

/*
 postUsuario(body): Observable<any> { // cria um usuário
    return this.http.post(`${this.url}/users`, body)
      .pipe();
  }
  getUsuario(id): Observable<any> { // retora um usuário especifico
    return this.http.get<Usuario>(`${this.url}/profile`, id);
  }
  atualizaUsuario(body, token): Observable<any> { // atualiza um usuário
    return this.http.put(`${this.url}/profile`, body, token)
      .pipe();
  }


  atualizaProduto(body, token): Observable<any> { // atualiza um produto especifico
    return this.http.put(`${this.url}/products`, body, token)
      .pipe();
  }
  deletaProduto(id, token): Observable<{}> { // deleta um produto
    return this.http.delete(`${this.url}/products/${id}`, token)
      .pipe();
  }

  getPedidos(token):Observable<any>{
    return this.http.get<Pedido[]>(`${this.url}/order`,token);
  }

  postPedido(body,token):Observable<any>{
    return this.http.post(`${this.url}/order`,body,token);
  }

  getVendas(token): Observable<any> { // retorna todos os produtos
    return this.http.get(`${this.url}/sales`,token);
  }

  mudaStatus(body,token):Observable<any>{
    return this.http.put(`${this.url}/sales`,body,token);
  }

 */
}
