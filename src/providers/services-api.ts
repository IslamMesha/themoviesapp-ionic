import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

@Injectable()
export class ServiceApiProvider {

  constructor(
    private http: Http
  ) {
    console.log('Hello ServiceApiProvider Provider');
  }

  public static getApiOptions(): object {
    return {
      API_ROOT: "https://api.themoviedb.org/3/movie/",
      API_KEY: "d8dae1093d4889e05aae991ff19bd91f",
      IMG_ROOT: "https://image.tmdb.org/t/p/w500/",
      LANGUAGE: "en-US",
      PAGE: 1,
      REGION: ""
    }
  }

  public getMovies(sortBy: string = "top_rated", page: number = 1, region: string = ""): Array<object> {

    const headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
    const API_OPIONS = ServiceApiProvider.getApiOptions();

    var url: string = API_OPIONS['API_ROOT'] + sortBy + "?api_key=" + API_OPIONS['API_KEY'] + "&language="
      + API_OPIONS['LANGUAGE'] + "&page=" + page + "&region=" + region;

    var movies: Array<object> = [];

    this.http.get(url, { headers: headers }).toPromise()
      .then((response) => {

        response.json().results.forEach(movie => {
          movies.push(movie);
        });

      })
      .catch((error) => {
        console.log(error.json());
      });
    console.log("Page number: ", page + " Movies are: ", movies);

    return movies;
  }

}
