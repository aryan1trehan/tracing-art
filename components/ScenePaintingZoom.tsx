"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const RANGE_START = 0.13;
const RANGE_END = 0.28;

const textLines = [
  { label: "1669, Amsterdam" },
  { label: "Willem Kalf paints Still Life\nwith a Chinese Porcelain Jar" },
  { label: "For two centuries, the painting's\njourney remains unknown." },
];

function TextLine({
  line,
  index,
  scrollYProgress,
}: {
  line: { label: string };
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = RANGE_START + 0.03 + index * 0.04;
  const end = start + 0.04;
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const x = useTransform(scrollYProgress, [start, end], [-60, 0]);

  return (
    <motion.div style={{ opacity, x }}>
      {index === 0 ? (
        <p className="font-space-mono text-[#ffffff] text-sm tracking-widest uppercase">
          {line.label}
        </p>
      ) : (
        <p
          className="font-cormorant italic text-[#ffffff] leading-snug"
          style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}
        >
          {line.label.split("\n").map((l, j) => (
            <span key={j}>
              {l}
              {j < line.label.split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>
      )}
    </motion.div>
  );
}

export default function ScenePaintingZoom({ scrollYProgress }: Props) {
  const sceneOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.02, RANGE_END - 0.02, RANGE_END],
    [0, 1, 1, 0]
  );

  const paintingScale = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_END],
    [1, 3]
  );

  const paintingOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.02, RANGE_END - 0.03, RANGE_END],
    [0, 1, 1, 0]
  );

  const captionOpacity = useTransform(
    scrollYProgress,
    [RANGE_START + 0.03, RANGE_START + 0.07],
    [0, 1]
  );

  return (
    <section
      style={{ height: "100vh" }}
      className="sticky top-0 overflow-hidden flex items-center justify-center"
      aria-label="Painting Zoom"
    >
      <motion.div
        className="absolute inset-0 bg-[#6D001A]"
        style={{ opacity: sceneOpacity }}
      />

      {/* Left text column */}
      <motion.div
        className="absolute left-[8vw] top-1/2 -translate-y-1/2 z-20 flex flex-col gap-8 max-w-xs"
        style={{ opacity: sceneOpacity }}
      >
        {textLines.map((line, i) => (
          <TextLine
            key={i}
            line={line}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </motion.div>

      {/* Painting */}
      <motion.div
        className="relative z-10"
        style={{ scale: paintingScale, opacity: paintingOpacity }}
      >
        <div
          className="relative"
          style={{
            width: "clamp(180px, 22vw, 340px)",
            height: "clamp(220px, 28vw, 420px)",
          }}
        >
          {/* Outer frame */}
          <div
            className="absolute inset-0"
            style={{
              border: "12px solid #1a1a1a",
              boxShadow: "0 0 60px rgba(0,0,0,0.9), inset 0 0 30px rgba(0,0,0,0.6)",
            }}
          />
          {/* Inner gold trim */}
          <div
            className="absolute"
            style={{ inset: "12px", border: "2px solid #6D001A44" }}
          />
          {/* Canvas area */}
          <div
            className="absolute"
            style={{
              inset: "20px",
              background:
                "linear-gradient(135deg, #1a0008 0%, #0d0005 40%, #1a0008 70%, #000000 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `
                  radial-gradient(ellipse 60% 40% at 40% 45%, #6D001A22 0%, transparent 60%),
                  radial-gradient(ellipse 30% 50% at 70% 30%, #9999991a 0%, transparent 50%)
                `,
              }}
            />
            <div className="absolute inset-4 opacity-10">
              <div className="w-full h-full border border-[#000000]" />
            </div>
          </div>
        </div>

        {/* Caption */}
        <motion.p
          className="font-space-mono text-[#f0c8d4] text-xs tracking-widest uppercase text-center mt-4"
          style={{ opacity: captionOpacity }}
        >
          Still Life · c. 1669
        </motion.p>
      </motion.div>

      {/* Right glow */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 100% 50%, rgba(0,0,0,0.25) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}
