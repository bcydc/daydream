<script lang="ts">
	export let videoSrc: string = 'https://www.youtube.com/embed/hNYsNSY7Vz0?autoplay=1';
	export let videoTitle: string = 'YouTube video player';
	export let modalTitle: string = 'Video popup';
	export let closeButtonLabel: string = 'Close video';
	export let zIndex: string = 'z-12000';
	export let maxWidth: string = 'max-w-6xl';
	export let maxHeight: string = 'max-h-[80vh]';
	export let width: string = 'w-[90vw]';
	export let height: string = 'h-[90vh]';

	let showVideoPopup = false;

	function openVideoPopup() {
		console.log('HERE');
		// Check if screen is small (mobile/tablet)
		if (window.innerWidth <= 768) {
			// Open video directly in new tab for small screens
			window.open('https://www.youtube.com/watch?v=O44y8TeJrNE', '_blank');
		} else {
			// Show popup for larger screens
			showVideoPopup = true;
		}
	}

	function closeVideoPopup() {
		showVideoPopup = false;
	}

	// Expose the open function for external use
	export { openVideoPopup };
</script>

{#if showVideoPopup}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-70 flex items-center justify-center {zIndex}"
		on:click={closeVideoPopup}
		on:keydown={(e) => e.key === 'Escape' && closeVideoPopup()}
		role="dialog"
		aria-modal="true"
		aria-label={modalTitle}
		tabindex="-1"
	>
		<button
			class="cursor-pointer absolute top-4 right-4 z-10 w-8 h-8 bg-[rgba(255,255,255,0.2)] hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-colors duration-200"
			on:click={closeVideoPopup}
			aria-label={closeButtonLabel}
		>
			<span class="-translate-y-0.5">×</span>
		</button>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="relative {width} {height} {maxWidth} {maxHeight} bg-black rounded-lg overflow-hidden"
			on:click|stopPropagation
		>
			<iframe
				src={videoSrc}
				title={videoTitle}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
				class="w-full h-full"
			></iframe>
		</div>
	</div>
{/if}
