import type { APIRoute } from "astro";

const robotsTxt = `
User-agent: bingbot
Allow: /

User-agent: Googlebot
Allow: /

User-agent: googlebot-image
Disallow: /

User-agent: googlebot-mobile
Disallow: /

User-agent: baiduspider
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: *
Allow: /*?$
Allow: .css$
Allow: .js$
Disallow: .jpg$
Disallow: .jpeg$
Disallow: .png$
Disallow: .gif$
Disallow: .webp$
Disallow: .avif$
Disallow: .svg$
Disallow: /
Disallow: /_astro/
Disallow: /pagefind/
Disallow: /*?

Sitemap: ${new URL("sitemap-index.xml", import.meta.env.SITE).href}
`.trim();

export const GET: APIRoute = () => {
	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	});
};
