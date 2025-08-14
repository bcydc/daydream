<script lang="ts">
	import { page } from '$app/stores';

	export let measurementId: string = 'G-JD2FNNVXTR';

	// Track page views
	function trackPageView(url: string) {
		if (typeof window !== 'undefined' && (window as any).gtag) {
			(window as any).gtag('config', measurementId, {
				page_path: url
			});
		}
	}

	// Track custom events
	export function trackEvent(eventName: string, parameters: Record<string, any> = {}) {
		if (typeof window !== 'undefined' && (window as any).gtag) {
			(window as any).gtag('event', eventName, parameters);
		}
	}

	// Track page changes
	$: if ($page.url.pathname) {
		trackPageView($page.url.pathname);
	}
</script>

<!-- This component doesn't render anything visible -->

<!-- Google tag (gtag.js) -->
<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-JD2FNNVXTR"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'G-JD2FNNVXTR');
	</script>
</svelte:head>
