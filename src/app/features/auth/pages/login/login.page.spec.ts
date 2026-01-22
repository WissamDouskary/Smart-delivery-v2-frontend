// @vitest-environment jsdom
import 'zone.js';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { Login } from './login.page';
import { AuthService } from '../../../../core/services/auth.service';
import { provideRouter, Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { login } from '../../../../core/state/auth/auth.actions';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

try {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
} catch (e) { }

describe('Login Page', () => {
    let component: Login;
    let authServiceMock: any;
    let store: MockStore;
    let router: Router;

    beforeEach(async () => {
        TestBed.resetTestingModule();

        authServiceMock = {
            isLoggedIn: vi.fn().mockReturnValue(false)
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                provideMockStore(),
                provideRouter([])
            ]
        });

        store = TestBed.inject(MockStore);
        router = TestBed.inject(Router);

        vi.spyOn(store, 'dispatch');
        vi.spyOn(router, 'navigate');

        TestBed.runInInjectionContext(() => {
            component = new Login();
        });
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should redirect to home if already logged in', () => {
        authServiceMock.isLoggedIn.mockReturnValue(true);
        component.ngOnInit();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should dispatch login action with credentials', () => {
        const testEmail = 'test@example.com';
        const testPassword = 'password123';

        component.email = testEmail;
        component.password = testPassword;

        component.login();

        expect(store.dispatch).toHaveBeenCalledWith(login({
            credentials: { email: testEmail, password: testPassword }
        }));
    });
});
