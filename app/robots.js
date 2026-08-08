export const dynamic = 'force-static';

export default function robots() {
  const baseUrl = 'https://miusoftgames.github.io/FeatherFly';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
