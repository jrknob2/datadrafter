/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/prefer-inject */
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { ObjectType } from "../models/object-type.model";

@Injectable({ providedIn: 'root' })

export class ObjectTypesService {
  private apiUrl = 'http://localhost:3000/object-types';

  constructor(private http: HttpClient) {}

  // Get a single object type by UUID
getOne(uuid: string): Promise<ObjectType> {
  return firstValueFrom(this.http.get<ObjectType>(`${this.apiUrl}/${uuid}`));
}

// Create or update an object type
save(object: ObjectType): Promise<any> {
  return firstValueFrom(this.http.post(this.apiUrl, object));
}

getAll(): Observable<ObjectType[]> {
  return this.http.get<ObjectType[]>(this.apiUrl);
}

}

