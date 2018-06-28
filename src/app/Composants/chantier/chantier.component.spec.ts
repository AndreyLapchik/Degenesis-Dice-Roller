/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChantierComponent } from './chantier.component';

describe('ChantierComponent', () => {
  let component: ChantierComponent;
  let fixture: ComponentFixture<ChantierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChantierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChantierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
