import {Component} from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(
    public popupService: PopupService
  ) {}

}
