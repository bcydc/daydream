<script lang="ts">
	export let bgColor: string = '#FCEFC5';
	export let brushstrokeImage: string = '/daydream-media/brushstroking.png';
	export let letterTopImage: string = '/daydream-media/letter-top.png';
	export let letterLoopImage: string = '/daydream-media/letter-loop.png';
	export let cloudsLoopImage: string = '/daydream-media/clouds-loop.png';
	export let underlineImage: string = '/daydream-media/underline.svg';
	export let cloudCoverImage: string = '/daydream-media/cloud-cover-1.png';
	export let maxWidth: string = 'max-w-4xl';
	export let padding: string = 'pt-24 max-sm:pt-40 px-8 max-sm:px-2';
	export let letterPadding: string = 'px-20 pt-20 pb-52 max-sm:px-18';
	export let titleColor: string = '#8B4513';
	export let textColor: string = '#8B4513';
	export let titleSize: string = 'text-5xl';
	export let textSize: string = 'text-xl';
	export let zIndex: string = 'z-20';
	export let cloudCoverZIndex: string = 'z-30';
</script>

<div class="w-full relative flex items-start justify-center">
	<!-- background -->
	<div class="absolute top-0 left-0 w-full h-full -z-50" style="background-color: {bgColor};"></div>
	<div class="absolute top-0 left-0 w-full h-full bg-[url('{brushstrokeImage}')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-30 pointer-events-none -z-40"></div>

	<div class="relative {maxWidth} mx-auto h-full flex items-start {padding}">
		<div
			class="relative {zIndex} {letterPadding} rounded-lg mb-0"
			style="background-image: url('{letterTopImage}'), linear-gradient(to bottom, {bgColor} 100px, transparent 100px), url('{letterLoopImage}'); background-size: 100% auto, 100% auto, 100% auto; background-repeat: no-repeat, no-repeat, repeat-y; background-position: top, top, top; background-attachment: local, local, local;"
		>
			<div class="absolute bottom-0 left-0 w-full h-24 z-10 pointer-events-none bg-[url('{cloudsLoopImage}')] bg-repeat-x bg-bottom bg-contain"></div>
			<h2 class="{titleSize} font-serif italic mb-10 relative" style="color: {titleColor};">
				Dear Hackers, Musicians, and Artists,
				<img src={underlineImage} alt="" class="absolute left-0 -bottom-3 w-64 h-auto opacity-70" />
			</h2>

			<div class="font-serif {textSize} leading-relaxed space-y-8" style="color: {textColor};">
				<p>Welcome to Hack Club's newest adventure. This fall we invite you to join us for Daydream, the world's biggest Game Jam happening simultaneously in 100 cities.</p>

				<p class="font-bold text-2xl">Hack Club wants you to make a game this fall.</p>

				<p>Don't consider yourself a game dev? No problem - we have tons of online and in-person workshops for you to make your first game!</p>

				<p>This fall, we invite you to learn something new, make something you're really proud of, meet new friends, and go on an incredible adventure together.</p>

				<p class="mb-2">With love,</p>

				<p class="italic text-2xl opacity-85">Augie and Renran from Hack Club HQ</p>
			</div>
		</div>
	</div>

	<div class="w-full absolute {cloudCoverZIndex} max-h-64 bottom-0 max-2xl:translate-y-1/4 max-lg:translate-y-1/2 pointer-events-none">
		<img src={cloudCoverImage} alt="" class="w-full h-full object-contain min-[2048px]:hidden" />
	</div>
</div>
