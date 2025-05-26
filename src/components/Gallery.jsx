"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const t = useTranslations("Gallery");
  const router = useRouter();
  const locale = useLocale();

  const title = t("title");
  const description = t("text");

  const allCategories = [
    {
      id: 1,
      title: t("anotoly"),
      count: 244,
      image: "/storage/kartal/1.jpeg",
      region: "anatoliya",
    },
    {
      id: 2,
      title: t("euro"),
      count: 397,
      image: "/storage/atakent/4.jpeg",
      region: "europe",
    },
  ];

  const categories = allCategories;

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
    <main className=" py-12">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
          {description && <p className="text-gray-600 max-w-3xl mx-auto">{description}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className={cn(
                "relative overflow-hidden rounded-2xl group cursor-pointer h-[320px] sm:h-[400px] w-full"
              )}
              variants={getRandomVariant(index)}
              initial="hidden"
              animate="visible"
              onClick={() => handleClick(category.region)}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300 z-10" />
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 p-4 z-20 text-white">
                <div className="text-sm font-medium mb-1">{category.count} объектов</div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
