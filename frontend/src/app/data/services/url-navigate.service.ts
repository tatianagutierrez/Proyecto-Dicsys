import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlNavigateService {
  constructor(private router: Router) {}

  navegarURL(url: string) {
    this.router.navigateByUrl(url)
  }

  navegarUrlDatos(url: string, params: any){
    this.router.navigateByUrl(url, params)
  }

}
