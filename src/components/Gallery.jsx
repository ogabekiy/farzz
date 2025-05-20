"use client";

import Masonry from "react-masonry-css";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const t = useTranslations("Gallery");
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const locale = useLocale();
  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const allCategories = [
    {
      id: 1,
      title: t("anotoly"),
      count: 244,
      image: "/storage/kartal/1.jpeg",
      size: "small",
      region: "anatoliya",
    },
    {
      id: 2,
      title: t("euro"),
      count: 397,
      image: "/storage/atakent/4.jpeg",
      size: "large",
      region: "europe",
    },
    {
      id: 3,
      title: t("anotoly"),
      count: 841,
      image: "/storage/pendik/18.jpg",
      size: "medium",
      region: "anatoliya",
    },
    {
      id: 4,
      title: t("anotoly"),
      count: 398,
      image: "/storage/atakent/11.jpeg",
      size: "small",
      region: "anatoliya",
    },
    {
      id: 5,
      title: t("euro"),
      count: 635,
      image: "/storage/basin-express/3.jpg",
      size: "medium",
      region: "europe",
    },
    {
      id: 6,
      title: t("euro"),
      count: 3502,
      image: "/storage/basin-express/4.jpg",
      size: "medium",
      region: "europe",
    },
    {
      id: 7,
      title: t("euro"),
      count: 255,
      image: "/storage/beylikduzyu7/4.jpeg",
      size: "large",
      region: "europe",
    },
  ];

  // Filter to only one anatoly and one euro for mobile
  const categories = isMobile
    ? [
        allCategories.find((cat) => cat.region === "anatoliya"),
        allCategories.find((cat) => cat.region === "europe"),
      ].filter(Boolean)
    : allCategories;

  const title = t("title");
  const description = t("text");

  const getRandomVariant = (index) => {
    const directions = [
      { x: -50, y: 0 },
      { x: 50, y: 0 },
      { x: 0, y: -50 },
      { x: 0, y: 50 },
    ];
    const dir = directions[index % directions.length];
    return {
      hidden: { opacity: 0, ...dir },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut",
        },
      },
    };
  };

  const handleClick = (region) => {
    router.push(`/${locale}/apartments?region=${region}`);
  };

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
          {categories.map((category, index) => {
            const heights = {
              small: "h-[180px] sm:h-[220px]",
              medium: "h-[220px] sm:h-[280px]",
              large: "h-[280px] sm:h-[380px]",
            };
            const height = category.size ? heights[category.size] : heights.medium;

            return (
              <motion.div
                key={category.id}
                className={cn(
                  "mb-4 overflow-hidden rounded-lg relative group cursor-pointer",
                  height
                )}
                variants={getRandomVariant(index)}
                initial="hidden"
                animate="visible"
                style={{ marginBottom: `${Math.random() * 8 + 16}px` }}
                onClick={() => handleClick(category.region)}
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
              </motion.div>
            );
          })}
        </Masonry>
      </div>
    </main>
  );
}
