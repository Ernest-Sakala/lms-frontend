import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconModule } from '@ant-design/icons-angular';

const AntComponents = [

  NzModalModule,
  NzLayoutModule,
  NzBreadCrumbModule,
  NzSelectModule,
  NzIconModule,
  IconModule
]




@NgModule({

  imports: [AntComponents],
  exports: [AntComponents]
})
export class AntModule { }
