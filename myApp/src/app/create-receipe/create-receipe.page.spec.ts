import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateReceipePage } from './create-receipe.page';

describe('CreateReceipePage', () => {
  let component: CreateReceipePage;
  let fixture: ComponentFixture<CreateReceipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateReceipePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateReceipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
