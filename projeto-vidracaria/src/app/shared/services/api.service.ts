import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Produto } from '../../classes/produto.class';
//import { Usuario } from '../../classes/usuario.class';
//import { Observable, of } from 'rxjs';
//import { Pedido } from 'src/app/classes/Pedido.class';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  url = "http://localhost:3000";


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


  getProdutos(): Observable<Produto[]> { // retorna todos os produtos
    return this.http.get<Produto[]>(`${this.url}/products`);
  }

  postProdutos(body): Observable<any> { //cria um produto
    return this.http.post(`${this.url}/products`, body).pipe();
  }
  getProduto(id, token): Observable<any> { // retorna um produto especifico
    return this.http.get(`${this.url}/products/${id}`, token)
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
