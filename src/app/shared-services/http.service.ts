import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  serverUrl = 'http://localhost:3000';
  // serverUrl = environment.serverUrl;
  postRequest(api: any, data: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    data = JSON.stringify(data);
    return this.http.post(this.serverUrl + api, data, {
      headers: headers,
      withCredentials: true,
    });
  }

  outBoundhttp(api: any, data: any) {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin', '*');

    data = JSON.stringify(data);
    return this.http.post(api, data, {
      headers: headers,
    });
  }

  uploadFile(file: File) {
    const fd = new FormData();
    fd.append('uploadedImage', file);
    return this.http.post(this.serverUrl + '/uploadfile', fd, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
