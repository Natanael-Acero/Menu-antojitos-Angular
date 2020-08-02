import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarPlatilloComponent } from './insertar-platillo.component';

describe('InsertarPlatilloComponent', () => {
  let component: InsertarPlatilloComponent;
  let fixture: ComponentFixture<InsertarPlatilloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarPlatilloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarPlatilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
