import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full text-center space-y-8">
        <div>
          <h1 class="text-9xl font-extrabold text-blue-600 tracking-widest animate-bounce">404</h1>
          <div class="bg-blue-600 px-2 text-sm rounded rotate-12 absolute transform -translate-y-12 translate-x-20 text-white font-medium">
            Page Not Found
          </div>
          <h2 class="mt-6 text-3xl font-bold text-gray-900">Oops! You seem lost.</h2>
          <p class="mt-2 text-sm text-gray-600">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        <div class="mt-10">
          <a routerLink="/" 
             class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105">
            <svg class="mr-2 -ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
    }
  `]
})
export class NotFound { }
