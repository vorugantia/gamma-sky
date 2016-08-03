/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { CatSearchComponent } from './cat-search.component';

describe('Component: CatSearch', () => {
  it('should create an instance', () => {
    let component = new CatSearchComponent();
    expect(component).toBeTruthy();
  });
});
