import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageKeyWordsComponent } from './manage-key-words.component';

describe('ManageKeyWordsComponent', () => {
  let component: ManageKeyWordsComponent;
  let fixture: ComponentFixture<ManageKeyWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageKeyWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageKeyWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
