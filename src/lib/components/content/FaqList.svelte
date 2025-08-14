<script lang="ts">
	import FaqItem from '$lib/components/content/FaqItem.svelte';

	export let bgGradient: string = 'bg-gradient-to-b from-[#FAE3C9] to-[#e99cce]';
	export let padding: string = 'pb-24 max-md:pt-16';
	export let cloudsImage: string = '/daydream-media/faq-clouds.png';
	export let titleImage: string = '/daydream-media/faq.png';
	export let titleAlt: string = 'FAQ';
	export let maxWidth: string = 'max-w-4xl';
	export let paddingX: string = 'px-8';
	export let zIndex: string = 'z-10';

	// Default FAQ data
	const defaultFaqData = [
		{
			question: "Who can participate in Daydream?",
			answer: "All high-school aged students are welcome to come!"
		},
		{
			question: "All this, for free?",
			answer: "Yep! Food, swag and good vibes are all included. All costs are covered by our amazing sponsors! We have transparent finances on <a href='https://hcb.hackclub.com/daydream-vancouver' class='text-blue-600 hover:text-blue-800 underline'>HCB</a>."
		},
		{
			question: "What do I need?",
			answer: "Your laptop, chargers, and an open mind!"
		},
		{
			question: "What have we done before?",
			answer: "BCYDC has already run two hackathons in Vancouver: <a href='https://bcydc.ca/program/yvrhacks' class='text-blue-600 hover:text-blue-800 underline'>yvrHacks</a> and <a href='https://bcydc.ca/program/scrapyard' class='text-blue-600 hover:text-blue-800 underline'>Scrapyard Vancouver</a>! " +
				"<br> Hack Club has run a hackathon at GitHub HQ, a hackathon on a train across the US, and more!"
		},
		{
			question: "I'm not good at coding. Can I still participate?",
			answer: "Daydream Vancouver is for all skill levels! We'll have workshops and other events so join us and let's learn together."
		},
		{
			question: "What if my parents are concerned?",
			answer: "We're here to help!  Our parent guide is coming soon, and they can reach out to us at <a href='mailto:team@bcydc.ca' class='text-blue-600 hover:text-blue-800 underline'>team@bcydc.ca</a> with any questions."
		},
		{
			question: "What can I make at Daydream?",
			answer: "ANY type of game based on the theme! Platformer, visual novel, clicker game, etc. Be as creative as possible!"
		}
	];

	export let faqData: Array<{
		question: string;
		answer: string;
	}> = defaultFaqData;
</script>

<div
	class="w-full {padding} {bgGradient} relative flex flex-col items-center justify-center"
>
	<img src={cloudsImage} alt="" class="w-full" />
	<img src={titleImage} alt={titleAlt} class="mb-12 h-24 scale-175 max-md:scale-120" />

	<!-- FAQ List -->
	<div class="w-full {maxWidth} {paddingX} {zIndex} space-y-4">
		{#each faqData as faq}
			<FaqItem
				question={faq.question}
				answer={faq.answer}
			/>
		{/each}
	</div>

	<div
		class="absolute top-0 left-0 w-full h-full bg-[url('/daydream-media/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
	></div>
</div>
