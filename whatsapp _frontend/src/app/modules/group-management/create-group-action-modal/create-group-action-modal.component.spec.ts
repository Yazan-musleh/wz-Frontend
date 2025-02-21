import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupActionModalComponent } from './create-group-action-modal.component';

describe('CreateGroupActionModalComponent', () => {
  let component: CreateGroupActionModalComponent;
  let fixture: ComponentFixture<CreateGroupActionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGroupActionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGroupActionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
