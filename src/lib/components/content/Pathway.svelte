<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';

	export let eventName: string = '';
	export let bgGradient: string = 'bg-gradient-to-b from-[#FCEFC5] to-[#FEC1CF]';
	export let padding: string = 'px-36 max-md:px-8 pb-50 max-sm:pb-24';
	export let cloudsLeft2Image: string = '/clouds-left-2.png';
	export let cloudsLeft3Image: string = '/clouds-left-3.png';
	export let cloudsRight2Image: string = '/clouds-right-2.png';
	export let cloudsPinkLeftImage: string = '/clouds-pink-left.png';
	export let cloudsPinkRightImage: string = '/clouds-pink-right.png';
	export let brushstrokeImage: string = 'brushstroking.png';
	export let signupUrl: string = 'https://example.com';

	function createSmoothPath(points: Array<{ x: number; y: number }>) {
		if (points.length < 2) return '';

		// Create smooth curves that flow horizontally through points
		const tension = 1.2; // Increased control point distance for smoother curves

		// Configurable angles for each point (in degrees)
		// 0 = horizontal, positive = upward slope, negative = downward slope
		const pointAngles = [0, 0, -10, -10, -10, 0, 0]; // Point 0: center, Point 0.5: left curve, Points 1-4: cards, Point 5: final card

		// Generate control points for smooth curves
		const controlPoints = [];

		for (let i = 0; i < points.length; i++) {
			let cp1, cp2;
			const angleRadians = ((pointAngles[i] || 0) * Math.PI) / 180; // Convert to radians

			if (i === 0) {
				// First point - start flowing at specified angle
				const next = points[i + 1];
				const distance = Math.sqrt(Math.pow(next.x - points[i].x, 2) + Math.pow(next.y - points[i].y, 2));

				// Start at specified angle - extend further
				const controlDistance = distance * tension * 0.8;

				cp1 = { x: points[i].x, y: points[i].y };
				cp2 = {
					x: points[i].x + Math.cos(angleRadians) * controlDistance,
					y: points[i].y + Math.sin(angleRadians) * controlDistance
				};
			} else if (i === points.length - 1) {
				// Last point - simple straight-down vertical approach
				const prev = points[i - 1];
				const distance = Math.sqrt(Math.pow(points[i].x - prev.x, 2) + Math.pow(points[i].y - prev.y, 2));

				// Create a simple curve that transitions smoothly to vertical
				const controlDistance = distance * tension * 0.4; // Reduced for simpler curve

				// First control point - minimal horizontal extension from previous point
				cp1 = {
					x: prev.x + (points[i].x - prev.x) * 0.7, // Move most of the way horizontally
					y: prev.y + (points[i].y - prev.y) * 0.3 // Move only slightly vertically
				};

				// Second control point - directly above target for straight-down approach
				cp2 = {
					x: points[i].x, // Directly above the target point
					y: points[i].y - controlDistance * 0.5 // Close approach from above
				};
			} else {
				// Middle points - flow at specified angle through the point
				const prev = points[i - 1];
				const next = points[i + 1];

				// Calculate distances for proportional control
				const prevDistance = Math.sqrt(Math.pow(points[i].x - prev.x, 2) + Math.pow(points[i].y - prev.y, 2));
				const nextDistance = Math.sqrt(Math.pow(next.x - points[i].x, 2) + Math.pow(next.y - points[i].y, 2));

				// Determine if we're going left-to-right or right-to-left based on position in sequence
				const isEven = i % 2 === 0;
				const flowDirection = isEven ? 1 : -1; // Even indices flow right, odd flow left

				// Control distances based on adjacent point distances - extend much further
				const leftControlDistance = prevDistance * tension * 0.7;
				const rightControlDistance = nextDistance * tension * 0.7;

				if (flowDirection > 0) {
					// Flowing left to right at specified angle
					cp1 = {
						x: points[i].x - Math.cos(angleRadians) * leftControlDistance,
						y: points[i].y - Math.sin(angleRadians) * leftControlDistance
					};
					cp2 = {
						x: points[i].x + Math.cos(angleRadians) * rightControlDistance,
						y: points[i].y + Math.sin(angleRadians) * rightControlDistance
					};
				} else {
					// Flowing right to left at specified angle (flip direction)
					cp1 = {
						x: points[i].x + Math.cos(angleRadians) * leftControlDistance,
						y: points[i].y + Math.sin(angleRadians) * leftControlDistance
					};
					cp2 = {
						x: points[i].x - Math.cos(angleRadians) * rightControlDistance,
						y: points[i].y - Math.sin(angleRadians) * rightControlDistance
					};
				}
			}

			controlPoints.push({ cp1, cp2 });
		}

		// Build the smooth path
		let path = `M ${points[0].x} ${points[0].y}`;

		for (let i = 1; i < points.length; i++) {
			const prevControls = controlPoints[i - 1];
			const currControls = controlPoints[i];

			path += ` C ${prevControls.cp2.x} ${prevControls.cp2.y}, ${currControls.cp1.x} ${currControls.cp1.y}, ${points[i].x} ${points[i].y}`;
		}

		return path;
	}

	function getPointAlongPath(points: Array<{ x: number; y: number }>, percentage: number) {
		if (points.length < 2) return { x: 0, y: 0, angle: 0 };

		// Generate the same control points as the path
		const tension = 1.2;
		const pointAngles = [0, 0, -10, -10, -10, 0, 0];
		const controlPoints = [];

		for (let i = 0; i < points.length; i++) {
			let cp1, cp2;
			const angleRadians = ((pointAngles[i] || 0) * Math.PI) / 180;

			if (i === 0) {
				const next = points[i + 1];
				const distance = Math.sqrt(Math.pow(next.x - points[i].x, 2) + Math.pow(next.y - points[i].y, 2));
				const controlDistance = distance * tension * 0.8;

				cp1 = { x: points[i].x, y: points[i].y };
				cp2 = {
					x: points[i].x + Math.cos(angleRadians) * controlDistance,
					y: points[i].y + Math.sin(angleRadians) * controlDistance
				};
			} else if (i === points.length - 1) {
				const prev = points[i - 1];
				const distance = Math.sqrt(Math.pow(points[i].x - prev.x, 2) + Math.pow(points[i].y - prev.y, 2));
				const controlDistance = distance * tension * 0.4;

				cp1 = {
					x: prev.x + (points[i].x - prev.x) * 0.7,
					y: prev.y + (points[i].y - prev.y) * 0.3
				};

				cp2 = {
					x: points[i].x,
					y: points[i].y - controlDistance * 0.5
				};
			} else {
				const prev = points[i - 1];
				const next = points[i + 1];

				const prevDistance = Math.sqrt(Math.pow(points[i].x - prev.x, 2) + Math.pow(points[i].y - prev.y, 2));
				const nextDistance = Math.sqrt(Math.pow(next.x - points[i].x, 2) + Math.pow(next.y - points[i].y, 2));

				const isEven = i % 2 === 0;
				const flowDirection = isEven ? 1 : -1;

				const leftControlDistance = prevDistance * tension * 0.7;
				const rightControlDistance = nextDistance * tension * 0.7;

				if (flowDirection > 0) {
					cp1 = {
						x: points[i].x - Math.cos(angleRadians) * leftControlDistance,
						y: points[i].y - Math.sin(angleRadians) * leftControlDistance
					};
					cp2 = {
						x: points[i].x + Math.cos(angleRadians) * rightControlDistance,
						y: points[i].y + Math.sin(angleRadians) * rightControlDistance
					};
				} else {
					cp1 = {
						x: points[i].x + Math.cos(angleRadians) * leftControlDistance,
						y: points[i].y + Math.sin(angleRadians) * leftControlDistance
					};
					cp2 = {
						x: points[i].x - Math.cos(angleRadians) * rightControlDistance,
						y: points[i].y - Math.sin(angleRadians) * rightControlDistance
					};
				}
			}

			controlPoints.push({ cp1, cp2 });
		}

		// Calculate which segment and position within that segment
		const segmentCount = points.length - 1;
		const segmentPercentage = percentage * segmentCount;
		const segmentIndex = Math.floor(segmentPercentage);
		const t = segmentPercentage - segmentIndex;

		// Clamp to valid range
		const clampedIndex = Math.min(segmentIndex, segmentCount - 1);
		const clampedT = clampedIndex === segmentIndex ? t : 1;

		// Get the Bézier curve points for this segment
		const p0 = points[clampedIndex];
		const p1 = controlPoints[clampedIndex].cp2;
		const p2 = controlPoints[clampedIndex + 1].cp1;
		const p3 = points[clampedIndex + 1];

		// Calculate position on cubic Bézier curve
		const x = Math.pow(1 - clampedT, 3) * p0.x + 3 * Math.pow(1 - clampedT, 2) * clampedT * p1.x + 3 * (1 - clampedT) * Math.pow(clampedT, 2) * p2.x + Math.pow(clampedT, 3) * p3.x;

		const y = Math.pow(1 - clampedT, 3) * p0.y + 3 * Math.pow(1 - clampedT, 2) * clampedT * p1.y + 3 * (1 - clampedT) * Math.pow(clampedT, 2) * p2.y + Math.pow(clampedT, 3) * p3.y;

		// Calculate tangent for rotation
		const dx = 3 * Math.pow(1 - clampedT, 2) * (p1.x - p0.x) + 6 * (1 - clampedT) * clampedT * (p2.x - p1.x) + 3 * Math.pow(clampedT, 2) * (p3.x - p2.x);

		const dy = 3 * Math.pow(1 - clampedT, 2) * (p1.y - p0.y) + 6 * (1 - clampedT) * clampedT * (p2.y - p1.y) + 3 * Math.pow(clampedT, 2) * (p3.y - p2.y);

		let angle = (Math.atan2(dy, dx) * 180) / Math.PI;

		// Keep the plane oriented to follow the curve naturally
		// Allow flipping but ensure it's always pointing in the direction of travel

		return { x, y, angle };
	}

	function setupPlaneAnimation() {
		const container = document.getElementById('islands-container');
		const airplane = document.getElementById('paper-airplane');

		if (!container || !airplane) return;

		// Create an object to animate progress
		const planeProgress = { value: 0 };

		// Get points for path calculation
		const getPoints = () => {
			const containerRect = container.getBoundingClientRect();
			const points: Array<{ x: number; y: number }> = [];
			const pointIds = ['0', '0.5', '1', '2', '3', '4', '5'];
			pointIds.forEach((id) => {
				const element = document.querySelector(`[data-point="${id}"]`);
				if (element) {
					const rect = element.getBoundingClientRect();
					points.push({
						x: rect.left + rect.width / 2 - containerRect.left,
						y: rect.top + rect.height / 2 - containerRect.top
					});
				}
			});
			return points;
		};

		// Update function that gets called as progress changes
		const updatePlanePosition = () => {
			const points = getPoints();
			if (points.length > 0) {
				const airplanePos = getPointAlongPath(points, planeProgress.value);

				gsap.set(airplane, {
					left: `${airplanePos.x}px`,
					top: `${airplanePos.y}px`,
					rotation: airplanePos.angle,
					scaleY: Math.abs(airplanePos.angle) > 90 ? -1 : 1,
					transformOrigin: 'center center',
					transform: `translate(-50%, calc(-50% - 0.5rem))`
				});
			}
		};

		// Create animation timeline
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				start: 'top 100%',
				end: 'bottom 100%',
				scrub: 1.5
				// markers: true,
			}
		});

		// Animate the progress value
		tl.to(planeProgress, {
			value: 1,
			duration: 1,
			ease: 'none',
			onUpdate: updatePlanePosition
		});

		return tl;
	}

	function updatePath() {
		const container = document.getElementById('islands-container');
		const pathElement = document.getElementById('dotted-path');

		if (!container || !pathElement) return;

		const containerRect = container.getBoundingClientRect();
		const points: Array<{ x: number; y: number }> = [];

		// Get points in order by data-point attribute
		const pointIds = ['0', '0.5', '1', '2', '3', '4', '5'];
		pointIds.forEach((id) => {
			const element = document.querySelector(`[data-point="${id}"]`);
			if (element) {
				const rect = element.getBoundingClientRect();
				points.push({
					x: rect.left + rect.width / 2 - containerRect.left,
					y: rect.top + rect.height / 2 - containerRect.top
				});
			}
		});

		const pathData = createSmoothPath(points);
		pathElement.setAttribute('d', pathData);
	}

	onMount(() => {
		// Register GSAP plugins
		gsap.registerPlugin(ScrollTrigger);

		// Initial path calculation
		setTimeout(() => {
			updatePath();
			setupPlaneAnimation();
		}, 100);

		// Update on resize
		const handleResize = () => {
			updatePath();
			ScrollTrigger.refresh();
		};
		window.addEventListener('resize', handleResize);

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	});
</script>

<!-- Gamejam Text Section -->
<div class="w-full bg-[#FCEFC5] flex justify-center py-16 relative overflow-hidden max-h-[400px]">
	<!-- Cloud backdrop for gamejam text -->
	<div class="absolute inset-0 w-full h-full pointer-events-none z-1">
		<img src="/cloud-cover-1.png" alt="" class="w-full h-full object-cover" />
		<div class="absolute top-1/2 left-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2" data-point="0"></div>
		<div class="absolute top-1/2 left-1/4 w-1 h-1 -translate-x-1/2 -translate-y-1/2" data-point="0.5"></div>
	</div>

	<div class="relative w-10/12 h-auto object-contain cursor-text flex flex-row max-lg:flex-wrap md:translate-y-0 max-lg:translate-y-1/5 items-center justify-center align-middle max-w-5xl z-50">
		<img src="gamejam-1-alt.png" alt="Here's How You Win a" class="flex-shrink min-w-0 object-contain" />
		<img src="gamejam-2.png" alt="Game Jam" class="flex-shrink min-w-0 object-contain" />
	</div>
</div>

<div class="flex flex-row flex-wrap w-full h-auto {bgGradient} {padding} relative" id="islands-container">
	<img src={cloudsLeft2Image} alt="" class="absolute left-0 w-3/12 top-12 pointer-events-none" />
	<img src={cloudsLeft3Image} alt="" class="absolute left-0 w-2/12 bottom-32 pointer-events-none" />
	<img src={cloudsRight2Image} alt="" class="absolute right-0 w-3/12 bottom-0 pointer-events-none" />

	<!-- SVG Path Overlay -->
	<svg class="absolute inset-0 w-full h-full pointer-events-none z-0" id="path-svg">
		<path id="dotted-path" stroke="rgba(255,255,255,0.5)" stroke-width="3" fill="none" stroke-dasharray="8,8" opacity="0.7"></path>
	</svg>

	<img src="paper-airplane.png" alt="Paper airplane" class="h-16 absolute" id="paper-airplane" />

	<div class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full z-10">
		<div class="relative translate-y-8 max-md:translate-y-4 z-30">
			<img src="/letter-1-front.png" alt="" class="object-contain absolute -bottom-16 -left-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.7s] z-20" />
			<img src="/letter-1-back.png" alt="" class="object-contain absolute -bottom-16 -left-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.7s] z-10" />
			<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:1.7s] z-20" data-point="1">
				<img src="paper1.png" alt="" class="w-full h-full object-contain" />
				<div class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
					<span class="font-sans text-[#E472AB] font-bold text-[1.3rem] mr-1">#1:</span> <a href={signupUrl} class="underline">Sign up</a> for Daydream {eventName}
				</div>
			</div>
		</div>
		<img src="/island-1.png" alt="" class="w-72 h-72 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:0.8s] z-0" />
	</div>

	<div class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full translate-y-24 max-md:translate-y-8 z-10">
		<div class="relative translate-y-24 max-md:translate-y-4 z-30">
			<img src="/letter-2-front.png" alt="" class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.1s] z-20" />
			<img src="/letter-2-back.png" alt="" class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.1s] z-10" />
			<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:0.3s] z-20" data-point="2">
				<img src="paper2.png" alt="" class="w-full h-full object-contain" />
				<div class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
					<span class="font-sans text-[#639DEB] font-bold text-[1.3rem] mr-1">#2:</span> Attend a workshop and learn about game development
				</div>
			</div>
		</div>
		<img src="/island-3.png" alt="" class="w-86 h-86 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:1.2s] z-0" />
	</div>
	<div class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full -translate-x-12 max-md:translate-x-0 max-md:translate-y-8 z-10">
		<div class="relative translate-y-8 max-md:translate-y-4 z-30">
			<img src="/letter-3-front.png" alt="" class="object-contain absolute -bottom-18 left-24 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.9s] z-20" />
			<img src="/letter-3-back.png" alt="" class="object-contain absolute -bottom-18 left-24 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:0.9s] z-10" />
			<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:1.4s] z-20" data-point="3">
				<img src="paper3.png" alt="" class="w-full h-full object-contain" />
				<div class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
					<span class="font-sans text-[#AB68E2] font-bold text-[1.3rem] mr-1">#3:</span> Find a team of other teenagers at the event
				</div>
			</div>
		</div>
		<img src="/island-2.png" alt="" class="w-72 h-72 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:2.1s] z-0" />
	</div>
	<div class="flex flex-col items-center w-max basis-1/2 max-md:basis-full max-md:w-full translate-y-30 max-md:translate-y-8 z-10">
		<div class="relative translate-y-24 max-md:translate-y-4 z-30">
			<img src="/letter-4-front.png" alt="" class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.6s] z-20" />
			<img src="/letter-4-back.png" alt="" class="object-contain absolute -bottom-16 -right-13 w-28 h-28 animate-hover ![--hover:-0.25rem] ![animation-delay:1.6s] z-10" />
			<div class="relative w-72 h-40 max-md:w-80 animate-hover ![--hover:-0.15rem] ![animation-delay:2.3s] z-20" data-point="4">
				<img src="paper4.png" alt="" class="w-full h-full object-contain" />
				<div class="absolute inset-0 justify-center text-center p-6 text-xl font-serif max-md:text-lg text-[#8B4513] inline-block content-center">
					<span class="font-sans text-[#F2993E] font-bold text-[1.3rem] mr-1">#4:</span> Start building your game - <em>no experience needed</em>
				</div>
			</div>
		</div>
		<img src="/island-4.png" alt="" class="w-88 h-88 object-contain max-md:w-64 max-md:h-64 animate-hover ![--hover:-0.25rem] ![animation-delay:0.5s] z-0" />
	</div>

	<!-- Final Card -->
	<div class="flex flex-col items-center w-full basis-full translate-y-40 max-md:translate-y-12 z-20">
		<div class="relative">
			<div
				class="bg-[url('/card-final.png')] bg-contain bg-no-repeat bg-center text-2xl font-serif pt-24 px-8 w-128 h-96 text-center max-md:w-80 max-md:h-80 max-md:text-xl max-md:pt-16 animate-hover ![--hover:-0.15rem] ![animation-delay:1.9s]"
				data-point="5"
			>
				<span class="font-sans text-[#F2CC32] font-bold text-[1.5rem] mr-1">#5:</span> Share what you made with the world!
			</div>
		</div>
	</div>

	<img src={cloudsPinkLeftImage} alt="" class="absolute left-0 w-5/12 bottom-0 translate-y-32 z-50 pointer-events-none" />
	<img src={cloudsPinkRightImage} alt="" class="absolute right-0 w-5/12 bottom-0 translate-y-32 z-50 pointer-events-none" />

	<div class="absolute top-0 left-0 w-full h-full bg-[url('{brushstrokeImage}')] bg-size-[100vw_100vh] bg-repeat mix-blend-overlay opacity-60 pointer-events-none bg-position-[0_100vh]"></div>
</div>