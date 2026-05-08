"use client";

import { useEffect, useRef } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import ParticleField from "./ParticleField";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function SceneHero({ scrollYProgress }: Props) {
  const scale = useTransform(scrollYProgress, [0, 0.13], [1, 8]);
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.13], [1, 0.6, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const particleOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      style={{ height: "100vh" }}
      className="sticky top-0 overflow-hidden flex items-center justify-center"
      aria-label="Hero"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#6D001A]" />

      {/* Particles */}
      <motion.div className="absolute inset-0" style={{ opacity: particleOpacity }}>
        <ParticleField />
      </motion.div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.35) 0%, transparent 70%)",
        }}
      />

      {/* Title */}
      <motion.div
        className="relative z-10 text-center select-none"
        style={{ scale, opacity }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1
          className="font-cormorant font-light tracking-tight text-[#ffffff] leading-none"
          style={{ fontSize: "clamp(5rem, 15vw, 18rem)" }}
        >
          Tracing Art
        </h1>
        <motion.p
          className="font-space-mono text-[#f0c8d4] tracking-widest uppercase mt-6"
          style={{
            fontSize: "clamp(0.6rem, 1.4vw, 1rem)",
            opacity: subtitleOpacity,
          }}
        >
          Millions of records.&nbsp;&nbsp;Five centuries.&nbsp;&nbsp;The hidden journey of art.
        </motion.p>

        {/* Gold accent line */}
        <motion.div
          className="mx-auto mt-8 h-px bg-[#000000]"
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          style={{ opacity: subtitleOpacity }}
        />

        {/* Scroll cue */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ opacity: subtitleOpacity, top: "100%", marginTop: "3rem" }}
        >
          <span className="font-space-mono text-[#f0c8d4] text-xs tracking-widest uppercase">
            scroll
          </span>
          <motion.div
            className="w-px bg-[#000000]"
            animate={{ height: [16, 40, 16] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
