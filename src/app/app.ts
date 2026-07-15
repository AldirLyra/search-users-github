import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SearchUsers } from './components/search-users/search-users';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, FormsModule, MatToolbarModule, MatIconModule, MatSlideToggleModule, SearchUsers],
    templateUrl: './app.html',
    styleUrls: ['./app.css']
})
export class App {
    title = 'GitHub User Search';
    isDarkTheme = false;

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        document.body.classList.toggle('dark-theme', this.isDarkTheme);
        localStorage.setItem('darkMode', this.isDarkTheme.toString());
    }
}
