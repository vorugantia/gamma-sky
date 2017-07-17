/* tslint:disable:no-unused-variable */

 import { TestBed, async, inject } from '@angular/core/testing';
 import { HttpModule, Http } from '@angular/http';
 import { MockBackend } from '@angular/http/testing';
 import { CatalogService } from './catalog.service';

 describe('Service: Catalog', () => {
   beforeEach(() => {
     TestBed.configureTestingModule({
       imports: [HttpModule],
       providers: [
         CatalogService,
         {provide: Http, deps: [MockBackend]}
       ]
     });
   });

   it('should ...', inject([CatalogService], (service: CatalogService) => {
     expect(service).toBeTruthy();
   }));
 });
