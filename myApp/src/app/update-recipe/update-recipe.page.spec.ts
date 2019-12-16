import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateRecipePage } from './update-recipe.page';

describe('UpdateRecipePage', () => {
  let component: UpdateRecipePage;
  let fixture: ComponentFixture<UpdateRecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRecipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
