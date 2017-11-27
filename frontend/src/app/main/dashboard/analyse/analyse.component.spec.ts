/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnalyseComponent } from './analyse.component';

describe('AnalyseComponent', () => {
  let component: AnalyseComponent;
  let fixture: ComponentFixture<AnalyseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
