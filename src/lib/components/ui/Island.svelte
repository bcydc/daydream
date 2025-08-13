<script lang="ts">
	export let stepNumber: number;
	export let stepText: string;
	export let stepColor: string;
	export let islandImage: string;
	export let paperImage: string;
	export let letterFrontImage: string;
	export let letterBackImage: string;
	export let linkUrl: string = '';
	export let linkText: string = '';
	export let showLink: boolean = false;
	export let flexBasis: string = 'basis-1/2';
	export let translateY: string = '';
	export let translateX: string = '';
	export let letterPosition: string = '';
	export let letterOffset: string = '';
	export let animationDelay: string = '';
	export let letterAnimationDelay: string = '';
	export let paperAnimationDelay: string = '';
	export let islandAnimationDelay: string = '';
	export let islandSize: string = 'w-72 h-72';
	export let mobileIslandSize: string = 'max-md:w-64 max-md:h-64';
	export let paperSize: string = 'w-72 h-40';
	export let mobilePaperSize: string = 'max-md:w-80';
	export let letterSize: string = 'w-28 h-28';
	export let zIndex: string = 'z-10';
</script>

<div class="flex flex-col items-center w-max {flexBasis} max-md:basis-full max-md:w-full {translateY} {translateX} {zIndex}">
	<div class="relative translate-y-8 max-md:translate-y-4 z-30">
		<!-- Letter Front -->
		<img
			src={letterFrontImage}
			alt=""
			class="object-contain absolute {letterPosition} {letterOffset} {letterSize} animate-hover ![--hover:-0.25rem] ![animation-delay:{letterAnimationDelay}] z-20"
		/>
		<!-- Letter Back -->
		<img
			src={letterBackImage}
			alt=""
			class="object-contain absolute {letterPosition} {letterOffset} {letterSize} animate-hover ![--hover:-0.25rem] ![animation-delay:{letterAnimationDelay}] z-10"
		/>
		<!-- Paper -->
		<div class="relative {paperSize} {mobilePaperSize} animate-hover ![--hover:-0.15rem] ![animation-delay:{paperAnimationDelay}] z-20" data-point={stepNumber}>
			<img src={paperImage} alt="" class="w-full h-full object-contain" />
			<div class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
				<span class="font-sans {stepColor} font-bold text-[1.3rem] mr-1">#{stepNumber}:</span>
				{#if showLink}
					<a href={linkUrl} class="underline">{linkText}</a>
				{:else}
					{stepText}
				{/if}
			</div>
		</div>
	</div>
	<!-- Island -->
	<img
		src={islandImage}
		alt=""
		class="{islandSize} {mobileIslandSize} object-contain animate-hover ![--hover:-0.25rem] ![animation-delay:{islandAnimationDelay}] z-0"
	/>
</div>
