import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammerDetail } from './programmer-detail';

describe('ProgrammerDetail', () => {
  let component: ProgrammerDetail;
  let fixture: ComponentFixture<ProgrammerDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammerDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgrammerDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
