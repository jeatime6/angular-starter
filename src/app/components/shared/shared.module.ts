import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EnumKeyvaluePipe } from '../../pipes';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    EnumKeyvaluePipe
  ],
  declarations: [
    EnumKeyvaluePipe
  ]
})
export class SharedModule { }