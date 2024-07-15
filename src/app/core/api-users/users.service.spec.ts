import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginInf, RegisterInfo } from '../user.interface';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Login test
  xit('Debe devolver los datos de usuario', (done: DoneFn) => {
    let inf : LoginInf = {
      email: "maria_antonia@gmail.com",
      password: "2233L"
    }

    service.loginUser(inf).subscribe(value => {
      expect(value.user_name).toBe("mariaDB")
      done();
    })

  })

  // Register test
  it('Debe crear un usuario y devolverlo', (done: DoneFn) => {
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

  // upload test
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
