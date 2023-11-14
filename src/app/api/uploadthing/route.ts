import { createNextRouteHandler } from 'uploadthing/next';

import { insightsFileRouter } from './core';

export const { GET, POST } = createNextRouteHandler({
  router: insightsFileRouter
});
