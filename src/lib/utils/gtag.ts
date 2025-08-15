// Google Analytics event tracking utility
export function trackEvent(eventName: string, parameters: Record<string, any> = {}) {
	if (typeof window !== 'undefined' && (window as any).gtag) {
		(window as any).gtag('event', eventName, parameters);
	}
}
