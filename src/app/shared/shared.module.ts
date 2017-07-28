import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdAutocompleteModule, MdInputModule, MdDialogModule } from '@angular/material';

import { SwitchButtonComponent } from '../widgets/switch/switch-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SwitchButtonComponent],
  exports: [
    SwitchButtonComponent,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdAutocompleteModule,
    MdInputModule,
    MdDialogModule
  ]
})
export class SharedModule {
}
