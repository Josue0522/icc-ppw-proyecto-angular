import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammerList } from './programmer-list';

describe('ProgrammerList', () => {
  let component: ProgrammerList;
  let fixture: ComponentFixture<ProgrammerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammerList],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgrammerList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
