'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { SiTypescript } from 'react-icons/si'

const rawCode = `interface Architect {
  name: string
  role: string
  specialization: string[]
  build: (scope: string) => Promise<Application>
}

const mominul: Architect = {
  name: 'Md. Mominul Islam',
  role: 'Full-Stack & Android Architect',
  specialization: [
    'Flutter & Android 60fps Native Apps',
    'Next.js 14 Full-Stack Web',
    'High-Throughput Node.js & Laravel APIs',
    'Linux VPS CI/CD Cloud Automation'
  ],
  build: async (scope) => {
    const engineeredProduct = await compileArchitecture({
      target: scope,
      responsiveness: '60fps',
      security: 'Enterprise Grade',
      subSecondLatency: true
    })
    return engineeredProduct.deploy()
  }
}

export default mominul`

interface Token {
  text: string
  type: 'keyword' | 'type' | 'string' | 'property' | 'punct' | 'variable' | 'default'
}

function parseLine(line: string): Token[] {
  // Simple token parser for syntax highlighting
  const tokens: Token[] = []
  const words = line.split(/(\s+|[{}\[\](),:;=>'])/)

  for (let i = 0; i < words.length; i++) {
    const w = words[i]
    if (!w) continue

    if (['interface', 'const', 'async', 'await', 'return', 'export', 'default'].includes(w)) {
      tokens.push({ text: w, type: 'keyword' })
    } else if (['string', 'Promise', 'Application', 'Architect', 'boolean'].includes(w)) {
      tokens.push({ text: w, type: 'type' })
    } else if (['true', 'false'].includes(w)) {
      tokens.push({ text: w, type: 'variable' })
    } else if (['name', 'role', 'specialization', 'build', 'target', 'responsiveness', 'security', 'subSecondLatency'].includes(w)) {
      tokens.push({ text: w, type: 'property' })
    } else if (w.startsWith("'") || w.endsWith("'")) {
      tokens.push({ text: w, type: 'string' })
    } else {
      tokens.push({ text: w, type: 'default' })
    }
  }

  return tokens
}

export default function CodePlayground() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = rawCode.split('\n')

  return (
    <div
      className="rounded-2xl border border-stone-800/80 shadow-2xl overflow-hidden font-mono text-xs transition-all duration-300"
      style={{ backgroundColor: '#0d1117' }}
    >
      {/* macOS Window Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-stone-800/80 select-none">
        
        {/* Left: macOS Traffic Light Buttons */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-xs transition-transform hover:scale-110" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-xs transition-transform hover:scale-110" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-xs transition-transform hover:scale-110" />
        </div>

        {/* Center: File Tab Name with TypeScript Icon */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0d1117] border border-stone-800 text-[11px] text-stone-300 font-medium">
          <SiTypescript size={12} className="text-[#3178C6]" />
          <span>mominul.ts</span>
        </div>

        {/* Right: Quick Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#21262d] hover:bg-[#30363d] text-stone-300 text-[11px] transition-colors border border-stone-700/60 cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Editor Window Area */}
      <div className="p-4 sm:p-5 overflow-x-auto text-[12px] sm:text-[13px] leading-relaxed">
        <div className="table w-full">
          {lines.map((line, idx) => (
            <div key={idx} className="table-row hover:bg-white/[0.02] transition-colors">
              {/* Line Numbers */}
              <span className="table-cell pr-4 text-right select-none text-stone-600 text-[11px] w-8">
                {idx + 1}
              </span>

              {/* Line Code Content with Syntax Colors */}
              <span className="table-cell whitespace-pre font-mono">
                {parseLine(line).map((token, tIdx) => {
                  let colorClass = 'text-stone-300'
                  if (token.type === 'keyword') colorClass = 'text-pink-400 font-semibold'
                  else if (token.type === 'type') colorClass = 'text-cyan-400 font-medium'
                  else if (token.type === 'string') colorClass = 'text-emerald-400'
                  else if (token.type === 'property') colorClass = 'text-purple-300'
                  else if (token.type === 'variable') colorClass = 'text-amber-400'

                  return (
                    <span key={tIdx} className={colorClass}>
                      {token.text}
                    </span>
                  )
                })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mac Status Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#161b22] border-t border-stone-800/80 text-[10px] text-stone-500 font-mono select-none">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-semibold">● Ready</span>
          <span>TypeScript 5.x</span>
          <span className="hidden xs:inline">UTF-8</span>
        </div>
        <div>
          <span>Ln {lines.length}, Col 1</span>
        </div>
      </div>
    </div>
  )
}
