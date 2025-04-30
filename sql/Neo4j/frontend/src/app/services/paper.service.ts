import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface CitesResponse {
  cites: boolean;
  count: number;
}

interface ClassificationsResponse {
  paperId: string;
  classifications: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PaperService {
  private baseUrl = 'http://localhost:3000/api'; 

  constructor(private http: HttpClient) { }

  checkCites(from: string, to: string): Observable<CitesResponse> {
    const url = `${this.baseUrl}/cites?from=${from}&to=${to}`;
    return this.http.get<CitesResponse>(url);
  }

  getClassifications(paperId: string): Observable<ClassificationsResponse> {
    const url = `${this.baseUrl}/classifications/${paperId}`;
    return this.http.get<ClassificationsResponse>(url);
  }

  runMiscQuery(cypher: string, params?: any): Observable<any> {
    const url = `${this.baseUrl}/misc`;
    return this.http.post<any>(url, { cypher, params });
  }
}




