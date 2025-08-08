"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MdOutlineUnfoldMore } from "react-icons/md";
import type { PanInfo } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosPub from "../Axios/useAxiosPub";
import { Link } from "react-router-dom";

interface CardData {
  id: string;
  imageUrl: string;
  title: string;
}

interface IconProps {
  className?: string;
}

interface CardProps {
  card: CardData;
  index: number;
  activeIndex: number;
  totalCards: number;
}

interface ApiDataItem {
  _id: string;
  pic1: string;
  name: string;
  category: string;
}

interface CaroselRProps {
  cat: string | undefined;
}

const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default function CaroselR({ cat }: CaroselRProps) {
  console.log(cat, "cattttttttttttttt");
  const axiospub = useAxiosPub();
  
  const { data, isLoading } = useQuery<ApiDataItem[]>({
    queryKey: ["caroselR"],
    queryFn: async (): Promise<ApiDataItem[]> => {
      const res = await axiospub.get("/alldata");
      return res.data;
    },
  });

  const cato: ApiDataItem[] = data?.filter((x: ApiDataItem) => x?.category === cat) || [];
  console.log(cato, "lll");

  const cardData: CardData[] = cato.map((i: ApiDataItem) => ({
    id: i?._id,
    imageUrl: i?.pic1,
    title: i?.name,
  }));

  const [activeIndex, setActiveIndex] = useState<number>(
    Math.floor(cardData.length / 2)
  );
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayDelay: number = 3000;

  const goToNext = (): void => {
    setActiveIndex((prev: number) => (prev + 1) % cardData.length);
  };

  useEffect(() => {
    if (!isPaused && cardData.length > 0) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPaused, activeIndex, cardData.length]);

  const changeSlide = (newIndex: number): void => {
    const newSafeIndex: number = (newIndex + cardData.length) % cardData.length;
    setActiveIndex(newSafeIndex);
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
  };

  const onDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const dragThreshold: number = 75;
    const dragOffset: number = info.offset.x;
    if (dragOffset > dragThreshold) {
      changeSlide(activeIndex - 1);
    } else if (dragOffset < -dragThreshold) {
      changeSlide(activeIndex + 1);
    }
  };

  if (cato.length === 1) {
    return (
      <div className="w-full text-center p-8 bg-gray-50 rounded-lg shadow-sm border border-gray-200 mt-5">
        <h2 className="text-xl font-semibold text-gray-700">
          No Related Products Found
        </h2>
        <p className="text-gray-500 mt-2">
          Try exploring other categories or check back later.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <>
        <div className="flex-col gap-4 w-full flex items-center justify-center mt-10">
          <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
          </div>
        </div>
      </>
    );
  }

  if (cardData.length === 0) {
    return (
      <div className="w-full text-center p-8 bg-gray-50 rounded-lg shadow-sm border border-gray-200 mt-5">
        <h2 className="text-xl font-semibold text-gray-700">
          No Products Found
        </h2>
        <p className="text-gray-500 mt-2">
          No products available in this category.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full flex-col items-center justify-center font-sans overflow-hidden">
      <div
        className="w-full max-w-5xl mx-auto p-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative flex w-full flex-col rounded-3xl border border-white/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-4 pt-6 md:p-6">
          <div className="inline-block">
            <h1 className="text-2xl md:text-4xl lg:text-4xl pop600 flex items-center gap-2">
              Related Product
              <MdOutlineUnfoldMore className="inline-block" />
            </h1>
            <hr className="border-t-2 border-[#761A24] mt-1" />
          </div>
          <div className="relative w-full h-[280px] md:h-[400px] flex items-center justify-center overflow-hidden pt-12">
            <motion.div
              className="w-full h-full flex items-center justify-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
            >
              {cardData.map((card: CardData, index: number) => (
                <Card
                  key={card.id}
                  card={card}
                  index={index}
                  activeIndex={activeIndex}
                  totalCards={cardData.length}
                />
              ))}
            </motion.div>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={() => changeSlide(activeIndex - 1)}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
              type="button"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-center gap-2">
              {cardData.map((_, index: number) => (
                <button
                  key={index}
                  onClick={() => changeSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    activeIndex === index
                      ? "w-6 bg-[#761A24]"
                      : "w-2 bg-gray-300 dark:bg-neutral-600 hover:bg-gray-400 dark:hover:bg-neutral-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  type="button"
                />
              ))}
            </div>
            <button
              onClick={() => changeSlide(activeIndex + 1)}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
              type="button"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ card, index, activeIndex, totalCards }: CardProps) {
  let offset: number = index - activeIndex;
  if (offset > totalCards / 2) {
    offset -= totalCards;
  } else if (offset < -totalCards / 2) {
    offset += totalCards;
  }

  const isVisible: boolean = Math.abs(offset) <= 1;
  const animate = {
    x: `${offset * 50}%`,
    scale: offset === 0 ? 1 : 0.8,
    zIndex: totalCards - Math.abs(offset),
    opacity: isVisible ? 1 : 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 30 },
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = "https://placehold.co/400x600/1e1e1e/ffffff?text=Image+Missing";
  };

  return (
    <motion.div
      className="absolute w-2/3 md:w-1/2 sm:h-[70%] md:h-[95%] lg:h-[100%]"
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={animate}
      initial={false}
    >
      <div className="relative w-full h-[220px] md:h-[350px] lg:h-full rounded-3xl shadow-2xl overflow-hidden bg-gray-200 dark:bg-neutral-800">
        <Link to={`/allproduct/details/${card?.id}`}>
          <img
            src={card.imageUrl || "/placeholder.svg"}
            alt={card.title}
            className="w-full h-full object-cover pointer-events-none"
            onError={handleImageError}
          />
        </Link>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
          <h4 className="text-white text-lg font-semibold">{card.title}</h4>
        </div>
      </div>
    </motion.div>
  );
}
