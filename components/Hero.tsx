// components/Hero.tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image1 from "../assets/images/image1.png";
import Image2 from "../assets/images/image4.png";
import Image3 from "../assets/images/image2.png";
import Image4 from "../assets/images/image3.png";

// 👇 Constant words outside the component (no ESLint warning)
const WORDS = ["Welcome to", "You are invited to"];

export default function Hero() {
  const box = "w-48 h-48 md:w-64 md:h-64";

  // Typewriter (first line only)
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = WORDS[index];
    let t: NodeJS.Timeout;

    if (!isDeleting && displayed.length < current.length) {
      // slower typing
      t = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        180
      );
    } else if (!isDeleting && displayed.length === current.length) {
      // pause before deleting
      t = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayed.length > 0) {
      // slower deleting
      t = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        120
      );
    } else if (isDeleting && displayed.length === 0) {
      // move to next word
      setIsDeleting(false);
      setIndex((i) => (i + 1) % WORDS.length);
    }

    return () => clearTimeout(t);
  }, [displayed, isDeleting, index]);

  return (
    <section className="bg-[#F7F2E2]">
      <div className="relative mx-auto max-w-7xl px-4 h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Center Content */}
        <div className="text-center max-w-2xl z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            {/* First line: typewriter */}
            <span className="block">
              {displayed}
              <span aria-hidden className="ml-1 animate-pulse">
                _
              </span>
            </span>
            {/* Second line: fixed brand */}
            <span className="block text-red-700">Ravintola Aisha</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700">
            Where every dish tells a story of taste!
          </p>
        </div>

        {/* Floating corner images with extra padding */}
        <motion.div
          initial={{ opacity: 0, x: -40, y: -40 }}
          animate={{ opacity: 1, y: -12 }}
          transition={{
            opacity: { duration: 0.8 },
            y: {
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          }}
          whileHover={{ scale: 1.05 }}
          className={`absolute top-10 left-10 md:top-14 md:left-14 ${box} rounded-2xl overflow-hidden z-0`}
        >
          <Image
            src={Image1}
            alt="Seared salmon with herbs"
            fill
            sizes="(min-width: 768px) 16rem, 12rem"
            className="object-cover select-none pointer-events-none"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, y: -40 }}
          animate={{ opacity: 1, y: -12 }}
          transition={{
            opacity: { duration: 0.8, delay: 0.2 },
            y: {
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 0.6,
            },
          }}
          whileHover={{ scale: 1.05 }}
          className={`absolute top-10 right-10 md:top-14 md:right-14 ${box} rounded-2xl overflow-hidden z-0 bg-[#F7F2E2]`}
        >
          <Image
            src={Image2}
            alt="Food 2"
            fill
            sizes="(min-width: 768px) 16rem, 12rem"
            className="object-contain select-none pointer-events-none"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40, y: 40 }}
          animate={{ opacity: 1, y: -12 }}
          transition={{
            opacity: { duration: 0.8, delay: 0.4 },
            y: {
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1.2,
            },
          }}
          whileHover={{ scale: 1.05 }}
          className={`absolute bottom-10 left-10 md:bottom-14 md:left-14 ${box} rounded-2xl overflow-hidden z-0`}
        >
          <Image
            src={Image3}
            alt="Food 3"
            fill
            sizes="(min-width: 768px) 16rem, 12rem"
            className="object-contain object-[50%_35%] select-none pointer-events-none"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, y: 40 }}
          animate={{ opacity: 1, y: -12 }}
          transition={{
            opacity: { duration: 0.8, delay: 0.6 },
            y: {
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1.8,
            },
          }}
          whileHover={{ scale: 1.05 }}
          className={`absolute bottom-10 right-10 md:bottom-14 md:right-14 ${box} rounded-2xl overflow-hidden z-0`}
        >
          <Image
            src={Image4}
            alt="Chocolate dessert with berries"
            fill
            sizes="(min-width: 768px) 16rem, 12rem"
            className="object-cover select-none pointer-events-none"
          />
        </motion.div>
      </div>
    </section>
  );
}
