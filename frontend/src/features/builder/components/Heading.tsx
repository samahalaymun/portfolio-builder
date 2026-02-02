import { Animated } from '@/components/ui/animated';

function Heading({title}:{title:string}) {
  return (
    <Animated variant="flip">
      <h2 className="mb-8 font-semibold tracking-tight">{title}</h2>
    </Animated>
  );
}

export default Heading
