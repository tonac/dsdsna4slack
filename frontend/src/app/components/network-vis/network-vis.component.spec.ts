import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkVisComponent } from './network-vis.component';

describe('NetworkVisComponent', () => {
  let component: NetworkVisComponent;
  let fixture: ComponentFixture<NetworkVisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkVisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
