import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template:`
    <h5>Search:</h5>
    <input type="text"
      class="form-control"
      placeholder="Search gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    >
  `
})
export class SearchBoxComponent {

  // HTML Reference
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  // inject service
  constructor( private gifsService :GifsService ){}

  searchTag() {
    // Elment string
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag( newTag );

    // clean finder
    this.tagInput.nativeElement.value = '';
  }
}
