"use client";

import { useEffect } from "react";
import { useScroll } from "framer-motion";
import Lenis from "lenis";

import SceneHero from "@/components/SceneHero";
import ScenePaintingZoom from "@/components/ScenePaintingZoom";
import SceneTimeline from "@/components/SceneTimeline";
import SceneArtistConnection from "@/components/SceneArtistConnection";
import SceneCollectors from "@/components/SceneCollectors";
import SceneMuseumRankings from "@/components/SceneMuseumRankings";
import SceneOutro from "@/components/SceneOutro";

export default function Home() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Single scroll tracker — maps entire [0, 1] range across 600vh
  // Scene ranges:
  //   Hero:              [0.00, 0.13]
  //   Painting Zoom:     [0.13, 0.28]
  //   Timeline:          [0.28, 0.43]
  //   Artist Connection: [0.43, 0.58]
  //   Collectors:        [0.58, 0.72]
  //   Museum Rankings:   [0.72, 0.87]
  //   Outro:             [0.87, 1.00]
  const { scrollYProgress } = useScroll();

  return (
    <main style={{ height: "600vh" }} className="relative">
      {/* Sticky container — scenes stack on top of each other via absolute positioning */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0">
          <SceneHero scrollYProgress={scrollYProgress} />
        </div>
        <div className="absolute inset-0">
          <ScenePaintingZoom scrollYProgress={scrollYProgress} />
        </div>
        <div className="absolute inset-0">
          <SceneTimeline scrollYProgress={scrollYProgress} />
        </div>
        <div className="absolute inset-0">
          <SceneArtistConnection scrollYProgress={scrollYProgress} />
        </div>
        <div className="absolute inset-0">
          <SceneCollectors scrollYProgress={scrollYProgress} />
        </div>
        <div className="absolute inset-0">
          <SceneMuseumRankings scrollYProgress={scrollYProgress} />
        </div>
        <div className="absolute inset-0">
          <SceneOutro scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </main>
  );
}
