import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSection from "../form/FormSection";
import SkillTag from "./SkillTag";
function SkillsSection() {
    const { watch, setValue } = useFormContext();
    const skills: string[] = watch("skills") || [];
    const [input, setInput] = useState("");

     function addSkill() {
       if (!input.trim()) return;
       if (skills.includes(input.trim())) return;

       setValue("skills", [...skills, input.trim()], {
         shouldDirty: true,
       });
       setInput("");
     }
       function removeSkill(skill: string) {
         setValue(
           "skills",
           skills.filter((s) => s !== skill),
           { shouldDirty: true },
         );
       }
  return (
    <FormSection
      title="Skills"
      description="Add the skills you want to highlight on your portfolio."
    >
      {/* Input */}
      <div className="flex gap-2">
        <Input
          placeholder="e.g. React, TypeScript, Tailwind"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill()}
        />
        <Button type="button" onClick={addSkill}>
          Add
        </Button>
      </div>

      {/* Tags */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map((skill) => (
            <SkillTag
              key={skill}
              label={skill}
              onRemove={() => removeSkill(skill)}
            />
          ))}
        </div>
      )}
    </FormSection>
  );
}

export default SkillsSection;
