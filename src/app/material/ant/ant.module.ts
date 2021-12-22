import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalModule } from 'ng-zorro-antd/modal';

const AntComponents = [
  NzModalModule,
  NzLayoutModule,
  NzBreadCrumbModule
]



@NgModule({

  imports: [AntComponents],
  exports: [AntComponents]
})
export class AntModule { }
