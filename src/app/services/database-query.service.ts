import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseQueryService {

  constructor() { }

  // Helper: Reads an array of IDs from a collection concurrently
  async readIds(collection: any, ids: Array<any>) {
    const reads = ids.map(id => collection.doc(id).get());
    const result = await Promise.all(reads);
    return result.map(v => v.data());
  }
}
