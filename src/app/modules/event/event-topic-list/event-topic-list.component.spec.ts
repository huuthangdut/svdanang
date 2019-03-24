import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTopicListComponent } from './event-topic-list.component';

describe('EventTopicListComponent', () => {
  let component: EventTopicListComponent;
  let fixture: ComponentFixture<EventTopicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTopicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
