"use client"
import Masonry from "react-masonry-css"
import Image from "next/image"
import { cn } from "@/lib/utils"

import { useTranslations } from "next-intl"





export default function Home() {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  const t = useTranslations("Gallery")

  const propertyCategories = [
    {
      id: 1,
      title: t("anotoly"),
      count: 244,
      image: "/storage/kartal/1.jpeg",
      size: "small",
    },
    {
      id: 2,
      title: t("euro"),
      count: 397,
      image: "/storage/atakent/4.jpeg",
      size: "large",
    },
    {
      id: 3,
      title: t("anotoly"),
      count: 841,
      image: "/storage/pendik/18.jpg",
      size: "medium",
    },
    {
      id: 4,
      title: t("anotoly"),
      count: 398,
      image: "/storage/atakent/11.jpeg",
      size: "small",
    },
    {
      id: 5,
      title: t("euro"),
      count: 635,
      image: "/storage/basin-express/3.jpg",
      size: "medium",
    },
    {
      id: 6,
      title: t("euro"),
      count: 3502,
      image: "/storage/basin-express/4.jpg",
      size: "medium",
    },
    {
      id: 7,
      title: t("euro"),
      count: 255,
      image: "/storage/beylikduzyu7/4.jpeg",
      size: "large",
    },
  ]

  const title = t("title")  
  const description = t("text")

  return (
    <main className="min-h-screen py-12">
      <div className={"container mx-auto px-4 py-8"}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          {description && <p className="text-gray-600 max-w-2xl">{description}</p>}
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {propertyCategories.map((category) => {
            const heights = {
              small: "h-[180px] sm:h-[220px]",
              medium: "h-[220px] sm:h-[280px]",
              large: "h-[280px] sm:h-[380px]",
            }

            const height = category.size ? heights[category.size] : heights.medium

            return (
              <div
                key={category.id}
                className={cn("mb-4 overflow-hidden rounded-lg relative group cursor-pointer", height)}
                style={{ marginBottom: `${Math.random() * 8 + 16}px` }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300 z-10"></div>
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute bottom-0 left-0 p-4 z-20 text-white">
                  <div className="text-sm font-medium mb-1">{category.count} объектов</div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
              </div>
            )
          })}
        </Masonry>
      </div>
    </main>
  )
}