import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { authInterceptor } from "./interceptors/auth.interceptor";
import { loadingInterceptor } from "./interceptors/loading.interceptor";

export const CORE_PROVIDERS = [
  AuthService,
  provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor]))
];