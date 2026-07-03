import { Component, input } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';

import { PageHeader } from '@interfaces/page-header.interface';


@Component({
  selector: 'shared-page-header',
  imports: [MatIconModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css',
})
export class Header {

  public pageHeader = input.required<PageHeader>({}); 

}
