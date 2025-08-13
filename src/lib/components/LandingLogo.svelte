<script lang="ts">
	export let eventLocation: string = 'San Francisco';
</script>

<!-- Landing Logo Begin -->
<div class="inline-block relative">
	<div class="h-12"></div>
	<!-- space for the ship -->
	<h2
		class="text-xl font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent absolute left-1/2 max-sm:translate-y-4 max-sm:mb-0 max-md:-mb-8 md:left-[calc(50%+4rem)] -translate-x-1/2 bottom-8 italic w-max md:text-lg max-sm:text-lg"
	>
		September 27th & 28th, 2025
	</h2>
	<img src="daydream.png" alt="Daydream" class="h-40 mb-6 w-auto object-contain max-w-full px-4" />
	<a href="https://hackclub.com" class="absolute top-0 -right-6 max-sm:right-0 max-sm:scale-80 animate-hover ![animation-delay:0.9s] ![--hover:-0.2rem]">
		<img src="flag-plane.png" alt="Hack Club" class="h-28" />
	</a>
</div>
<div class="relative inline-block px-4">
	<h3 class="text-3xl italic font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent w-max max-sm:text-2xl mx-auto">Game jam for high schoolers</h3>
	<img src="underline.svg" alt="" class="absolute left-1/2 -translate-x-1/2 -mt-1 h-auto scale-115" />
	<h4 class="text-2xl opacity-90 mt-2 font-serif bg-gradient-to-b from-[#487DAB] to-[#3F709A] bg-clip-text text-transparent max-sm:text-xl">
		Organized by Teenagers in {@html eventLocation.replaceAll(' ', '&nbsp;')}
	</h4>
</div>
<!-- Landing Logo End -->
