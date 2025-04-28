import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { userFeature} from '@store/app.state';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from '@store/effects/user.effect';
import { userReducer } from '@store/reducers/user.reducer';
import { metaReducers } from '@store/app.state';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore({user: userReducer}, {metaReducers}),
    provideState(userFeature),
    provideEffects(UserEffects),
    provideAnimations(),
]
};
