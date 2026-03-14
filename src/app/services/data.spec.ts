import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { Data } from './data';
import { houseClass } from '../class/houseClass';

describe('DataService (Integration Test with HttpClient)', () => {
  let service: Data
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Data]
    })
    service = TestBed.inject(Data)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify() // ตรวจสอบว่าไม่มี Request ค้างอยู่
  })

  // Test 1: ทดสอบการดึงข้อมูลทั้งหมด (getAll)
  it('should fetch all houses (GET)', () => {
    const mockHouses: houseClass[] = [
      { houseId: 1, ownerFirstName: 'John', ownerLastName: 'Doe', ownerTel: '0812345678', ownerEmail: 'john@test.com' }
    ]

    service.getAll().subscribe(houses => {
      expect(houses.length).toBe(1)
      expect(houses).toEqual(mockHouses)
    })

    const req = httpMock.expectOne('http://localhost:3000/house')
    expect(req.request.method).toBe('GET')
    req.flush(mockHouses) // ส่งข้อมูลจำลองกลับไป
  })

  // Test 2: ทดสอบการเพิ่มข้อมูลใหม่ (add)
  it('should send a POST request to create a house', () => {
    const newHouse: houseClass = {
      houseId: 2, ownerFirstName: 'Jane', ownerLastName: 'Smith', ownerTel: '0899999999', ownerEmail: 'jane@test.com' 
    }

    service.add(newHouse).subscribe(response => {
      expect(response.status).toBe(201) // ตรวจสอบ Status Code ที่คาดหวัง
    })

    const req = httpMock.expectOne('http://localhost:3000/house/create');
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual(newHouse) // เช็คว่าส่ง Body ไปถูกต้องไหม
    req.flush({}, { status: 201, statusText: 'Created' })
  })

  // Test 3: ทดสอบการลบข้อมูล (delete)
  it('should send a DELETE request with correct ID', () => {
    const idToDelete = '1'

    service.delete(idToDelete).subscribe(response => {
      expect(response).toBeTruthy()
    })

    const req = httpMock.expectOne(`http://localhost:3000/house/${idToDelete}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Deleted successfully' })
  })
})