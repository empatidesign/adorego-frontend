import React from 'react';

export const CmsSections: React.FC<{ sections: any[] }> = ({ sections }) => (
    <>
        {sections.map((section: any, idx: number) => (
            <div key={idx} className="mb-8">
                {section.type === 'text' && <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />}
                {section.type === 'heading' && <h2 className="text-2xl font-bold text-[#102477] mb-4 mt-8">{section.content}</h2>}
                {section.type === 'list' && (
                    <div className="space-y-4">
                        {section.items?.map((item: string, i: number) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-[#4DB848] rounded-full flex items-center justify-center shrink-0 mt-0.5"><i className="fas fa-check text-white text-sm"></i></div>
                                <p className="text-gray-600 text-sm pt-1">{item}</p>
                            </div>
                        ))}
                    </div>
                )}
                {section.type === 'card-grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {section.cards?.map((card: any, i: number) => (
                            <div key={i} className="bg-slate-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                {card.icon && <div className="w-12 h-12 bg-[#102477]/10 rounded-lg flex items-center justify-center mb-4"><i className={`fas ${card.icon} text-[#102477] text-xl`}></i></div>}
                                <h3 className="text-lg font-bold text-[#102477] mb-2">{card.title}</h3>
                                <p className="text-gray-600 text-sm">{card.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ))}
    </>
);
