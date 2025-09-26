<script lang="ts">
	import { trackEvent } from '$lib/utils/gtag';

	function handleClick() {
		// Track the RSVP button click event
		trackEvent('rsvp_button_click', {
			event_category: 'engagement',
			event_label: 'daydream_rsvp',
			value: 1
		});
		
		window.open('https://forms.hackclub.com/daydream-sign-up?event=recguBLDTnm9lROEt', '_blank');
	}
</script>

<div class="mt-6 flex flex-col items-center gap-3 z-5 max-md:scale-90">
	<a
		href="https://forms.hackclub.com/daydream-stickers"
		target="_blank"
		class="w-max px-4 py-2 bg-pink border-b-2 border-b-pink-dark text-white rounded-full active:transform active:translate-y-0.5 transition-all duration-100 font-sans cursor-pointer mx-auto relative overflow-visible hover:shadow-[0_2px_0_0_theme(colors.pink.dark)] hover:-translate-y-[2px] active:border-transparent active:shadow-none active: mt-4 md:hidden"
	>
		Get free stickers
		<img src="daydream-media/button-clouds.svg" alt="" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto object-contain pointer-events-none" />
		<img src="daydream-media/rock-sticker.png" alt="" class="absolute bottom-2 right-3 translate-2/3 w-18 h-18 object-contain pointer-events-none" style="transform: rotate(-15deg);" />
	</a>
</div>
