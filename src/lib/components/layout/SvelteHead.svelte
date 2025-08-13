<script lang="ts">
	export let pageTitle: string = 'Daydream - Game Jam for High Schoolers';
	export let pageDescription: string = 'Join us for Daydream, the world\'s biggest Game Jam happening simultaneously in 100 cities. Make games, learn new skills, and meet other teenagers!';
	export let pageKeywords: string = 'game jam, hackathon, high school, teenagers, game development, hack club';
	export let currentUrl: string = 'https://daydream.hackclub.com';
	export let ogImage: string = 'https://daydream.hackclub.com/og.png';
	export let ogImageWidth: string = '1200';
	export let ogImageHeight: string = '630';
	export let twitterImage: string = 'https://daydream.hackclub.com/og-image.png';
	export let twitterCreator: string = '@hackclub';
	export let twitterSite: string = '@hackclub';
	export let siteName: string = 'Daydream';
	export let author: string = 'Hack Club';
	export let analyticsDomain: string = 'daydream.hackclub.com';
	export let analyticsScript: string = 'https://plausible.io/js/script.js';
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta name="keywords" content={pageKeywords} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={currentUrl} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content={ogImageWidth} />
	<meta property="og:image:height" content={ogImageHeight} />
	<meta property="og:site_name" content={siteName} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={currentUrl} />
	<meta property="twitter:title" content={pageTitle} />
	<meta property="twitter:description" content={pageDescription} />
	<meta property="twitter:image" content={twitterImage} />
	<meta property="twitter:creator" content={twitterCreator} />
	<meta property="twitter:site" content={twitterSite} />

	<!-- Additional SEO -->
	<meta name="robots" content="index, follow" />
	<meta name="author" content={author} />
	<link rel="canonical" href={currentUrl} />

	<!-- Analytics -->
	<script defer data-domain={analyticsDomain} src={analyticsScript}></script>
</svelte:head>
