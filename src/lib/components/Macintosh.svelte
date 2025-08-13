<script lang="ts">
	export let title: string = "What will you";
	export let titleImage: string = "/dream-pixel.png";
	export let titleImageAlt: string = "Dream?";
	export let description: string = "You can make any game you want as long as it can be deployed on itch.io! All games made must be deployed and available online for other participants to play and experience. We will only accept itch.io submission links.";
	export let examples: Array<{ name: string; url: string; author: string }> = [];
	export let footerText: string = "We'll have workshops and activities before Daydream to help you learn game development using Godot!";
	export let showIdeaGenerator: boolean = true;
	export let ideaGeneratorTitle: string = "Stuck?";
	export let ideaGeneratorButtonText: string = "Dream an idea for me";

	// Internal state for idea generator
	let ideaText = "";
	let isTyping = false;
	let showDice = false;
	let diceNumbers = [1, 1, 1];
	let showDone = false;
	let isRolling = false;

	async function typeText(text: string) {
		isTyping = true;
		ideaText = '';

		for (let i = 0; i <= text.length; i++) {
			ideaText = text.slice(0, i);
			await new Promise((resolve) => setTimeout(resolve, 20));
		}

		isTyping = false;
	}

	async function fetchIdea(): Promise<string> {
		let attempt = 0;
		const maxAttempts = 5;

		while (attempt < maxAttempts) {
			try {
				const response = await fetch('/api/idea', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					}
				});

				if (!response.ok) {
					if (response.status === 500) {
						throw new Error(`Server error: ${response.status}`);
					} else {
						// Don't retry on non-500 errors
						return 'How about a game where you collect magical crystals to save a mysterious floating world?';
					}
				}

				const data = await response.json();
				return data.idea;
			} catch (error) {
				attempt++;
				console.warn(`Attempt ${attempt} failed:`, error);

				if (attempt >= maxAttempts) {
					return 'How about a game where you collect magical crystals to save a mysterious floating world?';
				}

				// Wait before retrying
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
		}

		return 'How about a game where you collect magical crystals to save a mysterious floating world?';
	}

	async function dreamIdea() {
		if (isRolling) return;

		isRolling = true;
		showDone = false;
		showDice = true;
		ideaText = '';

		const startTime = Date.now();
		const minDuration = 1000;
		let fetchComplete = false;
		let fetchResult: string = '';

		// Start fetch and dice animation concurrently
		const fetchPromise = fetchIdea().then((result) => {
			fetchResult = result;
			fetchComplete = true;
			return result;
		});

		// Dice animation loop
		const dicePromise = (async () => {
			while (true) {
				const elapsed = Date.now() - startTime;

				// Stop if both minimum time has passed AND fetch is complete
				if (elapsed >= minDuration && fetchComplete) {
					break;
				}

				diceNumbers = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];

				await new Promise((resolve) => setTimeout(resolve, 100));
			}
		})();

		// Wait for both to complete
		await Promise.all([fetchPromise, dicePromise]);

		showDone = false;
		showDice = false;
		isRolling = false;

		// Start typing animation with the fetched idea
		await typeText(fetchResult);
	}
</script>

<!-- Macintosh Section -->
<div
	class="w-full flex justify-center py-16 px-8 mt-48 pb-[clamp(232px,29vw,464px)] max-sm:w-[120vw] max-sm:-translate-x-[10vw]"
>
	<div class="bg-[#c5c2b1] p-4 relative max-w-4xl" style="border-radius: calc(1.5rem + 1rem);">
		<div
			class="bg-[#061E2D] text-[#D1E3EE] rounded-3xl py-18 md:py-16 px-10 md:px-18 relative overflow-visible"
			style="
		border-image: url('/macintosh.png') 128 91 464 91; 
		border-image-slice: 128 91 464 91; 
		border-image-width: clamp(64px, 8vw, 128px) clamp(45px, 6vw, 91px) clamp(232px, 29vw, 464px) clamp(45px, 6vw, 91px); 
		border-image-outset: clamp(64px, 8vw, 128px) clamp(45px, 6vw, 91px) clamp(232px, 29vw, 464px) clamp(45px, 6vw, 91px); 
		border-image-repeat: stretch; 
		border-style: solid;
	"
		>
			<!-- frame around content -->
			<div class="absolute inset-0 bg-[url(/macintosh-frame.png)] bg-size-[100%_100%]"></div>

			<!-- Hack Club logo on border -->
			<img
				src="/macintosh-hc-logo.png"
				alt="Hack Club logo"
				class="absolute w-12 h-12 pointer-events-none z-20"
				style="
				bottom: calc(-1 * clamp(232px, 29vw, 464px) + 8rem);
				left: 5%;
			"
			/>

			<!-- Brushstroke overlay on border -->
			<div
				class="absolute pointer-events-none z-25"
				style="
				top: calc(-1 * clamp(64px, 8vw, 128px));
				left: calc(-1 * clamp(45px, 6vw, 91px));
				right: calc(-1 * clamp(45px, 6vw, 91px));
				bottom: calc(-1 * clamp(232px, 29vw, 464px));
				background-image: url('/brushstroking.png');
				background-size: 100vw 100vh;
				background-repeat: repeat;
				mix-blend-mode: overlay;
				opacity: 0.4;
			"
			></div>

			<!-- Keyboard image -->
			<img
				src="/macintosh-keyboard.png"
				alt="Macintosh keyboard"
				class="absolute pointer-events-none z-30 max-sm:!w-[250%]"
				style="
				bottom: calc(-1 * clamp(232px, 29vw, 464px) - 10px - clamp(0px, 14vw, 180px));
				left: 50%;
				transform: translateX(-50%);
				width: 175%;
				max-width: none;
			"
			/>

			<!-- Scanlines effect -->
			<div
				class="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent bg-[length:100%_6px] bg-repeat-y pointer-events-none opacity-30"
			></div>

			<!-- Rounded container -->
			<!-- Scanlines inside container -->
			<div
				class="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent bg-[length:100%_8px] bg-repeat-y pointer-events-none opacity-20"
			></div>

			<div class="space-y-8 max-sm:space-y-4 relative z-10">
				<h2 class="text-5xl md:text-6xl lg:text-7xl font-pixel leading-tight">
					{title} <img
						src={titleImage}
						alt={titleImageAlt}
						class="h-[0.75em] font-serif italic [image-rendering:pixelated] inline align-middle -translate-y-1.5"
					/>
				</h2>

				<p class="text-xl md:text-2xl opacity-90 font-pixel">
					{description}
					{#if examples.length > 0}
						<br />
						<br />
						Here are some cool projects from past hackathons to get you inspired:
					{/if}
				</p>

				{#if examples.length > 0}
					<ul class="space-y-2 font-pixel text-xl md:text-2xl">
						{#each examples as example}
							<li class="flex items-start">
								<span class="mr-4">•</span>
								<a
									href={example.url}
									target="_blank"
									class="underline mr-2">{example.name}</a
								>by {example.author}
							</li>
						{/each}
					</ul>
				{/if}

				{#if footerText}
					<p class="text-xl md:text-2xl opacity-90 font-pixel leading-relaxed">
						{footerText}
					</p>
				{/if}

				{#if showIdeaGenerator}
					<!-- Bottom section with input -->
					<div class="flex flex-col md:flex-row md:items-end gap-10 pt-8">
						<div>
							<h3 class="text-3xl md:text-4xl font-pixel mb-4">{ideaGeneratorTitle}</h3>
							<button
								class="bg-[#D1E3EE] text-[#061E2D] px-8 py-4 font-pixel text-xl md:text-2xl hover:bg-[#B8D3E0] cursor-pointer max-sm:w-full"
								on:click={dreamIdea}
							>
								{ideaGeneratorButtonText}
							</button>
						</div>

						<div class="flex-1">
							<div
								class="border-2 border-[#D1E3EE] p-6 min-h-40 max-h-40 w-full flex items-start overflow-y-auto idea-output-box"
							>
								{#if ideaText}
									<p class="font-pixel text-xl md:text-2xl text-[#D1E3EE] w-full">
										{ideaText}{#if isTyping}<span class="animate-pulse">|</span>{/if}
									</p>
								{:else if showDice}
									<div class="flex items-center justify-around w-full h-full">
										{#each diceNumbers as diceNumber}
											<img
												src="/dice/dice-{diceNumber}.png"
												alt="Dice showing {diceNumber}"
												class="h-24 w-24 object-contain flex-shrink-0 max-w-[30%] [image-rendering:pixelated]"
											/>
										{/each}
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* Minimal scrollbar styling */
	.idea-output-box::-webkit-scrollbar {
		width: 8px;
	}

	.idea-output-box::-webkit-scrollbar-track {
		background: transparent;
	}

	.idea-output-box::-webkit-scrollbar-thumb {
		background-color: #d1e3ee;
		border-radius: 0;
		border: none;
	}

	.idea-output-box::-webkit-scrollbar-thumb:hover {
		background-color: #d1e3ee;
	}

	.idea-output-box::-webkit-scrollbar-corner {
		background: transparent;
	}

	/* Firefox scrollbar styling */
	.idea-output-box {
		scrollbar-width: auto;
		scrollbar-color: #d1e3ee transparent;
	}
</style>
