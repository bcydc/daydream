<script lang="ts">
	export let eventAddress: string = '';
	export let eventName: string = '';
	export let directionsURL: string = '';
	export let mapHeight: string = 'h-156';
	export let mapSrc: string = '/map';
	export let eventMapSrc: string = '/event-map';
	export let title: string = 'Daydream Events Map';
	export let bgColor: string = 'bg-[#acd4e0]';
	export let showAddress: boolean = true;
</script>

<!-- Map container with cloudy edges -->
<div class="w-full max-w-5xl lg:max-w-6xl mx-auto px-2 md:px-8">
	<div class="relative w-full {mapHeight} overflow-hidden bg-transparent">
		<iframe
			src={eventAddress ? `${eventMapSrc}?location=${encodeURIComponent(eventAddress)}` : mapSrc}
			class="w-full h-full border-0 {bgColor}"
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
			{title}
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
