export const prerender = false;

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	return {
		locations: [{
			// 49.251722, -123.025447
			lat: 49.251722,
			lng: -123.025447,
			event_name: 'Vancouver',
			city: 'Vancouver',
			state: 'BC',
			country: 'Canada'
		}],
		geocoded: null
	};
}
