import React, { useState, useEffect } from "react";
import { Search, ChevronDown, RotateCcw, X, Maximize2, Minimize2, ListFilter, Info, FileText, IdCard, ClipboardList, ShieldCheck } from "lucide-react";
import faqs from "./faqs.json";

export default function Faq() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const categoryOptions = [
    { value: "all", label: "All Topics", Icon: ListFilter },
    { value: "General Information", label: "General Information", Icon: Info },
    { value: "Registration", label: "Registration", Icon: FileText },
    { value: "ID & Documents", label: "ID & Documents", Icon: IdCard },
    { value: "Voting Methods and Process", label: "Voting Methods and Process", Icon: ClipboardList },
    { value: "Rights & Special Circumstances", label: "Rights & Special Circumstances", Icon: ShieldCheck },
  ];

  const selectedOption = categoryOptions.find(o => o.value === selectedCategory);
  const SelectedIcon = selectedOption?.Icon;

  const filteredFAQs = faqs
    .filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(faq => selectedCategory === "all" || faq.category === selectedCategory);

  useEffect(() => {
    if (expandedIndex != null && (expandedIndex < 0 || expandedIndex >= filteredFAQs.length)) {
      setExpandedIndex(null);
    }
  }, [expandedIndex, filteredFAQs.length]);

  const linkifyText = (text) => {
    const combined = /([^\s()]+)\s*\(((?:https?:\/\/|www\.)?[^\s()]*\.(?:com|gov|org)[^\s()]*)\)|((?:https?:\/\/|www\.)?[^\s()]*\.(?:com|gov|org)[^\s()]*)/gi;
    const nodes = [];
    let lastIndex = 0;
    let match;

    while ((match = combined.exec(text)) !== null) {
      const full = match[0];
      const start = match.index;
      if (start > lastIndex) nodes.push(text.slice(lastIndex, start));

      if (match[1] && match[2]) {
        const label = match[1];
        const urlInParens = match[2];
        const href = /^https?:\/\//i.test(urlInParens)
          ? urlInParens
          : urlInParens.startsWith('www.')
            ? `https://${urlInParens}`
            : `https://${urlInParens}`;

        nodes.push(
          <a
            key={`${start}-label-${href}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300 break-words"
          >
            {label}
          </a>
        );
      } else if (match[3]) {
        let token = match[3];
        const trailingMatch = token.match(/[.,;:!?]+$/);
        const trailing = trailingMatch ? trailingMatch[0] : '';
        const clean = trailing ? token.slice(0, token.length - trailing.length) : token;
        const href = /^https?:\/\//i.test(clean)
          ? clean
          : clean.startsWith('www.')
            ? `https://${clean}`
            : `https://${clean}`;

        nodes.push(
          <a
            key={`${start}-url-${clean}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300 break-words"
          >
            {clean}
          </a>
        );
        if (trailing) nodes.push(trailing);
      }

      lastIndex = start + full.length;
    }

    if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
    return nodes;
  };

  const renderAnswer = (text) => (
    <span className="break-words whitespace-pre-line">{linkifyText(text)}</span>
  );

  return (
    <> 
      {/* Search and Filter Bar */}
      <div className="relative z-50 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 mb-6">
        <div className="flex flex-col lg:flex-row items-stretch gap-4">
          <div className="relative flex-grow min-w-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
            <input
              type="text"
              placeholder="Search FAQ topics, questions, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-blue-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            />
          </div>

          <div className="relative z-50 flex items-center justify-end">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={categoryMenuOpen}
              onClick={() => setCategoryMenuOpen((v) => !v)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border w-44 sm:w-52 justify-center ${
                selectedCategory !== 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white border-blue-400/30 hover:opacity-90'
                  : 'bg-white/10 text-blue-200 border-white/20 hover:bg-white/15'
              }`}
            >
              {selectedCategory !== 'all' ? (
                <>
                  {SelectedIcon && <SelectedIcon className="w-4 h-4" />}
                  <span className="text-xs truncate">{selectedOption?.label}</span>
                  <span
                    role="button"
                    title="Clear category"
                    aria-label="Clear category"
                    onClick={(e) => { e.stopPropagation(); setSelectedCategory('all'); }}
                    className="ml-2 inline-flex items-center justify-center rounded-md hover:bg-white/20 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5" />
                  <span className="text-xs">Filter by Category</span>
                </>
              )}
            </button>

            {categoryMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl p-2 z-50">
                <ul className="max-h-72 overflow-auto">
                  <li key="__clear__" className="mb-1">
                    <button
                      onClick={() => { setSelectedCategory('all'); setCategoryMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-blue-200 hover:bg-white/10"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span className="truncate">Clear</span>
                    </button>
                  </li>

                  {categoryOptions
                    .filter(({ value }) => value !== 'all')
                    .map(({ value, label, Icon }) => {
                      const active = selectedCategory === value;
                      return (
                        <li key={value}>
                          <button
                            onClick={() => { setSelectedCategory(value); setCategoryMenuOpen(false); }}
                            className={
                              "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm " +
                              (active ? "bg-slate-800 text-white" : "text-blue-200 hover:bg-white/10")
                            }
                          >
                            <Icon className="w-4 h-4" />
                            <span className="truncate">{label}</span>
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* FAQ List */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 mb-8 max-h-96 overflow-y-auto overflow-x-visible">
        <div className="p-6 text-left">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4 overflow-visible">
              {filteredFAQs.map((item, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    if (e.target?.closest && e.target.closest('a')) return;
                    setExpandedIndex((prev) => (prev === index ? null : index));
                  }}
                  className={
                    "relative cursor-pointer border-b border-white/10 last:border-b-0 pb-4 last:pb-0 transition-all duration-300 ease-out " +
                    (expandedIndex === index ? "z-10 bg-white/10 rounded-xl ring-1 ring-blue-400/20" : "")
                  }
                >
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setExpandedIndex((prev) => (prev === index ? null : index)); }}
                    aria-expanded={expandedIndex === index}
                    aria-label={expandedIndex === index ? 'Shrink' : 'Enlarge'}
                    className="absolute top-2 right-2 p-0.5 text-blue-200 hover:text-blue-100"
                  >
                    {expandedIndex === index ? (
                      <Minimize2 className="w-3.5 h-3.5" />
                    ) : (
                      <Maximize2 className="w-3 h-3" />
                    )}
                  </button>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-2 leading-relaxed">{item.question}</h3>
                      <p className="text-blue-200 text-sm leading-relaxed mb-3">{renderAnswer(item.answer)}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-blue-300 text-xs">Category: {item.category}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-blue-300 mx-auto mb-4" />
              <p className="text-blue-200">No questions found matching your search.</p>
              <p className="text-blue-300 text-sm mt-2">Try different keywords or select a different category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Pop-out overlay */}
      {expandedIndex != null && filteredFAQs[expandedIndex] && (
        <div
          className="fixed inset-0 z-[999]"
          onClick={() => setExpandedIndex(null)}
        >
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[92vw] max-w-4xl">
            <div
              className="relative bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setExpandedIndex(null)}
                aria-label="Close"
                className="absolute top-2 right-2 p-0.5 text-blue-200 hover:text-blue-100"
              >
                <Minimize2 className="w-4 h-4" />
              </button>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">{expandedIndex + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-3 leading-relaxed text-2xl md:text-3xl">
                    {filteredFAQs[expandedIndex].question}
                  </h3>
                  <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-4">
                    {renderAnswer(filteredFAQs[expandedIndex].answer)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {filteredFAQs[expandedIndex].tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-blue-500/20 text-blue-200 border border-blue-400/30 text-sm px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-blue-300 text-sm">Category: {filteredFAQs[expandedIndex].category}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
