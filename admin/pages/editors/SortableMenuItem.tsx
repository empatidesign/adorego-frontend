import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableMenuItemProps {
    id: string;
    item: any;
    onEdit: (item: any) => void;
    onDelete: (id: string) => void;
    depth?: number;
}

export const SortableMenuItem: React.FC<SortableMenuItemProps> = ({ id, item, onEdit, onDelete, depth = 0 }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1 : 0,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className={`bg-white rounded border border-gray-100 shadow-sm mb-2 ${isDragging ? 'border-blue-300' : ''}`}>
            <div className={`p-3 flex items-center justify-between group ${depth > 0 ? 'ml-8 bg-gray-50/50' : ''}`}>
                <div className="flex items-center gap-3">
                    <div {...attributes} {...listeners} className="cursor-grab hover:text-blue-600 text-gray-400 p-1">
                        <i className="fas fa-grip-vertical"></i>
                    </div>
                    <div className="flex items-center gap-2">
                        {depth > 0 && <i className="fas fa-minus text-gray-300 text-xs mt-0.5"></i>}
                        <span className={`font-medium ${depth === 0 ? 'text-gray-700' : 'text-gray-600'}`}>
                            {item.labelTR}
                        </span>
                        {!item.isActive && (
                            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                                Pasif
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(item)}
                        className="text-blue-600 hover:bg-blue-50 p-1.5 rounded transition-colors"
                        title="Düzenle"
                    >
                        <i className="fas fa-edit"></i>
                    </button>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-600 hover:bg-red-50 p-1.5 rounded transition-colors"
                        title="Sil"
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};
