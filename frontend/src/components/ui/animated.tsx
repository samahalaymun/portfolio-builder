import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

const animatedVariants = cva("animate-base", {
  variants: {
    variant: {
      enter: "animate-enter",
      scale: "animate-scale",
      rotate: "animate-rotate",
      swing: "animate-swing",
      flip: "animate-flip",
      slide: "",
    },
    direction: {
      left: "animate-slide-left",
      right: "animate-slide-right",
      top: "animate-slide-top",
      bottom: "animate-slide-bottom",
    },
  },
  compoundVariants: [
    {
      variant: "slide",
      direction: "left",
      className: "animate-slide-left",
    },
    {
      variant: "slide",
      direction: "right",
      className: "animate-slide-right",
    },
    {
      variant: "slide",
      direction: "top",
      className: "animate-slide-top",
    },
    {
      variant: "slide",
      direction: "bottom",
      className: "animate-slide-bottom",
    },
  ],
  defaultVariants: {
    variant: "enter",
  },
});

type AnimatedProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof animatedVariants> & {
    asChild?: boolean;
    delay?: number;
  };

function Animated({
  className,
  variant,
  direction,
  delay = 0,
  asChild = false,
  ...props
}: AnimatedProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const Comp = asChild ? Slot : "div";
  
  return (
    <Comp
      ref={ref}
      className={cn(
        animatedVariants({ variant, direction }),
        isVisible && "is-visible","w-full h-full",
        className
      )}
      style={{
        animationDelay: `${delay}ms`,
      }}
      {...props}
    />
  );
}

export { Animated, animatedVariants };

