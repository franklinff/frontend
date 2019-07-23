import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTodoComponent } from './status-todo.component';

describe('StatusTodoComponent', () => {
  let component: StatusTodoComponent;
  let fixture: ComponentFixture<StatusTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
