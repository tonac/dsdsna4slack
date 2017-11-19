import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TestConfig} from "./test.config";
//noinspection TypeScriptUnresolvedFunction
describe('AppComponent', () => {
  //noinspection TypeScriptUnresolvedFunction
  beforeEach(async(() => {
    TestBed.configureTestingModule(TestConfig.testModule).compileComponents();
  }));
  //noinspection TypeScriptUnresolvedFunction
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    //noinspection TypeScriptUnresolvedFunction
    expect(app).toBeTruthy();
  }));
  //noinspection TypeScriptUnresolvedFunction
  it(`should have as title 'SNA4Slack' and as image 'assets/img/shutterstock_110216492.jpg'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    //noinspection TypeScriptUnresolvedFunction
    expect(app.title).toEqual('SNA4Slack');
    expect(app.image).toEqual('assets/img/shutterstock_110216492.jpg');
  }));
});
