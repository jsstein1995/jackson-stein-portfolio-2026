"use client";

import type { ReactNode } from "react";

/* iPhone 15 Pro proportions */
export const PHONE_WIDTH = 300;
export const PHONE_HEIGHT = 620;
export const BEZEL = 12;
export const SCREEN_WIDTH = PHONE_WIDTH - BEZEL * 2;
export const SCREEN_HEIGHT = PHONE_HEIGHT - BEZEL * 2;
export const FRAME_RADIUS = 52;
export const SCREEN_RADIUS = 42;

type IPhoneMockupProps = {
  children: ReactNode;
  className?: string;
};

export function IPhoneMockup({ children, className = "" }: IPhoneMockupProps) {
  return (
    <div
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={{ width: PHONE_WIDTH, height: PHONE_HEIGHT }}
    >
      <div className="absolute inset-0 [transform-style:preserve-3d]">
        {/* Back plate — gives depth when tilted */}
        <div
          className="absolute inset-0 rounded-[52px]"
          style={{
            transform: "translateZ(-10px)",
            background:
              "linear-gradient(160deg, #1a1424 0%, #0d0a12 40%, #15101c 100%)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        />

        {/* Left edge — visible in 3/4 perspective like the reference */}
        <div
          className="absolute rounded-l-[48px]"
          style={{
            top: 14,
            bottom: 14,
            left: 0,
            width: 9,
            transform: "rotateY(-90deg) translateZ(4px)",
            transformOrigin: "left center",
            background: `
              linear-gradient(180deg,
                #5c4f6e 0%,
                #3d334f 8%,
                #2a2238 30%,
                #1a1525 55%,
                #2d2640 78%,
                #4a3f5c 100%
              )`,
            boxShadow: "inset 2px 0 4px rgba(255,255,255,0.12), inset -1px 0 2px rgba(0,0,0,0.4)",
          }}
        />

        {/* Right edge — darker, in shadow */}
        <div
          className="absolute rounded-r-[48px]"
          style={{
            top: 14,
            bottom: 14,
            right: 0,
            width: 9,
            transform: "rotateY(90deg) translateZ(4px)",
            transformOrigin: "right center",
            background:
              "linear-gradient(180deg, #1e1828 0%, #12101a 50%, #1a1524 100%)",
            boxShadow: "inset -1px 0 2px rgba(0,0,0,0.5)",
          }}
        />

        {/* Screen + content */}
        <div
          className="absolute overflow-hidden bg-black"
          style={{
            left: BEZEL,
            top: BEZEL,
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT,
            borderRadius: SCREEN_RADIUS,
            transform: "translateZ(2px)",
          }}
        >
          {children}
          <ScreenGlass />
        </div>

        {/* SVG frame — bezels, island, buttons, rim highlights */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ transform: "translateZ(4px)" }}
        >
          <IPhoneFrameSvg />
        </div>
      </div>
    </div>
  );
}

function ScreenGlass() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 28%, transparent 72%, rgba(255,255,255,0.04) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute -left-[10%] -top-[5%] h-[45%] w-[55%] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.18) 0%, transparent 65%)",
        }}
      />
    </>
  );
}

function IPhoneFrameSvg() {
  return (
    <svg
      viewBox={`0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full overflow-visible"
      aria-hidden
    >
      <defs>
        {/* Deep purple titanium — matches reference */}
        <linearGradient
          id="tiFrame"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#7a6b8f" />
          <stop offset="12%" stopColor="#4a3d5c" />
          <stop offset="30%" stopColor="#2d2640" />
          <stop offset="55%" stopColor="#1e1828" />
          <stop offset="78%" stopColor="#2a2238" />
          <stop offset="100%" stopColor="#5c4f6e" />
        </linearGradient>

        <linearGradient id="tiHighlight" x1="0%" y1="0%" x2="80%" y2="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="25%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        <linearGradient id="btnGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3d3450" />
          <stop offset="50%" stopColor="#5a4f6e" />
          <stop offset="100%" stopColor="#2a2238" />
        </linearGradient>

        <linearGradient id="btnGradR" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#3d3450" />
          <stop offset="100%" stopColor="#1e1828" />
        </linearGradient>

        <filter
          id="deviceShadow"
          x="-30%"
          y="-15%"
          width="160%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow
            dx="0"
            dy="28"
            stdDeviation="22"
            floodColor="#000"
            floodOpacity="0.4"
          />
          <feDropShadow
            dx="0"
            dy="10"
            stdDeviation="6"
            floodColor="#000"
            floodOpacity="0.25"
          />
        </filter>

        <filter id="bezelInset">
          <feOffset dx="0" dy="2" />
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g filter="url(#deviceShadow)">
        {/* Bezel ring — outer minus inner */}
        <path
          fill="url(#tiFrame)"
          fillRule="evenodd"
          clipRule="evenodd"
          d={`
            M ${FRAME_RADIUS} 0
            H ${PHONE_WIDTH - FRAME_RADIUS}
            Q ${PHONE_WIDTH} 0 ${PHONE_WIDTH} ${FRAME_RADIUS}
            V ${PHONE_HEIGHT - FRAME_RADIUS}
            Q ${PHONE_WIDTH} ${PHONE_HEIGHT} ${PHONE_WIDTH - FRAME_RADIUS} ${PHONE_HEIGHT}
            H ${FRAME_RADIUS}
            Q 0 ${PHONE_HEIGHT} 0 ${PHONE_HEIGHT - FRAME_RADIUS}
            V ${FRAME_RADIUS}
            Q 0 0 ${FRAME_RADIUS} 0
            Z
            M ${BEZEL + SCREEN_RADIUS} ${BEZEL}
            H ${PHONE_WIDTH - BEZEL - SCREEN_RADIUS}
            Q ${PHONE_WIDTH - BEZEL} ${BEZEL} ${PHONE_WIDTH - BEZEL} ${BEZEL + SCREEN_RADIUS}
            V ${PHONE_HEIGHT - BEZEL - SCREEN_RADIUS}
            Q ${PHONE_WIDTH - BEZEL} ${PHONE_HEIGHT - BEZEL} ${PHONE_WIDTH - BEZEL - SCREEN_RADIUS} ${PHONE_HEIGHT - BEZEL}
            H ${BEZEL + SCREEN_RADIUS}
            Q ${BEZEL} ${PHONE_HEIGHT - BEZEL} ${BEZEL} ${PHONE_HEIGHT - BEZEL - SCREEN_RADIUS}
            V ${BEZEL + SCREEN_RADIUS}
            Q ${BEZEL} ${BEZEL} ${BEZEL + SCREEN_RADIUS} ${BEZEL}
            Z
          `}
        />

        {/* Top-left rim light — key specular from reference */}
        <path
          d={`
            M ${FRAME_RADIUS} 1.5
            H ${PHONE_WIDTH * 0.45}
            M 1.5 ${FRAME_RADIUS}
            V ${PHONE_HEIGHT * 0.22}
          `}
          stroke="url(#tiHighlight)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Corner catch light — top left arc */}
        <path
          d={`M 8 ${FRAME_RADIUS + 4} Q 4 8 ${FRAME_RADIUS + 4} 8`}
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />

        {/* Antenna bands */}
        <line
          x1={22}
          y1={98}
          x2={PHONE_WIDTH - 22}
          y2={98}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.75"
        />
        <line
          x1={22}
          y1={PHONE_HEIGHT - 96}
          x2={PHONE_WIDTH - 22}
          y2={PHONE_HEIGHT - 96}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="0.75"
        />

        {/* Inner bezel shadow line */}
        <rect
          x={BEZEL}
          y={BEZEL}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          rx={SCREEN_RADIUS}
          stroke="rgba(0,0,0,0.65)"
          strokeWidth="1.5"
          fill="none"
        />
        <rect
          x={BEZEL + 0.5}
          y={BEZEL + 0.5}
          width={SCREEN_WIDTH - 1}
          height={SCREEN_HEIGHT - 1}
          rx={SCREEN_RADIUS - 0.5}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.5"
          fill="none"
        />

        {/* Dynamic Island */}
        <rect
          x={PHONE_WIDTH / 2 - 54}
          y={22}
          width={108}
          height={28}
          rx={14}
          fill="#000"
        />
        <rect
          x={PHONE_WIDTH / 2 - 54}
          y={22}
          width={108}
          height={28}
          rx={14}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
          fill="none"
        />
        {/* Camera dot inside island */}
        <circle
          cx={PHONE_WIDTH / 2 + 28}
          cy={36}
          r={4}
          fill="#0a0a0c"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.5"
        />

        {/* Left side buttons — Action + volume */}
        <rect
          x={-3.5}
          y={112}
          width={3.5}
          height={26}
          rx={1.2}
          fill="url(#btnGrad)"
        />
        <rect
          x={-3.5}
          y={148}
          width={3.5}
          height={48}
          rx={1.2}
          fill="url(#btnGrad)"
        />
        <rect
          x={-3.5}
          y={204}
          width={3.5}
          height={48}
          rx={1.2}
          fill="url(#btnGrad)"
        />
        {/* Button highlight edges */}
        <line
          x1={0}
          y1={114}
          x2={0}
          y2={136}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
        />
        <line
          x1={0}
          y1={150}
          x2={0}
          y2={194}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.5"
        />

        {/* Right side — power button */}
        <rect
          x={PHONE_WIDTH + 0.5}
          y={168}
          width={3.5}
          height={72}
          rx={1.2}
          fill="url(#btnGradR)"
        />
        <line
          x1={PHONE_WIDTH}
          y1={172}
          x2={PHONE_WIDTH}
          y2={234}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
        />
      </g>
    </svg>
  );
}

export function AtlasSplashContent() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0c1445] via-[#1a1f5c] to-[#0a1628]">
      <div className="absolute -left-1/4 top-1/4 h-[60%] w-[60%] rounded-full bg-[#4f46e5]/30 blur-[80px]" />
      <div className="absolute -right-1/4 bottom-1/4 h-[50%] w-[50%] rounded-full bg-[#7c3aed]/25 blur-[80px]" />
      <div className="absolute left-1/2 top-1/2 h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06b6d4]/20 blur-[60px]" />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
        <div className="h-16 w-16 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm" />
        <div className="space-y-2 text-center">
          <div className="mx-auto h-3 w-32 rounded-full bg-white/30" />
          <div className="mx-auto h-2 w-24 rounded-full bg-white/15" />
        </div>
        <div className="mt-8 flex gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-20 w-20 rounded-xl border border-white/15 bg-white/8 backdrop-blur-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
