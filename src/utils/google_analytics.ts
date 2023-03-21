import { event } from "nextjs-google-analytics";

export function ga_event(eventName: string, options: any) {
    if ( process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID === undefined) { 
        return;
    }
    event(eventName, options);
}