import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AframeGala3dComponent } from './aframe-gala3d.component';

describe('AframeGala3dComponent', () => {
  let component: AframeGala3dComponent;
  let fixture: ComponentFixture<AframeGala3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AframeGala3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AframeGala3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
