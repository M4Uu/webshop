import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { HttpClientModule } from '@angular/common/http';
import { RegisterInfo } from '../../user.interface';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(RegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('Debe crear un usuario y devolverlo', (done: DoneFn) => {
    let inf : RegisterInfo = {
      user_name : "M4Uu",
      email_address : "cruzmlathulerie@gmail.com",
      first_name : "Cruz",
      last_name : "Lathulerie",
      pswd: "1234"
    }

    service.registerUser(inf).subscribe(value => {
      expect(value.email_address).toBe("cruzmlathulerie@gmail.com")
      done()
    })
  })
});
