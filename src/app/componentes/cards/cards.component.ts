import { Component, OnInit } from '@angular/core';
import { LivroService } from 'src/app/servicos/livro.service';
import { Livro } from 'src/app/Livro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  isModal:boolean = false
  idLivroParaExcluir!:any

  livros!: Livro[]

  constructor(private service:LivroService, private router:Router) {
    this.livros = []
  }

  ngOnInit(): void {
    this.listarLivros()

  }

  listarLivros(){
    this.service.listar().subscribe(resultado => {
      console.log(resultado)
      this.livros = resultado
    })
  }

  confirmarAcao(){
    this.service.deletarLivro(this.idLivroParaExcluir).subscribe({
      next:(res) => {console.log("Livro excluido")
                     this.listarLivros()},
      error: (erro) => console.log(erro),
      complete: () => {console.info ("Processo de exclusão completado")
       this.isModal=false}
    })
  }

  editar(id:any){
    this.router.navigate(['/edit/' + id])
  }

  mostrarModal(id:any){
    this.isModal = true
    this.idLivroParaExcluir = id
  }

  cancelarAcao(){
    this.isModal=false
  }

}
