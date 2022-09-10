import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MoviesService} from "../../services/movies.service";
import {Movie, MovieCredits, MovieImages, MovieVideo} from "../../models/movie";
import {IMAGES_SIZES} from "../../constants/images-sizes";
import {first} from "rxjs";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  imagesSizes = IMAGES_SIZES;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({id}) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
    })
  }

  getMovie(id: string) {
    this.moviesService.getMovie(id).subscribe(movie => {
      this.movie = movie;
    })
  }

  getMovieVideos(id: string) {
    this.moviesService.getMovieVideos(id).subscribe(movieVideos => {
      this.movieVideos = movieVideos;
    })
  }

  getMovieImages(id: string) {
    this.moviesService.getMovieImages(id).subscribe(movieImages => {
      this.movieImages = movieImages;
    })
  }

  getMovieCredits(id: string) {
    this.moviesService.getMovieCredits(id).subscribe(movieCredits => {
      this.movieCredits = movieCredits;
    })
  }
}
