import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
const isProtectedRoute = createRouteMatcher([
  '/create-item',
  '/discover',
  /^\/items\/[^/]+$/, // Matches /items/:id where :id is any non-empty segment
  '/profile',
  '/ordering',
  '/orders'
]);


export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectedRoute(req)) {

    // Add custom logic to run before redirecting

    return auth().redirectToSignIn();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

