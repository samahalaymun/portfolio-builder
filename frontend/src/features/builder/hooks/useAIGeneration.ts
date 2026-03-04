import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { toast } from "react-hot-toast";

interface UseAIGenerationOptions {
  endpoint: string; // e.g., "/ai/summary", "/ai/about", "/ai/project-description"
  onSuccess?: (text: string) => void;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * Reusable hook for AI text generation
 *
 * @example
 * // Generate summary
 * const { generate, isPending } = useAIGeneration({
 *   endpoint: "/ai/summary",
 *   onSuccess: (text) => setValue("summary", text),
 * });
 *
 * // Generate about section
 * const { generate, isPending } = useAIGeneration({
 *   endpoint: "/ai/about",
 *   onSuccess: (text) => setValue("about", text),
 * });
 */
export function useAIGeneration({
  endpoint,
  onSuccess,
  successMessage = "Generated successfully!",
  errorMessage = "Failed to generate. Please try again.",
}: UseAIGenerationOptions) {
  const mutation = useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      const response = await api.post(endpoint, payload);
      return response.data.text;
    },
    onSuccess: (generatedText: string) => {
      onSuccess?.(generatedText);
      toast.success(successMessage);
    },
    onError: (error: any) => {
      console.error("AI generation error:", error);
      toast.error(error.response?.data?.message || errorMessage);
    },
  });

  return {
    generate: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
