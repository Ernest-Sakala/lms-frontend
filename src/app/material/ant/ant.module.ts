import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';


const AntComponents = [
  NzLayoutModule,
  NzBreadCrumbModule
]



@NgModule({

  imports: [AntComponents],
  exports: [AntComponents]
})
export class AntModule { }
