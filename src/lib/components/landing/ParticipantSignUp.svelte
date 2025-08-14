<script lang="ts">
	function handleClick() {
		window.open('https://forms.hackclub.com/daydream-rsvp?event=recguBLDTnm9lROEt', '_blank');
	}
</script>

<div class="mt-6 flex flex-col items-center gap-3 z-5 max-md:scale-90">
	<div class="relative rounded-full overflow-hidden" style="padding: 2px 2px 5px 2px;">
		<button
			on:click={handleClick}
			class="rounded-full bg-white border-2 border-dark font-sans p-2 flex flex-row items-center gap-2 shadow-[0_3px_0_0_theme(colors.dark)] hover:border-pink hover:shadow-[0_3px_0_0_#E472AB] active:border-dark active:shadow-[0_3px_0_0_theme(colors.dark)] active:transform active:translate-y-0.5 transition-all duration-100 cursor-pointer w-80"
		>
			<span class="text-dark font-sans flex-1 text-left px-3">RSVP for Daydream</span>
			<div class="bg-light h-full px-5 py-[0.45rem] rounded-full border-b-2 border-[#B3866A] flex-shrink-0">
				<img src="daydream-media/submit.svg" alt="Go">
			</div>
		</button>
	</div>
	
	<a
		href="https://forms.hackclub.com/daydream-stickers"
		target="_blank"
		class="w-max px-4 py-2 bg-pink border-b-2 border-b-pink-dark text-white rounded-full active:transform active:translate-y-0.5 transition-all duration-100 font-sans cursor-pointer mx-auto relative overflow-visible hover:shadow-[0_2px_0_0_theme(colors.pink.dark)] hover:-translate-y-[2px] active:border-transparent active:shadow-none active: mt-4 md:hidden"
	>
		Get free stickers
		<img
			src="daydream-media/button-clouds.svg" 
			alt="" 
			class="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto object-contain pointer-events-none"
		>
		<img
			src="daydream-media/rock-sticker.png"
			alt=""
			class="absolute bottom-2 right-3 translate-2/3 w-18 h-18 object-contain pointer-events-none"
			style="transform: rotate(-15deg);"
		>
	</a>
</div>
