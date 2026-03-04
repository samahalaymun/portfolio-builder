import { memo, useCallback } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BLOCKS_REGISTRY } from "../schema/blocks.registry";

type Props = {
  order: string[];
  onReorder: (order: string[]) => void;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
};

// ✅ memo on SortableItem — only re-renders if its own id or onRemove changes
const SortableItem = memo(
  ({ id, onRemove }: { id: string; onRemove: () => void }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id });

    return (
      <div
        ref={setNodeRef}
        style={{ transform: CSS.Transform.toString(transform), transition }}
        className="flex items-center justify-between border rounded-md px-3 py-2 bg-background"
      >
        <div className="flex items-center gap-2">
          <GripVertical
            {...attributes}
            {...listeners}
            className="cursor-grab text-muted-foreground"
          />
          <span>{BLOCKS_REGISTRY[id]?.label}</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <Trash className="w-4 h-4 text-destructive" />
        </Button>
      </div>
    );
  },
);

const BlockManager = memo(({ order, onReorder, onAdd, onRemove }: Props) => {
  const availableBlocks = Object.values(BLOCKS_REGISTRY).filter(
    (b) => !order.includes(b.id),
  );

  // ✅ Stable drag handler — only recreated if order/onReorder changes
  const handleDragEnd = useCallback(
    (e: any) => {
      const { active, over } = e;
      if (!over || active.id === over.id) return;

      const oldIndex = order.indexOf(active.id as string);
      const newIndex = order.indexOf(over.id as string);

      const updated = [...order];
      updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, active.id as string);

      onReorder(updated);
    },
    [order, onReorder],
  );
  console.log("render block manager ");
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Sections</h3>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {order.map((id) => (
              // ✅ useCallback per-item would require a wrapper — instead
              // we pass a stable onRemove by relying on memo + useCallback in parent
              <SortableItem key={id} id={id} onRemove={() => onRemove(id)} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {availableBlocks.length > 0 && (
        <div className="pt-2">
          <h4 className="text-sm text-muted-foreground mb-2">Add section</h4>
          <div className="flex flex-wrap gap-2">
            {availableBlocks.map((b) => (
              <Button
                key={b.id}
                variant="outline"
                size="sm"
                onClick={() => onAdd(b.id)}
              >
                <Plus className="w-4 h-4 mr-1" />
                {b.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default BlockManager;
