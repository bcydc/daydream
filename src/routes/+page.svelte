<script lang="ts">
	import Footer from '$lib/components/layout/Footer.svelte';
	import FaqList from '$lib/components/content/FaqList.svelte';
	import LandingLetter from '$lib/components/landing/LandingLetter.svelte';
	import Pathway from '$lib/components/content/Pathway.svelte';
	import Schedule from '$lib/components/content/Schedule.svelte';
	import Styles from '$lib/components/layout/Styles.svelte';
	import Sponsors from '$lib/components/content/Sponsors.svelte';
	import Macintosh from '$lib/components/content/Macintosh.svelte';
	import MapContainer from '$lib/components/content/MapContainer.svelte';
	import VideoPopup from '$lib/components/ui/VideoPopup.svelte';
	import Landing from '$lib/components/landing/Landing.svelte';
	import SvelteHead from '$lib/components/layout/SvelteHead.svelte';
	import Gtag from '$lib/components/ui/Gtag.svelte';

	
	/**
	 * This is the template site! Create a copy of this folder (src/routes/example)
	 * and rename it to whatever you want your URL to be.
	 *
	 * Then, configure the event name, location, and schedule below:
	 */

	// Configuration - Put your information here!
	const eventName = 'Vancouver';
	const eventLocation = 'Vancouver';
	const eventAddress = ''; // Leave this empty if you don't want an address
	// const eventAddress = '1600 Pennsylvania Avenue, Washington, DC 20500'; // Leave this empty if you don't want an address
	// These two are optional
	const directionsURL = 'https://www.google.com/maps/search/1600+pennsylvania+avenue+washington+dc/';
	const contactLink = 'mailto:team@bcydc.ca';

	// Sponsors Configuration
	const sponsorsEnabled = true; // Set to false to hide the entire sponsors section
	const sponsors = [
		{ image: '/sponsors/jukebox-logo.svg', name: 'Jukebox', url: 'https://www.jukeboxprint.com/' },
		{ image: '/sponsors/st-georges-school.png', name: 'St. George\'s School', url: 'https://www.stgeorges.bc.ca' },
	];

	// Schedule Configuration - You don't need to use this exact schedule, this is just an example!
	const scheduleData: { title: string; items: { event: string; time: string }[] }[] = [
		{
			title: 'Saturday, September 27th',
			items: [
				{ event: 'TBD!', time: 'TBD!' }
				// { event: 'Doors open', time: '11:00 AM' },
				// { event: 'Opening ceremony', time: '12:00 PM' },
				// { event: 'Lunch', time: '12:30 PM' },
				// { event: 'Start working on your project!', time: '1:00 PM' },
				// { event: 'Workshop 1', time: '2:00 PM' },
				// { event: 'Activity 1', time: '4:00 PM' },
				// { event: 'Workshop 2', time: '4:00 PM' },
				// { event: 'Dinner', time: '6:00 PM' },
				// { event: 'Lightning talks', time: '8:00 PM' },
				// { event: 'Midnight surprise', time: '12:00 AM' }
			]
		},
		{
			title: 'Sunday, September 28th',
			items: [
				{ event: 'TBD!', time: 'TBD!' }
				// { event: 'Breakfast', time: '8:00 AM' },
				// { event: 'Demos!', time: '10:30 AM' },
				// { event: 'Closing ceremony', time: '12:00 PM' }
			]
		}
	];

	/** @type {import('./$types').PageData} */
	// svelte-ignore export_let_unused
		export let data: any;

	// Get current URL for dynamic metadata
	$: currentUrl = `https://daydream.bcydc.ca`;
	$: pageTitle = `Daydream ${eventName} - ${eventLocation} Game Jam`;
	$: pageDescription = `Join Daydream ${eventName} in ${eventLocation}! A teen-led game jam where you'll build amazing games with other high schoolers. Food, workshops, and prizes included!`;
	$: pageKeywords = `game jam, hackathon, teen coding, Hack Club, game development, ${eventLocation}, ${eventName}`;
</script>


<SvelteHead {pageTitle} {pageDescription} {pageKeywords} {currentUrl} />

<Landing {eventLocation} />

<LandingLetter />

<Schedule {scheduleData} />

<Sponsors {sponsors} {sponsorsEnabled} {contactLink} {eventName} />

<Pathway {eventName} />

<div class="w-full bg-gradient-to-b from-[#FDC5D1] to-[#FAE3C9] items-center justify-center px-0 md:px-8 relative pt-36">
	<MapContainer {eventAddress} {eventName} {directionsURL} />

	<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>

	<Macintosh />
</div>

<FaqList />

<Footer />

<VideoPopup />

<Gtag />

<Styles />
