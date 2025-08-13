<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import LandingHeader from '$lib/components/LandingHeader.svelte';
	import LandingLogo from '$lib/components/LandingLogo.svelte';
	import ParticipantSignUp from '$lib/components/ParticipantSignUp.svelte';
	import LandingClouds from '$lib/components/LandingClouds.svelte';
	import StickerButton from '$lib/components/StickerButton.svelte';

	export let eventLocation = '';

	onMount(() => {
		// Register GSAP plugins
		gsap.registerPlugin(ScrollTrigger);

		// Setup parallax for hero UI elements
		const heroUI = document.querySelector('.hero-ui-parallax');
		if (heroUI) {
			gsap.to(heroUI, {
				yPercent: 8,
				ease: 'none',
				scrollTrigger: {
					trigger: heroUI,
					start: 'bottom bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		}

		// Cleanup
		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<div class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>

<div class="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-[#CCF4FD] to-[#B8D9F8] bg-blend-overlay relative">
	<LandingHeader />

	<div class="hero-ui-parallax flex flex-col items-center justify-center text-center relative z-5 -translate-y-2">
		<LandingLogo {eventLocation} />

		<ParticipantSignUp />
	</div>

	<!-- <img src="hot-air-balloon.png" alt="" class="absolute w-1/8 right-32 bottom-40 z-20"> -->
	<!-- <img src="hot-air-balloon.png" alt="" class="absolute w-1/12 left-36 bottom-81 z-20"> -->

	<LandingClouds />

	<StickerButton />
</div>
