import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() title: string = "";
  @Input() lancamento: string = "";
  @Input() vote_average: string = "";
  @Input() poster_path: string = "";

}
