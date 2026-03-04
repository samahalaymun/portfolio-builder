import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  value?: string[];
  onChange: (value: string[]) => void;
};

export default function TechStackInput({ value = [], onChange }: Props) {
  const [input, setInput] = useState("");

  function addTech() {
    if (!input.trim()) return;
    if (value.includes(input)) return;

    onChange([...value, input.trim()]);
    setInput("");
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="e.g. React, Node.js"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTech()}
        />
        <Button type="button" onClick={addTech}>
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {value.map((tech) => (
          <span
            key={tech}
            className="flex items-center gap-1 rounded-full border px-3 py-1 text-sm"
          >
            {tech}
            <button onClick={() => onChange(value.filter((t) => t !== tech))}>
              <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
