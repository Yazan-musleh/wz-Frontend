import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieveMessagesComponent } from './recieve-messages.component';

describe('RecieveMessagesComponent', () => {
  let component: RecieveMessagesComponent;
  let fixture: ComponentFixture<RecieveMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecieveMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecieveMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
