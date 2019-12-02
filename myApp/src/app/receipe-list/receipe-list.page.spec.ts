import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReceipeListPage } from './receipe-list.page';

describe('ReceipeListPage', () => {
  let component: ReceipeListPage;
  let fixture: ComponentFixture<ReceipeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceipeListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReceipeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
