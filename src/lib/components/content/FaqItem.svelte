<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	
	export let question: string;
	export let answer: string;
	
	let isOpen = false;
	
	function toggle() {
		isOpen = !isOpen;
	}
</script>

<div class="bg-white rounded-lg shadow-[0_3px_0_0_theme(colors.dark)] border-2 border-dark overflow-hidden">
	<button
		on:click={toggle}
		class="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between font-serif font-bold text-dark"
	>
		<span class="text-lg">{question}</span>
		<svg
			class="w-5 h-5 transform transition-transform duration-500 ease-in-out {isOpen ? 'rotate-180' : ''}"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>
	
	{#if isOpen}
		<div 
			class="overflow-hidden"
			in:slide={{duration: 500, easing: quintOut}}
			out:slide={{duration: 500, easing: quintOut}}
		>
			<div class="px-6 pb-4 text-dark">
				<div class="border-t border-gray-200 pt-4">
					<p class="text-sm leading-relaxed break-words">
						{@html answer}
					</p>
				</div>
			</div>
		</div>
	{/if}
</div>
