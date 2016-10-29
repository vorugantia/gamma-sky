/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CatViewComponent } from './cat-view.component';

describe('CatViewComponent', () => {
  let component: CatViewComponent;
  let fixture: ComponentFixture<CatViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
