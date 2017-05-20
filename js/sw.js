const cdnCacheStrategy = goog.swlib.staleWhileRevalidate({
  cacheableResponse: {
    statuses: [0, 200],
  },
});
goog.swlib.router.registerRoute(new RegExp('^http://127.0.0.1:3000'), cdnCacheStrategy);