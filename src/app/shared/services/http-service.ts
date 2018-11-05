import { Injectable } from "@angular/core";
import { Response, Http, Headers, ResponseContentType } from "@angular/http";
import { Router } from "@angular/router";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Rx";
// @DuplicateRequestsFilter()
//TODO Use authenticated http service instead of normal http

const API_HOST = "http://13.232.62.50:3030";
@Injectable()
export class HttpService {
  service: any = {};
  authHttp: any = {};
  authenticatedAPI: boolean = true; //checks for authenticated http request (authHttp) or non-authenticated http request (http)

  constructor(protected http: Http, private router: Router) {}

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
    console.log("Inside http service", url, elementID, headers);
    return this.http
      .get(`${API_HOST}/${url}/` + elementID)
      .map((response: Response) => {
        return response.json();
      });
  }

  getAll(url: string, params: any, noGrid: boolean = false): Observable<any> {
    let query = "";
    console.log("params in http service", JSON.parse(JSON.stringify(params)));
    query = this.buildUrl(params);

    console.log("query--->", query);
    return this.http
      .get(`${API_HOST}/${url}/?` + query)
      .map((response: Response) => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
        // console.log(err.json());
        return this.handleErrorResponse(err);
        // return Observable.throw(err.json());
      });
  }

  store(url: string, element: any, timeOut: boolean = false): Observable<any> {
    console.log("http store : element -->", element);
    let header = {};
    if (url.includes("download")) {
      header = { responseType: ResponseContentType.Blob };
    }
    return this.http
      .post(`${API_HOST}/${url}/`, element, header)
      .map((response: Response) => {
        console.log("response", response);
        if (url.includes("download")) {
          return response["_body"];
        }
        return response.json();
      })
      .catch(err => {
        console.log("Inside http store error", JSON.parse(JSON.stringify(err)));
        return this.handleErrorResponse(err);
        // return Observable.throw(err.json());
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
        // return Observable.throw(err.json());
      });
  }

  destroy(url: string, elementID: any): Observable<any> {
    return this.http
      .delete(`${API_HOST}/${url}/` + elementID)
      .map((response: Response) => {
        return response.json();
      })
      .catch(err => {
        console.log("Erre ye aya hai backend se", err);
        return this.handleErrorResponse(err);
        // return Observable.throw(err.json());
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
      console.log("ye hai error", error);
      const errorObject = error.json();
      console.log("ye hai error object", errorObject);
      if (errorObject.type && errorObject.type === "error") {
        if (errorObject.code === 504 || errorObject.code === "504") {
          errorMessage = "Request Timeout";
          errorName = "Error";
        } else {
          //   errorMessage = MESSAGES["ConnectionError"].message;
          //   errorName = MESSAGES["ConnectionError"].name;
        }
        this.router.navigate(["dashboard/home"]);
      } else {
        if (errorObject && errorObject.code === 409) {
          if (
            errorObject.hasOwnProperty("errors") &&
            errorObject.errors.hasOwnProperty("xMainLaneNum")
          ) {
            errorMessage = errorObject.errors.xMainLaneNum;
            errorName = "Conflict";
          } else if (
            errorObject.hasOwnProperty("errors") &&
            errorObject.errors.hasOwnProperty("xShortCode")
          ) {
            errorMessage = errorObject.errors.xShortCode;
            errorName = "Conflict";
          } else if (
            errorObject.hasOwnProperty("errors") &&
            errorObject.errors.hasOwnProperty("xStructNum")
          ) {
            // errorMessage= errorObject.errors.xStructNum;
            // errorName = 'Conflict';
            return Observable.throw(errorObject);
          } else if (
            errorObject.hasOwnProperty("errors") &&
            errorObject.errors.hasOwnProperty("xStoreNum")
          ) {
            // errorMessage= errorObject.errors.xStructNum;
            // errorName = 'Conflict';
            return Observable.throw(errorObject);
          } else if (
            errorObject.hasOwnProperty("errors") &&
            errorObject.errors.hasOwnProperty("xPCtrNum")
          ) {
            // errorMessage= errorObject.errors.xStructNum;
            // errorName = 'Conflict';
            return Observable.throw(errorObject);
          } else if (
            errorObject.hasOwnProperty("errors") &&
            errorObject.errors.hasOwnProperty("xMerAcctNum")
          ) {
            // errorMessage= errorObject.errors.xStructNum;
            // errorName = 'Conflict';
            return Observable.throw(errorObject);
          } else if (
            errorObject.hasOwnProperty("errors") &&
            errorObject.errors.hasOwnProperty("xTerminalNum")
          ) {
            // errorMessage= errorObject.errors.xStructNum;
            // errorName = 'Conflict';
            return Observable.throw(errorObject);
          } else if (
            errorObject.hasOwnProperty("errors") &&
            errorObject.errors.hasOwnProperty("xPeriphNum")
          ) {
            // errorMessage= errorObject.errors.xStructNum;
            // errorName = 'Conflict';
            return Observable.throw(errorObject);
          } else if (
            errorObject.hasOwnProperty("errors") &&
            errorObject.errors.hasOwnProperty("xEmployeeNum")
          ) {
            // errorMessage= errorObject.errors.xStructNum;
            // errorName = 'Conflict';
            return Observable.throw(errorObject);
          } else if (
            errorObject.hasOwnProperty("errors") &&
            errorObject.errors.hasOwnProperty("xCustomerNum")
          ) {
            // errorMessage= errorObject.errors.xStructNum;
            // errorName = 'Conflict';
            return Observable.throw(errorObject);
          } else if (
            errorObject.hasOwnProperty("errors") &&
            errorObject.errors.hasOwnProperty("xRepNum")
          ) {
            // errorMessage= errorObject.errors.xStructNum;
            // errorName = 'Conflict';
            return Observable.throw(errorObject);
          } else {
            // errorMessage = MESSAGES[409].message;
            // errorName = errorObject.name
            //   ? errorObject.name
            //   : MESSAGES[409].name;
          }
          // return Observable.throw(errorObject);
        }

        if (
          errorObject.message &&
          errorObject.message.includes("Cast to ObjectId failed")
        ) {
          //   errorMessage = MESSAGES["noRecord"].message;
          //   errorName = MESSAGES["noRecord"].name;
        }

        if (
          errorObject.name === "BadRequest" ||
          errorObject.message === "Invalid data"
        ) {
          if (
            errorObject.message &&
            errorObject.message.includes("xpcSafes validation failed")
          ) {
            // errorMessage = MESSAGES["InvalidSafesData"].message;
            // errorName = MESSAGES["InvalidSafesData"].name;
          } else if (
            errorObject.message &&
            errorObject.message.includes("Missing credentials")
          ) {
            // errorMessage=MESSAGES["MissingCredentials"].message;
            // errorName=MESSAGES["MissingCredentials"].name;
            return Observable.throw(errorObject);
          } else {
            if (
              errorObject.hasOwnProperty("errors") &&
              Object.keys(errorObject.errors).length > 0
            ) {
              //   errorMessage = MESSAGES["invalidData"].message;
              //   errorName = MESSAGES["invalidData"].name;
            } else {
              return Observable.throw(errorObject);
            }
          }
        }

        if (
          errorObject.name === "NotAuthenticated" &&
          errorObject.message === "Error"
        ) {
          // errorMessage = MESSAGES["notAuthenticated"].message;
          // errorName = MESSAGES["notAuthenticated"].name;
          return Observable.throw(errorObject);
        }
      }

      //   this.notificationService.error(
      //     errorMessage ? errorMessage : errorObject.message,
      //     errorName ? errorName : errorObject.name
      //   );
      return Observable.throw(errorObject);
    } catch (err) {
      console.log("Ye aya hai catch me", err);
      //   this.notificationService.error(
      //     MESSAGES["general"].message,
      //     MESSAGES["general"].name
      //   );
      return Observable.throw({});
    }
  }
}
