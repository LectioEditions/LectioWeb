import "server-only"
import { PostHog } from "posthog-node";

export function serverSideAnalytics (){
    const PosthogClient= new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!,{
        host:process.env.NEXT_PUBLIC_POSTHOG_HOST,
        flushAt:1,
        flushInterval:0,
    });
return PosthogClient;
}

export const analyticsServerClient = serverSideAnalytics();

export default  analyticsServerClient;