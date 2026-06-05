import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammerCard } from './programmer-card';

describe('ProgrammerCard', () => {
  let component: ProgrammerCard;
  let fixture: ComponentFixture<ProgrammerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammerCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgrammerCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
