import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSigninComponent } from './restaurant-signin.component';

describe('RestaurantSigninComponent', () => {
  let component: RestaurantSigninComponent;
  let fixture: ComponentFixture<RestaurantSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantSigninComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
