"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const pairs = [
  {
    left: "Berthe Morisot",
    right: "Claude Monet",
    caption: "1892 · La Jatte de lait · Purchased at her first solo show",
  },
  {
    left: "Caravaggio",
    right: "Giuseppe Cesari",
    caption: "1593 · Judith Beheading Holofernes · Workshop commission",
  },
];

export default function SceneArtistConnection({ scrollYProgress }: Props) {
  const RANGE_START = 0.43;
  const RANGE_END = 0.58;

  const sceneOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.02, RANGE_END - 0.02, RANGE_END],
    [0, 1, 1, 0]
  );

  // Pair 1
  const pair1Progress = useTransform(
    scrollYProgress,
    [RANGE_START + 0.02, RANGE_START + 0.08],
    [0, 1]
  );

  const p1LeftX = useTransform(pair1Progress, [0, 1], [-300, 0]);
  const p1RightX = useTransform(pair1Progress, [0, 1], [300, 0]);
  const p1Opacity = useTransform(pair1Progress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);
  const arcOpacity = useTransform(pair1Progress, [0.85, 1], [0, 1]);
  const captionOpacity = useTransform(pair1Progress, [0.9, 1], [0, 1]);

  // Pair 1 drift apart
  const p1DriftLeft = useTransform(
    scrollYProgress,
    [RANGE_START + 0.1, RANGE_START + 0.14],
    [0, -180]
  );
  const p1DriftRight = useTransform(
    scrollYProgress,
    [RANGE_START + 0.1, RANGE_START + 0.14],
    [0, 180]
  );
  const p1FadeOut = useTransform(
    scrollYProgress,
    [RANGE_START + 0.09, RANGE_START + 0.14],
    [1, 0]
  );

  // Pair 2
  const pair2Progress = useTransform(
    scrollYProgress,
    [RANGE_START + 0.14, RANGE_END - 0.03],
    [0, 1]
  );

  const p2LeftX = useTransform(pair2Progress, [0, 1], [-300, 0]);
  const p2RightX = useTransform(pair2Progress, [0, 1], [300, 0]);
  const p2Opacity = useTransform(pair2Progress, [0, 0.3], [0, 1]);
  const arc2Opacity = useTransform(pair2Progress, [0.85, 1], [0, 1]);
  const caption2Opacity = useTransform(pair2Progress, [0.9, 1], [0, 1]);

  return (
    <section
      style={{ height: "100vh" }}
      className="sticky top-0 overflow-hidden flex items-center justify-center"
      aria-label="Artist Connection"
    >
      <motion.div
        className="absolute inset-0 bg-[#6D001A]"
        style={{ opacity: sceneOpacity }}
      />

      <motion.div className="relative z-10 w-full" style={{ opacity: sceneOpacity }}>
        {/* Pair 1 */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: p1FadeOut }}
        >
          <div className="relative flex items-center w-full max-w-5xl mx-auto px-[8vw]">
            {/* Left card */}
            <motion.div
              className="flex-1 text-right pr-12"
              style={{ x: p1LeftX, opacity: p1Opacity }}
            >
              <ArtistCard name={pairs[0].left} role="Impressionist Painter" />
            </motion.div>

            {/* Arc */}
            <div className="relative w-48 shrink-0">
              <motion.svg
                viewBox="0 0 200 80"
                className="w-full overflow-visible"
                style={{ opacity: arcOpacity }}
              >
                <defs>
                  <filter id="arcGlow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <motion.path
                  d="M 10 40 Q 100 -20 190 40"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="1.5"
                  filter="url(#arcGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <circle cx="10" cy="40" r="3" fill="#000000" filter="url(#arcGlow)" />
                <circle cx="190" cy="40" r="3" fill="#000000" filter="url(#arcGlow)" />
              </motion.svg>

              <motion.p
                className="font-space-mono text-[#ffffff] text-xs tracking-wider text-center mt-2"
                style={{ opacity: captionOpacity }}
              >
                {pairs[0].caption}
              </motion.p>
            </div>

            {/* Right card */}
            <motion.div
              className="flex-1 pl-12"
              style={{ x: p1RightX, opacity: p1Opacity }}
            >
              <ArtistCard name={pairs[0].right} role="Post-Impressionist Painter" />
            </motion.div>
          </div>
        </motion.div>

        {/* Pair 2 */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: useTransform(
              scrollYProgress,
              [RANGE_START + 0.14, RANGE_START + 0.16],
              [0, 1]
            ),
          }}
        >
          <div className="relative flex items-center w-full max-w-5xl mx-auto px-[8vw]">
            <motion.div
              className="flex-1 text-right pr-12"
              style={{ x: p2LeftX, opacity: p2Opacity }}
            >
              <ArtistCard name={pairs[1].left} role="Baroque Master" />
            </motion.div>

            <div className="relative w-48 shrink-0">
              <motion.svg
                viewBox="0 0 200 80"
                className="w-full overflow-visible"
                style={{ opacity: arc2Opacity }}
              >
                <motion.path
                  d="M 10 40 Q 100 -20 190 40"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="1.5"
                  filter="url(#arcGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                <circle cx="10" cy="40" r="3" fill="#000000" />
                <circle cx="190" cy="40" r="3" fill="#000000" />
              </motion.svg>

              <motion.p
                className="font-space-mono text-[#ffffff] text-xs tracking-wider text-center mt-2"
                style={{ opacity: caption2Opacity }}
              >
                {pairs[1].caption}
              </motion.p>
            </div>

            <motion.div
              className="flex-1 pl-12"
              style={{ x: p2RightX, opacity: p2Opacity }}
            >
              <ArtistCard name={pairs[1].right} role="Mannerist Painter" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ArtistCard({ name, role }: { name: string; role: string }) {
  return (
    <div>
      <div
        className="inline-block border border-[#00000044] px-8 py-6"
        style={{
          background: "rgba(0,0,0,0.25)",
          boxShadow: "0 0 60px rgba(0,0,0,0.50)",
        }}
      >
        <p
          className="font-cormorant italic text-[#ffffff] leading-tight"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          {name}
        </p>
        <p className="font-space-mono text-[#f0c8d4] text-xs tracking-widest uppercase mt-2">
          {role}
        </p>
      </div>
    </div>
  );
}
