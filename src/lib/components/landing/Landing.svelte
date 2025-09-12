<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import LandingHeader from '$lib/components/landing/LandingHeader.svelte';
	import LandingLogo from '$lib/components/landing/LandingLogo.svelte';
	import ParticipantSignUp from '$lib/components/landing/ParticipantSignUp.svelte';
	import LandingClouds from '$lib/components/landing/LandingClouds.svelte';
	import StickerButton from '$lib/components/landing/StickerButton.svelte';

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

<div class="absolute top-0 left-0 w-full h-full bg-[url('/daydream-media/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"></div>

<div class="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-[#CCF4FD] to-[#B8D9F8] bg-blend-overlay relative py-8">
	<LandingHeader />

	<div class="w-full flex flex-col md:flex-row items-center justify-between h-auto md:h-[80vh] px-4 md:px-16">
		<!-- Big landing header thingy -->
		<div class="hero-ui-parallax flex flex-col items-center justify-center text-center relative z-30 -translate-y-2 flex-1">
			<div class="inline-block relative">
				<div class="h-12"></div>
				<!-- space for the ship -->
				<img src="/daydream-media/daydream.png" alt="Daydream" class="h-40 mb-8 w-auto object-contain max-w-full px-4" />
				<a href="https://hackclub.com" class="absolute top-0 -right-6 max-sm:right-0 max-sm:scale-80 animate-hover ![animation-delay:0.9s] ![--hover:-0.2rem]">
					<img src="/daydream-media/flag-plane.png" alt="Hack Club" class="h-28" />
				</a>
			</div>
			<div class="relative inline-block px-4">
				<h3 class="text-3xl italic font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent w-max max-sm:text-2xl mx-auto">BC's biggest youth hackathon</h3>
				<img src="/daydream-media/underline.svg" alt="" class="absolute left-1/2 -translate-x-1/2 -mt-1 h-auto scale-115" />
				<h2
					class="text-2xl mt-4 font-serif text-[#4579a5] italic w-full mx-auto text-center flex flex-col items-center gap-0 md:flex-row md:gap-2 md:items-center md:justify-center md:w-max md:mx-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-9"
				>
					<span>September 27th, 2025</span>
					<span class="flex items-center gap-2 justify-center md:ml-2">
						@
						<a href="https://www.bcit.ca" target="_blank" class="flex items-center hover:opacity-80 transition-opacity">
							<img src="/bcit.svg" alt="BCIT" class="h-6 rounded-md md:h-8 mr-2 inline" />
							Downtown Campus
						</a>
					</span>
				</h2>
				<h4 class="text-xl opacity-90 mt-12 max-sm:mt-2 font-serif max-sm:text-xl group text-[#4579a5]">
					Organized by <a href="https://bcydc.ca" target="_blank" class="text-[#166d45] hover:text-[#0f5a3a] transition-colors inline-flex items-center gap-2 underline">
						bcydc
						<img src="/bcydc.svg" alt="BCYDC" class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
					</a>
				</h4>
			</div>

			<div class="mt-4 text-md text-[#4579a5]">
				<a href="https://www.jukeboxprint.com/custom-stickers" class="text-blue-600 hover:text-blue-800 underline">Custom stickers</a> provided by Jukebox!
			</div>

			<ParticipantSignUp />

			<div class="flex gap-4 mt-6">
				<a href="https://bcydc.ca" target="_blank" class="px-6 py-3 bg-[#166d45] rounded-lg font-bold text-white hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2">
					<img src="/bcydc.svg" alt="BCYDC" class="w-5 h-5" />
					Join bcydc
				</a>
				<a
					href="https://hackclub.com"
					target="_blank"
					class="px-6 py-3 bg-[#cc2f44] rounded-lg font-bold text-white hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
				>
					<img src="/hackclub.svg" alt="Hack Club" class="w-5 h-5" />
					Join Hack Club
				</a>
			</div>
			<!-- Mobile: show BCIT logo below, small. 
    <div class="flex md:hidden w-full justify-center items-center mt-6">
      <img src="/bcit.svg" alt="BCIT" class="w-40 pointer-events-none" />
    </div>-->
		</div>
		<!-- Desktop: show right, large.
  <div class="hidden md:flex flex-1 justify-center items-center">
    <img src="/bcit.svg" alt="BCIT" class="w-72 lg:w-[32rem] z-50 pointer-events-none" />
  </div>-->
	</div>

	<!-- <img src="hot-air-balloon.png" alt="" class="absolute w-1/8 right-32 bottom-40 z-20"> -->
	<!-- <img src="hot-air-balloon.png" alt="" class="absolute w-1/12 left-36 bottom-81 z-20"> -->

	<LandingClouds />

	<StickerButton />
</div>
