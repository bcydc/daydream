<script lang="ts">
	export let eventName: string = '';
	export let eventAddress: string = '';
	export let directionsURL: string = '';
	export let bannerImage: string = 'banner-city.png';
	export let bannerAlt: string = 'Find a Daydream Near You';
	export let mapHeight: string = 'h-156';
	export let showAddress: boolean = true;
	export let mapSrc: string = '/map';
	export let eventMapSrc: string = '/event-map';
</script>

<div
	class="w-full bg-gradient-to-b from-[#FDC5D1] to-[#FAE3C9] items-center justify-center px-0 md:px-8 relative pt-36"
>
	<div class="w-full max-w-5xl lg:max-w-6xl mx-auto px-2 md:px-8">
		<div class="relative w-full min-w-72">
			<img
				src={bannerImage}
				alt={bannerAlt}
				class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 md:-translate-y-[40%] h-48 w-auto z-100 scale-[1.15] md:scale-[1.65] saturate-70 brightness-110 object-contain px-4 pointer-events-none"
			/>

			<!-- Map container with cloudy edges -->
			<div class="relative w-full {mapHeight} overflow-hidden bg-transparent">
				<iframe
					src={eventAddress ? `${eventMapSrc}?location=${encodeURIComponent(eventAddress)}` : mapSrc}
					class="w-full h-full border-0 bg-[#acd4e0]"
					style="
						mask-image: 
							linear-gradient(white, white),
							url('/clouds-loop-mask-2.png'),
							url('/clouds-loop-mask-1.png'),
							url('/clouds-loop-mask-3.png'),
							url('/clouds-loop-mask-4.png'),
							url('/cloud-corner-1.png'),
							url('/cloud-corner-2.png'),
							url('/cloud-corner-3.png'),
							url('/cloud-corner-4.png');
						mask-position: 
							center,
							top left,
							bottom left,
							left top,
							right top,
							bottom left,
							top left,
							top right,
							bottom right;
						mask-size: 
							auto auto,
							auto 72px,
							auto 72px,
							72px auto,
							72px auto,
							100px 100px,
							100px 100px,
							100px 100px,
							100px 100px;
						mask-repeat: 
							no-repeat,
							repeat-x,
							repeat-x,
							repeat-y,
							repeat-y,
							no-repeat,
							no-repeat,
							no-repeat,
							no-repeat;
						-webkit-mask-image: 
							linear-gradient(white, white),
							url('/clouds-loop-mask-2.png'),
							url('/clouds-loop-mask-1.png'),
							url('/clouds-loop-mask-3.png'),
							url('/clouds-loop-mask-4.png'),
							url('/cloud-corner-1.png'),
							url('/cloud-corner-2.png'),
							url('/cloud-corner-3.png'),
							url('/cloud-corner-4.png');
						-webkit-mask-position: 
							center,
							top left,
							bottom left,
							left top,
							right top,
							bottom left,
							top left,
							top right,
							bottom right;
						-webkit-mask-size: 
							auto auto,
							auto 72px,
							auto 72px,
							72px auto,
							72px auto,
							100px 100px,
							100px 100px,
							100px 100px,
							100px 100px;
						-webkit-mask-repeat: 
							no-repeat,
							repeat-x,
							repeat-x,
							repeat-y,
							repeat-y,
							no-repeat,
							no-repeat,
							no-repeat,
							no-repeat;
						mask-type: luminance;
						mask-mode: luminance;
						mask-composite: exclude, add, add, add, add, add, add, add, add;
					"
					title="Daydream Events Map"
				>
				</iframe>
			</div>

			{#if eventAddress && showAddress}
				<p class="text-center font-sans text-2xl pt-12 max-sm:text-xl text-[#60574b] z-10000">
					{#if directionsURL}
						Daydream {eventName} is taking place at
						<a class="underline text-pink" href={directionsURL}>{eventAddress}</a>!
					{:else}
						Daydream {eventName} is taking place at <span class="underline">{eventAddress}</span>!
					{/if}
				</p>
			{/if}
		</div>
	</div>

	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
	></div>
</div>
