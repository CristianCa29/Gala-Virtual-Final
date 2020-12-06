import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Gala3dComponent } from './gala3d.component';

describe('Gala3dComponent', () => {
  let component: Gala3dComponent;
  let fixture: ComponentFixture<Gala3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Gala3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Gala3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
