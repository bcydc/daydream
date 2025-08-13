export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		locations: [{
			// 49.251722, -123.025447
			lat: 49.251722,
			lng: -123.025447,
			event_name: 'Vancouver',
			city: 'Vancouver',
			state: 'BC',
			country: 'Canada'
		}]
	}
}
// locations.push({
// 	lat: geocodeData.lat,
// 	lng: geocodeData.lng,
// 	event_name,
// 	city: location,
// 	state,
// 	country
// });