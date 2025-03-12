import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let http: HttpClient
  let httpSpy: jasmine.SpyObj<HttpClient>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HttpClient', ['get','delete'])

    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        {provide: ActivatedRoute, useClass: ActivatedRouteMock},
        {provide: HttpClient, useValue: spy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpClient)
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call http get', () => {
    const prodObs = of([])
    httpSpy.get.and.returnValue(prodObs)
    httpSpy.delete.and.returnValue(of())

    component.delete(1)

    expect(httpSpy.get.calls.count()).toBe(1)
    expect(httpSpy.get.calls.first().returnValue).toBe(prodObs)
  })
});

class ActivatedRouteMock {
  data = of({
    produits: []
  })
}
