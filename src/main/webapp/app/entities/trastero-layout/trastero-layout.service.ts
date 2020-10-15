import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITrasteroLayout } from 'app/shared/model/trastero-layout.model';

type EntityResponseType = HttpResponse<ITrasteroLayout>;
type EntityArrayResponseType = HttpResponse<ITrasteroLayout[]>;

@Injectable({ providedIn: 'root' })
export class TrasteroLayoutService {
  public resourceUrl = SERVER_API_URL + 'api/trastero-layouts';

  constructor(protected http: HttpClient) {}

  create(trasteroLayout: ITrasteroLayout): Observable<EntityResponseType> {
    return this.http.post<ITrasteroLayout>(this.resourceUrl, trasteroLayout, { observe: 'response' });
  }

  update(trasteroLayout: ITrasteroLayout): Observable<EntityResponseType> {
    return this.http.put<ITrasteroLayout>(this.resourceUrl, trasteroLayout, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITrasteroLayout>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITrasteroLayout[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
