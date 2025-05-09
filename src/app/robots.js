export const dynamic = "force-static"
export const revalidate = false

export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
      sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
    }
  }