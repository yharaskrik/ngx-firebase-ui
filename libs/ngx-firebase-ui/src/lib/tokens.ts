import { inject, InjectionToken } from '@angular/core';
import type { auth } from 'firebaseui';

export const AUTH_CONFIG = new InjectionToken<auth.Config>(
  'firebaseUIAuthConfig'
);

export const AUTH_FEATURE_CONFIG = new InjectionToken<auth.Config>(
  'firebaseUIAuthConfigFeature'
);

export function injectConfig(): auth.Config {
  const config = inject(AUTH_CONFIG);
  const featureConfig = inject(AUTH_FEATURE_CONFIG);

  return {
    ...config,
    ...featureConfig,
  };
}
