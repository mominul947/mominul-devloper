'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Copy,
  Check,
  CheckCircle2,
  Loader,
  ClipboardPaste,
  ShieldCheck,
  ChevronRight,
  Phone,
  Hash,
  User,
  Sparkles,
  Building2,
  BadgeCheck,
  Lock,
  ArrowRight,
  Package,
  AlertCircle,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { paymentConfig } from '@/config/payment'

export default function PaymentPage() {
  const [method, setMethod] = useState<'bkash' | 'nagad' | 'cellfin' | 'bank' | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [liveSettings, setLiveSettings] = useState({
    bkashNumber: paymentConfig.bkashNumber,
    nagadNumber: paymentConfig.nagadNumber,
    cellfinBankName: paymentConfig.cellfinBankName,
    cellfinBranch: paymentConfig.cellfinBranch,
    cellfinRoutingNumber: paymentConfig.cellfinRoutingNumber,
    cellfinAccountName: paymentConfig.cellfinAccountName,
    cellfinAccountNumber: paymentConfig.cellfinAccountNumber,
    bankName: paymentConfig.bankName,
    bankBranch: paymentConfig.bankBranch,
    bankRoutingNumber: paymentConfig.bankRoutingNumber,
    bankAccountName: paymentConfig.bankAccountName,
    bankAccountNumber: paymentConfig.bankAccountNumber,
    minAmount: paymentConfig.minAmount,
  })

  const [selectedPackage, setSelectedPackage] = useState<string>('Online Service Payment')

  const [receipt, setReceipt] = useState<{
    id: string
    name: string
    trxId: string
    amount: string
    senderPhone: string
    method: string
    package: string
    date: string
  } | null>(null)

  const [form, setForm] = useState({
    clientName: '',
    senderNumber: '',
    trxId: '',
    amount: '',
  })

  // Check URL params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const urlMethod = params.get('method')
      if (urlMethod === 'bkash' || urlMethod === 'nagad' || urlMethod === 'cellfin' || urlMethod === 'bank') {
        setMethod(urlMethod)
      }
      const urlPackage = params.get('package')
      if (urlPackage) {
        setSelectedPackage(decodeURIComponent(urlPackage))
      }
    }
  }, [])

  // Fetch dynamic payment numbers from server
  useEffect(() => {
    // 1. Immediately hydrate from localStorage if available (0ms instant sync)
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('portfolio_live_settings')
        if (cached) {
          const parsed = JSON.parse(cached)
          if (parsed && (parsed.bkashNumber || parsed.nagadNumber)) {
            setLiveSettings((prev) => ({ ...prev, ...parsed }))
          }
        }
      } catch (e) {}
    }

    // 2. Fetch fresh numbers from server with cache-busting timestamp
    fetch(`/api/admin/payment?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.bkashNumber || data.bankAccountNumber || data.cellfinAccountNumber)) {
          setLiveSettings((prev) => ({
            ...prev,
            ...data,
          }))
          try {
            localStorage.setItem('portfolio_live_settings', JSON.stringify(data))
          } catch (e) {}
        }
      })
      .catch(() => {})
  }, [])

  const currentNumber = method === 'bkash' ? liveSettings.bkashNumber : liveSettings.nagadNumber

  const themeColor =
    method === 'bkash'
      ? '#E2136E'
      : method === 'nagad'
      ? '#E53935'
      : method === 'cellfin'
      ? '#0A7B3E'
      : '#0072BC'

  const brandName =
    method === 'bkash'
      ? 'bKash'
      : method === 'nagad'
      ? 'Nagad'
      : method === 'cellfin'
      ? 'Cellfin / Islami Bank'
      : 'Mercantile Bank'

  const brandBangla =
    method === 'bkash'
      ? 'বিকাশ'
      : method === 'nagad'
      ? 'নগদ'
      : method === 'cellfin'
      ? 'সেলফিন / ইসলামী ব্যাংক'
      : 'মার্কেন্টাইল ব্যাংক'

  const brandLogo =
    method === 'bkash'
      ? '/images/bkash.jpg'
      : method === 'nagad'
      ? '/images/nagad.jpg'
      : method === 'cellfin'
      ? '/images/cellfin.png'
      : '/images/mercantile.jpg'

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2500)
  }

  const handlePasteTrx = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        setForm((prev) => ({ ...prev, trxId: text.trim().toUpperCase() }))
      }
    } catch (e) {
      // clipboard permission denied
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSetQuickAmount = (val: string) => {
    setForm((prev) => ({ ...prev, amount: val }))
  }

  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    if (!form.senderNumber || !form.trxId || !form.amount) {
      setSubmitError('অনুগ্রহ করে প্রেরকের নম্বর, TrxID এবং টাকার পরিমাণ সঠিকভাবে পূরণ করুন।')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: form.clientName || 'Valued Client',
          clientPhone: form.senderNumber,
          senderBkash: form.senderNumber,
          trxId: form.trxId.toUpperCase(),
          amount: form.amount,
          paymentMethod: brandName.toUpperCase(),
          selectedPackage: selectedPackage || 'Online Service Payment',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'পেমেন্ট জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।')
      }

      const newReceipt = {
        id: data.receiptId || `${brandName.toUpperCase().replace(/[^A-Z0-9]/g, '-')}-${Date.now().toString().slice(-6)}`,
        name: form.clientName || 'Valued Client',
        trxId: form.trxId.toUpperCase(),
        amount: form.amount,
        senderPhone: form.senderNumber,
        method: brandName.toUpperCase(),
        package: selectedPackage || 'Online Service Payment',
        date: new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      }

      // Cache locally so admin or client can access receipt
      try {
        const stored = JSON.parse(localStorage.getItem('portfolio_submitted_payments') || '[]')
        stored.unshift(newReceipt)
        localStorage.setItem('portfolio_submitted_payments', JSON.stringify(stored.slice(0, 50)))
      } catch (e) {}

      // Directly open WhatsApp immediately with full payment details pre-filled
      const waText = `হ্যালো মোঃ মোমিনুল ইসলাম,
আমি একটি পেমেন্ট সম্পন্ন করেছি:
💳 মেথড: ${brandName.toUpperCase()}
🆔 TrxID: ${form.trxId.toUpperCase()}
💵 পরিমাণ: ৳${form.amount} BDT
📱 প্রেরক নম্বর: ${form.senderNumber}
👤 গ্রাহক: ${form.clientName || 'Valued Client'}
📦 প্যাকেজ: ${selectedPackage || 'Online Service Payment'}
🧾 রিসিপ্ট আইডি: ${newReceipt.id}

অনুগ্রহ করে ভেরিফাই করুন!`

      const waUrl = `https://wa.me/8801303482412?text=${encodeURIComponent(waText)}`

      if (typeof window !== 'undefined') {
        window.location.href = waUrl
      }
    } catch (err: any) {
      console.error(err)
      // Even if network API failed, still redirect directly to WhatsApp with user details
      const fallbackText = `হ্যালো মোঃ মোমিনুল ইসলাম,
আমি একটি পেমেন্ট সম্পন্ন করেছি:
💳 মেথড: ${brandName.toUpperCase()}
🆔 TrxID: ${form.trxId.toUpperCase()}
💵 পরিমাণ: ৳${form.amount} BDT
📱 প্রেরক নম্বর: ${form.senderNumber}
👤 গ্রাহক: ${form.clientName || 'Valued Client'}

অনুগ্রহ করে ভেরিফাই করুন!`
      const waUrl = `https://wa.me/8801303482412?text=${encodeURIComponent(fallbackText)}`
      if (typeof window !== 'undefined') {
        window.location.href = waUrl
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#07080B] text-slate-100 py-8 sm:py-16 px-4 sm:px-6 flex flex-col items-center justify-center font-sans relative overflow-hidden">
      
      {/* Background Soft Ambient Lights */}
      <div className="absolute top-1/4 -left-36 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* ============================================================== */}
      {/* CASE 1: RECEIPT VIEW AFTER VERIFICATION                        */}
      {/* ============================================================== */}
      {receipt ? (
        <div className="w-full max-w-lg bg-gradient-to-b from-[#111622] to-[#0A0D14] backdrop-blur-2xl rounded-3xl border border-white/10 p-6 sm:p-8 text-center space-y-6 shadow-2xl relative z-10">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
            <CheckCircle2 size={36} />
          </div>

          <div>
            <span className="text-[10px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
              Payment Submitted
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-3">
              Verification In Progress
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Your transaction details have been securely logged for confirmation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 text-left text-xs font-mono space-y-2.5 border border-white/10">
            <div className="flex justify-between">
              <span className="text-slate-400">Receipt ID:</span>
              <span className="font-bold text-white">{receipt.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Method:</span>
              <span className="font-bold text-emerald-400">{receipt.method}</span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-slate-400">Package / Service:</span>
              <span className="font-bold text-white text-xs truncate max-w-[200px] text-right">{receipt.package}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Amount:</span>
              <span className="font-bold text-white text-sm">৳{receipt.amount} BDT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">TrxID:</span>
              <span className="font-bold text-emerald-400">{receipt.trxId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Sender:</span>
              <span className="font-bold text-white">{receipt.senderPhone}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-white/10">
              <span className="text-slate-400">Date &amp; Time:</span>
              <span className="text-slate-500 text-[11px]">{receipt.date}</span>
            </div>
          </div>

          <a
            href={`https://wa.me/8801303482412?text=${encodeURIComponent(
              `Hello Md. Mominul Islam,\n\nI have submitted a ${receipt.method} payment!\n\nPackage: ${receipt.package}\nReceipt: ${receipt.id}\nTrxID: ${receipt.trxId}\nAmount: ৳${receipt.amount} BDT\nSender: ${receipt.senderPhone}\n\nPlease check and verify.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <FaWhatsapp size={16} />
            <span>Confirm on WhatsApp</span>
          </a>

          <button
            onClick={() => {
              setReceipt(null)
              setForm({ clientName: '', senderNumber: '', trxId: '', amount: '' })
            }}
            className="text-xs text-slate-400 hover:text-white hover:underline block mx-auto pt-1 cursor-pointer"
          >
            Make another payment
          </button>
        </div>
      ) : !method ? (
        /* ============================================================== */
        /* CASE 2: CLEAN, SPACIOUS, FREE METHOD SELECTION VIEW            */
        /* ============================================================== */
        <div className="w-full max-w-2xl relative z-10 space-y-6 sm:space-y-8">
          
          {/* Top Bar & Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-2 group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to Portfolio</span>
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Select Payment Method
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Choose your preferred payment gateway to view details and verify
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-sm">
              <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-emerald-400/50">
                <img
                  src="/images/hero-portrait-01.png"
                  alt="Md. Mominul Islam"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-200">Md. Mominul Islam</span>
              </div>
            </div>
          </div>

          {/* Selected Package Banner (When client selects a specific package or gig) */}
          {selectedPackage && selectedPackage !== 'Online Service Payment' && (
            <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 flex items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/40 shadow-sm">
                  <Package size={18} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>নির্বাচিত প্যাকেজ / সেবা (Selected Package)</span>
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white truncate block">
                    {selectedPackage}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase flex-shrink-0">
                INVOICE ITEM
              </span>
            </div>
          )}

          {/* 4 Clean, Free, Breathable Payment Cards (2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: bKash */}
            <button
              type="button"
              onClick={() => setMethod('bkash')}
              className="group p-5 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] hover:from-[#E2136E]/10 hover:to-transparent border border-white/10 hover:border-[#E2136E]/60 transition-all text-left flex items-center justify-between cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(226,19,110,0.2)] hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-2xl bg-white p-2 shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden border border-white/20">
                  <img
                    src="/images/bkash.jpg"
                    alt="bKash"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#E2136E] transition-colors">
                    bKash বিকাশ
                  </h3>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E2136E]/15 text-[#E2136E]">
                    Send Money
                  </span>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-[#E2136E] text-slate-400 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0">
                <ChevronRight size={18} />
              </div>
            </button>

            {/* Card 2: Nagad */}
            <button
              type="button"
              onClick={() => setMethod('nagad')}
              className="group p-5 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] hover:from-[#E53935]/10 hover:to-transparent border border-white/10 hover:border-[#E53935]/60 transition-all text-left flex items-center justify-between cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(229,57,53,0.2)] hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-2xl bg-white p-2 shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden border border-white/20">
                  <img
                    src="/images/nagad.jpg"
                    alt="Nagad"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#E53935] transition-colors">
                    Nagad নগদ
                  </h3>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E53935]/15 text-[#E53935]">
                    Send Money
                  </span>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-[#E53935] text-slate-400 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0">
                <ChevronRight size={18} />
              </div>
            </button>

            {/* Card 3: Cellfin / Islami Bank */}
            <button
              type="button"
              onClick={() => setMethod('cellfin')}
              className="group p-5 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] hover:from-[#0A7B3E]/10 hover:to-transparent border border-white/10 hover:border-[#0A7B3E]/60 transition-all text-left flex items-center justify-between cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(10,123,62,0.2)] hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-2xl bg-white p-2 shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden border border-white/20">
                  <img
                    src="/images/cellfin.png"
                    alt="Cellfin Islami Bank"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Cellfin / Islami Bank
                  </h3>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#0A7B3E]/15 text-emerald-400">
                    App &amp; A/C Transfer
                  </span>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-[#0A7B3E] text-slate-400 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0">
                <ChevronRight size={18} />
              </div>
            </button>

            {/* Card 4: Mercantile Bank */}
            <button
              type="button"
              onClick={() => setMethod('bank')}
              className="group p-5 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] hover:from-[#0072BC]/10 hover:to-transparent border border-white/10 hover:border-[#0072BC]/60 transition-all text-left flex items-center justify-between cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(0,114,188,0.2)] hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-2xl bg-white p-2 shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden border border-white/20">
                  <img
                    src="/images/mercantile.jpg"
                    alt="Mercantile Bank"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#0072BC] transition-colors">
                    Mercantile Bank
                  </h3>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#0072BC]/15 text-[#0072BC]">
                    Bank Transfer (NPSB)
                  </span>
                </div>
              </div>

              <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-[#0072BC] text-slate-400 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0">
                <ChevronRight size={18} />
              </div>
            </button>

          </div>

          {/* Clean Bottom Trust Ribbon */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              100% Secure Checkout
            </span>
            <span>•</span>
            <span>Instant TrxID Verification</span>
            <span>•</span>
            <span>Direct WhatsApp Support</span>
          </div>

        </div>
      ) : (
        /* ============================================================== */
        /* CASE 3: DETAILED SCREEN - CLEAN, UNCLUTTERED, FOCUSED VIEW     */
        /* ============================================================== */
        <div className="w-full max-w-xl bg-gradient-to-b from-[#111622] to-[#0A0D14] backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-5 sm:p-7 space-y-6 relative z-10">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <button
              onClick={() => setMethod(null)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer group border border-white/5"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>All Payment Methods</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <BadgeCheck size={14} className="text-emerald-400" />
              <span>Verified Gateway</span>
            </div>
          </div>

          {/* Selected Package Indicator */}
          {selectedPackage && selectedPackage !== 'Online Service Payment' && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/30">
                  <Package size={15} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                    প্যাকেজ (Paying For Package)
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white truncate block">
                    {selectedPackage}
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase flex-shrink-0">
                INVOICE ITEM
              </span>
            </div>
          )}

          {/* ============================================================== */}
          {/* METHOD 1: CELLFIN / ISLAMI BANK BANGLADESH LIMITED             */}
          {/* ============================================================== */}
          {method === 'cellfin' ? (
            <div className="space-y-4">
              
              {/* Sleek Brand Header Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0A7B3E]/15 via-[#0A7B3E]/5 to-transparent border border-[#0A7B3E]/30 flex items-center gap-3.5">
                <div className="w-14 h-14 min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-2xl bg-white p-2 shadow-md flex items-center justify-center flex-shrink-0 overflow-hidden border border-white/20">
                  <img src="/images/cellfin.png" alt="Cellfin" className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-bold text-white tracking-tight truncate">
                      {liveSettings.cellfinBankName}
                    </h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0A7B3E]/20 text-emerald-400 border border-[#0A7B3E]/40">
                      Cellfin &amp; NPSB
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 truncate mt-0.5">
                    {liveSettings.cellfinBranch} • Official Bank Account
                  </p>
                </div>
              </div>

              {/* Account Display Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-emerald-500/20 space-y-3 shadow-inner">
                
                {/* 1. Bank Account Number */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block flex items-center gap-1">
                      <Building2 size={12} className="text-emerald-400" />
                      <span>Bank Account Number</span>
                    </span>
                    <span className="font-mono font-bold text-lg sm:text-2xl text-emerald-400 tracking-wider truncate block select-all">
                      {liveSettings.cellfinAccountNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(liveSettings.cellfinAccountNumber, 'cellfin_acc')}
                    className="px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer bg-[#0A7B3E] hover:bg-[#0c9049] text-white shadow-sm flex-shrink-0 active:scale-95"
                  >
                    {copiedKey === 'cellfin_acc' ? (
                      <>
                        <Check size={14} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy A/C No</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 2. Holder Name & Routing Number in 2 Grid Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* Account Name */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">A/C Holder Name</span>
                      <span className="font-mono font-bold text-xs sm:text-sm text-white truncate block select-all">
                        {liveSettings.cellfinAccountName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(liveSettings.cellfinAccountName, 'cellfin_name')}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 flex items-center gap-1 flex-shrink-0 cursor-pointer transition-all active:scale-95"
                      title="Copy A/C Holder Name"
                    >
                      {copiedKey === 'cellfin_name' ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy Name</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Routing Number */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">Routing Number</span>
                      <span className="font-mono font-bold text-xs sm:text-sm text-emerald-400 truncate block select-all">
                        {liveSettings.cellfinRoutingNumber}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(liveSettings.cellfinRoutingNumber, 'cellfin_rout')}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 flex items-center gap-1 flex-shrink-0 cursor-pointer transition-all active:scale-95"
                      title="Copy Routing Number"
                    >
                      {copiedKey === 'cellfin_rout' ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy Routing</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </div>

              {/* 3-Step Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px] flex items-center justify-center font-mono">1</span>
                  <p className="font-semibold text-white">Open App</p>
                  <p className="text-[11px] text-slate-400">Open Cellfin or your internet banking app</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px] flex items-center justify-center font-mono">2</span>
                  <p className="font-semibold text-white">Fund Transfer</p>
                  <p className="text-[11px] text-slate-400">Select Cellfin to A/C or NPSB transfer</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[11px] flex items-center justify-center font-mono">3</span>
                  <p className="font-semibold text-white">Verify Below</p>
                  <p className="text-[11px] text-slate-400">Copy the TrxID and submit form below</p>
                </div>
              </div>

            </div>
          ) : method === 'bank' ? (
            /* ============================================================== */
            /* METHOD 2: MERCANTILE BANK LIMITED                              */
            /* ============================================================== */
            <div className="space-y-4">
              
              {/* Sleek Brand Header Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0072BC]/15 via-[#0072BC]/5 to-transparent border border-[#0072BC]/30 flex items-center gap-3.5">
                <div className="w-14 h-14 min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-2xl bg-white p-2 shadow-md flex items-center justify-center flex-shrink-0 overflow-hidden border border-white/20">
                  <img src="/images/mercantile.jpg" alt="Mercantile Bank" className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-bold text-white tracking-tight truncate">
                      {liveSettings.bankName}
                    </h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0072BC]/20 text-[#0072BC] border border-[#0072BC]/40">
                      NPSB / BEFTN
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 truncate mt-0.5">
                    {liveSettings.bankBranch} • Official Bank Account
                  </p>
                </div>
              </div>

              {/* Account Display Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-[#0072BC]/30 space-y-3 shadow-inner">
                
                {/* 1. Bank Account Number */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block flex items-center gap-1">
                      <Building2 size={12} className="text-[#0072BC]" />
                      <span>Bank Account Number</span>
                    </span>
                    <span className="font-mono font-bold text-lg sm:text-2xl text-white tracking-wider truncate block select-all">
                      {liveSettings.bankAccountNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(liveSettings.bankAccountNumber, 'bank_acc')}
                    className="px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer bg-[#0072BC] hover:bg-[#0086dd] text-white shadow-sm flex-shrink-0 active:scale-95"
                  >
                    {copiedKey === 'bank_acc' ? (
                      <>
                        <Check size={14} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy A/C No</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 2. Holder Name & Routing Number in 2 Grid Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* Account Name */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">A/C Holder Name</span>
                      <span className="font-mono font-bold text-xs sm:text-sm text-emerald-400 truncate block select-all">
                        {liveSettings.bankAccountName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(liveSettings.bankAccountName, 'bank_name')}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 flex items-center gap-1 flex-shrink-0 cursor-pointer transition-all active:scale-95"
                      title="Copy A/C Holder Name"
                    >
                      {copiedKey === 'bank_name' ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy Name</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Routing Number */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">Routing Number</span>
                      <span className="font-mono font-bold text-xs sm:text-sm text-[#0072BC] truncate block select-all">
                        {liveSettings.bankRoutingNumber}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(liveSettings.bankRoutingNumber, 'bank_rout')}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-slate-200 flex items-center gap-1 flex-shrink-0 cursor-pointer transition-all active:scale-95"
                      title="Copy Routing Number"
                    >
                      {copiedKey === 'bank_rout' ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy Routing</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </div>

              {/* 3-Step Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span className="w-5 h-5 rounded-full bg-[#0072BC]/20 text-[#0072BC] font-bold text-[11px] flex items-center justify-center font-mono">1</span>
                  <p className="font-semibold text-white">Any Bank App</p>
                  <p className="text-[11px] text-slate-400">Open Citytouch, Astha, Cellfin or EBL</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span className="w-5 h-5 rounded-full bg-[#0072BC]/20 text-[#0072BC] font-bold text-[11px] flex items-center justify-center font-mono">2</span>
                  <p className="font-semibold text-white">NPSB Transfer</p>
                  <p className="text-[11px] text-slate-400">Transfer instant to Mercantile Bank A/C</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span className="w-5 h-5 rounded-full bg-[#0072BC]/20 text-[#0072BC] font-bold text-[11px] flex items-center justify-center font-mono">3</span>
                  <p className="font-semibold text-white">Verify Below</p>
                  <p className="text-[11px] text-slate-400">Input your reference / TrxID below</p>
                </div>
              </div>

            </div>
          ) : (
            /* ============================================================== */
            /* METHOD 3 & 4: MOBILE BANKING (BKASH OR NAGAD)                  */
            /* ============================================================== */
            <div className="space-y-4">
              
              {/* Sleek Brand Header Banner */}
              <div
                className="p-4 rounded-2xl border flex items-center gap-3.5"
                style={{
                  background:
                    method === 'bkash'
                      ? 'linear-gradient(to right, rgba(226, 19, 110, 0.15), rgba(226, 19, 110, 0.05), transparent)'
                      : 'linear-gradient(to right, rgba(229, 57, 53, 0.15), rgba(229, 57, 53, 0.05), transparent)',
                  borderColor: method === 'bkash' ? 'rgba(226, 19, 110, 0.35)' : 'rgba(229, 57, 53, 0.35)',
                }}
              >
                <div className="w-14 h-14 min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-2xl bg-white p-2 shadow-md flex items-center justify-center flex-shrink-0 overflow-hidden border border-white/20">
                  <img
                    src={brandLogo}
                    alt={brandName}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-bold text-white">
                      {brandName} {brandBangla}
                    </h2>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: method === 'bkash' ? 'rgba(226, 19, 110, 0.15)' : 'rgba(229, 57, 53, 0.15)',
                        color: themeColor,
                      }}
                    >
                      Send Money
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 truncate mt-0.5">
                    Md. Mominul Islam • Personal Account
                  </p>
                </div>
              </div>

              {/* Phone Display Box */}
              <div
                className="p-4 sm:p-5 rounded-2xl bg-black/60 border space-y-3 shadow-inner"
                style={{
                  borderColor: method === 'bkash' ? 'rgba(226, 19, 110, 0.3)' : 'rgba(229, 57, 53, 0.3)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Phone size={13} style={{ color: themeColor }} />
                    <span>Recipient Number ({brandName} Personal):</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(currentNumber, 'phone')}
                    className="px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer text-white shadow-sm active:scale-95"
                    style={{ backgroundColor: themeColor }}
                  >
                    {copiedKey === 'phone' ? (
                      <>
                        <Check size={14} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Number</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="font-mono font-bold text-2xl sm:text-3xl text-white tracking-widest select-all">
                  {currentNumber}
                </div>
              </div>

              {/* 3-Step Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span
                    className="w-5 h-5 rounded-full font-bold text-[11px] flex items-center justify-center font-mono"
                    style={{
                      backgroundColor: method === 'bkash' ? 'rgba(226, 19, 110, 0.2)' : 'rgba(229, 57, 53, 0.2)',
                      color: themeColor,
                    }}
                  >
                    1
                  </span>
                  <p className="font-semibold text-white">Open App</p>
                  <p className="text-[11px] text-slate-400">
                    Open {brandName} app or dial {method === 'bkash' ? '*247#' : '*167#'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span
                    className="w-5 h-5 rounded-full font-bold text-[11px] flex items-center justify-center font-mono"
                    style={{
                      backgroundColor: method === 'bkash' ? 'rgba(226, 19, 110, 0.2)' : 'rgba(229, 57, 53, 0.2)',
                      color: themeColor,
                    }}
                  >
                    2
                  </span>
                  <p className="font-semibold text-white">Send Money</p>
                  <p className="text-[11px] text-slate-400">
                    Send amount to the recipient number above
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span
                    className="w-5 h-5 rounded-full font-bold text-[11px] flex items-center justify-center font-mono"
                    style={{
                      backgroundColor: method === 'bkash' ? 'rgba(226, 19, 110, 0.2)' : 'rgba(229, 57, 53, 0.2)',
                      color: themeColor,
                    }}
                  >
                    3
                  </span>
                  <p className="font-semibold text-white">Verify Below</p>
                  <p className="text-[11px] text-slate-400">
                    Copy the TrxID and submit form below
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* VERIFICATION FORM - CLEAN & SPACIOUS                           */}
          {/* ============================================================== */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-white/10">
            
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} style={{ color: themeColor }} />
                <span>Verification Details</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">* Required fields</span>
            </div>

            {/* Field: Amount */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Payment Amount (BDT ৳)*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                  ৳
                </div>
                <input
                  type="number"
                  name="amount"
                  required
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Enter amount (e.g. 500, 1000, 5000)"
                  className="w-full pl-9 pr-3.5 py-3 rounded-2xl bg-black/50 border border-white/10 text-white text-sm font-semibold placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-all font-mono"
                />
              </div>

              {/* Quick Amount Chips */}
              <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-1">
                <span className="text-[10px] text-slate-400 mr-1 flex-shrink-0">Quick Amount:</span>
                {['300', '500', '1000', '2000', '5000', '10000'].map((amt) => {
                  const isSelected = form.amount === amt
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleSetQuickAmount(amt)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all cursor-pointer flex-shrink-0 ${
                        isSelected
                          ? 'bg-white text-slate-950 font-bold shadow-sm'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      ৳{amt}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Field: Sender */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                {method === 'cellfin'
                  ? 'Your Sender Cellfin / Bank Account or Mobile*'
                  : method === 'bank'
                  ? 'Your Bank Name & Account / Mobile*'
                  : `Your Sender ${brandName} Number*`}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  {method === 'bank' || method === 'cellfin' ? <Building2 size={14} /> : <Phone size={14} />}
                </div>
                <input
                  type="text"
                  name="senderNumber"
                  required
                  value={form.senderNumber}
                  onChange={handleChange}
                  placeholder={
                    method === 'cellfin'
                      ? 'e.g. Cellfin 017... or Islami Bank A/C'
                      : method === 'bank'
                      ? 'e.g. City Bank 123456 or Cellfin'
                      : '01XXXXXXXXX'
                  }
                  className="w-full pl-9 pr-3.5 py-3 rounded-2xl bg-black/50 border border-white/10 text-white text-sm font-semibold placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-all font-mono"
                />
              </div>
            </div>

            {/* Field: TrxID */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                {method === 'bank' || method === 'cellfin' ? 'Transaction / Reference ID*' : 'Transaction ID (TrxID)*'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Hash size={14} />
                </div>
                <input
                  type="text"
                  name="trxId"
                  required
                  value={form.trxId}
                  onChange={handleChange}
                  placeholder={method === 'bank' || method === 'cellfin' ? 'e.g. REF987654 or TrxID' : 'e.g. BKH98765432'}
                  className="w-full pl-9 pr-20 py-3 rounded-2xl bg-black/50 border border-white/10 text-white text-sm font-mono uppercase font-bold placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-all"
                />
                <button
                  type="button"
                  onClick={handlePasteTrx}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[10px] font-bold text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Paste from clipboard"
                >
                  <ClipboardPaste size={12} />
                  <span>PASTE</span>
                </button>
              </div>
            </div>

            {/* Field: Package / Service Item */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block flex items-center justify-between">
                <span>প্যাকেজ / সেবার বিবরণ (Package / Service Item)</span>
                <span className="text-[10px] text-emerald-400 font-mono">Invoice Item</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Package size={14} />
                </div>
                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-3 rounded-2xl bg-black/50 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-white/30 transition-all font-mono"
                >
                  <option value="MVP Mobile / Web Starter">MVP Mobile / Web Starter (Basic Package)</option>
                  <option value="Complete Full-Stack Application">Complete Full-Stack Application (Standard Package)</option>
                  <option value="Advanced Enterprise Ecosystem">Advanced Enterprise Ecosystem (Premium Package)</option>
                  <option value="Custom Android Mobile App">Custom Android Mobile App Project</option>
                  <option value="Next.js Full-Stack Web Platform">Next.js Full-Stack Web Platform</option>
                  <option value="Online Service Payment">Online Service Payment / Milestone</option>
                </select>
              </div>
            </div>

            {/* Field: Client Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Your Name / Project Title (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User size={14} />
                </div>
                <input
                  type="text"
                  name="clientName"
                  value={form.clientName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe / Portfolio Website"
                  className="w-full pl-9 pr-3.5 py-3 rounded-2xl bg-black/50 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-all"
                />
              </div>
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle size={15} className="flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-white shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 active:scale-[0.99] disabled:opacity-70"
                style={{
                  backgroundColor: themeColor,
                  boxShadow: `0 0 25px ${themeColor}40`,
                }}
              >
                {loading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    <span>Verifying Payment...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>VERIFY &amp; CONFIRM PAYMENT</span>
                  </>
                )}
              </button>
            </div>

            {/* Trust and WhatsApp Support Link */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-center border-t border-white/5 pt-3">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Lock size={12} className="text-emerald-400" />
                <span>256-Bit SSL Encrypted Verification</span>
              </div>

              <a
                href={`https://wa.me/8801303482412?text=${encodeURIComponent(
                  `Hello Md. Mominul Islam, I need help with ${brandName} payment.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-emerald-400 transition-colors font-medium"
              >
                <FaWhatsapp size={13} className="text-[#25D366]" />
                <span>WhatsApp Support</span>
              </a>
            </div>

          </form>

        </div>
      )}

    </div>
  )
}
