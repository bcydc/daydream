<script lang="ts">
	import { onMount } from 'svelte';

	// Particle system
	let particles: Array<{
		id: number;
		x: number;
		y: number;
		opacity: number;
		rotation: number;
		velocityY: number;
		velocityX: number;
		scale: number;
	}> = [];
	let particleIdCounter = 0;
	let particleContainer: HTMLElement | null = null;
	let isTabVisible = true;
	const particleSpeedScale = 0.6;
	let particleInterval: number;

	function createParticle() {
		if (!particleContainer || !isTabVisible) return;

		// Find the visible button - mobile first, then desktop
		const buttons = document.querySelectorAll('a[href="https://forms.hackclub.com/daydream-stickers"]');
		let button = null;

		for (const btn of buttons) {
			const styles = window.getComputedStyle(btn);
			if (styles.display !== 'none') {
				button = btn;
				break;
			}
		}

		if (!button) return;

		const buttonRect = button.getBoundingClientRect();
		const containerRect = particleContainer.getBoundingClientRect();

		// Spawn particles with 16px inset from edges (about half border radius)
		const edgeInset = 16;
		const spawnWidth = buttonRect.width - edgeInset * 2;
		const spawnOffset = edgeInset;

		const particle = {
			id: particleIdCounter++,
			x: buttonRect.left - containerRect.left + spawnOffset + Math.random() * spawnWidth,
			y: buttonRect.top + buttonRect.height / 2 - containerRect.top,
			opacity: 1,
			rotation: Math.random() * 360,
			velocityY: (0.5 + Math.random() * 0.3) * particleSpeedScale,
			velocityX: 0,
			scale: 0.7 + Math.random() * 0.5
		};

		particles = [...particles, particle];
	}

	function updateParticles() {
		if (!isTabVisible) return;

		particles = particles
			.map((particle) => ({
				...particle,
				x: particle.x + particle.velocityX,
				y: particle.y + particle.velocityY,
				opacity: particle.opacity - 0.01,
				rotation: particle.rotation + 2,
				scale: particle.scale
			}))
			.filter((particle) => particle.opacity > 0);
	}

	function animateParticles() {
		updateParticles();
		requestAnimationFrame(animateParticles);
	}

	function handleVisibilityChange() {
		isTabVisible = !document.hidden;
	}

	onMount(() => {
		// Handle tab visibility changes
		document.addEventListener('visibilitychange', handleVisibilityChange);

		// Start particle animation
		animateParticles();

		// Start particle spawning
		particleInterval = setInterval(createParticle, 250);

		// Cleanup
		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			if (particleInterval) {
				clearInterval(particleInterval);
			}
		};
	});
</script>

<!-- Desktop stickers button (bottom left) -->
<a
	href="https://forms.hackclub.com/daydream-stickers"
	target="_blank"
	class="hidden md:block absolute bottom-16 left-16 z-50 w-max px-4 py-2 bg-pink border-b-2 border-b-pink-dark text-white rounded-full active:transform active:translate-y-0.5 transition-all duration-100 font-sans cursor-pointer overflow-visible hover:shadow-[0_2px_0_0_theme(colors.pink.dark)] hover:-translate-y-[2px] active:border-transparent active:shadow-none"
>
	Get free stickers
	<img src="button-clouds.svg" alt="" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto object-contain pointer-events-none" />
	<img src="rock-sticker.png" alt="" class="absolute bottom-2 right-3 translate-2/3 w-18 h-18 object-contain pointer-events-none" style="transform: rotate(-15deg);" />
</a>

<!-- Particle container -->
<div bind:this={particleContainer} class="absolute inset-0 pointer-events-none z-40 opacity-70">
	{#each particles as particle (particle.id)}
		<img
			src="particle.png"
			alt=""
			class="absolute w-3 h-3 pointer-events-none"
			style="left: {particle.x}px; top: {particle.y}px; opacity: {particle.opacity}; transform: rotate({particle.rotation}deg) scale({particle.scale});"
		/>
	{/each}
</div>
