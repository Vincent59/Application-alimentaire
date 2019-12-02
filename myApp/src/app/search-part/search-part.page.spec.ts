import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchPartPage } from './search-part.page';

describe('SearchPartPage', () => {
  let component: SearchPartPage;
  let fixture: ComponentFixture<SearchPartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
