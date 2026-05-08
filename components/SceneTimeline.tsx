"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

const nodes = [
  { year: "1669", desc: "Still Life painted\nin Amsterdam" },
  { year: "1864", desc: "Sold at Paris auction\nfor 420 francs" },
  { year: "1936", desc: "Acquired by the\nGilcrease Collection" },
  { year: "1944", desc: "Hidden during\nWorld War II" },
  { year: "1945", desc: "Returned to\nlegal owner" },
];

const RANGE_START = 0.28;
const RANGE_END = 0.43;
const LINE_LENGTH = 900;

function TimelineNode({
  node,
  index,
  total,
  scrollYProgress,
}: {
  node: { year: string; desc: string };
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const t = RANGE_START + 0.04 + index * 0.05;
  const opacity = useTransform(scrollYProgress, [t, t + 0.025], [0, 1]);
  const y = useTransform(scrollYProgress, [t, t + 0.025], [20, 0]);
  const x = (index / (total - 1)) * 900;

  return (
    <motion.div
      className="flex flex-col items-center"
      style={{ opacity, y }}
    >
      <p
        className="font-space-mono text-[#6D001A] font-bold mb-12"
        style={{ fontSize: "clamp(0.75rem, 1.5vw, 1rem)" }}
      >
        {node.year}
      </p>
      <div style={{ height: 28 }} />
      <p
        className="font-cormorant italic text-[#999999] text-center mt-10 leading-tight"
        style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)", maxWidth: "100px" }}
      >
        {node.desc.split("\n").map((l, j) => (
          <span key={j}>
            {l}
            {j < node.desc.split("\n").length - 1 && <br />}
          </span>
        ))}
      </p>
    </motion.div>
  );
}

function TimelineNodeCircle({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const t = RANGE_START + 0.04 + index * 0.05;
  const opacity = useTransform(scrollYProgress, [t, t + 0.025], [0, 1]);
  const x = (index / (total - 1)) * 900;

  return (
    <g>
      <motion.circle
        cx={x}
        cy={60}
        r={14}
        fill="none"
        stroke="#6D001A"
        strokeWidth="1"
        style={{ opacity }}
        filter="url(#strongGlow)"
      />
      <motion.circle
        cx={x}
        cy={60}
        r={6}
        fill="#000000"
        stroke="#6D001A"
        strokeWidth="2"
        style={{ opacity }}
        filter="url(#glow)"
      />
      <motion.circle
        cx={x}
        cy={60}
        r={2}
        fill="#6D001A"
        style={{ opacity }}
      />
    </g>
  );
}

export default function SceneTimeline({ scrollYProgress }: Props) {
  const sceneOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.02, RANGE_END - 0.02, RANGE_END],
    [0, 1, 1, 0]
  );

  const lineProgress = useTransform(
    scrollYProgress,
    [RANGE_START + 0.02, RANGE_END - 0.04],
    [0, 1]
  );

  const dashOffset = useTransform(lineProgress, [0, 1], [LINE_LENGTH, 0]);

  const headerOpacity = useTransform(
    scrollYProgress,
    [RANGE_START, RANGE_START + 0.03],
    [0, 1]
  );

  return (
    <section
      style={{ height: "100vh" }}
      className="sticky top-0 overflow-hidden flex items-center justify-center"
      aria-label="Timeline"
    >
      <motion.div
        className="absolute inset-0 bg-[#000000]"
        style={{ opacity: sceneOpacity }}
      />

      <motion.div
        className="relative z-10 w-full px-[8vw]"
        style={{ opacity: sceneOpacity }}
      >
        <motion.p
          className="font-space-mono text-[#6D001A] text-xs tracking-widest uppercase mb-16 text-center"
          style={{ opacity: headerOpacity }}
        >
          Provenance Record
        </motion.p>

        <div className="relative">
          <svg
            viewBox="0 0 900 120"
            className="w-full overflow-visible"
            style={{ maxHeight: 120 }}
          >
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Track */}
            <line x1="0" y1="60" x2="900" y2="60" stroke="#1a1a1a" strokeWidth="2" />

            {/* Animated gold line */}
            <motion.line
              x1="0"
              y1="60"
              x2="900"
              y2="60"
              stroke="#6D001A"
              strokeWidth="2"
              strokeDasharray={LINE_LENGTH}
              style={{ strokeDashoffset: dashOffset }}
              filter="url(#glow)"
            />

            {/* Node circles */}
            {nodes.map((_, i) => (
              <TimelineNodeCircle
                key={i}
                index={i}
                total={nodes.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </svg>

          {/* Labels */}
          <div className="absolute inset-0 flex justify-between items-center">
            {nodes.map((node, i) => (
              <TimelineNode
                key={i}
                node={node}
                index={i}
                total={nodes.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
