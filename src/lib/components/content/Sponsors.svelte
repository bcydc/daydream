<script lang="ts">
	export let sponsors: { image: string; name: string; url: string }[];
	export let sponsorsEnabled: boolean = true;
	export let contactLink: string = '';
	export let eventName: string = '';
</script>

{#if sponsorsEnabled}
	<!-- Second Billboard Section -->
	<div class="w-full bg-[#FCEFC5] pb-16 pt-6 px-8 flex justify-center">
		<div class="relative max-w-4xl w-full">
			<!-- Billboard Container -->
			<div
				class="relative bg-[#f0f9ff] border-[10px] border-b-[16px] border-[#888896] rounded-lg rounded-b-xl mx-auto z-40"
			>
				<!-- Header Section -->
				<div
					class="w-full bg-[url('/daydream-media/billboard-bg-texture.png')] bg-contain bg-repeat py-6 relative"
					style="border-bottom: 8px solid #B4B4C5;"
				>
					<h2 class="text-4xl font-serif text-[#F0F0FF] text-center">Sponsors</h2>
					<!-- Brush texture overlay for header -->
					<div
						class="absolute top-0 left-0 w-full h-full bg-[url('/daydream-media/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
					></div>
				</div>

				<!-- Main Content Area -->
				<div class="relative bg-gradient-to-b from-[#CCF4FD] to-[#AECDF6] px-8 pt-8 pb-16">
					<!-- Brush texture overlay for content -->
					<div
						class="absolute top-0 left-0 w-full h-full bg-[url('/daydream-media/brushstroking.png')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none"
					></div>

					<!-- Sponsors Grid -->
					<div class="relative z-10 min-h-40">
						{#if sponsors.length > 0}
							<!-- First row (up to 4 sponsors) -->
							{#if sponsors.length > 4}
								<div
									class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-8"
								>
									{#each sponsors.slice(0, 4) as sponsor}
										<a
											href={sponsor.url}
											class="bg-white/20 rounded-lg p-4 w-full h-20 flex items-center justify-center hover:bg-white/40 transition-colors"
											target="_blank"
											rel="noopener noreferrer"
										>
											<img
												src={sponsor.image}
												alt={sponsor.name}
												class="max-w-full max-h-full object-contain"
											/>
										</a>
									{/each}
								</div>

								<!-- Second row (remaining sponsors, centered) -->
								{#if sponsors.length > 4}
									<div class="flex justify-center">
										<div
											class="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center max-w-2xl"
										>
											{#each sponsors.slice(4) as sponsor, index}
												<a
													href={sponsor.url}
													class="bg-white/20 rounded-lg p-4 w-full h-20 flex items-center justify-center hover:bg-white/40 transition-colors {sponsors.slice(
														4
													).length === 3 && index === 2
														? 'md:col-span-1 col-span-2 max-w-xs mx-auto'
														: ''}"
													target="_blank"
													rel="noopener noreferrer"
												>
													<img
														src={sponsor.image}
														alt={sponsor.name}
														class="max-w-full max-h-full object-contain"
													/>
												</a>
											{/each}
										</div>
									</div>
								{/if}
							{:else}
								<!-- Single row for 4 or fewer sponsors -->
								<div class="flex justify-center">
									<div
										class="grid gap-8 items-center justify-items-center max-w-4xl {sponsors.length ===
										1
											? 'grid-cols-1'
											: sponsors.length === 2
												? 'grid-cols-1 md:grid-cols-2'
												: sponsors.length === 3
													? 'grid-cols-2 md:grid-cols-3'
													: 'grid-cols-2 md:grid-cols-4'}"
									>
										{#each sponsors as sponsor}
											<a
												href={sponsor.url}
												class="bg-white/20 rounded-lg p-4 w-full h-20 flex items-center justify-center hover:bg-white/40 transition-colors"
												target="_blank"
												rel="noopener noreferrer"
											>
												<img
													src={sponsor.image}
													alt={sponsor.name}
													class="max-w-full max-h-full object-contain"
												/>
											</a>
										{/each}
									</div>
								</div>
							{/if}
						{/if}

						{#if contactLink}
							<!-- Call to action for sponsors -->
							<div class="mt-8 text-center">
								<p class="text-lg text-[#335969]">
									Want to sponsor Daydream {eventName}?
									<a href={contactLink} class="underline hover:text-[#477783] transition-colors"
										>Get in touch</a
									>
								</p>
							</div>
						{/if}
					</div>
				</div>

				<!-- Billboard Bars (bottom) -->
				<div
					class="absolute bottom-0 -left-[5px] w-[calc(100%+10px)] h-6 bg-[url('/daydream-media/billboard-bars.png')] bg-repeat-x bg-contain bg-center pointer-events-none z-10 border-[#9898a7] border-x-[6px]"
				></div>
			</div>

			<!-- Connecting Pillars to First Billboard -->
			<div
				class="absolute top-0 left-[15%] w-[10vw] max-w-12 h-32 bg-[url('/daydream-media/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain -translate-y-32"
				style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
			></div>
			<div
				class="absolute top-0 right-[15%] w-[10vw] max-w-12 h-32 bg-[url('/daydream-media/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain -translate-y-32"
				style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
			></div>

			<!-- Billboard Pillars (extending down from bottom) -->
			<div
				class="absolute bottom-0 left-[15%] w-[10vw] max-w-12 h-24 bg-[url('/daydream-media/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain translate-y-24"
				style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
			>
				<div
					class="absolute bottom-0 left-0 w-full h-auto bg-[url('/daydream-media/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"
				></div>
			</div>
			<div
				class="absolute bottom-0 right-[15%] w-[10vw] max-w-12 h-24 bg-[url('/daydream-media/billboard-pillar.png')] bg-repeat-y pointer-events-none bg-contain translate-y-24"
				style="box-shadow: inset 0 8px 12px -6px rgba(0, 0, 0, 0.1);"
			>
				<div
					class="absolute bottom-0 left-0 w-full h-auto bg-[url('/daydream-media/clouds-loop.png')] bg-no-repeat bg-contain bg-bottom pointer-events-none aspect-[2/1]"
				></div>
			</div>
		</div>
	</div>
{/if}
