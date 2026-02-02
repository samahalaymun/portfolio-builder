import type { Project } from '../../store/builder.store'
import { Button } from '@/components/ui/button';
import { ArrowUpRight, CodeXml } from 'lucide-react';

function ProjectSlide({project}:{project:Project}) {
  return (
    <div className="grid md:grid-cols-2 gap-3 md:p-8 p-4">
      <div className="h-80 bg-muted">
        <img src={project.image} className="w-full h-full" />
      </div>
      <div className="p-4  flex flex-col gap-2 md:gap-3 justify-center">
        <h4 className="font-semibold text-foreground ">
          {project.title}
        </h4>
        <p className='text-muted-foreground'>{project.description}</p>
        <div className="flex gap-2 flex-wrap">
          {project?.technologies.map((tech) => (
            <span className="p-2 rounded-md bg-muted">{tech}</span>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <Button asChild variant="secondary">
            <a target="_blank" href={project.liveDemo}>
              Demo <ArrowUpRight />
            </a>
          </Button>
          <Button variant="secondary" asChild>
            <a target="_blank" href={project.sourceCode}>
              Code
              <CodeXml />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectSlide
