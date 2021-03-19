import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeatsPage } from './meats.page';

describe('MeatsPage', () => {
  let component: MeatsPage;
  let fixture: ComponentFixture<MeatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
