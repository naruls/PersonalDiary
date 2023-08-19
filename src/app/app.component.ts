import { Component} from '@angular/core';
import { PopupService } from './services/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Персональный дневник';

  constructor(
    public popupService: PopupService
    ) {
  }
}

// app компонент с единственным подключенным сервисом, что отвечает за отображение popup
