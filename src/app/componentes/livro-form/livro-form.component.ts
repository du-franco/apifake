import { LivroService } from 'src/app/servicos/livro.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.css']
})
export class LivroFormComponent implements OnInit {

  form!:FormGroup

  verificarStatus:boolean = true

  isModal:boolean = false
  idLivroParaCadastrar!:any

  //true - significa que estamos utilizando o form para cadastro. Aparecer botão cadastrar
  //false - significa que estamos utilizando o form para edição. Aparecer botão alterar

  livro:any

  constructor(private fb:FormBuilder, private service:LivroService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      id:[null],
      nome: [null],
      autor: [null],
      foto: [null]
    })

    const id_entrada = <any>this.route.snapshot.params['id']
    console.log("id de entrada: " + id_entrada)
    this.service.listarUmLivro(id_entrada).subscribe({
      next: (resultado) => {
        console.log(resultado)
        this.livro = resultado
        this.updateForm(this.livro)
        this.verificarStatus = false
      },
      error: (erro) => console.error(erro),
      complete: () => console.info('Livro encontrado')
    })

  }


  salvarLivro(){
    console.log(this.form.value)
    if(this.form.value.id){
      //nós vamos editar
      this.service.editLivro(this.form.value.id,this.form.value)
.subscribe({
  next: (resultado) => console.log("Livro editado com sucesso"),
  error: (erro) => console.error(erro),
  complete: () => {console.info("Edição completada com êxito")
  this.router.navigate(['/lista'])}
  })
    }else{
      //nós vamos cadastrar
      this.service.addLivro(this.form.value).subscribe({
        next: (resultado) => console.log("Livro adicionado com sucesso"),
        error: (erro) => console.error(erro),
        complete: () => {console.info("Cadastro efetuado com sucesso")
      this.router.navigate(['/lista'])}
      })
    }

}
//  editar(){
//    this.service.editLivro(this.livro.id, this.livro).subscribe({
//      next: (resultado) => console.log("Livro editado com sucesso"),
//      error: (erro) => console.error(erro),
//      complete: () => {
//        console.info("Edição completada com sucesso")
//        this.router.navigate(['/lista'])
//      }
//    })
//  }

 updateForm(livro:any){
   this.form.patchValue({
     id:livro.id,
     nome:livro.nome,
     autor:livro.autor
   })
 }

 mostrarModalCadastrar(){
  this.isModal = true
}

// confirmarAcao(){
//   this.service.addLivro(this.idLivroParaCadastrar).subscribe({
//     next:(res) => {console.log("Livro cadastrado com sucesso")
//                    this.salvarLivro()},
//     error: (erro) => console.log(erro),
//     complete: () => {console.info ("Processo de cadastro completado")
//      this.isModal=false}
//   })
// }

cancelarAcao(){
  this.isModal=false
}



}
