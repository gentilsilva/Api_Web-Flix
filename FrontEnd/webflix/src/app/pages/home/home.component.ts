import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainLayoutComponent } from '../../layouts/main-layout/main-layout.component';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainLayoutComponent, CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy  {
  filmeAtual: number = 0;
  intervalo: any;

  filmes = [
    {imagem:"../../../assets/png/Acao.jpeg", titulo:"Indiana Jones", genero:"Ação"},
    {imagem:"../../../assets/png/Animacao.jpeg", titulo:"Toy Story", genero:"Animação"},
    {imagem:"../../../assets/png/Aventura.jpeg", titulo:"Jurassic Park", genero:"Aventura"},
    {imagem:"../../../assets/png/Terror.jpeg", titulo:"It a coisa", genero:"Terror"},
  ]

  trocaFundo() {
    const filme = this.filmes[this.filmeAtual]
    document.body.style.backgroundImage = `url(${filme.imagem})`
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center center';
  }

  proximo() {
    this.filmeAtual = (this.filmeAtual + 1) % this.filmes.length;
    this.trocaFundo();
  }

  anterior() {
    this.filmeAtual = (this.filmeAtual - 1 + this.filmes.length) % this.filmes.length;
    this.trocaFundo();
  }

  ngOnInit() {
    this.trocaFundo()

    this.intervalo = setInterval(() => {
      this.proximo();
    }, 5000)
  }

  ngOnDestroy(): void {
    if(this.intervalo) {
      clearInterval(this.intervalo);
    }

    document.body.style.backgroundImage = '';
    document.body.style.backgroundSize = '';
    document.body.style.backgroundRepeat = '';
    document.body.style.backgroundPosition = '';
  }
}

