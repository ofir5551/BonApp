import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControladminComponent } from './controladmin.component';

describe('ControladminComponent', () => {
  let component: ControladminComponent;
  let fixture: ComponentFixture<ControladminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControladminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControladminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
