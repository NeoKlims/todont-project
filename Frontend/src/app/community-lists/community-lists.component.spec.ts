import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityListsComponent } from './community-lists.component';

describe('CommunityListsComponent', () => {
  let component: CommunityListsComponent;
  let fixture: ComponentFixture<CommunityListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
