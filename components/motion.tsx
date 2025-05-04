"use client"

import { type HTMLMotionProps, motion as framerMotion } from "framer-motion"

type MotionProps = HTMLMotionProps<"div">

export const motion = {
  div: (props: MotionProps) => <framerMotion.div {...props} />,
  h1: (props: HTMLMotionProps<"h1">) => <framerMotion.h1 {...props} />,
  h2: (props: HTMLMotionProps<"h2">) => <framerMotion.h2 {...props} />,
  p: (props: HTMLMotionProps<"p">) => <framerMotion.p {...props} />,
  span: (props: HTMLMotionProps<"span">) => <framerMotion.span {...props} />,
  img: (props: HTMLMotionProps<"img">) => <framerMotion.img {...props} />,
  button: (props: HTMLMotionProps<"button">) => <framerMotion.button {...props} />,
}
