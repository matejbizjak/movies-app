import {Component, OnInit} from '@angular/core';
import {Movie} from "../../models/movie";
import {MoviesService} from "../../services/movies.service";
import {ActivatedRoute} from "@angular/router";
import {take} from "rxjs";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  totalMovies: number = 0;
  genreId: string | null = null;
  searchValue: string | null = null;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({genreId}) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    });
  }

  getPagedMovies(page: number, searchValue?: string) {
    this.moviesService.searchMovies(page, searchValue).subscribe(moviesDto => {
      this.movies = moviesDto.results;
      this.totalMovies = moviesDto.total_results;
    });
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe(moviesDto => {
      this.movies = moviesDto.results;
      this.totalMovies = moviesDto.total_results;
    });
  }

  paginate($event: any) {
    const pageNumber = $event.page + 1;
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchValue) {
        this.getPagedMovies(pageNumber, this.searchValue);
      } else {
        this.getPagedMovies(pageNumber);
      }
    }
  }

  searchChanged() {  // TODO če si na genres strani ti iskalnik ne upošteva več genres ampak samo search value
    if (this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }
}
