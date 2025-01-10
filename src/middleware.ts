import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Create route matcher for public routes
const isPublicRoute = createRouteMatcher([
  '/', // Public homepage
  '/api', // Public API routes (if needed)
  '/(api|trpc)(.*)', // Match API and trpc routes
  '/sign-in(.*)', // Match sign-in and sub-paths
  '/sign-up(.*)', // Match sign-up and sub-paths
]);

export default clerkMiddleware((auth, req) => {
  // Check if user is authenticated and if the route is not public
  if (!auth().userId && !isPublicRoute(req)) {
    // Add custom logic here if necessary before redirecting
    return auth().redirectToSignIn();
  }
  return null;
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'], // Match all routes except assets and Next.js internal routes
};
