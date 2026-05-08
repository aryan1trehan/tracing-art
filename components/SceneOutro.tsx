"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import ParticleField from "./ParticleField";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function SceneOutro({ scrollYProgress }: Props) {
  const RANGE_START = 0.87;
  const RANGE_END = 1.0;

  const sceneOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.03],
    [0, 1]
  );

  // Background color transition: #0a0806 → #0d1b2a
  const bgR = useTransform(scrollYProgress, [RANGE_START, RANGE_END], [10, 13]);
  const bgG = useTransform(scrollYProgress, [RANGE_START, RANGE_END], [8, 27]);
  const bgB = useTransform(scrollYProgress, [RANGE_START, RANGE_END], [6, 42]);

  // Clamp all sub-ranges within [RANGE_START, 1.0]
  const text1Opacity = useTransform(
    scrollYProgress,
    [0.89, 0.92],
    [0, 1]
  );

  const text2Opacity = useTransform(
    scrollYProgress,
    [0.93, 0.96],
    [0, 1]
  );

  const ctaOpacity = useTransform(
    scrollYProgress,
    [0.96, 0.99],
    [0, 1]
  );

  const ctaY = useTransform(
    scrollYProgress,
    [0.96, 0.99],
    [20, 0]
  );

  const footerOpacity = useTransform(scrollYProgress, [0.98, 1.0], [0, 0.4]);

  return (
    <section
      style={{ height: "100vh" }}
      className="sticky top-0 overflow-hidden flex items-center justify-center"
      aria-label="Outro"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: useTransform(
            [bgR, bgG, bgB] as any,
            ([r, g, b]: number[]) => `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
          ),
          opacity: sceneOpacity,
        }}
      />

      {/* Drifting particles */}
      <motion.div className="absolute inset-0" style={{ opacity: sceneOpacity }}>
        <ParticleField driftUp />
      </motion.div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-[8vw] max-w-4xl"
        style={{ opacity: sceneOpacity }}
      >
        {/* Eyebrow */}
        <motion.p
          className="font-space-mono text-[#c9a84c] text-xs tracking-widest uppercase mb-8"
          style={{ opacity: text1Opacity }}
        >
          Getty Provenance Index
        </motion.p>

        {/* Main quote */}
        <motion.p
          className="font-cormorant font-light text-[#f5f0e8] leading-tight mb-8"
          style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)",
            opacity: text1Opacity,
          }}
        >
          &ldquo;The GPI represents a window into a vast and growing universe of data.&rdquo;
        </motion.p>

        {/* Gold divider */}
        <motion.div
          className="w-16 h-px bg-[#c9a84c] mx-auto mb-8"
          style={{ opacity: text1Opacity }}
        />

        {/* Bold stat */}
        <motion.p
          className="font-cormorant font-semibold text-[#f5f0e8] mb-16"
          style={{
            fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
            opacity: text2Opacity,
          }}
        >
          1% of artworks are in museums.
          <br />
          <span className="text-[#8b7355] italic font-light">
            The rest remain unknown.
          </span>
        </motion.p>

        {/* CTA */}
        <motion.div style={{ opacity: ctaOpacity, y: ctaY }}>
          <a
            href="https://www.getty.edu/research/tools/provenance/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group"
          >
            <div
              className="relative border border-[#c9a84c] px-10 py-4 overflow-hidden transition-all duration-500"
              style={{
                background: "rgba(201,168,76,0.04)",
              }}
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 bg-[#c9a84c] opacity-0 group-hover:opacity-10 transition-opacity duration-500"
              />
              <span className="relative font-space-mono text-[#c9a84c] text-sm tracking-widest uppercase">
                Explore the Archive
              </span>
            </div>
          </a>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="font-space-mono text-[#8b7355] text-xs tracking-widest mt-16 opacity-40"
          style={{ opacity: footerOpacity }}
        >
          Inspired by Getty Research Institute · Tracing Art
        </motion.p>
      </motion.div>
    </section>
  );
}
