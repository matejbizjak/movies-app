import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie, MovieCredits, MovieDto, MovieImages, MovieVideoDto} from "../models/movie";
import {of, switchMap} from "rxjs";
import {GenresDto} from "../models/genre";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = 'aea8e2613a7d5d3d8a9f13e680ed8cff';

  constructor(private http: HttpClient) {
  }

  getMovies(type: string = 'upcoming', count: number = 12) {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`)
      .pipe(switchMap(res => {
        return of(res.results.slice(0, count));
      }));
  }

  getMovie(id: string) {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  getMovieVideos(id: string) {
    return this.http.get<MovieVideoDto>(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
      .pipe(switchMap(res => {
        return of(res.results);
      }));
  }

  getMovieImages(id: string) {
    return this.http.get<MovieImages>(`${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`);
  }

  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`);
  }

  getMoviesGenres() {
    return this.http.get<GenresDto>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`)
      .pipe(switchMap(res => {
        return of(res.genres);
      }));
  }

  getMoviesByGenre(genreId: string, page: number) {
    return this.http.get<MovieDto>(`${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`)
      // .pipe(switchMap(res => {
      //   return of(res.results);
      // }))
      ;
  }

  searchMovies(page: number, searchValue?: string) {  // searchValue is optional parameter
    const uri = searchValue ? '/search/movie' : '/movie/popular';
    return this.http.get<MovieDto>(`${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`)
      // .pipe(switchMap(res => {
      //   return of(res.results);
      // }))
      ;
  }
}
