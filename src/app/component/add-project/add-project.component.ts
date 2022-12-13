import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromEvent, exhaustMap } from 'rxjs';
import { AddService } from '../../add.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements AfterViewInit, OnInit {
  constructor(private addService: AddService, private toastr: ToastrService) {

  }
  ngOnInit(): void {

  }

  @Output() data = new EventEmitter();

  @ViewChild('btn') btn!: ElementRef

  ngAfterViewInit(): void {
    fromEvent(this.btn.nativeElement, 'click').pipe(
      exhaustMap(() => this.addFormSubmit())
    ).subscribe((x) => {
      console.log(x)
      this.toastr.success('Information added Successfully');
      this.addForm.reset()
      let cancel = document.getElementById('close')
      console.log('Added')
      this.data.emit('Information added from Add Project')
      cancel?.click()
    })

  }

  addForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    timeSpent: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  })

  addFormSubmit() {
    console.log('hi')
    let form = {
      title: this.addForm.value.title,
      description: this.addForm.value.description,
      timeSpent: this.addForm.value.timeSpent,
      date: this.addForm.value.date
    }
    return this.addService.postAddData(form)
  }
}
