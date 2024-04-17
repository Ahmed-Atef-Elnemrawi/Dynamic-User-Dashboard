import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { of, tap } from 'rxjs';

const cache: Map<string, any> = new Map();

// implement caching for http request
export const cacheRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const key = req.urlWithParams;
  const isGetMethod = req.method === 'GET';
  const cachedRes = cache.has(req.urlWithParams);

  if (isGetMethod && cachedRes) {
    console.log('return response from cache')
    return of(cache.get(key));
  }

  console.log('there is no cached response')

  if (isGetMethod && !cachedRes) {
    console.log('add response to cache element')
    return next(req).pipe(tap((res) => cache.set(key, res)));
  }
  return next(req);
};
