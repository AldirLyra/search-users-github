import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsers } from './search-users';

describe('SearchUsers', () => {
    let component: SearchUsers;
    let fixture: ComponentFixture<SearchUsers>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SearchUsers]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SearchUsers);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not throw when localStorage is unavailable', () => {
        const originalLocalStorage = window.localStorage;

        Object.defineProperty(window, 'localStorage', {
            configurable: true,
            value: undefined,
        });

        expect(() => component.ngOnInit()).not.toThrow();

        Object.defineProperty(window, 'localStorage', {
            configurable: true,
            value: originalLocalStorage,
        });
    });
});
