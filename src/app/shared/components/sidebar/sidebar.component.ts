import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  //privete gifService
  constructor( private gifsService: GifsService ) {}

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  // open gifs from history
  searchTag( tag: string ): void {
    this.gifsService.searchTag( tag );
  }


}