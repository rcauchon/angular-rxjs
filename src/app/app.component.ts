import { Component , ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('myModal') myModal;

  title = 'angular-rxjs';

  openModal() {
    console.log('click on openModal');
    this.myModal.nativeElement.className = 'modal fade show';
  }

  closeModal() {
    console.log('click on closeModal');
    this.myModal.nativeElement.className = 'modal hide';
  }
}
