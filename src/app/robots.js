export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/favoris'] }],
    sitemap: 'https://autimmob.fr/sitemap.xml',
    host: 'https://autimmob.fr',
  }
}
