import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-95661YM4PG"; // Replace with your GA4 Measurement ID

export const initGA = () => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPageView = () => {
    ReactGA.send("pageview");
};

export const TrackGoogleAnalyticsEvent = (event_name, data = {}) => {
    console.log("GA event:", event_name, data);

    ReactGA.event(event_name, data); // Use GA4 event tracking format
};
