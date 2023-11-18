import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaneldermatologoComponent } from './paneldermatologo.component';

describe('PaneldermatologoComponent', () => {
  let component: PaneldermatologoComponent;
  let fixture: ComponentFixture<PaneldermatologoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaneldermatologoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaneldermatologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
