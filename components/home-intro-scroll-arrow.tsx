"use client";

import { HomeScrollArrow } from "@/components/home-scroll-arrow";
import { HOME_ARROW_COLOR } from "@/lib/home-arrow-path";
import type { RefObject } from "react";

type HomeIntroScrollArrowProps = {
  containerRef: RefObject<HTMLElement | null>;
};

export function HomeIntroScrollArrow({
  containerRef,
}: HomeIntroScrollArrowProps) {
  return (
    <HomeScrollArrow
      containerRef={containerRef}
      color={HOME_ARROW_COLOR}
      className="absolute top-[30%] bottom-[8%] left-[55%] w-[min(21%,110px)] translate-y-[200px] md:left-[53%] lg:left-[52%] lg:w-[min(19%,130px)] xl:left-[50%] xl:w-[140px]"
    />
  );
}
