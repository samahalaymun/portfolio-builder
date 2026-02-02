import { useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  onChange: (file: File) => void;
  preview?: string;
};

export default function ImageUpload({
  label,
  onChange,
  preview,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{label}</p>

      <div className="relative rounded-sm border border-dashed p-4 flex flex-col items-center justify-center gap-3 bg-muted/30">
        {preview ? (
          <img
            src={preview}
            alt={label}
            className="object-cover"
          />
        ) : (
          <>
            <Upload className="h-6 w-6 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Click to upload image
            </p>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChange(file);
          }}
        />

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => inputRef.current?.click()}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}
