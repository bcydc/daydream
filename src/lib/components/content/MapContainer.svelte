<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let eventAddress: string = '';
	export let eventName: string = '';
	export let directionsURL: string = '';
	export let mapHeight: string = 'h-156';
	export let mapSrc: string = '/map';
	export let eventMapSrc: string = '/event-map';
	export let title: string = 'Daydream Events Map';
	export let bgColor: string = 'bg-[#acd4e0]';
	export let showAddress: boolean = true;

	onMount(() => {
		if (browser) {
			// Mouse trail setup
			let mouseTrailPoints: Array<{ x: number; y: number }> = [];
			const maxTrailLength = 15;
			let animationId: number;

			// Rainbow trail configuration - adjust these to tune the effect
			const colorChangeSpeed = 400; // Lower = faster color changes (was 800)
			const trailColorSpan = 25; // Degrees of color variation across trail length (was 15)
			const trailThicknessStart = 3; // Path thickness at tail (oldest points)
			const trailThicknessEnd = 8; // Path thickness at mouse (newest points)

			function getHueFromIndex(index: number): number {
				return (index * 24) % 360; // Rainbow cycle through hues
			}

			function updateMouseTrail(e: MouseEvent) {
				// Get fresh references to all SVG containers
				const svgs = [
					document.querySelector('#trail-svg-blur')
					// document.querySelector('#trail-svg-main')
				];
				if (svgs.find((svg) => !svg)) return;

				const x = e.clientX;
				const y = e.clientY;

				mouseTrailPoints.push({ x, y });

				// Keep trail at max length
				if (mouseTrailPoints.length > maxTrailLength) {
					mouseTrailPoints.shift();
				}

				// Clear existing paths and gradients
				if (mouseTrailPoints.length > 1) {
					svgs.forEach((svg: any) => {
						// Clear old elements
						const oldPaths = svg.querySelectorAll('.trail-segment');
						const oldGradients = svg.querySelectorAll('.segment-gradient');
						oldPaths.forEach((path: any) => path.remove());
						oldGradients.forEach((grad: any) => grad.remove());

						// Ensure defs exists
						let defs = svg.querySelector('defs');
						if (!defs) {
							defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
							svg.appendChild(defs);
						}
					});

					// Create individual path segments with gradient colors
					for (let i = 0; i < mouseTrailPoints.length - 1; i++) {
						const progress = i / (mouseTrailPoints.length - 1);
						const nextProgress = (i + 1) / (mouseTrailPoints.length - 1);

						// Base color changes slowly over time, with subtle variations along trail
						const baseHue = getHueFromIndex(Date.now() / colorChangeSpeed);
						const hue1 = baseHue - progress * trailColorSpan;
						const hue2 = baseHue - nextProgress * trailColorSpan;

						// Create paths in all SVGs
						svgs.forEach((svg: any, svgIndex: number) => {
							if (!svg) return;

							const defs = svg.querySelector('defs');
							if (!defs) return;

							// Create gradient for this segment (unique ID per SVG)
							const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
							gradient.classList.add('segment-gradient');
							gradient.setAttribute('id', `segment-gradient-${svgIndex}-${i}`);
							gradient.setAttribute('x1', '0%');
							gradient.setAttribute('y1', '0%');
							gradient.setAttribute('x2', '100%');
							gradient.setAttribute('y2', '0%');

							const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
							stop1.setAttribute('offset', '0%');
							stop1.setAttribute('stop-color', `hsl(${hue1}, 70%, 60%)`);

							const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
							stop2.setAttribute('offset', '100%');
							stop2.setAttribute('stop-color', `hsl(${hue2}, 70%, 60%)`);

							gradient.appendChild(stop1);
							gradient.appendChild(stop2);
							defs.appendChild(gradient);

							// Create path with gradient stroke - bigger at mouse (newest), smaller at tail (oldest)
							const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
							path.classList.add('trail-segment');
							path.setAttribute('d', `M${mouseTrailPoints[i].x},${mouseTrailPoints[i].y} L${mouseTrailPoints[i + 1].x},${mouseTrailPoints[i + 1].y}`);
							path.setAttribute('stroke', `url(#segment-gradient-${svgIndex}-${i})`);
							path.setAttribute('stroke-width', `${trailThicknessStart + (trailThicknessEnd - trailThicknessStart) * progress}`);
							path.setAttribute('stroke-linecap', 'round');
							path.setAttribute('stroke-linejoin', 'round');
							path.setAttribute('fill', 'none');

							svg.appendChild(path);
						});
					}
				}
			}

			function clearMouseTrail() {
				mouseTrailPoints = [];
				const svgs = [
					document.querySelector('#trail-svg-blur')
					// document.querySelector('#trail-svg-main')
				];
				svgs.forEach((svg: any) => {
					if (svg) {
						const oldPaths = svg.querySelectorAll('.trail-segment');
						oldPaths.forEach((path: any) => path.remove());
					}
				});
			}

			// Trail fade animation - only remove points every few frames
			let frameCount = 0;
			function animateTrail() {
				frameCount++;

				// Only remove points every 3 frames to slow down the fade
				if (frameCount % 3 === 0 && mouseTrailPoints.length > 0) {
					mouseTrailPoints.shift();

					// Redraw trail segments with updated colors
					const svgs = [
						document.querySelector('#trail-svg-blur')
						// document.querySelector('#trail-svg-main')
					];
					if (mouseTrailPoints.length > 1 && !svgs.find((svg) => !svg)) {
						svgs.forEach((svg: any) => {
							// Clear old elements
							const oldPaths = svg.querySelectorAll('.trail-segment');
							const oldGradients = svg.querySelectorAll('.segment-gradient');
							oldPaths.forEach((path: any) => path.remove());
							oldGradients.forEach((grad: any) => grad.remove());

							// Ensure defs exists
							let defs = svg.querySelector('defs');
							if (!defs) {
								defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
								svg.appendChild(defs);
							}
						});

						// Redraw segments with gradients
						for (let i = 0; i < mouseTrailPoints.length - 1; i++) {
							const progress = i / (mouseTrailPoints.length - 1);
							const nextProgress = (i + 1) / (mouseTrailPoints.length - 1);

							// Base color changes slowly over time, with subtle variations along trail
							const baseHue = getHueFromIndex(Date.now() / colorChangeSpeed);
							const hue1 = baseHue - progress * trailColorSpan;
							const hue2 = baseHue - nextProgress * trailColorSpan;

							// Create paths in all SVGs
							svgs.forEach((svg: any, svgIndex: number) => {
								if (!svg) return;

								const defs = svg.querySelector('defs');
								if (!defs) return;

								// Create gradient
								const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
								gradient.classList.add('segment-gradient');
								gradient.setAttribute('id', `segment-gradient-${svgIndex}-${i}`);
								gradient.setAttribute('x1', '0%');
								gradient.setAttribute('y1', '0%');
								gradient.setAttribute('x2', '100%');
								gradient.setAttribute('y2', '0%');

								const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
								stop1.setAttribute('offset', '0%');
								stop1.setAttribute('stop-color', `hsl(${hue1}, 70%, 60%)`);

								const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
								stop2.setAttribute('offset', '100%');
								stop2.setAttribute('stop-color', `hsl(${hue2}, 70%, 60%)`);

								gradient.appendChild(stop1);
								gradient.appendChild(stop2);
								defs.appendChild(gradient);

								// Create path - bigger at mouse (newest), smaller at tail (oldest)
								const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
								path.classList.add('trail-segment');
								path.setAttribute('d', `M${mouseTrailPoints[i].x},${mouseTrailPoints[i].y} L${mouseTrailPoints[i + 1].x},${mouseTrailPoints[i + 1].y}`);
								path.setAttribute('stroke', `url(#segment-gradient-${svgIndex}-${i})`);
								path.setAttribute('stroke-width', `${trailThicknessStart + (trailThicknessEnd - trailThicknessStart) * progress}`);
								path.setAttribute('stroke-linecap', 'round');
								path.setAttribute('stroke-linejoin', 'round');
								path.setAttribute('fill', 'none');

								svg.appendChild(path);
							});
						}
					}
				}

				animationId = requestAnimationFrame(animateTrail);
			}

			// Wait for DOM and get elements
			setTimeout(() => {
				const svgs = [
					document.querySelector('#trail-svg-blur')
					// document.querySelector('#trail-svg-main')
				];

				if (!svgs.find((svg) => !svg)) {
					// Event listeners
					document.addEventListener('mousemove', updateMouseTrail);
					document.addEventListener('mouseleave', clearMouseTrail);

					// Start animation loop
					animateTrail();
				}
			}, 100);

			// Cleanup function
			return () => {
				document.removeEventListener('mousemove', updateMouseTrail);
				document.removeEventListener('mouseleave', clearMouseTrail);
				if (animationId) {
					cancelAnimationFrame(animationId);
				}
			};
		}
	});
</script>

<!-- Mouse trailer SVGs -->
<!-- Background blurred layer -->
<!-- svelte-ignore component_name_lowercase -->
<svg id="trail-svg-blur" class="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]" style="filter: blur(10px); opacity: 0.75">
	<!-- Individual path segments will be added here dynamically -->
</svg>

<!-- Foreground sharp layer -->
<!-- svelte-ignore component_name_lowercase -->
<svg id="trail-svg-main" class="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]" style="filter: blur(3px) saturate(0) brightness(1000); opacity: 0.25">
	<!-- Individual path segments will be added here dynamically -->
</svg>

<!-- Map container with cloudy edges -->
<div class="w-full max-w-5xl lg:max-w-6xl mx-auto px-2 md:px-8">
	<div class="relative w-full {mapHeight} overflow-hidden bg-transparent">
		<img
			src="/map-vancouver.png"
			alt="Vancouver Map"
			class="w-full h-full object-cover {bgColor}"
			style="
			mask-image: 
				linear-gradient(white, white),
				url('/daydream-media/clouds-loop-mask-2.png'),
				url('/daydream-media/clouds-loop-mask-1.png'),
				url('/daydream-media/clouds-loop-mask-3.png'),
				url('/daydream-media/clouds-loop-mask-4.png'),
				url('/daydream-media/cloud-corner-1.png'),
				url('/daydream-media/cloud-corner-2.png'),
				url('/daydream-media/cloud-corner-3.png'),
				url('/daydream-media/cloud-corner-4.png');
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
				url('/daydream-media/clouds-loop-mask-2.png'),
				url('/daydream-media/clouds-loop-mask-1.png'),
				url('/daydream-media/clouds-loop-mask-3.png'),
				url('/daydream-media/clouds-loop-mask-4.png'),
				url('/daydream-media/cloud-corner-1.png'),
				url('/daydream-media/cloud-corner-2.png'),
				url('/daydream-media/cloud-corner-3.png'),
				url('/daydream-media/cloud-corner-4.png');
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
		/>
	</div>

	<!-- {#if eventAddress && showAddress}
		<p class="text-center font-sans text-2xl pt-12 max-sm:text-xl text-[#60574b] z-10000">
			{#if directionsURL}
				Daydream {eventName} is taking place at
				<a class="underline text-pink" href={directionsURL}>{eventAddress}</a>!
			{:else}
				Daydream {eventName} is taking place at <span class="underline">{eventAddress}</span>!
			{/if}
		</p>
	{/if} -->

	<p class="text-center font-sans text-2xl pt-12 max-sm:text-xl text-[#60574b] z-10000">
		Daydream {eventName} is taking place at the <a class="underline text-pink" href="https://maps.app.goo.gl/mq9Zh7HPyg29d8Ht6" target="_blank" rel="noopener noreferrer">BCIT Downtown Campus</a>!
	</p>

<p class="text-center font-sans text-2xl pt-12 max-sm:text-xl text-[#60574b] z-10000 flex items-center justify-center gap-2">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="inline-block w-10 h-10 text-pink-600 fill-current"
><path
d="M168 0C75.1 0 0 75.1 0 168c0 87.6 135.5 304.7 146.2 321.2c4.5 6.9 12.1 11 20.2 11s15.7-4.1 20.2-11C216.5 472.7 352 255.6 352 168C352 75.1 276.9 0 184 0zm0 240c-39.8 0-72-32.2-72-72s32.2-72 72-72s72 32.2 72 72s-32.2 72-72 72z"
/></svg
>
<a class="underline text-pink" href="https://maps.app.goo.gl/mq9Zh7HPyg29d8Ht6" target="_blank" rel="noopener noreferrer">{eventAddress}</a>
</p>

<!-- BCIT Photos Grid -->
<div class="w-full max-w-4xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2 pb-6">
  {#each Array(6) as _, i}
    <img
      src={"/bcit/" + (i + 1) + ".jpg"}
      alt={"BCIT photo " + (i + 1)}
      class="w-full h-64 object-cover rounded-lg shadow"
      loading="lazy"
    />
  {/each}
</div>

	
</div>
