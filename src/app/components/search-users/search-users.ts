import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil } from 'rxjs';
import { GitHubUserWithRepos } from '../../interfaces/user.interface';
import { GithubService } from '../../services/github.service';

@Component({
    selector: 'app-user-search',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './search-users.html',
    styleUrls: ['./search-users.css']
})
export class SearchUsers implements OnInit, OnDestroy {
    searchControl = new FormControl("");
    user: GitHubUserWithRepos | null = null;
    loading = false;
    isDarkMode = false;
    error: string | null = null;
    private destroy$ = new Subject<void>();

    constructor(
        private githubService: GithubService,
        private snackBar: MatSnackBar,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) { }

    ngOnInit() {
        this.loadThemePreference();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onSearchSubmit() {
        this.error = null;
        const query = this.searchControl.value?.trim();
        if (query) this.searchUser(query);
    }

    searchUser(username: string) {
        this.loading = true;
        this.user = null;

        this.githubService
            .getUserWithRepositories(username)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (user) => {
                    this.user = user;
                    this.loading = false;
                    this.error = null;
                },
                error: (err) => {
                    this.loading = false;
                    this.user = null;
                    this.error = err.message;
                    this.snackBar.open(err.message, "Fechar", {
                        duration: 5000,
                        panelClass: ["error-snackbar"],
                    });
                },
            });
    }

    clearResults() {
        this.user = null;
        this.error = null;
        this.searchControl.setValue("");
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;

        if (isPlatformBrowser(this.platformId)) {
            document.body.classList.toggle("dark-theme", this.isDarkMode);
            localStorage.setItem("darkMode", this.isDarkMode.toString());
        }
    }

    private loadThemePreference() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const savedTheme = localStorage.getItem("darkMode");
        this.isDarkMode = savedTheme === "true";
        document.body.classList.toggle("dark-theme", this.isDarkMode);
    }

    openProfile(url: string) {
        window.open(url, "_blank");
    }

    openRepository(url: string) {
        window.open(url, "_blank");
    }

    formatDate(dateString: string): string {
        return new Date(dateString).toLocaleDateString("pt-BR");
    }

    getLanguageColor(language: string): string {
        const colors: { [key: string]: string } = {
            JavaScript: "#f1e05a",
            TypeScript: "#2b7489",
            Python: "#3572A5",
            Java: "#b07219",
            "C++": "#f34b7d",
            "C#": "#239120",
            PHP: "#4F5D95",
            Ruby: "#701516",
            Go: "#00ADD8",
            Rust: "#dea584",
            Swift: "#ffac45",
            Kotlin: "#F18E33",
            Dart: "#00B4AB",
            HTML: "#e34c26",
            CSS: "#1572B6",
            Vue: "#4FC08D",
            React: "#61DAFB",
        };
        return colors[language] || "#6c757d";
    }

    trackByRepoId(index: number, repo: any) {
        return repo.id;
    }

    getRelativeTime(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diff < 60) return `${diff} segundos atrás`;
        if (diff < 3600) return `${Math.floor(diff / 60)} minutos atrás`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} horas atrás`;
        return `${Math.floor(diff / 86400)} dias atrás`;
    }
}
