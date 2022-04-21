import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-conformation',
  templateUrl: './delete-conformation.component.html',
  styleUrls: ['./delete-conformation.component.css']
})
export class DeleteConformationComponent implements OnInit {

  @Input() item:string|undefined
  @Output() onCacel= new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
  Cancel()
  {
    this.onCacel.emit()

  }

}
