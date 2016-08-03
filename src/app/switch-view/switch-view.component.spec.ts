/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject, TestComponentBuilder, beforeEach, beforeEachProviders } from '@angular/core/testing';
import { SwitchViewComponent } from './switch-view.component';

// describe('Component: SwitchView', () => {
//   it('should create an instance', () => {
//     let component = new SwitchViewComponent();  // <--- build fail
//     expect(component).toBeTruthy();
//   });
// });

describe('Component: SwitchView', () => {
  it('should create an instance', () => {
    let component;

    // beforeEachProviders(() => [
    //   TestComponentBuilder,
    //   SwitchViewComponent
    // ]);

    beforeEach(inject([TestComponentBuilder], SwitchViewComponent => {
      component = new SwitchViewComponent();
    }));

    expect(component).toBeTruthy();

  });
});
