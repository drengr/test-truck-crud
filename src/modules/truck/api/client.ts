import { createFetch, type MaybeRefOrGetter, type UseFetchOptions } from '@vueuse/core';

import type { BaseTruck } from '../domain/BaseTruck';

const truckFetch = createFetch({
  baseUrl: `${import.meta.env.VITE_API_URL}/trucks`,
});


class TruckApiClient {
  apiClient: typeof truckFetch;

  constructor(apiClient: typeof truckFetch) {
    this.apiClient = apiClient;
  }

  get<T>(url: MaybeRefOrGetter<string>, options: UseFetchOptions = {}) {
    return this.apiClient(url, options)
      .get()
      .json<T>();
  }

  post<T>(payload: MaybeRefOrGetter<BaseTruck>, options: UseFetchOptions = {}) {
    return this.apiClient('', options)
      .post(payload)
      .json<T>();
  }

  put<T>(url: MaybeRefOrGetter<string>, payload: MaybeRefOrGetter<BaseTruck>, options: UseFetchOptions = {}) {
    return this.apiClient(url, options)
      .put(payload)
      .json<T>();
  }

  delete(url: MaybeRefOrGetter<string>, options: UseFetchOptions = {}) {
    return this.apiClient(url, options).delete();
  }
}

export const truckApiClient = new TruckApiClient(truckFetch);
