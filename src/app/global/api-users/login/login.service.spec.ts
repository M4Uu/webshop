import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import {  LoginInf } from '../../user.interface';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('Debe devolver los datos de usuario', (done: DoneFn) => {
    let inf : LoginInf = {
      email: "maria_antonia@gmail.com",
      password: "2233L"
    }

    service.LoginUser(inf).subscribe(value => {
      expect(value.user_name).toBe("mariaDB")
      done();
    })

  })
});
