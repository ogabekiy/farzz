"use client"
import Masonry from "react-masonry-css"
import Image from "next/image"
import { cn } from "@/lib/utils"

const propertyCategories = [
  {
    id: 1,
    title: "У моря",
    count: 244,
    image: "https://drive.google.com/uc?export=download&id=17J--PnTouEJ_80phd4ETOhUcan47a5LU",
    size: "small",
  },
  {
    id: 2,
    title: "Эксклюзивные",
    count: 397,
    image: "https://drive.google.com/uc?id=1cnnw-tNaFzT0qnsdKJggEHvM2R8KlmHX",
    size: "large",
  },
  {
    id: 3,
    title: "Элитная",
    count: 841,
    image: "https://drive.google.com/uc?export=download&id=1nblS8fSc92ikZMF2ZlFr8c0ud1d_YFSM",
    size: "medium",
  },
  {
    id: 4,
    title: "Под гражданство",
    count: 398,
    image: "https://drive.google.com/uc?export=download&id=1eIx3pHFj7Mf076YOIE57pD4RpOmTr9KV",
    size: "small",
  },
  {
    id: 5,
    title: "От застройщиков",
    count: 635,
    image: "https://drive.google.com/uc?export=download&id=14BBrYbKhyg5Qkcl99YvA6C4NyiRS_Dex",
    size: "medium",
  },
  {
    id: 6,
    title: "От собственника",
    count: 3502,
    image: "https://drive.google.com/uc?export=download&id=1ZHlMJn1hwL7ZgErgeYcFrr1vJGeyadep",
    size: "medium",
  },
  {
    id: 7,
    title: "Виллы",
    count: 255,
    image: "https://drive.google.com/uc?export=download&id=1oE8r9BUOIjgV9y0bXp0M1kzYBi8RxTbm",
    size: "large",
  },
]

export default function Home() {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  }

  const title = "Лучшие предложения для наших клиентов"
  const description = "Point Property – агентство недвижимости с самой обширной базой жилых и коммерческих объектов в лучших локациях Турции"

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