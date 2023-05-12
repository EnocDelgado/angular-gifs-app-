import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  // Alternative text in Alt
  @Input()
  public alt: string = '';

  // Shwitch between loading or image
  public hasLoaded: boolean = false;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if ( !this.url ) throw new Error( 'URL property is required' );
  }

  onLoad() {
    setTimeout( () => {
      this.hasLoaded = true;
    }, 500)
  }
}
