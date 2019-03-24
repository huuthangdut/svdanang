import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTopicFormComponent } from './event-topic-form.component';

describe('EventTopicFormComponent', () => {
  let component: EventTopicFormComponent;
  let fixture: ComponentFixture<EventTopicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTopicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
