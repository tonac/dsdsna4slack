import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
//noinspection TypeScriptUnresolvedFunction
describe('AppComponent', () => {
  //noinspection TypeScriptUnresolvedFunction
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  //noinspection TypeScriptUnresolvedFunction
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    //noinspection TypeScriptUnresolvedFunction
    expect(app).toBeTruthy();
  }));
  //noinspection TypeScriptUnresolvedFunction
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    //noinspection TypeScriptUnresolvedFunction
    expect(app.title).toEqual('app');
  }));
  //noinspection TypeScriptUnresolvedFunction
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    //noinspection TypeScriptUnresolvedFunction
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
