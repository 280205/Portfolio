"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { certifications } from "@/lib/data";
import { FiExternalLink, FiAward, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function CertificationsCarousel() {
  const containerRef = useRef(null);
  const cardsRef = useRef(null);
  const dragProxyRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Draggable);

    const galleryEl = containerRef.current;
    const cardsEl = cardsRef.current;
    const dragProxyEl = dragProxyRef.current;

    if (!galleryEl || !cardsEl || !dragProxyEl) return;

    const cards = gsap.utils.toArray(cardsEl.querySelectorAll("li"));
    if (cards.length === 0) return;

    // Set initial state of items
    gsap.set(cards, { xPercent: 350, opacity: 0, scale: 0.8 });

    const spacing = 0.16;
    const snapTime = gsap.utils.snap(spacing);

    const animateFunc = (element) => {
      const tl = gsap.timeline();
      tl.fromTo(
        element,
        { scale: 0.82, opacity: 0.25, zIndex: 1 },
        {
          scale: 1,
          opacity: 1,
          zIndex: 20,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
          immediateRender: false,
        }
      ).fromTo(
        element,
        { xPercent: 350 },
        { xPercent: -350, duration: 1, ease: "none", immediateRender: false },
        0
      );
      return tl;
    };

    const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
    const playhead = { offset: 0 };
    const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

    const scrub = gsap.to(playhead, {
      offset: 0,
      onUpdate() {
        seamlessLoop.time(wrapTime(playhead.offset));
      },
      duration: 0.5,
      ease: "power3",
      paused: true,
    });

    function updateOffset(newOffset, snap = false) {
      let targetOffset = snap ? snapTime(newOffset) : newOffset;
      scrub.vars.offset = targetOffset;
      scrub.invalidate().restart();
    }

    // Prev / Next button listeners
    const nextBtn = galleryEl.querySelector(".next-btn");
    const prevBtn = galleryEl.querySelector(".prev-btn");

    const handleNext = () => updateOffset(scrub.vars.offset + spacing, true);
    const handlePrev = () => updateOffset(scrub.vars.offset - spacing, true);

    if (nextBtn) nextBtn.addEventListener("click", handleNext);
    if (prevBtn) prevBtn.addEventListener("click", handlePrev);

    // Draggable setup
    const draggableInstance = Draggable.create(dragProxyEl, {
      type: "x",
      trigger: cardsEl,
      onPress() {
        this.startOffset = scrub.vars.offset;
      },
      onDrag() {
        updateOffset(this.startOffset + (this.startX - this.x) * 0.002);
      },
      onDragEnd() {
        updateOffset(scrub.vars.offset, true);
      },
    });

    function buildSeamlessLoop(items, spacing, animateFunc) {
      let overlap = Math.ceil(1 / spacing);
      let startTime = items.length * spacing + 0.5;
      let loopTime = (items.length + overlap) * spacing + 1;
      let rawSequence = gsap.timeline({ paused: true });
      let seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
          this._time === this._dur && (this._tTime += this._dur - 0.01);
        },
      });

      let l = items.length + overlap * 2;
      let time, i, index;

      for (i = 0; i < l; i++) {
        index = i % items.length;
        time = i * spacing;
        rawSequence.add(animateFunc(items[index]), time);
        if (i <= items.length) {
          seamlessLoop.add("label" + i, time);
        }
      }

      rawSequence.time(startTime);
      seamlessLoop
        .to(rawSequence, {
          time: loopTime,
          duration: loopTime - startTime,
          ease: "none",
        })
        .fromTo(
          rawSequence,
          { time: overlap * spacing + 1 },
          {
            time: startTime,
            duration: startTime - (overlap * spacing + 1),
            immediateRender: false,
            ease: "none",
          }
        );
      return seamlessLoop;
    }

    return () => {
      if (nextBtn) nextBtn.removeEventListener("click", handleNext);
      if (prevBtn) prevBtn.removeEventListener("click", handlePrev);
      if (draggableInstance[0]) draggableInstance[0].kill();
    };
  }, []);

  const displayCertifications = [
    ...certifications,
    ...certifications,
    ...certifications,
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full py-6 overflow-hidden select-none z-0"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[14rem] bg-indigo-600/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Cards Stage */}
      <div className="relative h-[20rem] sm:h-[22rem] w-full flex items-center justify-center">
        <ul
          ref={cardsRef}
          className="absolute w-[16rem] sm:w-[19rem] h-[17rem] sm:h-[19rem] cursor-grab active:cursor-grabbing list-none p-0 m-0"
        >
          {displayCertifications.map((c, i) => (
            <li
              key={`${c.id}-${i}`}
              className="absolute top-0 left-0 w-full h-full rounded-2xl bg-[#12121a]/95 backdrop-blur-xl p-6 flex flex-col justify-between border border-white/10 hover:border-accent/50 shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Header */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <FiAward className="text-base" />
                  </div>
                  <span className="text-xs font-mono font-medium text-accent uppercase tracking-wider">
                    {c.issuer}
                  </span>
                </div>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-muted-dark hover:text-white hover:bg-white/10 transition-colors"
                  title="View Certificate"
                >
                  <FiExternalLink className="text-sm" />
                </a>
              </div>

              {/* Title & Detail */}
              <div className="my-auto z-10">
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                  {c.title}
                </h4>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-muted-dark z-10">
                <span>{c.date}</span>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                >
                  Verify <FiExternalLink className="text-[10px]" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modern Sleek Controls */}
      <div className="mt-6 flex items-center justify-center gap-3 z-20 relative">
        <button
          className="prev-btn flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-[#12121a] text-white/80 font-mono text-xs hover:border-accent/50 hover:text-white hover:bg-accent/10 transition-all duration-200 active:scale-95 cursor-pointer"
          aria-label="Previous Certification"
        >
          <FiChevronLeft className="text-sm" /> Prev
        </button>
        <span className="font-mono text-[10px] text-muted-dark uppercase tracking-widest px-2">
          Drag / Scroll
        </span>
        <button
          className="next-btn flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 bg-[#12121a] text-white/80 font-mono text-xs hover:border-accent/50 hover:text-white hover:bg-accent/10 transition-all duration-200 active:scale-95 cursor-pointer"
          aria-label="Next Certification"
        >
          Next <FiChevronRight className="text-sm" />
        </button>
      </div>

      {/* Hidden Drag Proxy */}
      <div ref={dragProxyRef} className="drag-proxy hidden invisible absolute" />
    </div>
  );
}




