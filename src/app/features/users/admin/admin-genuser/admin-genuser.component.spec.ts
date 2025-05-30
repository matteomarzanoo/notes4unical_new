import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenuserComponent } from './admin-genuser.component';

describe('AdminGenuserComponent', () => {
  let component: AdminGenuserComponent;
  let fixture: ComponentFixture<AdminGenuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGenuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGenuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
