import React from 'react';

interface MarkdownPreviewProps {
    content: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
    if (!content) return (
        <div className="flex items-center justify-center h-full text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-200">
            Henüz içerik girilmedi...
        </div>
    );

    return (
        <div
            className="prose prose-sm max-w-none bg-white p-6 rounded-xl border border-gray-200 overflow-y-auto max-h-[600px]
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-sm"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default MarkdownPreview;
