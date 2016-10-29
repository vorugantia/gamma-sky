import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SwitchViewComponent } from '../views/switch-view/switch-view.component';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ SwitchViewComponent ],
  exports:      [ SwitchViewComponent, CommonModule, FormsModule ]
})
export class SharedModule { }
