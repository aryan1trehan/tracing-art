"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const museums = [
  { rank: 1, name: "The Metropolitan Museum of Art", city: "New York", bar: 0.98 },
  { rank: 2, name: "Musée du Louvre", city: "Paris", bar: 0.94 },
  { rank: 3, name: "The British Museum", city: "London", bar: 0.90 },
  { rank: 4, name: "The Hermitage", city: "St. Petersburg", bar: 0.86 },
  { rank: 5, name: "The National Gallery", city: "London", bar: 0.80 },
  { rank: 6, name: "Museum of Modern Art", city: "New York", bar: 0.74 },
  { rank: 7, name: "J. Paul Getty Museum", city: "Los Angeles", bar: 0.68 },
  { rank: 8, name: "Rijksmuseum", city: "Amsterdam", bar: 0.62 },
  { rank: 9, name: "Uffizi Gallery", city: "Florence", bar: 0.55 },
  { rank: 10, name: "Prado Museum", city: "Madrid", bar: 0.49 },
];

const RANGE_START = 0.72;
const RANGE_END = 0.87;

function MuseumRow({
  museum,
  index,
  scrollYProgress,
}: {
  museum: { rank: number; name: string; city: string; bar: number };
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const t = RANGE_START + 0.03 + index * 0.012;
  const tBar = RANGE_START + 0.04 + index * 0.012;

  const opacity = useTransform(scrollYProgress, [t, t + 0.015], [0, 1]);
  const x = useTransform(scrollYProgress, [t, t + 0.015], [40, 0]);
  const barWidth = useTransform(
    scrollYProgress,
    [tBar, tBar + 0.03],
    [0, museum.bar * 100]
  );

  return (
    <motion.div
      className="flex items-center gap-4"
      style={{ opacity, x }}
    >
      {/* Rank */}
      <span
        className="font-space-mono text-[#ffffff] font-bold shrink-0 text-right"
        style={{
          fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
          width: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        {museum.rank}
      </span>

      {/* Name + city */}
      <div className="shrink-0" style={{ width: "clamp(180px, 32vw, 320px)" }}>
        <p
          className="font-cormorant text-[#ffffff] leading-none"
          style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.15rem)" }}
        >
          {museum.name}
        </p>
        <p className="font-space-mono text-[#f0c8d4] text-xs tracking-widest mt-0.5">
          {museum.city}
        </p>
      </div>

      {/* Animated bar */}
      <div className="flex-1 relative" style={{ height: "2px", background: "#4a0012" }}>
        <motion.div
          className="absolute left-0 top-0 h-full bg-[#000000]"
          style={{
            width: useTransform(barWidth, (v) => `${v}%`),
            boxShadow: "0 0 8px rgba(0,0,0,0.8)",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function SceneMuseumRankings({ scrollYProgress }: Props) {
  const sceneOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.02, RANGE_END - 0.02, RANGE_END],
    [0, 1, 1, 0]
  );

  const headerOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.03],
    [0, 1]
  );

  return (
    <section
      style={{ height: "100vh" }}
      className="sticky top-0 overflow-hidden flex items-center justify-center"
      aria-label="Museum Rankings"
    >
      <motion.div
        className="absolute inset-0 bg-[#6D001A]"
        style={{ opacity: sceneOpacity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-4xl px-[8vw]"
        style={{ opacity: sceneOpacity }}
      >
        <motion.p
          className="font-space-mono text-[#ffffff] text-xs tracking-widest uppercase mb-8"
          style={{ opacity: headerOpacity }}
        >
          Global Provenance Index — Top Institutions
        </motion.p>

        <div className="flex flex-col gap-3">
          {museums.map((m, i) => (
            <MuseumRow
              key={i}
              museum={m}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
