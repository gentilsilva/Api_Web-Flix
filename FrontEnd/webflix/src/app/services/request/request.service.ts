import { Injectable } from '@angular/core';

type DataItem = {[key: string]: any}

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  filmes: DataItem[] = [
    {id: '1', titulo: "titulo_um", genero: "genero_um", lancamento: "12/05/2023", diretor: "diretor_um", estudio: "estudio_um"},
    {id: '2', titulo: "titulo_dois", genero: "genero_dois", lancamento: "12/05/2023", diretor: "diretor_dois", estudio: "estudio_dois"},
    {id: '3', titulo: "titulo_tres", genero: "genero_tres", lancamento: "12/05/2023", diretor: "diretor_tres", estudio: "estudio_tres"},
    {id: '4', titulo: "titulo_quatro", genero: "genero_quatro", lancamento: "12/05/2023", diretor: "diretor_quatro", estudio: "estudio_quatro"},
  ]
  users: DataItem[] = [
    {id: '1', nome: "Camily", email: "camily@email.com", senha: "123456"}
  ]

  constructor() { }

  getFilme(): DataItem[] {
    return this.filmes
  }

  setFilme(filme: DataItem) {
    this.filmes["push"](filme);
  }

  getUser(login: DataItem) {
    for(let i = 0; i < this.users.length; i++) {
      if(login['email'] === this.users[i]['email'] && login['senha'] === this.users[i]['senha']) {
        return this.users[i];
      }
    }
    return null;
  }
  
  setUser(users: DataItem){
    this.users["push"](users);
  }
}
