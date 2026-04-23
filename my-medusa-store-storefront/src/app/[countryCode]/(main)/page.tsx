import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { BannerCarousel } from "@modules/home/components/banner-carousel"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getBanners } from "@lib/data/banners"

export const metadata: Metadata = {
  title: "Super Shop",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)
  const banners = await getBanners()

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      {banners && banners.length > 0 ? (
        <BannerCarousel banners={banners} />
      ) : (
        <Hero />
      )}
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
