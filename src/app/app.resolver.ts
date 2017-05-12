import { AuthBaseService, HospitalService, AuthGuardService, CommonModalService } from './services';

// an array of services to resolve routes with data
export const APP_RESOLVER_PROVIDERS = [
  AuthBaseService,
  HospitalService,
  AuthGuardService,

  CommonModalService
];
