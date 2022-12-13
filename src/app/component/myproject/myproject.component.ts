import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { exhaustMap, fromEvent, shareReplay, tap } from 'rxjs';
import { AddService } from '../../add.service';

@Component({
  selector: 'app-myproject',
  templateUrl: './myproject.component.html',
  styleUrls: ['./myproject.component.scss']
})
export class MyprojectComponent implements OnInit, AfterViewInit {
  constructor(private addService: AddService) {
  }

  isItemsInServer = '';
  projectData$!: any;
  editFormId: any


  ngOnInit(): void {
    this.generateData()

  }

  gettingFromAddComponent(data: any) {
    if (data) {
      this.generateData()
      this.isItemsInServer = ''
    }
  }
  generateData() {
    this.addService.getAddedData().pipe(shareReplay()).subscribe((x) => {
      this.projectData$ = x
      console.log(this.projectData$.length)
      if (this.projectData$.length === 0) {
        this.isItemsInServer = 'No Task Found'
      }

    })
  }

  deleteData(id: any) {
    console.log('delete clicked')
    if (confirm("Are you sure want to delete this")) {
      this.addService.delete(id).subscribe((x) => {
        this.generateData()
      })
    }
  }

  postMethod(data: any, id: any) {
    this.addService.edit(data, id).subscribe((x) => {
      this.generateData()
    })
  }

  editForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    timeSpent: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  })

  editBtn(data: any) {
    // console.log(data)
    this.editFormId = data.id
    this.editForm.controls['title'].setValue(data.title)
    this.editForm.controls['description'].setValue(data.description)
    this.editForm.controls['timeSpent'].setValue(data.timeSpent)
    this.editForm.controls['date'].setValue(data.date)
  }


  @ViewChild('editSubmit') editSubmit!: ElementRef
  ngAfterViewInit(): void {
    fromEvent(this.editSubmit.nativeElement, 'click').pipe(
      exhaustMap((x: any) => this.submitEditForm(this.editForm.value)),
      tap((x) => console.log(x))
    ).subscribe((x) => {
      // console.log(x)
      this.generateData()
      this.editForm.reset()
      let cancel = document.getElementById('cancel')
      cancel?.click()
    })
  }
  submitEditForm(data: any) {
    // console.log(data)
    console.log('edit submitted')
    return this.addService.edit(data, this.editFormId)
  }
}
