"use client"

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export const BannerCarousel = ({ banners }: { banners: any[] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])

    if (!banners || banners.length === 0) {
        return null
    }

    return (
        <div className="relative overflow-hidden w-full max-w-[1440px] mx-auto group" ref={emblaRef}>
            <div className="flex">
                {banners.map((banner, index) => (
                    <div className="flex-[0_0_100%] min-w-0 relative" key={banner.id || index}>
                        <a href={banner.target_url || "#"} className="block group-hover:cursor-pointer">
                            <img
                                src={banner.image_url}
                                alt={banner.title}
                                className="w-full h-auto max-h-[500px] object-cover"
                            />
                        </a>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-colors ${index === selectedIndex ? 'bg-ui-fg-base' : 'bg-ui-fg-subtle opacity-50'
                            }`}
                        onClick={() => emblaApi?.scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    )
}
