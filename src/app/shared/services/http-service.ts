import { Injectable } from "@angular/core";
import { Response, Http, Headers, ResponseContentType } from "@angular/http";
import { Router } from "@angular/router";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Rx";
import { NotificationService } from "./notification-service";

// const API_HOST = "http://13.232.62.50:3030";
const API_HOST = "http://localhost:3030";
@Injectable()
export class HttpService {
  service: any = {};
  authHttp: any = {};
  authenticatedAPI: boolean = true; //checks for authenticated http request (authHttp) or non-authenticated http request (http)

  constructor(
    protected http: Http,
    protected notificationService: NotificationService,
    private router: Router
  ) {}

  buildUrl(parameters): string {
    let qs = "";
    for (const key of Object.keys(parameters)) {
      const value = parameters[key];
      qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
    if (qs.length > 0) {
      qs = qs.substring(0, qs.length - 1); //chop off last "&"
    }
    return qs;
  }

  get(url: string, elementID: any, headers: any = null): Observable<any> {
    // console.log("Inside http service", url, elementID, headers);
    return this.http
      .get(`${API_HOST}/${url}/` + elementID)
      .map((response: Response) => {
        return response.json();
      });
  }

  getAll(url: string, params: any, noGrid: boolean = false): Observable<any> {
    let query = "";
    // console.log("params in http service", JSON.parse(JSON.stringify(params)));
    query = this.buildUrl(params);

    console.log("query--->", query);
    return this.http
      .get(`${API_HOST}/${url}/?` + query)
      .map((response: Response) => {
        return response.json();
      })
      .catch(err => {
        // console.log(err);
        // console.log(err.json());
        return this.handleErrorResponse(err);
      });
  }

  store(url: string, element: any, timeOut: boolean = false): Observable<any> {
    // console.log("http store : element -->", element);
    let header = {};
    if (url.includes("download")) {
      header = { responseType: ResponseContentType.Blob };
    }
    return this.http
      .post(`${API_HOST}/${url}/`, element, header)
      .map((response: Response) => {
        if (url.includes("download")) {
          return response["_body"];
        }
        return response.json();
      })
      .catch(err => {
        // console.log("Inside http store error", JSON.parse(JSON.stringify(err)));
        return this.handleErrorResponse(err);
      });
  }

  update(url: string, elementID: string, newElement: any): Observable<any> {
    return this.http
      .put(`${API_HOST}/${url}/` + elementID, newElement)
      .map((response: Response) => {
        return response.json();
      })
      .catch(err => {
        return this.handleErrorResponse(err);
      });
  }

  destroy(url: string, elementID: any): Observable<any> {
    return this.http
      .delete(`${API_HOST}/${url}/` + elementID)
      .map((response: Response) => {
        return response.json();
      })
      .catch(err => {
        // console.log("Err ye aya hai backend se", err);
        return this.handleErrorResponse(err);
      });
  }

  patch(url: string, elementID: string, updatedElement: any): Observable<any> {
    return this.http.patch(`${API_HOST}/${url}/` + elementID, updatedElement);
  }

  handleErrorResponse(error: any): Observable<any> {
    console.log("error inside universal error handler", error);
    let errorMessage = "";
    let errorName = "";
    try {
      const errorObject = error.json();
      if (
        JSON.parse(JSON.stringify(error)).hasOwnProperty("type") &&
        !JSON.parse(JSON.stringify(error))["ok"] &&
        JSON.parse(JSON.stringify(error))["status"] === 0
      ) {
        this.notificationService.error("Something went wrong", "Error");
      } else {
        this.notificationService.error(
          errorMessage ? errorMessage : errorObject.message,
          errorName ? errorName : errorObject.name
        );
      }
      return Observable.throw(errorObject);
    } catch (err) {
      console.log("err in catch", err);
      this.notificationService.error("General error", "Error");
      return Observable.throw({});
    }
  }
}
