import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GitHubRepository, GitHubSearchResponse, GitHubUser, GitHubUserWithRepos } from '../interfaces/user.interface';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GithubService {
    private readonly API_URL = "https://api.github.com"

    constructor(private http: HttpClient) { }

    searchUsers(query: string, page = 1, perPage = 30): Observable<GitHubSearchResponse> {
        const params = new HttpParams().set("q", query).set("page", page.toString()).set("per_page", perPage.toString())

        return this.http.get<GitHubSearchResponse>(`${this.API_URL}/search/users`, { params }).pipe(
            catchError((error) => {
                console.error("GitHub API Error:", error)
                return throwError(() => new Error("Erro ao buscar usuários. Tente novamente."))
            }),
        )
    }

    getUserDetails(username: string): Observable<GitHubUser> {
        return this.http.get<GitHubUser>(`${this.API_URL}/users/${username}`).pipe(
            catchError((error) => {
                console.error("GitHub User Details Error:", error)
                return throwError(() => new Error("Erro ao carregar detalhes do usuário."))
            }),
        )
    }

    getUserRepositories(username: string): Observable<GitHubRepository[]> {
        const params = new HttpParams().set("sort", "updated").set("per_page", "10").set("type", "owner")

        return this.http.get<GitHubRepository[]>(`${this.API_URL}/users/${username}/repos`, { params }).pipe(
            catchError((error) => {
                console.error("GitHub Repositories Error:", error)
                return throwError(() => new Error("Erro ao carregar repositórios do usuário."))
            }),
        )
    }

    getUserWithRepositories(username: string): Observable<GitHubUserWithRepos> {
        return this.getUserDetails(username).pipe(
            switchMap((user) =>
                this.getUserRepositories(username).pipe(
                    map((repositories) => ({ ...user, repositories })),
                    catchError(() => of({ ...user, repositories: [] })),
                ),
            ),
        )
    }
}
