import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResposne } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 's80JgtLNQqyn6muSB6XqusLcSz5jOEgZ';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    // Invoking first time when our service is called
    this.loadLocalStorage();
   }

  get tagsHistory() {
    return [ ...this._tagsHistory ];
  }

  private organizeHistory( tag: string ) {

    tag = tag.toLowerCase();

    // verify if exist a tag
    if ( this._tagsHistory.includes( tag ) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    // put at the beginning of the history
    this._tagsHistory.unshift( tag );

    // limit searches
    this._tagsHistory = this._tagsHistory.splice(0, 9);

    // Invoking localstorage
    this.saveLocalStorage();
  }

  // LocalStorage
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ) );
  }

  // Load local storage
  private loadLocalStorage(): void {
    if ( !localStorage.getItem('history' ) ) return;

    this._tagsHistory = JSON.parse( localStorage.getItem( 'history')! );

    // When load our page, load last gifs on our list
    if ( this._tagsHistory.length === 0 ) return;
    this.searchTag( this._tagsHistory[0] );

  }

  // Add a search
  searchTag( tag: string ):void {

    // verify if thare more than one tag
    if ( tag.length === 0 ) return;

    // Add tag to sidebar
    this.organizeHistory( tag );

    // Http parameters
    const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', '10')
      .set('q', tag)

    // Http request
    this.http.get<SearchResposne>(`${ this.serviceUrl }/search`, { params } )
      .subscribe( resp => {
        this.gifList = resp.data ;
      })

  }
}
