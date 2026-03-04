import { Animated } from '@/components/ui/animated';
import { cn } from '@/lib/utils';

function Heading({title,className}:{title:string;className?:string}) {
  return (
    <Animated variant="flip">
      <h2
        className={cn(
          "mb-8 font-semibold text-foreground tracking-tight text-3xl sm:text-4xl",
          className,
        )}
      >
        {title}
      </h2>
    </Animated>
  );
}

export default Heading
