import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTopicFormComponent } from './project-topic-form.component';

describe('ProjectTopicFormComponent', () => {
  let component: ProjectTopicFormComponent;
  let fixture: ComponentFixture<ProjectTopicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTopicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTopicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
