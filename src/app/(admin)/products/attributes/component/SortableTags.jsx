"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableTags = ({ tag, isStatic = false }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: tag.value });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            key={tag.value}
            ref={!isStatic ? setNodeRef : undefined}
            {...(isStatic ? {} : attributes)}
            {...(isStatic ? {} : listeners)}
            style={style}
            className={`badge d-flex align-items-center justify-content-between mb-2 p-2
            ${isStatic ? "bg-primary text-white" : "bg-primary bg-opacity-10 text-primary border border-primary"}
            ${!isStatic ? "cursor-grab" : ""}
      `}
        >
            <span>{tag.label}</span>
        </div>
    );
}

export default SortableTags