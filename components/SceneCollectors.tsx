"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const collectors = [
  { name: "Thomas Gilcrease", role: "Founder, Gilcrease Museum" },
  { name: "Henry Clay Frick", role: "Steel Magnate & Collector" },
  { name: "Joseph Hirshhorn", role: "Mining Magnate & Patron" },
  { name: "Andrew Mellon", role: "Secretary of the Treasury" },
  { name: "Lizzie P. Bliss", role: "Co-Founder, MoMA" },
  { name: "Norton Simon", role: "Industrialist & Collector" },
  { name: "Samuel H. Kress", role: "Philanthropist & Art Dealer" },
  { name: "Isabella Gardner", role: "Eccentric Boston Collector" },
  { name: "J. Paul Getty", role: "Oil Baron & Museum Founder" },
  { name: "Chester Dale", role: "Wall Street Broker" },
];

const RANGE_START = 0.58;
const RANGE_END = 0.72;

function CollectorCard({
  collector,
  index,
  scrollYProgress,
}: {
  collector: { name: string; role: string };
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const delay = index * 0.06;
  const cardsProgress = useTransform(
    scrollYProgress,
    [RANGE_START + 0.01, RANGE_START + 0.07],
    [0, 1]
  );
  const clusterProgress = useTransform(
    scrollYProgress,
    [RANGE_END - 0.06, RANGE_END - 0.01],
    [0, 1]
  );

  const cardOpacity = useTransform(
    cardsProgress,
    [Math.min(delay, 0.9), Math.min(delay + 0.15, 1)],
    [0, 1]
  );
  const cardY = useTransform(
    cardsProgress,
    [Math.min(delay, 0.9), Math.min(delay + 0.15, 1)],
    [30, 0]
  );
  const cardScale = useTransform(
    cardsProgress,
    [Math.min(delay, 0.9), Math.min(delay + 0.15, 1)],
    [0.8, 1]
  );
  const tilt = (index % 2 === 0 ? 1 : -1) * (index % 3) * 1.5;
  const clusterTilt = useTransform(clusterProgress, [0, 1], [0, tilt]);

  return (
    <motion.div
      style={{
        opacity: cardOpacity,
        y: cardY,
        scale: cardScale,
        rotate: clusterTilt,
      }}
    >
      <div
        className="border border-[#c9a84c22] p-5 h-full"
        style={{
          background: "linear-gradient(135deg, #12100d 0%, #0a0806 100%)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,168,76,0.08)",
        }}
      >
        <p
          className="font-cormorant text-[#f5f0e8] leading-tight"
          style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)" }}
        >
          {collector.name}
        </p>
        <p
          className="font-space-mono text-[#8b7355] mt-2 italic"
          style={{ fontSize: "clamp(0.5rem, 0.8vw, 0.65rem)" }}
        >
          {collector.role}
        </p>
      </div>
    </motion.div>
  );
}

export default function SceneCollectors({ scrollYProgress }: Props) {
  const sceneOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.02, RANGE_END - 0.02, RANGE_END],
    [0, 1, 1, 0]
  );

  const captionOpacity = useTransform(
    scrollYProgress,
    [RANGE_END - 0.06, RANGE_END - 0.03],
    [0, 1]
  );

  const headerOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.03],
    [0, 1]
  );

  return (
    <section
      style={{ height: "100vh" }}
      className="sticky top-0 overflow-hidden flex flex-col items-center justify-center"
      aria-label="Collectors"
    >
      <motion.div
        className="absolute inset-0 bg-[#0a0806]"
        style={{ opacity: sceneOpacity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-6xl px-[6vw]"
        style={{ opacity: sceneOpacity }}
      >
        <motion.p
          className="font-space-mono text-[#c9a84c] text-xs tracking-widest uppercase mb-12 text-center"
          style={{ opacity: headerOpacity }}
        >
          The Great Collectors
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {collectors.map((c, i) => (
            <CollectorCard
              key={i}
              collector={c}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <motion.p
          className="font-cormorant italic text-[#8b7355] text-center mt-10"
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
            opacity: captionOpacity,
          }}
        >
          Their collections became the foundations of America&apos;s great museums.
        </motion.p>
      </motion.div>
    </section>
  );
}
