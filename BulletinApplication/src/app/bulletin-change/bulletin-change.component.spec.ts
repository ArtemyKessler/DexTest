import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinChangeComponent } from './bulletin-change.component';

describe('BulletinChangeComponent', () => {
  let component: BulletinChangeComponent;
  let fixture: ComponentFixture<BulletinChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
