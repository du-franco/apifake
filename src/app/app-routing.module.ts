import { CardsComponent } from './componentes/cards/cards.component';
import { LivroFormComponent } from './componentes/livro-form/livro-form.component';
import { ListaComponent } from './componentes/lista/lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'lista', component:ListaComponent},
  {path:'add', component:LivroFormComponent},
  {path:'cards', component:CardsComponent},
  {path:'edit/:id', component:LivroFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
