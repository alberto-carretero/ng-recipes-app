import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RicesPage } from './rices.page';

describe('RicesPage', () => {
  let component: RicesPage;
  let fixture: ComponentFixture<RicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
