import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface EditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
    label?: string;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, placeholder, label }) => {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'link', 'image'
    ];

    return (
        <div className="mb-6">
            {label && <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>}
            <div className="quill-editor-container bg-white rounded-xl border border-gray-200 overflow-hidden focus-within:ring-4 focus-within:ring-blue-600/5 focus-within:border-blue-600 transition-all">
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                    placeholder={placeholder}
                    className="h-auto"
                />
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                .quill-editor-container .ql-toolbar.ql-snow {
                    border: none;
                    border-bottom: 1px solid #f1f5f9;
                    background: #f8fafc;
                    padding: 12px;
                }
                .quill-editor-container .ql-container.ql-snow {
                    border: none;
                    min-height: 300px;
                    font-family: inherit;
                    font-size: 0.875rem;
                }
                .ql-editor {
                    min-height: 300px;
                    padding: 20px;
                }
                .ql-editor p {
                    margin-bottom: 1rem;
                }
            `}} />
        </div>
    );
};

export default Editor;
