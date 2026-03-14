import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Data } from '../../services/data';
import { houseClass } from '../../class/houseClass';

@Component({
  selector: 'app-information',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './information.html',
  styleUrl: './information.css',
})
export class Information implements OnInit {
  homeForm!: FormGroup;
  houses: houseClass[] = [];
  isEditMode = false;

  constructor(private dataService: Data) {}

  ngOnInit() {
    this.initForm()
    this.loadData()
  }

  initForm() {
    this.homeForm = new FormGroup({
      houseId: new FormControl('', Validators.required),
      ownerFirstName: new FormControl('', Validators.required),
      ownerLastName: new FormControl('', Validators.required),
      ownerTel: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9,10}$')]),
      ownerEmail: new FormControl('', [Validators.required, Validators.email])
    });
  }

  loadData() {
    this.dataService.getAll().subscribe(res => this.houses = res)
  }

  // เมื่อกดเลือกจากตาราง
  selectToEdit(item: houseClass) {
    this.isEditMode = true
    this.homeForm.patchValue(item)
    window.scrollTo(0, 0)
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.homeForm.get(fieldName)
    return !!(control && control.invalid && (control.dirty || control.touched))
  }

  onSubmit() {
    if (this.homeForm.valid) {
      const payload: houseClass = this.homeForm.value
      this.dataService.add(payload).subscribe(() => {
        alert('ดำเนินการสำเร็จ')
        this.homeForm.reset()
        this.isEditMode = false
        this.loadData()
      })
    } else {
      this.homeForm.markAllAsTouched()
    }
  }
}
