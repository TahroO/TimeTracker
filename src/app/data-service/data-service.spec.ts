import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataService } from './data-service';

describe('DataServiceComponent', () => {
  let component: DataService;
  let fixture: ComponentFixture<DataService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
