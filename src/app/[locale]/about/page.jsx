'use client'
import Image from 'next/image'
import { ShieldCheck, Eye, UserCheck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { useTranslations } from 'use-intl'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

export default function AboutPage() {

    const t = useTranslations("About")

  return (
    <div>
      <Navbar />
      <div className="relative">
        {/* Background Image */}
        <div className="relative h-[70vh] w-full">
          <Image
            src="/storage/basin-express/4.jpg"
            alt="Farzz Group"
            layout="fill"
            objectFit="cover"
            className="z-0"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/logopng.png"
                alt="FARZZ GROUP Logo"
                width={200}
                height={200}
                className="mb-4"
              />
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              FARZZ GROUP
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl mt-4 max-w-2xl"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              {t("description")}
            </motion.p>
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-5xl mx-auto px-6 py-16">
          <motion.h2
            className="text-3xl font-bold mb-6 text-center"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            {t("us")}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 text-justify mb-10"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            {t("about")}
          </motion.p>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-center">
            {[{
              icon: <ShieldCheck className="mx-auto h-12 w-12 text-blue-600" />,
              title: t("believe"),
              desc:t("believe-text") ,
            }, {
              icon: <Eye className="mx-auto h-12 w-12 text-green-600" />,
              title: t("transparent"),
              desc: t("transparent-text")
            }, {
              icon: <UserCheck className="mx-auto h-12 w-12 text-orange-600" />,
              title: t("individual"),
              desc: t("individual-text")
            }].map((item, i) => (
              <motion.div
                key={i}
                className="p-6 border bg-white shadow-xl rounded-2xl"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={i + 3}
              >
                {item.icon}
                <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
