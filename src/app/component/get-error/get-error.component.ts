import { Component } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-get-error',
  templateUrl: './get-error.component.html',
  styleUrls: ['./get-error.component.css']
})
export class GetErrorComponent {

  constructor(public errorService: ErrorService) {
  }

}

// компонент, что отвечает за визуальное оповещение об ошибки get
