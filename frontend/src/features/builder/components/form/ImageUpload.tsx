import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  label: string;
  preview?: string;
  onChange: (file: File) => void;
  onRemove?: () => void;
  uploadLoading?: boolean;
  deleteLoading?: boolean;
};

export default function ImageUpload({
  label,
  preview,
  onChange,
  onRemove,
  uploadLoading,
  deleteLoading,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{label}</p>

      <div className="relative rounded-sm border border-dashed p-4 flex flex-col items-center justify-center gap-3 bg-muted/30">
        {preview ? (
          <>
            <img src={preview} alt={label} className="object-cover max-h-48" />

            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="absolute top-2 right-2 rounded-full bg-black/60 p-1 text-white"
              >
                {deleteLoading ? <Spinner /> : <X size={14} />}
              </button>
            )}
          </>
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
          disabled={uploadLoading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChange(file);
          }}
        />

        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={uploadLoading}
          onClick={() => inputRef.current?.click()}
        >
          {uploadLoading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
}
