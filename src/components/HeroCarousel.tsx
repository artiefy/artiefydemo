'use client';
import Image from 'next/image';

import { LayoutGroup, motion } from 'framer-motion';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import WordListSwap from '~/cuicui/other/text-animation/word-list-swap/word-list-swap';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    img: '/tech1.png',
    headline: 'La educación es el arma más poderosa para cambiar el mundo.',
  },
  {
    img: '/tech2.png',
    headline: 'El conocimiento abre puertas donde antes solo había muros.',
  },
  {
    img: '/tech3.png',
    headline: 'La innovación comienza con una mente curiosa.',
  },
];

const phrases = [
  'La educación es el arma más poderosa para cambiar el mundo.',
  'El conocimiento abre puertas donde antes solo había muros.',
  'La innovación comienza con una mente curiosa.',
];

export default function HeroCarousel() {
  return (
    <section className="relative pt-0 pb-0">
      <div className="relative">
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          pagination={{
            clickable: true,
          }}
          navigation
          autoplay={{ delay: 4000 }}
          loop
          className="pb-0"
        >
          {/* Solo un WordListSwap fuera del SwiperSlide para animar los títulos */}
          <div className="pointer-events-none absolute top-0 bottom-0 z-20 flex w-full items-center justify-center">
            <LayoutGroup>
              <motion.p
                className="flex w-full justify-center px-6 text-center text-4xl font-extrabold break-words whitespace-pre-wrap text-white drop-shadow-2xl md:px-24 md:text-6xl"
                layout={true}
              >
                <WordListSwap
                  texts={phrases}
                  mainClassName="text-white px-4 sm:px-8 md:px-12 overflow-hidden py-2 sm:py-3 md:py-4 justify-center rounded-lg whitespace-pre-wrap break-words w-full text-center drop-shadow-2xl"
                  staggerFrom={'last'}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{
                    type: 'spring',
                    damping: 30,
                    stiffness: 400,
                  }}
                  rotationInterval={4000}
                  splitBy="characters"
                />
              </motion.p>
            </LayoutGroup>
          </div>
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700 md:min-h-[520px]"
              >
                <Image
                  src={slide.img}
                  alt={slide.headline}
                  fill
                  sizes="100vw"
                  className="absolute inset-0 h-full w-full object-cover opacity-60"
                  priority
                />
                {/* El título animado ahora está fuera del SwiperSlide */}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <style jsx global>{`
          .swiper-pagination-bullet {
            width: 18px !important;
            height: 18px !important;
            background: #fff !important;
            opacity: 0.5;
            border-radius: 50%;
            margin: 0 6px !important;
            transition:
              opacity 0.2s,
              transform 0.2s;
          }
          .swiper-pagination-bullet-active {
            opacity: 1 !important;
            transform: scale(1.2);
            background: #2563eb !important;
          }
          .swiper-pagination {
            position: absolute !important;
            left: 0;
            right: 0;
            bottom: 32px;
            display: flex;
            justify-content: center;
            z-index: 30;
          }
          .swiper-button-next,
          .swiper-button-prev {
            color: #fff;
            width: 48px;
            height: 48px;
            background: rgba(37, 99, 235, 0.5);
            border-radius: 50%;
            top: 50%;
            transform: translateY(-50%);
            z-index: 40;
          }
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 24px;
            font-weight: bold;
          }
        `}</style>
      </div>
    </section>
  );
}

// Para que funcione este efecto instala:
// npm install framer-motion
