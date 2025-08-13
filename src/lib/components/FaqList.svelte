<script lang="ts">
	import FaqItem from './FaqItem.svelte';

	export let bgGradient: string = 'bg-gradient-to-b from-[#FAE3C9] to-[#e99cce]';
	export let padding: string = 'pb-24 max-md:pt-16';
	export let cloudsImage: string = 'faq-clouds.png';
	export let titleImage: string = 'faq.png';
	export let titleAlt: string = 'FAQ';
	export let maxWidth: string = 'max-w-6xl';
	export let gridCols: string = 'grid-cols-2';
	export let mobileGridCols: string = 'max-[900px]:grid-cols-1';
	export let gap: string = 'gap-8';
	export let mobileGap: string = 'max-md:gap-16';
	export let paddingX: string = 'px-8';
	export let zIndex: string = 'z-10';

	// Default FAQ data
	const defaultFaqData = [
		{
			question: "Who can participate in Daydream?",
			answer: "All high-school & upper-middle-school aged students are welcome to come!",
			windowImage: "window-3.png",
			rotate: -2
		},
		{
			question: "Can I organize a Daydream in my city?",
			answer: "Definitely! Contact us via daydream@hackclub.com or join #daydream on slack.",
			windowImage: "window-4.png",
			rotate: 1
		},
		{
			question: "All this, for free?",
			answer: "Yep! Food, swag and good vibes are all included. Plus, if you're joining us from afar, we'll cover the cost of gas or a bus / train ticket.",
			windowImage: "window-2.png",
			rotate: 2
		},
		{
			question: "What do I need?",
			answer: "Your laptop, chargers, toiletries, sleeping bags, and an open mind!",
			windowImage: "window-1.png",
			rotate: -1
		},
		{
			question: "What has Hack Club done before?",
			answer: "Hack Club has run a hackathon in at GitHub HQ, a Game Jam in 50 cities, a hackathon on a train from Vermont to Los Angeles, and more!",
			windowImage: "window-4.png",
			rotate: 1
		},
		{
			question: "I'm not good at coding. Can I still participate?",
			answer: "This game jam is for all skill levels! We'll have workshops and other events so join us and let's learn together.",
			windowImage: "window-3.png",
			rotate: 1
		},
		{
			question: "What if my parents are concerned?",
			answer: "We're here to help! You can see our parent guide here, or they can reach out to us at daydream@hackclub.com for questions.",
			windowImage: "window-2.png",
			rotate: -2
		},
		{
			question: "What can I make at Daydream?",
			answer: "ANY type of game based on the theme! Platformer, visual novel, clicker game, etc. Be as creative as possible!",
			windowImage: "window-1.png",
			rotate: -1
		}
	];

	export let faqData: Array<{
		question: string;
		answer: string;
		windowImage: string;
		rotate: number;
	}> = defaultFaqData;
</script>

<div
	class="w-full {padding} {bgGradient} relative flex flex-col items-center justify-center"
>
	<img src={cloudsImage} alt="" class="w-full" />
	<img src={titleImage} alt={titleAlt} class="mb-12 h-24 scale-175 max-md:scale-120" />

	<!-- FAQ Grid -->
	<div class="grid {gridCols} {gap} {maxWidth} {paddingX} {zIndex} {mobileGridCols} {mobileGap}">
		{#each faqData as faq}
			<FaqItem
				question={faq.question}
				answer={faq.answer}
				windowImage={faq.windowImage}
				rotate={faq.rotate}
			/>
		{/each}
	</div>

	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
	></div>
</div>
