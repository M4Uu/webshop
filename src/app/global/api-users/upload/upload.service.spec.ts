import { TestBed } from '@angular/core/testing';

import { UploadService } from './upload.service';
import { HttpClientModule } from '@angular/common/http';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(UploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('Debe cambiar los datos del usuario', (done: DoneFn) => {
    const changedUser = {
      "user_id" : "c997742a-4190-11ef-9f45-7440bb5683fe",
      "user_name" : "M4Uu",
      "email_address" : "cruzmlathulerie@gmail.com",
      "first_name" : "Cruz",
      "last_name" : "Lathulerie",
      "pswd": "1234",
      "created_ad": ""
    }

    service.uploadUser(changedUser).subscribe(value => {
      expect(value.user_id).toBe("c997742a-4190-11ef-9f45-7440bb5683fe")
      done()
    })
  })
});
