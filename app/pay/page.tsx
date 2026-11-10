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
  Mail,
  Send,
  CreditCard,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { paymentConfig } from '@/config/payment'

export default function PaymentPage() {
  const [method, setMethod] = useState<'bkash' | 'nagad' | 'cellfin' | 'bank' | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showOptionalFields, setShowOptionalFields] = useState(false)

  const [liveSettings] = useState({
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
  })

  const [selectedPackage, setSelectedPackage] = useState<string>('Service Payment')

  const [receipt, setReceipt] = useState<{
    id: string
    name: string
    email?: string
    trxId: string
    amount: string
    senderPhone: string
    method: string
    package: string
    date: string
  } | null>(null)

  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    senderNumber: '',
    trxId: '',
    amount: '',
  })

  const [submitError, setSubmitError] = useState<string | null>(null)

  // Auto-detect method & package from URL query params
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

  const brandSubtitle =
    method === 'bkash'
      ? 'Personal Account • Instant Send Money'
      : method === 'nagad'
      ? 'Personal Account • Instant Send Money'
      : method === 'cellfin'
      ? 'Islami Bank Bangladesh • App & A/C Transfer'
      : 'Mercantile Bank Limited • Direct Bank Transfer'

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (!form.senderNumber.trim() || !form.trxId.trim() || !form.amount.trim()) {
      setSubmitError('Please enter the Amount, Sender Number, and Transaction ID.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: form.clientName.trim() || 'Valued Client',
          clientEmail: form.clientEmail.trim() || '',
          clientPhone: form.senderNumber.trim(),
          senderBkash: form.senderNumber.trim(),
          trxId: form.trxId.trim().toUpperCase(),
          amount: form.amount.trim(),
          paymentMethod: brandName.toUpperCase(),
          selectedPackage: selectedPackage || 'Service Payment',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit payment verification. Please try again.')
      }

      const newReceipt = {
        id: data.receiptId || `${brandName.toUpperCase().replace(/[^A-Z0-9]/g, '-')}-${Date.now().toString().slice(-6)}`,
        name: form.clientName.trim() || 'Valued Client',
        email: form.clientEmail.trim() || '',
        trxId: form.trxId.trim().toUpperCase(),
        amount: form.amount.trim(),
        senderPhone: form.senderNumber.trim(),
        method: brandName.toUpperCase(),
        package: selectedPackage || 'Service Payment',
        date: new Date().toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      }

      try {
        const stored = JSON.parse(localStorage.getItem('portfolio_submitted_payments') || '[]')
        stored.unshift(newReceipt)
        localStorage.setItem('portfolio_submitted_payments', JSON.stringify(stored.slice(0, 50)))
      } catch (e) {}

      setReceipt(newReceipt)
    } catch (err: any) {
      console.error(err)
      setSubmitError(err.message || 'Payment submission failed. Please verify your details and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#07080B] text-slate-100 py-8 sm:py-14 px-4 sm:px-6 flex flex-col items-center justify-center font-sans relative overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* ============================================================== */}
      {/* CASE 1: SUCCESSFUL PAYMENT RECEIPT                              */}
      {/* ============================================================== */}
      {receipt ? (
        <div className="w-full max-w-lg bg-gradient-to-b from-[#111726] to-[#090D15] rounded-3xl border border-white/10 p-6 sm:p-8 text-center space-y-6 shadow-2xl relative z-10 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <CheckCircle2 size={36} />
          </div>

          <div>
            <span className="text-[10px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
              ✓ Verification Submitted
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-3">
              Payment Submitted Successfully
            </h2>
            <p className="text-xs text-slate-300 mt-1 flex items-center justify-center gap-1.5">
              <Mail size={13} className="text-emerald-400 flex-shrink-0" />
              <span>A direct confirmation notification has been sent to Md. Mominul Islam.</span>
            </p>
          </div>

          {/* Minimal Digital Receipt Card */}
          <div className="p-4 rounded-2xl bg-black/60 text-left text-xs font-mono space-y-2.5 border border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Receipt ID:</span>
              <span className="font-bold text-white">{receipt.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Payment Gateway:</span>
              <span className="font-bold text-emerald-400">{receipt.method}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Amount Paid:</span>
              <span className="font-bold text-white text-base">৳{receipt.amount} BDT</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Transaction ID (TrxID):</span>
              <span className="font-bold text-emerald-400 text-sm tracking-wider">{receipt.trxId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Sender Account:</span>
              <span className="font-bold text-white">{receipt.senderPhone}</span>
            </div>
            {receipt.package && (
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-slate-400">Milestone / Service:</span>
                <span className="font-bold text-white truncate max-w-[200px] text-right">{receipt.package}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-white/10 text-emerald-400">
              <span className="text-slate-400">Status:</span>
              <span className="font-bold flex items-center gap-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Under Verification
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <Link
              href="/"
              className="flex-1 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <ArrowLeft size={14} />
              <span>Back to Portfolio</span>
            </Link>

            <a
              href={`https://wa.me/8801303482412?text=${encodeURIComponent(
                `Hello Md. Mominul Islam,\n\nI have submitted a ${receipt.method} payment!\n\nReceipt: ${receipt.id}\nTrxID: ${receipt.trxId}\nAmount: ৳${receipt.amount} BDT\nSender: ${receipt.senderPhone}\n\nPlease check and verify.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <FaWhatsapp size={15} className="text-[#25D366]" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          <button
            onClick={() => {
              setReceipt(null)
              setForm({ clientName: '', clientEmail: '', senderNumber: '', trxId: '', amount: '' })
            }}
            className="text-xs text-slate-400 hover:text-white hover:underline block mx-auto pt-1 cursor-pointer"
          >
            Submit another payment
          </button>
        </div>
      ) : !method ? (
        /* ============================================================== */
        /* CASE 2: METHOD SELECTION - CLEAN, STRIKING & LUXURY FINTECH    */
        /* ============================================================== */
        <div className="w-full max-w-xl relative z-10 space-y-6">
          
          {/* Top Header */}
          <div className="text-center space-y-3 pb-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors group mb-1"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Portfolio</span>
            </Link>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold uppercase tracking-wider mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Select Payment Method
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
              Choose your preferred payment gateway to transfer and submit verification
            </p>
          </div>

          {/* Selected Package Banner (if passed) */}
          {selectedPackage && selectedPackage !== 'Service Payment' && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Package size={16} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase block">Selected Milestone / Item</span>
                  <span className="text-xs sm:text-sm font-bold text-white truncate block">{selectedPackage}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase">
                INVOICE ITEM
              </span>
            </div>
          )}

          {/* 4 Eye-Catching Payment Method Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* 1. bKash */}
            <button
              type="button"
              onClick={() => setMethod('bkash')}
              className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] hover:from-[#E2136E]/15 hover:to-transparent border border-white/10 hover:border-[#E2136E]/70 transition-all text-left flex items-center justify-between cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(226,19,110,0.25)] hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-white p-1.5 shadow-md flex items-center justify-center flex-shrink-0 border border-white/20 group-hover:scale-105 transition-transform overflow-hidden">
                  <img src="/images/bkash.jpg" alt="bKash" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#E2136E] transition-colors">
                    bKash
                  </h3>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Personal • Send Money</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#E2136E] text-slate-400 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0">
                <ChevronRight size={16} />
              </div>
            </button>

            {/* 2. Nagad */}
            <button
              type="button"
              onClick={() => setMethod('nagad')}
              className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] hover:from-[#E53935]/15 hover:to-transparent border border-white/10 hover:border-[#E53935]/70 transition-all text-left flex items-center justify-between cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(229,57,53,0.25)] hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-white p-1.5 shadow-md flex items-center justify-center flex-shrink-0 border border-white/20 group-hover:scale-105 transition-transform overflow-hidden">
                  <img src="/images/nagad.jpg" alt="Nagad" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#E53935] transition-colors">
                    Nagad
                  </h3>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Personal • Send Money</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#E53935] text-slate-400 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0">
                <ChevronRight size={16} />
              </div>
            </button>

            {/* 3. Cellfin */}
            <button
              type="button"
              onClick={() => setMethod('cellfin')}
              className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] hover:from-[#0A7B3E]/15 hover:to-transparent border border-white/10 hover:border-[#0A7B3E]/70 transition-all text-left flex items-center justify-between cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(10,123,62,0.25)] hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-white p-1.5 shadow-md flex items-center justify-center flex-shrink-0 border border-white/20 group-hover:scale-105 transition-transform overflow-hidden">
                  <img src="/images/cellfin.png" alt="Cellfin" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Cellfin / Islami Bank
                  </h3>
                  <span className="text-[11px] text-slate-400 block mt-0.5">App &amp; A/C Transfer (NPSB)</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#0A7B3E] text-slate-400 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0">
                <ChevronRight size={16} />
              </div>
            </button>

            {/* 4. Mercantile Bank */}
            <button
              type="button"
              onClick={() => setMethod('bank')}
              className="group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] hover:from-[#0072BC]/15 hover:to-transparent border border-white/10 hover:border-[#0072BC]/70 transition-all text-left flex items-center justify-between cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(0,114,188,0.25)] hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-white p-1.5 shadow-md flex items-center justify-center flex-shrink-0 border border-white/20 group-hover:scale-105 transition-transform overflow-hidden">
                  <img src="/images/mercantile.jpg" alt="Mercantile Bank" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#0072BC] transition-colors">
                    Mercantile Bank
                  </h3>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Direct Transfer from Any Bank</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#0072BC] text-slate-400 group-hover:text-white flex items-center justify-center transition-all flex-shrink-0">
                <ChevronRight size={16} />
              </div>
            </button>

          </div>

          {/* Trust Badge */}
          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>100% Secure Checkout</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Mail size={14} className="text-emerald-400" />
              <span>Instant Email Notification</span>
            </span>
          </div>

        </div>
      ) : (
        /* ============================================================== */
        /* CASE 3: STREAMLINED PREMIUM FINTECH PAYMENT VIEW (PURE ENGLISH)*/
        /* ============================================================== */
        <div className="w-full max-w-lg bg-gradient-to-b from-[#111726] to-[#090D15] rounded-3xl border border-white/10 shadow-2xl p-5 sm:p-7 space-y-5 relative z-10 animate-fade-in">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <button
              onClick={() => setMethod(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer border border-white/5 group"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>All Methods</span>
            </button>

            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Verified Gateway</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* HERO LUXURY VIRTUAL FINTECH CARD                               */}
          {/* ============================================================== */}
          <div
            className="p-5 sm:p-6 rounded-2xl relative overflow-hidden shadow-2xl border transition-all"
            style={{
              background:
                method === 'bkash'
                  ? 'linear-gradient(135deg, #1c0914 0%, #2e081c 50%, #15060f 100%)'
                  : method === 'nagad'
                  ? 'linear-gradient(135deg, #200908 0%, #300c0a 50%, #170605 100%)'
                  : method === 'cellfin'
                  ? 'linear-gradient(135deg, #06190f 0%, #0a2618 50%, #04120a 100%)'
                  : 'linear-gradient(135deg, #071728 0%, #0a233d 50%, #05101d 100%)',
              borderColor: `${themeColor}50`,
              boxShadow: `0 10px 30px ${themeColor}20`,
            }}
          >
            {/* Subtle Metallic Glow Background */}
            <div
              className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[60px] opacity-40 pointer-events-none"
              style={{ backgroundColor: themeColor }}
            />

            {/* Card Top: Logo & Provider */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white p-1.5 shadow flex items-center justify-center overflow-hidden">
                  <img src={brandLogo} alt={brandName} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm tracking-wide">{brandName}</h3>
                  <span className="text-[10px] text-slate-300 font-mono block">
                    {method === 'cellfin' || method === 'bank' ? 'Official Bank Account' : 'Personal Account'}
                  </span>
                </div>
              </div>

              <span
                className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase"
                style={{
                  backgroundColor: `${themeColor}20`,
                  color: themeColor,
                  borderColor: `${themeColor}40`,
                }}
              >
                {method === 'cellfin' || method === 'bank' ? 'A/C Transfer' : 'Send Money'}
              </span>
            </div>

            {/* Card Middle: Prominent Recipient Number / Account */}
            <div className="my-2 p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">
                  {method === 'cellfin' || method === 'bank' ? 'Bank Account Number' : 'Recipient Number (Send Money)'}
                </span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-white tracking-wider truncate block select-all">
                  {method === 'cellfin'
                    ? liveSettings.cellfinAccountNumber
                    : method === 'bank'
                    ? liveSettings.bankAccountNumber
                    : currentNumber}
                </span>
              </div>

              {/* 1-Click Glowing Copy Button */}
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    method === 'cellfin'
                      ? liveSettings.cellfinAccountNumber
                      : method === 'bank'
                      ? liveSettings.bankAccountNumber
                      : currentNumber,
                    'card_main'
                  )
                }
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-lg flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0 active:scale-95"
                style={{
                  backgroundColor: themeColor,
                  boxShadow: `0 0 15px ${themeColor}60`,
                }}
              >
                {copiedKey === 'card_main' ? (
                  <>
                    <Check size={14} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Additional Info for Bank / Cellfin (Compact Micro-Chips) */}
            {(method === 'cellfin' || method === 'bank') && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10 text-xs font-mono">
                {/* A/C Name */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/5">
                  <div className="min-w-0">
                    <span className="text-[9px] text-slate-400 block uppercase">Account Name</span>
                    <span className="font-bold text-white text-[11px] truncate block select-all">
                      {method === 'cellfin' ? liveSettings.cellfinAccountName : liveSettings.bankAccountName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        method === 'cellfin' ? liveSettings.cellfinAccountName : liveSettings.bankAccountName,
                        'card_name'
                      )
                    }
                    className="p-1 text-slate-300 hover:text-white transition-colors"
                    title="Copy Account Name"
                  >
                    {copiedKey === 'card_name' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  </button>
                </div>

                {/* Routing */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/5">
                  <div className="min-w-0">
                    <span className="text-[9px] text-slate-400 block uppercase">Routing Number</span>
                    <span className="font-bold text-emerald-400 text-[11px] truncate block select-all">
                      {method === 'cellfin' ? liveSettings.cellfinRoutingNumber : liveSettings.bankRoutingNumber}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        method === 'cellfin' ? liveSettings.cellfinRoutingNumber : liveSettings.bankRoutingNumber,
                        'card_rout'
                      )
                    }
                    className="p-1 text-slate-300 hover:text-white transition-colors"
                    title="Copy Routing Number"
                  >
                    {copiedKey === 'card_rout' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
            )}

            {/* Instruction Cue */}
            <p className="text-[11px] text-slate-300 mt-2 text-center">
              💡 Transfer to the recipient number above, then submit your TrxID below
            </p>
          </div>

          {/* ============================================================== */}
          {/* STREAMLINED 3-FIELD VERIFICATION FORM (NO CLUTTER)            */}
          {/* ============================================================== */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* Field 1: Amount */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>1. Payment Amount (BDT ৳)*</span>
                <span className="text-[10px] text-slate-400 font-mono">Min ৳300</span>
              </label>
              
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold">
                  ৳
                </span>
                <input
                  type="number"
                  name="amount"
                  required
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Enter amount (e.g. 500, 1000, 5000)"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm font-semibold placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-all font-mono"
                />
              </div>

              {/* Quick Amount Chips */}
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 mr-1">Quick Select:</span>
                {['500', '1000', '2000', '5000', '10000'].map((amt) => {
                  const isSelected = form.amount === amt
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleSetQuickAmount(amt)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white text-slate-950 font-bold shadow'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      ৳{amt}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Field 2: Sender Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200 block">
                2. Your Sender Number / Account*
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Phone size={14} />
                </span>
                <input
                  type="text"
                  name="senderNumber"
                  required
                  value={form.senderNumber}
                  onChange={handleChange}
                  placeholder="The number or account you sent from (01XXXXXXXXX)"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm font-semibold placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-all font-mono"
                />
              </div>
            </div>

            {/* Field 3: TrxID */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200 block">
                3. Transaction ID (TrxID)*
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Hash size={14} />
                </span>
                <input
                  type="text"
                  name="trxId"
                  required
                  value={form.trxId}
                  onChange={handleChange}
                  placeholder="Enter TrxID from SMS (e.g. BKH98765432)"
                  className="w-full pl-9 pr-20 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm font-mono uppercase font-bold placeholder:text-slate-600 focus:outline-none focus:border-white/30 transition-all"
                />
                <button
                  type="button"
                  onClick={handlePasteTrx}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Paste TrxID from clipboard"
                >
                  <ClipboardPaste size={12} />
                  <span>PASTE</span>
                </button>
              </div>
            </div>

            {/* Optional Name & Email (Collapsible Toggle so it doesn't clutter!) */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowOptionalFields(!showOptionalFields)}
                className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer select-none"
              >
                <span>{showOptionalFields ? '− Hide additional info' : '+ Add your name & email (Optional)'}</span>
                {showOptionalFields ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              </button>

              {showOptionalFields && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 animate-fade-in">
                  <div>
                    <input
                      type="text"
                      name="clientName"
                      value={form.clientName}
                      onChange={handleChange}
                      placeholder="Your name (optional)"
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="clientEmail"
                      value={form.clientEmail}
                      onChange={handleChange}
                      placeholder="Your email address (optional)"
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-white/30 font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle size={15} className="flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Big Glowing CTA Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 active:scale-[0.99] disabled:opacity-70"
                style={{
                  backgroundColor: themeColor,
                  boxShadow: `0 0 25px ${themeColor}50`,
                }}
              >
                {loading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    <span>Verifying &amp; dispatching notification...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Verify &amp; Submit Payment</span>
                  </>
                )}
              </button>
            </div>

            {/* Bottom Security Info */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/5">
              <span className="flex items-center gap-1">
                <Lock size={11} className="text-emerald-400" />
                <span>256-Bit SSL Encrypted</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Mail size={11} />
                <span>Instant Notification Delivery</span>
              </span>
            </div>

          </form>

        </div>
      )}

    </div>
  )
}
