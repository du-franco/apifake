import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from 'src/app/Livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API = "http://localhost:3000/Livros"

  constructor(private http:HttpClient) { }

  listar():Observable<any>{
    return this.http.get<any>(this.API)
  }


 listarUmLivro(id:any):Observable<any>{
   return this.http.get<any>(this.API + '/' + id)
 }

 addLivro(livro: Livro): Observable<any>{
   return this.http.post(this.API, livro)
 }

 deletarLivro(id:any):Observable<any>{
   return this.http.delete(this.API + '/' + id)
 }

 editLivro(id:any, livro:Livro){
   return this.http.put(this.API + '/' + id, livro)
 }


}
