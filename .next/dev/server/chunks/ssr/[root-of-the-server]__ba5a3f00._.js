module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/components/CodeBlock.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CodeBlock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function CodeBlock({ lang, code }) {
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const copy = async ()=>{
        try {
            await navigator.clipboard.writeText(code);
        } catch (_) {}
        setCopied(true);
        setTimeout(()=>setCopied(false), 2000);
    };
    const lines = code.split('\n');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            borderRadius: '12px',
            overflow: 'hidden',
            margin: '12px 0',
            border: '1px solid rgba(0,212,170,0.2)',
            background: '#050510'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 14px',
                    background: 'rgba(0,212,170,0.06)',
                    borderBottom: '1px solid rgba(0,212,170,0.12)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '5px'
                                },
                                children: [
                                    '#ff5f57',
                                    '#febc2e',
                                    '#28c840'
                                ].map((c, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '50%',
                                            background: c,
                                            opacity: .7
                                        }
                                    }, i, false, {
                                        fileName: "[project]/components/CodeBlock.js",
                                        lineNumber: 22,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/CodeBlock.js",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '11px',
                                    color: '#00d4aa',
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontWeight: 500,
                                    letterSpacing: '0.08em'
                                },
                                children: lang || 'code'
                            }, void 0, false, {
                                fileName: "[project]/components/CodeBlock.js",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/CodeBlock.js",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: copy,
                        style: {
                            background: copied ? 'rgba(0,212,170,0.15)' : 'none',
                            border: `1px solid ${copied ? '#00d4aa' : 'rgba(0,212,170,0.2)'}`,
                            color: copied ? '#00d4aa' : '#44445a',
                            cursor: 'pointer',
                            fontSize: '11px',
                            padding: '3px 12px',
                            borderRadius: '20px',
                            fontFamily: 'inherit',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        },
                        children: copied ? '✓ copied' : 'copy'
                    }, void 0, false, {
                        fileName: "[project]/components/CodeBlock.js",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CodeBlock.js",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    overflowX: 'auto',
                    display: 'flex'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '14px 10px',
                            background: 'rgba(0,0,0,0.3)',
                            borderRight: '1px solid rgba(0,212,170,0.06)',
                            userSelect: 'none',
                            flexShrink: 0,
                            textAlign: 'right'
                        },
                        children: lines.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '12px',
                                    lineHeight: '1.7',
                                    color: '#22222e',
                                    fontFamily: 'JetBrains Mono, monospace'
                                },
                                children: i + 1
                            }, i, false, {
                                fileName: "[project]/components/CodeBlock.js",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/CodeBlock.js",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        style: {
                            margin: 0,
                            padding: '14px 16px',
                            fontSize: '13px',
                            lineHeight: '1.7',
                            color: '#c8d3f5',
                            fontFamily: 'JetBrains Mono, monospace',
                            whiteSpace: 'pre',
                            flex: 1
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            children: code
                        }, void 0, false, {
                            fileName: "[project]/components/CodeBlock.js",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/CodeBlock.js",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CodeBlock.js",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CodeBlock.js",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MODELS",
    ()=>MODELS,
    "SUGGESTIONS",
    ()=>SUGGESTIONS,
    "exportMarkdown",
    ()=>exportMarkdown,
    "formatTime",
    ()=>formatTime,
    "parseBold",
    ()=>parseBold,
    "parseContent",
    ()=>parseContent,
    "truncate",
    ()=>truncate,
    "uid",
    ()=>uid
]);
function uid() {
    return Math.random().toString(36).slice(2, 9);
}
function formatTime(date) {
    return new Intl.DateTimeFormat('en', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(date instanceof Date ? date : new Date(date));
}
function truncate(str, n = 44) {
    return str.length > n ? str.slice(0, n) + '…' : str;
}
function parseContent(text) {
    const parts = [], re = /```(\w*)\n?([\s\S]*?)```/g;
    let last = 0, m;
    while((m = re.exec(text)) !== null){
        if (m.index > last) parts.push({
            type: 'text',
            value: text.slice(last, m.index)
        });
        parts.push({
            type: 'code',
            lang: m[1] || 'text',
            value: m[2].trim()
        });
        last = m.index + m[0].length;
    }
    if (last < text.length) parts.push({
        type: 'text',
        value: text.slice(last)
    });
    if (!parts.length) parts.push({
        type: 'text',
        value: text
    });
    return parts;
}
function parseBold(text) {
    const segs = [], re = /\*\*(.*?)\*\*/g;
    let last = 0, m;
    while((m = re.exec(text)) !== null){
        if (m.index > last) segs.push({
            bold: false,
            text: text.slice(last, m.index)
        });
        segs.push({
            bold: true,
            text: m[1]
        });
        last = m.index + m[0].length;
    }
    if (last < text.length) segs.push({
        bold: false,
        text: text.slice(last)
    });
    return segs;
}
function exportMarkdown(conv) {
    if (!conv) return;
    const lines = [
        `# ${conv.title}\n`,
        `*Exported from VIGIL — ${new Date().toLocaleString()}*\n\n---\n`
    ];
    for (const m of conv.messages){
        lines.push(`### ${m.role === 'user' ? 'You' : 'VIGIL'}\n`);
        lines.push(m.content + '\n\n');
    }
    const blob = new Blob([
        lines.join('\n')
    ], {
        type: 'text/markdown'
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `vigil-${conv.id}.md`;
    a.click();
}
const MODELS = [
    {
        id: 'llama-3.3-70b-versatile',
        label: 'Llama 3.3 70B',
        tag: 'best'
    },
    {
        id: 'llama-3.1-8b-instant',
        label: 'Llama 3.1 8B',
        tag: 'fast'
    },
    {
        id: 'mixtral-8x7b-32768',
        label: 'Mixtral 8x7B',
        tag: 'long'
    },
    {
        id: 'gemma2-9b-it',
        label: 'Gemma 2 9B',
        tag: 'lite'
    }
];
const SUGGESTIONS = [
    {
        icon: '⚡',
        text: 'Explain how transformer attention works'
    },
    {
        icon: '🔨',
        text: 'Build a REST API with Python FastAPI'
    },
    {
        icon: '💡',
        text: 'Give me 10 futuristic startup ideas'
    },
    {
        icon: '🧠',
        text: 'What makes a neural network learn?'
    },
    {
        icon: '📄',
        text: 'Write a cold email that actually converts'
    },
    {
        icon: '🚀',
        text: 'How do I deploy this to production?'
    }
];
}),
"[project]/components/MessageContent.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MessageContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CodeBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CodeBlock.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
'use client';
;
;
;
function TextLine({ text }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseBold"])(text).map((s, i)=>s.bold ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                style: {
                    fontWeight: 600,
                    color: '#6ee7cc'
                },
                children: s.text
            }, i, false, {
                fileName: "[project]/components/MessageContent.js",
                lineNumber: 9,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: s.text
            }, i, false, {
                fileName: "[project]/components/MessageContent.js",
                lineNumber: 10,
                columnNumber: 11
            }, this))
    }, void 0, false);
}
function TextBlock({ value }) {
    const lines = value.split('\n'), out = [];
    let para = [];
    const flush = ()=>{
        if (!para.length) return;
        out.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            style: {
                margin: '0 0 10px',
                lineHeight: '1.85',
                color: '#ddddef',
                fontSize: '14.5px'
            },
            children: para.map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/components/MessageContent.js",
                            lineNumber: 21,
                            columnNumber: 44
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TextLine, {
                            text: l
                        }, void 0, false, {
                            fileName: "[project]/components/MessageContent.js",
                            lineNumber: 21,
                            columnNumber: 50
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/MessageContent.js",
                    lineNumber: 21,
                    columnNumber: 24
                }, this))
        }, out.length, false, {
            fileName: "[project]/components/MessageContent.js",
            lineNumber: 20,
            columnNumber: 14
        }, this));
        para = [];
    };
    for (const line of lines){
        if (!line.trim()) {
            flush();
        } else if (/^#{1,3}\s/.test(line)) {
            flush();
            out.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#eeeef8',
                    margin: '16px 0 8px',
                    paddingBottom: '6px',
                    borderBottom: '1px solid rgba(0,212,170,0.15)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TextLine, {
                    text: line.replace(/^#{1,3}\s/, '')
                }, void 0, false, {
                    fileName: "[project]/components/MessageContent.js",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, out.length, false, {
                fileName: "[project]/components/MessageContent.js",
                lineNumber: 29,
                columnNumber: 16
            }, this));
        } else if (/^\d+\.\s/.test(line)) {
            flush();
            out.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '10px',
                    margin: '4px 0',
                    alignItems: 'flex-start'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: '#00d4aa',
                            fontFamily: 'JetBrains Mono,monospace',
                            fontSize: '12px',
                            fontWeight: 500,
                            marginTop: '3px',
                            flexShrink: 0,
                            minWidth: '18px'
                        },
                        children: [
                            line.match(/^\d+/)[0],
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/MessageContent.js",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0,
                            lineHeight: '1.8',
                            color: '#ddddef',
                            fontSize: '14.5px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TextLine, {
                            text: line.replace(/^\d+\.\s/, '')
                        }, void 0, false, {
                            fileName: "[project]/components/MessageContent.js",
                            lineNumber: 36,
                            columnNumber: 87
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MessageContent.js",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, out.length, true, {
                fileName: "[project]/components/MessageContent.js",
                lineNumber: 34,
                columnNumber: 16
            }, this));
        } else if (/^[-•]\s/.test(line)) {
            flush();
            out.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '10px',
                    margin: '3px 0',
                    alignItems: 'flex-start'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: '#00d4aa',
                            fontSize: '16px',
                            lineHeight: '1.5',
                            flexShrink: 0
                        },
                        children: "›"
                    }, void 0, false, {
                        fileName: "[project]/components/MessageContent.js",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: 0,
                            lineHeight: '1.8',
                            color: '#ddddef',
                            fontSize: '14.5px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TextLine, {
                            text: line.replace(/^[-•]\s/, '')
                        }, void 0, false, {
                            fileName: "[project]/components/MessageContent.js",
                            lineNumber: 42,
                            columnNumber: 87
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/MessageContent.js",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, out.length, true, {
                fileName: "[project]/components/MessageContent.js",
                lineNumber: 40,
                columnNumber: 16
            }, this));
        } else {
            para.push(line);
        }
    }
    flush();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: out
    }, void 0, false);
}
function MessageContent({ text }) {
    const parts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseContent"])(text);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minWidth: 0
        },
        children: parts.map((p, i)=>p.type === 'code' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CodeBlock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                lang: p.lang,
                code: p.value
            }, i, false, {
                fileName: "[project]/components/MessageContent.js",
                lineNumber: 56,
                columnNumber: 13
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TextBlock, {
                value: p.value
            }, i, false, {
                fileName: "[project]/components/MessageContent.js",
                lineNumber: 57,
                columnNumber: 13
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/MessageContent.js",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MessageContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/MessageContent.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
/* ─── Animated background grid ──────────────────────────────────────────── */ function GridBackground() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
          linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)
        `,
                    backgroundSize: '40px 40px',
                    animation: 'gridMove 8s linear infinite',
                    maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)'
                }
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: '20%',
                    left: '15%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(0,212,170,0.04) 0%, transparent 70%)',
                    borderRadius: '50%'
                }
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    bottom: '25%',
                    right: '10%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)',
                    borderRadius: '50%'
                }
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
/* ─── Typing dots ────────────────────────────────────────────────────────── */ function TypingDots() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
            padding: '8px 0'
        },
        children: [
            [
                0,
                1,
                2
            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#00d4aa',
                        display: 'inline-block',
                        animation: `dot 1s ease-in-out ${i * 0.2}s infinite`
                    }
                }, i, false, {
                    fileName: "[project]/app/page.js",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: '12px',
                    color: '#44445a',
                    marginLeft: '6px',
                    fontFamily: 'JetBrains Mono,monospace'
                },
                children: "thinking..."
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 39,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
/* ─── Model badge ────────────────────────────────────────────────────────── */ function ModelBadge({ modelId, onChange }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const current = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MODELS"].find((m)=>m.id === modelId) || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MODELS"][0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'relative'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen(!open),
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 10px',
                    background: open ? 'rgba(0,212,170,0.12)' : 'rgba(0,212,170,0.06)',
                    border: '1px solid rgba(0,212,170,0.2)',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    color: '#00d4aa',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono,monospace',
                    fontWeight: 500,
                    transition: 'all 0.15s'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#00d4aa',
                            animation: 'pulse 2s ease-in-out infinite',
                            flexShrink: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    current.label,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            opacity: .5
                        },
                        children: "▾"
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    minWidth: '200px',
                    background: '#0c0c18',
                    border: '1px solid rgba(0,212,170,0.2)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    zIndex: 100,
                    animation: 'popIn 0.15s ease',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.5)'
                },
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MODELS"].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            onChange(m.id);
                            setOpen(false);
                        },
                        style: {
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            background: m.id === modelId ? 'rgba(0,212,170,0.08)' : 'transparent',
                            border: 'none',
                            borderBottom: '1px solid rgba(0,212,170,0.06)',
                            cursor: 'pointer',
                            color: m.id === modelId ? '#00d4aa' : '#8888aa',
                            fontSize: '12px',
                            fontFamily: 'JetBrains Mono,monospace',
                            transition: 'all 0.12s',
                            textAlign: 'left'
                        },
                        onMouseEnter: (e)=>e.currentTarget.style.background = 'rgba(0,212,170,0.06)',
                        onMouseLeave: (e)=>e.currentTarget.style.background = m.id === modelId ? 'rgba(0,212,170,0.08)' : 'transparent',
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: m.label
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 83,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '10px',
                                    padding: '2px 6px',
                                    background: 'rgba(0,212,170,0.1)',
                                    borderRadius: '10px',
                                    color: '#00d4aa'
                                },
                                children: m.tag
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this)
                        ]
                    }, m.id, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 72,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 65,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
/* ─── Voice input button ─────────────────────────────────────────────────── */ function VoiceBtn({ onResult, disabled }) {
    const [listening, setListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const recRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const toggle = ()=>{
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            alert('Voice input not supported in this browser. Try Chrome.');
            return;
        }
        if (listening) {
            recRef.current?.stop();
            setListening(false);
            return;
        }
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        const rec = new SR();
        rec.lang = 'en-US';
        rec.interimResults = false;
        rec.onresult = (e)=>{
            onResult(e.results[0][0].transcript);
            setListening(false);
        };
        rec.onend = ()=>setListening(false);
        rec.onerror = ()=>setListening(false);
        recRef.current = rec;
        rec.start();
        setListening(true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: toggle,
        disabled: disabled,
        title: "Voice input",
        style: {
            width: '32px',
            height: '32px',
            flexShrink: 0,
            border: 'none',
            borderRadius: '8px',
            background: listening ? 'rgba(255,68,102,0.15)' : 'rgba(0,212,170,0.06)',
            border: `1px solid ${listening ? 'rgba(255,68,102,0.4)' : 'rgba(0,212,170,0.15)'}`,
            color: listening ? '#ff4466' : '#44445a',
            cursor: disabled ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: listening ? 'glow 1s ease-in-out infinite' : 'none',
            transition: 'all 0.2s'
        },
        children: listening ? '⏹' : '🎤'
    }, void 0, false, {
        fileName: "[project]/app/page.js",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
/* ─── Single message ─────────────────────────────────────────────────────── */ function Message({ msg, streaming, streamText, onCopy, onStar, starred, isLast, onRegenerate }) {
    const [hovering, setHovering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const isUser = msg.role === 'user';
    const text = streaming ? streamText : msg.content;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onMouseEnter: ()=>setHovering(true),
        onMouseLeave: ()=>setHovering(false),
        style: {
            display: 'flex',
            gap: '14px',
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255,255,255,0.02)',
            background: isUser ? 'transparent' : 'rgba(0,212,170,0.02)',
            animation: 'fadeUp 0.2s ease',
            position: 'relative'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    flexShrink: 0,
                    background: isUser ? 'linear-gradient(135deg,#1e40af,#3b82f6)' : 'linear-gradient(135deg,#00d4aa,#00b894)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#fff',
                    marginTop: '1px',
                    fontFamily: 'Space Mono,monospace',
                    boxShadow: isUser ? 'none' : '0 0 12px rgba(0,212,170,0.3)'
                },
                children: isUser ? 'U' : 'V'
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    minWidth: 0,
                    maxWidth: '800px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '10px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    letterSpacing: '0.01em',
                                    color: isUser ? '#60a5fa' : '#00d4aa',
                                    fontFamily: 'Space Mono, monospace'
                                },
                                children: isUser ? 'you' : 'vigil'
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '10px',
                                    color: '#22222e',
                                    fontFamily: 'JetBrains Mono,monospace'
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTime"])(msg.at)
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            starred && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '12px'
                                },
                                children: "★"
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 179,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    streaming && !streamText ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TypingDots, {}, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 183,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$MessageContent$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                text: text
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 185,
                                columnNumber: 15
                            }, this),
                            streaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    display: 'inline-block',
                                    width: '2px',
                                    height: '16px',
                                    background: '#00d4aa',
                                    marginLeft: '2px',
                                    verticalAlign: 'text-bottom',
                                    animation: 'blink 0.8s step-end infinite'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 187,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            !streaming && hovering && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: '14px',
                    right: '20px',
                    display: 'flex',
                    gap: '4px',
                    animation: 'fadeIn 0.15s ease'
                },
                children: [
                    {
                        label: '⎘',
                        title: 'Copy',
                        action: ()=>onCopy(text)
                    },
                    {
                        label: '★',
                        title: starred ? 'Unstar' : 'Star',
                        action: ()=>onStar(msg.id)
                    },
                    ...!isUser && isLast ? [
                        {
                            label: '↺',
                            title: 'Regenerate',
                            action: onRegenerate
                        }
                    ] : []
                ].map((btn, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: btn.action,
                        title: btn.title,
                        style: {
                            background: 'rgba(0,212,170,0.08)',
                            border: '1px solid rgba(0,212,170,0.15)',
                            color: '#44445a',
                            cursor: 'pointer',
                            width: '28px',
                            height: '28px',
                            borderRadius: '7px',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.12s'
                        },
                        onMouseEnter: (e)=>{
                            e.target.style.color = '#00d4aa';
                            e.target.style.borderColor = 'rgba(0,212,170,0.4)';
                        },
                        onMouseLeave: (e)=>{
                            e.target.style.color = '#44445a';
                            e.target.style.borderColor = 'rgba(0,212,170,0.15)';
                        },
                        children: btn.label
                    }, i, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 204,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 195,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
/* ─── Empty / welcome state ──────────────────────────────────────────────── */ function EmptyState({ onSend }) {
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '75vh',
            padding: '40px 24px',
            textAlign: 'center',
            animation: 'fadeIn 0.5s ease'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'relative',
                    marginBottom: '24px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: '72px',
                            height: '72px',
                            borderRadius: '22px',
                            background: 'linear-gradient(135deg,rgba(0,212,170,0.15),rgba(0,212,170,0.05))',
                            border: '1px solid rgba(0,212,170,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '32px',
                            animation: 'glow 3s ease-in-out infinite'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: 'Space Mono,monospace',
                                fontWeight: 700,
                                color: '#00d4aa',
                                fontSize: '28px'
                            },
                            children: "V"
                        }, void 0, false, {
                            fileName: "[project]/app/page.js",
                            lineNumber: 234,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            bottom: '-4px',
                            right: '-4px',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: '#00d4aa',
                            border: '2px solid #080810',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '7px',
                                height: '7px',
                                borderRadius: '50%',
                                background: '#080810'
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/page.js",
                            lineNumber: 237,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: {
                    fontSize: '28px',
                    fontWeight: 600,
                    color: '#eeeef4',
                    marginBottom: '8px',
                    letterSpacing: '-0.03em'
                },
                children: [
                    "Neural intelligence. ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: '#00d4aa'
                        },
                        children: "Always on."
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 242,
                        columnNumber: 30
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: '14px',
                    color: '#44445a',
                    maxWidth: '380px',
                    lineHeight: '1.7',
                    marginBottom: '36px'
                },
                children: "VIGIL never sleeps. Ask anything — it thinks in real time, streams every token, and remembers this entire session."
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginBottom: '36px'
                },
                children: [
                    'Multi-model AI',
                    'Voice input',
                    'Code blocks',
                    'Export chat',
                    'Star messages'
                ].map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            padding: '4px 12px',
                            background: 'rgba(0,212,170,0.06)',
                            border: '1px solid rgba(0,212,170,0.15)',
                            borderRadius: '20px',
                            fontSize: '11.5px',
                            color: '#44445a',
                            fontFamily: 'JetBrains Mono,monospace'
                        },
                        children: f
                    }, i, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 251,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 249,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
                    gap: '10px',
                    maxWidth: '580px',
                    width: '100%'
                },
                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SUGGESTIONS"].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSend(s.text),
                        onMouseEnter: ()=>setHov(i),
                        onMouseLeave: ()=>setHov(null),
                        style: {
                            padding: '14px 16px',
                            background: hov === i ? 'rgba(0,212,170,0.08)' : 'rgba(0,212,170,0.03)',
                            border: `1px solid ${hov === i ? 'rgba(0,212,170,0.3)' : 'rgba(0,212,170,0.1)'}`,
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            textAlign: 'left',
                            color: hov === i ? '#00d4aa' : '#8888aa',
                            fontFamily: 'inherit',
                            lineHeight: '1.55',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            transition: 'all 0.15s',
                            transform: hov === i ? 'translateY(-2px)' : 'none'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '16px',
                                    flexShrink: 0
                                },
                                children: s.icon
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 272,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: s.text
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 273,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 258,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 224,
        columnNumber: 5
    }, this);
}
/* ─── Sidebar ────────────────────────────────────────────────────────────── */ function Sidebar({ convs, activeId, onNew, onSelect, onDelete, onExport, searchQuery, onSearch }) {
    const [hov, setHov] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const filtered = convs.filter((c)=>c.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        style: {
            width: '260px',
            minWidth: '260px',
            background: '#0a0a16',
            borderRight: '1px solid rgba(0,212,170,0.1)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '18px 16px',
                    borderBottom: '1px solid rgba(0,212,170,0.08)',
                    flexShrink: 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '11px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '34px',
                                height: '34px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg,rgba(0,212,170,0.2),rgba(0,212,170,0.08))',
                                border: '1px solid rgba(0,212,170,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'Space Mono,monospace',
                                fontWeight: 700,
                                fontSize: '16px',
                                color: '#00d4aa',
                                flexShrink: 0,
                                boxShadow: '0 0 12px rgba(0,212,170,0.15)'
                            },
                            children: "V"
                        }, void 0, false, {
                            fileName: "[project]/app/page.js",
                            lineNumber: 292,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontFamily: 'Space Mono,monospace',
                                        fontWeight: 700,
                                        fontSize: '14px',
                                        letterSpacing: '0.12em',
                                        color: '#eeeef4'
                                    },
                                    children: "VIGIL"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 294,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        fontSize: '9px',
                                        color: '#44445a',
                                        letterSpacing: '0.18em',
                                        fontFamily: 'JetBrains Mono,monospace'
                                    },
                                    children: "NEURAL INTERFACE"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 295,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.js",
                            lineNumber: 293,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.js",
                    lineNumber: 291,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 290,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '10px 12px',
                    flexShrink: 0,
                    borderBottom: '1px solid rgba(0,212,170,0.06)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: searchQuery,
                    onChange: (e)=>onSearch(e.target.value),
                    placeholder: "Search conversations...",
                    style: {
                        width: '100%',
                        padding: '7px 10px',
                        background: 'rgba(0,212,170,0.04)',
                        border: '1px solid rgba(0,212,170,0.12)',
                        borderRadius: '8px',
                        color: '#8888aa',
                        fontSize: '12px',
                        fontFamily: 'inherit',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                    },
                    onFocus: (e)=>e.target.style.borderColor = 'rgba(0,212,170,0.3)',
                    onBlur: (e)=>e.target.style.borderColor = 'rgba(0,212,170,0.12)'
                }, void 0, false, {
                    fileName: "[project]/app/page.js",
                    lineNumber: 302,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 301,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '10px 12px',
                    flexShrink: 0
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onNew,
                    onMouseEnter: (e)=>e.currentTarget.style.background = 'rgba(0,212,170,0.15)',
                    onMouseLeave: (e)=>e.currentTarget.style.background = 'rgba(0,212,170,0.08)',
                    style: {
                        width: '100%',
                        padding: '9px 13px',
                        background: 'rgba(0,212,170,0.08)',
                        border: '1px solid rgba(0,212,170,0.2)',
                        borderRadius: '10px',
                        color: '#00d4aa',
                        cursor: 'pointer',
                        fontSize: '12.5px',
                        fontWeight: 500,
                        fontFamily: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.15s'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: '18px',
                                lineHeight: 1
                            },
                            children: "＋"
                        }, void 0, false, {
                            fileName: "[project]/app/page.js",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this),
                        " New conversation"
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.js",
                    lineNumber: 313,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 312,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflowY: 'auto',
                    padding: '4px 8px'
                },
                children: [
                    filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '24px 12px',
                            textAlign: 'center',
                            color: '#22222e',
                            fontSize: '12px',
                            lineHeight: 1.8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '20px',
                                    marginBottom: '6px',
                                    opacity: .3
                                },
                                children: "💬"
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 325,
                                columnNumber: 13
                            }, this),
                            searchQuery ? 'No results' : 'No conversations yet'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 324,
                        columnNumber: 11
                    }, this),
                    filtered.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>onSelect(c.id),
                            onMouseEnter: ()=>setHov(c.id),
                            onMouseLeave: ()=>setHov(null),
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '9px 8px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                marginBottom: '2px',
                                background: c.id === activeId ? 'rgba(0,212,170,0.1)' : hov === c.id ? 'rgba(255,255,255,0.03)' : 'transparent',
                                border: `1px solid ${c.id === activeId ? 'rgba(0,212,170,0.25)' : 'transparent'}`,
                                transition: 'all 0.12s'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        flexShrink: 0,
                                        background: c.id === activeId ? '#00d4aa' : '#22222e',
                                        transition: 'background 0.2s'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 334,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        flex: 1,
                                        fontSize: '12.5px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        color: c.id === activeId ? '#6ee7cc' : '#44445a',
                                        fontFamily: 'inherit'
                                    },
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["truncate"])(c.title, 30)
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 335,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '3px',
                                        opacity: hov === c.id ? 1 : 0,
                                        transition: 'opacity 0.12s'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                onExport(c.id);
                                            },
                                            title: "Export",
                                            style: {
                                                background: 'none',
                                                border: 'none',
                                                color: '#44445a',
                                                cursor: 'pointer',
                                                fontSize: '11px',
                                                padding: '2px 4px',
                                                borderRadius: '4px'
                                            },
                                            onMouseEnter: (e)=>e.target.style.color = '#00d4aa',
                                            onMouseLeave: (e)=>e.target.style.color = '#44445a',
                                            children: "⎘"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 339,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                onDelete(c.id);
                                            },
                                            style: {
                                                background: 'none',
                                                border: 'none',
                                                color: '#44445a',
                                                cursor: 'pointer',
                                                fontSize: '11px',
                                                padding: '2px 4px',
                                                borderRadius: '4px'
                                            },
                                            onMouseEnter: (e)=>e.target.style.color = '#ff4466',
                                            onMouseLeave: (e)=>e.target.style.color = '#44445a',
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 341,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 338,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, c.id, true, {
                            fileName: "[project]/app/page.js",
                            lineNumber: 330,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 322,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: '10px 16px',
                    borderTop: '1px solid rgba(0,212,170,0.08)',
                    flexShrink: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '4px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#00d4aa',
                                    animation: 'pulse 2s ease-in-out infinite'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 351,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '11px',
                                    color: '#44445a',
                                    fontFamily: 'JetBrains Mono,monospace'
                                },
                                children: "system operational"
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 350,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: '10px',
                            color: '#22222e',
                            fontFamily: 'JetBrains Mono,monospace'
                        },
                        children: [
                            convs.length,
                            " session",
                            convs.length !== 1 ? 's' : '',
                            " · free forever"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 354,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 349,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 287,
        columnNumber: 5
    }, this);
}
/* ─── Toast notification ─────────────────────────────────────────────────── */ function Toast({ msg }) {
    if (!msg) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            bottom: '90px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            background: 'rgba(0,212,170,0.15)',
            border: '1px solid rgba(0,212,170,0.3)',
            borderRadius: '20px',
            fontSize: '13px',
            color: '#00d4aa',
            zIndex: 1000,
            animation: 'fadeUp 0.2s ease',
            backdropFilter: 'blur(10px)',
            fontFamily: 'JetBrains Mono,monospace'
        },
        children: msg
    }, void 0, false, {
        fileName: "[project]/app/page.js",
        lineNumber: 366,
        columnNumber: 5
    }, this);
}
function Home() {
    const [convs, setConvs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeId, setActiveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [streamText, setStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [sidebarOn, setSidebar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [model, setModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('llama-3.3-70b-versatile');
    const [starred, setStarred] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [charCount, setCharCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const endRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const taRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const abortRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const active = convs.find((c)=>c.id === activeId);
    const msgs = active?.messages || [];
    const showToast = (msg)=>{
        setToast(msg);
        setTimeout(()=>setToast(null), 2000);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        endRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [
        msgs,
        streamText
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (taRef.current) {
            taRef.current.style.height = 'auto';
            taRef.current.style.height = Math.min(taRef.current.scrollHeight, 200) + 'px';
        }
        setCharCount(input.length);
    }, [
        input
    ]);
    const newConv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])();
        setConvs((p)=>[
                {
                    id,
                    title: 'New conversation',
                    messages: [],
                    at: new Date()
                },
                ...p
            ]);
        setActiveId(id);
        setInput('');
    }, []);
    const deleteConv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setConvs((p)=>p.filter((c)=>c.id !== id));
        if (activeId === id) setActiveId(null);
    }, [
        activeId
    ]);
    const exportConv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        const conv = convs.find((c)=>c.id === id);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exportMarkdown"])(conv);
        showToast('Exported as markdown');
    }, [
        convs
    ]);
    const copyMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (text)=>{
        try {
            await navigator.clipboard.writeText(text);
        } catch (_) {}
        showToast('Copied to clipboard');
    }, []);
    const toggleStar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((msgId)=>{
        setStarred((p)=>({
                ...p,
                [msgId]: !p[msgId]
            }));
        showToast(starred[msgId] ? 'Unstarred' : 'Starred');
    }, [
        starred
    ]);
    const send = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (override)=>{
        const text = (override || input).trim();
        if (!text || busy) return;
        setInput('');
        setBusy(true);
        setStream('');
        let cid = activeId, prev = active?.messages || [];
        if (!cid) {
            cid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])();
            prev = [];
            const title = text.length > 46 ? text.slice(0, 46) + '…' : text;
            setConvs((p)=>[
                    {
                        id: cid,
                        title,
                        messages: [],
                        at: new Date()
                    },
                    ...p
                ]);
            setActiveId(cid);
        }
        const userMsg = {
            role: 'user',
            content: text,
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])(),
            at: new Date()
        };
        const nextMsgs = [
            ...prev,
            userMsg
        ];
        setConvs((p)=>p.map((c)=>c.id === cid ? {
                    ...c,
                    title: prev.length === 0 ? text.length > 46 ? text.slice(0, 46) + '…' : text : c.title,
                    messages: nextMsgs
                } : c));
        abortRef.current = new AbortController();
        let acc = '';
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: nextMsgs,
                    model
                }),
                signal: abortRef.current.signal
            });
            if (!res.ok) throw new Error(`API error ${res.status}`);
            const reader = res.body.getReader(), dec = new TextDecoder();
            while(true){
                const { done, value } = await reader.read();
                if (done) break;
                for (const line of dec.decode(value, {
                    stream: true
                }).split('\n')){
                    if (!line.startsWith('data: ')) continue;
                    const d = line.slice(6).trim();
                    if (d === '[DONE]') break;
                    try {
                        const p = JSON.parse(d);
                        if (p.text) {
                            acc += p.text;
                            setStream(acc);
                        }
                    } catch (_) {}
                }
            }
        } catch (err) {
            if (err.name !== 'AbortError') {
                acc = `Error: ${err.message}`;
                setStream(acc);
            }
        }
        setConvs((p)=>p.map((c)=>c.id === cid ? {
                    ...c,
                    messages: [
                        ...nextMsgs,
                        {
                            role: 'assistant',
                            content: acc || '(no response)',
                            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["uid"])(),
                            at: new Date()
                        }
                    ]
                } : c));
        setStream('');
        setBusy(false);
    }, [
        input,
        busy,
        activeId,
        active,
        model
    ]);
    const regenerate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!active || busy) return;
        const lastUserIdx = [
            ...active.messages
        ].reverse().findIndex((m)=>m.role === 'user');
        if (lastUserIdx === -1) return;
        const realIdx = active.messages.length - 1 - lastUserIdx;
        const trimmed = active.messages.slice(0, realIdx + 1);
        setConvs((p)=>p.map((c)=>c.id === activeId ? {
                    ...c,
                    messages: trimmed
                } : c));
        const lastUser = trimmed[trimmed.length - 1];
        setInput(lastUser.content);
        setTimeout(()=>send(lastUser.content), 50);
    }, [
        active,
        busy,
        activeId,
        send
    ]);
    const onKey = (e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };
    const canSend = input.trim().length > 0 && !busy;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            height: '100dvh',
            background: '#080810',
            overflow: 'hidden',
            position: 'relative'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GridBackground, {}, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 498,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: sidebarOn ? '260px' : '0',
                    minWidth: sidebarOn ? '260px' : '0',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 10
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Sidebar, {
                    convs: convs,
                    activeId: activeId,
                    onNew: newConv,
                    onSelect: setActiveId,
                    onDelete: deleteConv,
                    onExport: exportConv,
                    searchQuery: search,
                    onSearch: setSearch
                }, void 0, false, {
                    fileName: "[project]/app/page.js",
                    lineNumber: 502,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 501,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    minWidth: 0,
                    position: 'relative',
                    zIndex: 5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        style: {
                            height: '54px',
                            borderBottom: '1px solid rgba(0,212,170,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 20px',
                            gap: '12px',
                            background: 'rgba(8,8,16,0.9)',
                            flexShrink: 0,
                            backdropFilter: 'blur(20px)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSidebar(!sidebarOn),
                                onMouseEnter: (e)=>e.target.style.color = '#00d4aa',
                                onMouseLeave: (e)=>e.target.style.color = '#22222e',
                                style: {
                                    background: 'none',
                                    border: 'none',
                                    color: '#22222e',
                                    cursor: 'pointer',
                                    padding: '6px',
                                    borderRadius: '7px',
                                    fontSize: '18px',
                                    lineHeight: 1,
                                    transition: 'color 0.15s'
                                },
                                children: "☰"
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 515,
                                columnNumber: 11
                            }, this),
                            !sidebarOn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    flexShrink: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '8px',
                                            background: 'linear-gradient(135deg,rgba(0,212,170,0.2),rgba(0,212,170,0.08))',
                                            border: '1px solid rgba(0,212,170,0.3)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontFamily: 'Space Mono,monospace',
                                            fontWeight: 700,
                                            fontSize: '13px',
                                            color: '#00d4aa'
                                        },
                                        children: "V"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 524,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: 'Space Mono,monospace',
                                            fontWeight: 700,
                                            fontSize: '13px',
                                            letterSpacing: '0.1em',
                                            color: '#eeeef4'
                                        },
                                        children: "VIGIL"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 525,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 523,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1,
                                    display: 'flex',
                                    justifyContent: 'center'
                                },
                                children: active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '13px',
                                        color: '#22222e',
                                        fontFamily: 'JetBrains Mono,monospace',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        maxWidth: '400px'
                                    },
                                    children: active.title
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 530,
                                    columnNumber: 22
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 529,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    flexShrink: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ModelBadge, {
                                        modelId: model,
                                        onChange: setModel
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 534,
                                        columnNumber: 13
                                    }, this),
                                    active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>exportConv(activeId),
                                        title: "Export chat",
                                        style: {
                                            background: 'rgba(0,212,170,0.06)',
                                            border: '1px solid rgba(0,212,170,0.12)',
                                            color: '#44445a',
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            padding: '5px 10px',
                                            borderRadius: '20px',
                                            fontFamily: 'inherit',
                                            transition: 'all 0.15s'
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.color = '#00d4aa';
                                            e.currentTarget.style.borderColor = 'rgba(0,212,170,0.3)';
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.color = '#44445a';
                                            e.currentTarget.style.borderColor = 'rgba(0,212,170,0.12)';
                                        },
                                        children: "⎘ export"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 537,
                                        columnNumber: 15
                                    }, this),
                                    busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>abortRef.current?.abort(),
                                        style: {
                                            background: 'rgba(255,68,102,0.08)',
                                            border: '1px solid rgba(255,68,102,0.25)',
                                            color: '#ff4466',
                                            cursor: 'pointer',
                                            fontSize: '11.5px',
                                            padding: '5px 12px',
                                            borderRadius: '20px',
                                            fontFamily: 'inherit'
                                        },
                                        children: "◼ stop"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 544,
                                        columnNumber: 20
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            padding: '4px 10px',
                                            background: 'rgba(0,212,170,0.06)',
                                            border: '1px solid rgba(0,212,170,0.15)',
                                            borderRadius: '20px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: '5px',
                                                    height: '5px',
                                                    borderRadius: '50%',
                                                    background: '#00d4aa',
                                                    animation: 'pulse 2s ease-in-out infinite'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 547,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '10.5px',
                                                    color: '#00d4aa',
                                                    letterSpacing: '0.08em',
                                                    fontFamily: 'JetBrains Mono,monospace',
                                                    fontWeight: 500
                                                },
                                                children: "LIVE"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.js",
                                                lineNumber: 548,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.js",
                                        lineNumber: 546,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 533,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 514,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: 'auto'
                        },
                        children: [
                            msgs.length === 0 && !busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                onSend: send
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 555,
                                columnNumber: 36
                            }, this),
                            msgs.map((msg, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Message, {
                                    msg: msg,
                                    streaming: false,
                                    streamText: "",
                                    onCopy: copyMessage,
                                    onStar: toggleStar,
                                    starred: !!starred[msg.id],
                                    isLast: i === msgs.length - 1,
                                    onRegenerate: regenerate
                                }, msg.id, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 558,
                                    columnNumber: 13
                                }, this)),
                            busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Message, {
                                msg: {
                                    role: 'assistant',
                                    content: '',
                                    id: '__stream__',
                                    at: new Date()
                                },
                                streaming: true,
                                streamText: streamText,
                                onCopy: ()=>{},
                                onStar: ()=>{},
                                starred: false,
                                isLast: true,
                                onRegenerate: ()=>{}
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 567,
                                columnNumber: 18
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: endRef,
                                style: {
                                    height: '24px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/page.js",
                                lineNumber: 573,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 554,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '12px 20px 20px',
                            background: 'rgba(8,8,16,0.95)',
                            borderTop: '1px solid rgba(0,212,170,0.08)',
                            flexShrink: 0,
                            backdropFilter: 'blur(20px)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                maxWidth: '820px',
                                margin: '0 auto'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        gap: '8px',
                                        background: 'rgba(0,212,170,0.04)',
                                        border: '1px solid rgba(0,212,170,0.15)',
                                        borderRadius: '16px',
                                        padding: '10px 12px',
                                        transition: 'border-color 0.2s'
                                    },
                                    onFocusCapture: (e)=>e.currentTarget.style.borderColor = 'rgba(0,212,170,0.35)',
                                    onBlurCapture: (e)=>e.currentTarget.style.borderColor = 'rgba(0,212,170,0.15)',
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(VoiceBtn, {
                                            onResult: (t)=>{
                                                setInput((p)=>p ? p + ' ' + t : t);
                                            },
                                            disabled: busy
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 583,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            ref: taRef,
                                            value: input,
                                            onChange: (e)=>setInput(e.target.value),
                                            onKeyDown: onKey,
                                            placeholder: "Message VIGIL…  (Enter ↵ to send, Shift+Enter for new line)",
                                            disabled: busy,
                                            rows: 1,
                                            style: {
                                                flex: 1,
                                                background: 'none',
                                                border: 'none',
                                                outline: 'none',
                                                color: '#eeeef4',
                                                fontSize: '14.5px',
                                                lineHeight: '1.65',
                                                resize: 'none',
                                                fontFamily: 'inherit',
                                                padding: 0,
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                                opacity: busy ? 0.5 : 1
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 585,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                flexShrink: 0
                                            },
                                            children: [
                                                input.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '10px',
                                                        color: '#22222e',
                                                        fontFamily: 'JetBrains Mono,monospace',
                                                        minWidth: '24px',
                                                        textAlign: 'right'
                                                    },
                                                    children: charCount
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.js",
                                                    lineNumber: 593,
                                                    columnNumber: 34
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>send(),
                                                    disabled: !canSend,
                                                    style: {
                                                        width: '36px',
                                                        height: '36px',
                                                        border: 'none',
                                                        borderRadius: '10px',
                                                        cursor: canSend ? 'pointer' : 'not-allowed',
                                                        background: canSend ? 'linear-gradient(135deg,#00d4aa,#00b894)' : 'rgba(0,212,170,0.06)',
                                                        color: canSend ? '#080810' : '#22222e',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        fontSize: '16px',
                                                        transition: 'all 0.18s',
                                                        boxShadow: canSend ? '0 0 16px rgba(0,212,170,0.3)' : 'none',
                                                        transform: canSend ? 'scale(1)' : 'scale(0.95)'
                                                    },
                                                    children: busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            width: '14px',
                                                            height: '14px',
                                                            border: '2px solid rgba(8,8,16,0.3)',
                                                            borderTopColor: '#080810',
                                                            borderRadius: '50%',
                                                            display: 'block',
                                                            animation: 'spin 0.7s linear infinite'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/page.js",
                                                        lineNumber: 604,
                                                        columnNumber: 23
                                                    }, this) : '↑'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/page.js",
                                                    lineNumber: 594,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/page.js",
                                            lineNumber: 592,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 579,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        textAlign: 'center',
                                        marginTop: '8px',
                                        fontSize: '10.5px',
                                        color: '#22222e',
                                        fontFamily: 'JetBrains Mono,monospace',
                                        letterSpacing: '0.06em'
                                    },
                                    children: "vigil · neural interface · built from scratch · always alive"
                                }, void 0, false, {
                                    fileName: "[project]/app/page.js",
                                    lineNumber: 611,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/page.js",
                            lineNumber: 578,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.js",
                        lineNumber: 577,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.js",
                lineNumber: 511,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Toast, {
                msg: toast
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 618,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 497,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ba5a3f00._.js.map