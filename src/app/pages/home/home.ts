import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Data } from '../../services/data';
import { houseClass } from '../../class/houseClass';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private dataService: Data) {}

  homeForm!: FormGroup

  ngOnInit() {
    this.homeForm = new FormGroup({
      houseId: new FormControl('', Validators.required),
      ownerFirstName: new FormControl('', Validators.required),
      ownerLastName: new FormControl('', Validators.required),
      ownerTel: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9,10}$')]),
      ownerEmail: new FormControl('', [Validators.required, Validators.email])
    })
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.homeForm.get(fieldName)
    return !!(field && field.invalid && (field.dirty || field.touched))
  }

  onSubmit() {
    if (this.homeForm.valid) {
      // 2. ดึงค่าจากฟอร์มมาเก็บในตัวแปรตาม Type houseClass
      const payload: houseClass = this.homeForm.value

      // 3. เรียกใช้งานฟังก์ชัน add จาก Service
      this.dataService.add(payload).subscribe({
        next: (response) => {
          console.log('บันทึกสำเร็จ!', response)
          alert('บันทึกข้อมูลเรียบร้อยแล้ว')
          this.homeForm.reset()
        },
        error: (err) => {
          console.error('เกิดข้อผิดพลาด:', err)
          alert('ไม่สามารถบันทึกข้อมูลได้')
        }
      })
    } else {
      this.homeForm.markAllAsTouched()
    }
  }
}
