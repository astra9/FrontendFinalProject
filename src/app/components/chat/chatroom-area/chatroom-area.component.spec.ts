import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomAreaComponent } from './chatroom-area.component';

describe('ChatroomAreaComponent', () => {
  let component: ChatroomAreaComponent;
  let fixture: ComponentFixture<ChatroomAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
