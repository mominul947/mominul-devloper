'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Lock,
  Unlock,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  Loader,
  Sparkles,
  Building2,
  Smartphone,
  Check,
  CreditCard,
  BarChart3,
  Users,
  Clock,
  Eye as ViewIcon,
  RefreshCw,
  Search,
  CheckCheck,
  XCircle,
  Trash2,
  Copy,
  Laptop,
  Globe,
  Radio,
  Timer,
  Compass,
  Plus,
  X,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'

export default function AdminPage() {
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('')

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<'payments' | 'analytics' | 'settings'>('payments')

  // Forms & Auth
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showChangeModal, setShowChangeModal] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // Emergency Recovery / Reset State
  const [showResetModal, setShowResetModal] = useState(false)
  const [resetKey, setResetKey] = useState('')
  const [resetNewPassword, setResetNewPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // 1. Payment Settings State
  const [settings, setSettings] = useState({
    bkashNumber: '01303482412',
    nagadNumber: '01963259247',
    cellfinBankName: 'ISLAMI BANK BANGLADESH LIMITED',
    cellfinBranch: 'BOGRA BRANCH',
    cellfinRoutingNumber: '125100377',
    cellfinAccountName: 'MD. MOHIDUL ISLAM',
    cellfinAccountNumber: '20501120206017410',
    bankName: 'MERCANTILE BANK LIMITED',
    bankBranch: 'KALAI BRANCH, JOYPURHAT',
    bankRoutingNumber: '140380464',
    bankAccountName: 'MD. MOHIDUL ISLAM',
    bankAccountNumber: '1121009627523',
  })

  // 2. Payments Data State
  const [payments, setPayments] = useState<any[]>([])
  const [paymentsStats, setPaymentsStats] = useState({
    totalCount: 0,
    pendingCount: 0,
    verifiedCount: 0,
    rejectedCount: 0,
    totalVolume: 0,
    pendingVolume: 0,
  })
  const [paymentSearch, setPaymentSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all')
  const [showManualModal, setShowManualModal] = useState(false)
  const [manualForm, setManualForm] = useState({
    clientName: '',
    clientPhone: '',
    senderNumber: '',
    trxId: '',
    amount: '',
    method: 'bKash Personal',
    package: 'Online Service Payment',
    status: 'verified',
    notes: '',
  })
  const [manualLoading, setManualLoading] = useState(false)

  // 3. Analytics Data State
  const [analytics, setAnalytics] = useState<any>({
    summary: {
      totalVisitors: 0,
      totalPageviews: 0,
      activeVisitors: 0,
      totalTimeSpentSeconds: 0,
      avgTimePerVisitor: 0,
    },
    sortedSections: [],
    sortedPages: [],
    deviceStats: { Desktop: 0, Mobile: 0, Tablet: 0 },
    browserStats: {},
    recentSessions: [],
  })
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Check if admin password is configured & restore session
  useEffect(() => {
    fetch('/api/admin/auth')
      .then((res) => res.json())
      .then((data) => {
        setIsConfigured(data.isConfigured)
      })
      .catch(() => setIsConfigured(false))

    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token')
      if (savedToken) {
        setToken(savedToken)
        setIsLoggedIn(true)
      }
    }

    fetch('/api/admin/payment')
      .then((res) => res.json())
      .then((data) => {
        if (data && (data.bkashNumber || data.bankAccountNumber)) {
          setSettings((prev) => ({
            ...prev,
            ...data,
          }))
        }
      })
      .catch(() => {})
  }, [])

  // Fetch Payments & Analytics when Logged In
  useEffect(() => {
    if (isLoggedIn) {
      loadPayments()
      loadAnalytics()

      // Poll analytics every 20 seconds
      const timer = setInterval(() => {
        loadAnalytics(true)
        loadPayments(true)
      }, 20000)

      return () => clearInterval(timer)
    }
  }, [isLoggedIn, token])

  // Secure Authenticated Fetch Helper
  const authFetch = async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers || {})
    const currentToken = token || (typeof window !== 'undefined' ? localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token') : null)
    if (currentToken) {
      headers.set('Authorization', `Bearer ${currentToken}`)
    }
    const res = await fetch(url, { ...options, headers })
    if (res.status === 401) {
      setIsLoggedIn(false)
      setToken('')
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_token')
        sessionStorage.removeItem('admin_token')
      }
    }
    return res
  }

  const loadPayments = async (silent = false) => {
    if (!silent) setIsRefreshing(true)
    try {
      const res = await authFetch('/api/admin/payments')
      const data = await res.json()
      let serverPayments = (data && data.payments) ? data.payments : []

      // Synchronize with locally cached / offline client submissions
      try {
        const localSubmitted = JSON.parse(localStorage.getItem('portfolio_submitted_payments') || '[]')
        const adminCached = JSON.parse(localStorage.getItem('admin_cached_payments') || '[]')
        const merged = [...serverPayments]

        for (const item of [...localSubmitted, ...adminCached]) {
          const itemTrx = (item.trxId || '').toString().trim().toUpperCase()
          if (itemTrx && !merged.some((p: any) => (p.trxId || '').toString().trim().toUpperCase() === itemTrx)) {
            merged.push({
              id: item.id || `PAY-${Date.now()}`,
              clientName: item.name || item.clientName || 'Valued Client',
              clientPhone: item.senderPhone || item.clientPhone || item.senderNumber || '',
              senderNumber: item.senderPhone || item.senderNumber || '',
              trxId: itemTrx,
              amount: Number(item.amount) || 0,
              method: item.method || 'BKASH',
              package: item.package || 'Online Service Payment',
              status: item.status || 'pending',
              createdAt: item.date || item.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              notes: item.notes || 'দাখিলকৃত ট্রানজেকশন',
            })
          }
        }
        serverPayments = merged
        localStorage.setItem('admin_cached_payments', JSON.stringify(serverPayments.slice(0, 100)))
      } catch (e) {}

      setPayments(serverPayments)

      if (data && data.stats) {
        setPaymentsStats(data.stats)
      } else {
        setPaymentsStats({
          totalCount: serverPayments.length,
          pendingCount: serverPayments.filter((p: any) => p.status === 'pending').length,
          verifiedCount: serverPayments.filter((p: any) => p.status === 'verified').length,
          rejectedCount: serverPayments.filter((p: any) => p.status === 'rejected').length,
          totalVolume: serverPayments.filter((p: any) => p.status === 'verified').reduce((a: number, c: any) => a + (Number(c.amount) || 0), 0),
          pendingVolume: serverPayments.filter((p: any) => p.status === 'pending').reduce((a: number, c: any) => a + (Number(c.amount) || 0), 0),
        })
      }
    } catch (e) {
      console.error(e)
    } finally {
      if (!silent) setIsRefreshing(false)
    }
  }

  const loadAnalytics = async (silent = false) => {
    try {
      const res = await authFetch('/api/admin/analytics')
      const data = await res.json()
      if (data && data.summary) {
        setAnalytics(data)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 1. Initial Master Password Setup
  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('পাসওয়ার্ড মিলছে না! অনুগ্রহ করে পুনরায় চেক করুন।')
      return
    }

    if (password.length < 6) {
      setError('নিরাপত্তার স্বার্থে পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setup', password }),
      })

      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) {
        setIsConfigured(true)
        setIsLoggedIn(true)
        setToken(data.token || '')
        if (typeof window !== 'undefined' && data.token) {
          localStorage.setItem('admin_token', data.token)
          sessionStorage.setItem('admin_token', data.token)
        }
        setSuccess('মাস্টার পাসওয়ার্ড সফলভাবে তৈরি ও এনক্রিপ্ট হয়েছে!')
        setPassword('')
        setConfirmPassword('')
      } else {
        if (data.isConfigured) {
          setIsConfigured(true)
        }
        setError(data.error || 'পাসওয়ার্ড সেট করতে সমস্যা হয়েছে।')
      }
    } catch (err: any) {
      setError(err?.message || 'সার্ভারে সংযোগ করতে সমস্যা হয়েছে।')
    } finally {
      setLoading(false)
    }
  }

  // 2. Login verification (Protected against brute-force)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password }),
      })

      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) {
        setIsLoggedIn(true)
        setToken(data.token || '')
        if (typeof window !== 'undefined' && data.token) {
          localStorage.setItem('admin_token', data.token)
          sessionStorage.setItem('admin_token', data.token)
        }
        setPassword('')
      } else {
        setError(data.error || 'ভুল মাস্টার পাসওয়ার্ড! অনুগ্রহ করে আবার চেষ্টা করুন।')
      }
    } catch (err: any) {
      setError(err?.message || 'Server connection error.')
    } finally {
      setLoading(false)
    }
  }

  // 2.5 Emergency Reset
  const handleEmergencyReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'emergency_reset',
          recoveryKey: resetKey,
          newPassword: resetNewPassword,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (res.ok && data.success) {
        if (data.token) {
          setIsLoggedIn(true)
          setToken(data.token)
          if (typeof window !== 'undefined') {
            localStorage.setItem('admin_token', data.token)
            sessionStorage.setItem('admin_token', data.token)
          }
        }
        setShowResetModal(false)
        setSuccess(data.message || 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!')
        setResetKey('')
        setResetNewPassword('')
      } else {
        setError(data.error || 'রিকভারি তথ্য সঠিক নয়!')
      }
    } catch (err: any) {
      setError(err?.message || 'সার্ভার সংযোগে সমস্যা হয়েছে।')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      })
    } catch (e) {}
    setIsLoggedIn(false)
    setToken('')
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token')
      sessionStorage.removeItem('admin_token')
    }
  }

  // 3. Save Numbers & Bank
  const handleSaveNumbers = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const res = await authFetch('/api/admin/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (res.ok) {
        setSuccess('পেমেন্ট গেটওয়ের সকল তথ্য সফলভাবে সংরক্ষিত হয়েছে!')
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'তথ্য সংরক্ষণ করা যায়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।')
      }
    } catch (err) {
      setError('সার্ভার এরর, অনুগ্রহ করে পুনরায় চেষ্টা করুন।')
    } finally {
      setLoading(false)
    }
  }

  // 4. Change Password (Requires Old Password)
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!oldPassword || !newPassword) {
      setError('উভয় পাসওয়ার্ড প্রদান করুন।')
      return
    }

    if (newPassword.length < 6) {
      setError('নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।')
      return
    }

    setLoading(true)

    try {
      const res = await authFetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change_password',
          oldPassword,
          newPassword,
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess('মাস্টার পাসওয়ার্ড সফলভাবে আপডেট ও এনক্রিপ্ট হয়েছে!')
        setOldPassword('')
        setNewPassword('')
        setShowChangeModal(false)
        if (data.token) {
          setToken(data.token)
          sessionStorage.setItem('admin_token', data.token)
        }
      } else {
        setError(data.error || 'পাসওয়ার্ড পরিবর্তন ব্যর্থ হয়েছে।')
      }
    } catch (err) {
      setError('সার্ভারে সমস্যা হয়েছে।')
    } finally {
      setLoading(false)
    }
  }

  // 5. Update Payment Status (Approve / Reject)
  const handleUpdatePaymentStatus = async (id: string, status: 'verified' | 'rejected' | 'pending') => {
    try {
      const res = await authFetch('/api/admin/payments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) {
        setPayments((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p))
        )
        loadPayments(true)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 6. Delete Payment Record
  const handleDeletePayment = async (id: string) => {
    if (!confirm('আপনি কি এই পেমেন্ট রিকোয়েস্টটি মুছে ফেলতে চান?')) return
    try {
      const res = await authFetch(`/api/admin/payments?id=${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setPayments((prev) => prev.filter((p) => p.id !== id))
        loadPayments(true)
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 6.1 Create Manual Payment (Direct Admin Logging)
  const handleCreateManualPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!manualForm.senderNumber || !manualForm.trxId || !manualForm.amount) {
      alert('প্রেরকের নম্বর, TrxID এবং টাকার পরিমাণ আবশ্যক!')
      return
    }

    setManualLoading(true)
    try {
      const res = await authFetch('/api/admin/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manualForm),
      })
      const data = await res.json()
      if (res.ok && data.payment) {
        setPayments((prev) => [data.payment, ...prev])
        setShowManualModal(false)
        setManualForm({
          clientName: '',
          clientPhone: '',
          senderNumber: '',
          trxId: '',
          amount: '',
          method: 'bKash Personal',
          package: 'Online Service Payment',
          status: 'verified',
          notes: '',
        })
        loadPayments(true)
      } else {
        alert(data.error || 'পেমেন্ট রেকর্ড ব্যর্থ হয়েছে!')
      }
    } catch (e: any) {
      console.error(e)
      alert('ত্রুটি ঘটেছে! আবার চেষ্টা করুন।')
    } finally {
      setManualLoading(false)
    }
  }

  // 7. Reset Analytics
  const handleResetAnalytics = async () => {
    if (!confirm('আপনি কি সকল অ্যানালিটিক্স ও ভিজিটর ট্র্যাকিং ডাটা মুছে ফেলে ফ্রেশ শুরু করতে চান?')) return
    try {
      const res = await authFetch('/api/admin/analytics', { method: 'DELETE' })
      if (res.ok) {
        loadAnalytics()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  // Helper: Format duration into readable Bengali/English
  const formatSeconds = (sec: number) => {
    const s = Math.round(sec)
    if (s < 60) return `${s}s`
    const mins = Math.floor(s / 60)
    const rem = s % 60
    return rem > 0 ? `${mins}m ${rem}s` : `${mins}m`
  }

  // Filter Payments
  const filteredPayments = payments.filter((p) => {
    const matchesFilter = statusFilter === 'all' || p.status === statusFilter
    const q = paymentSearch.toLowerCase()
    const matchesSearch =
      !paymentSearch ||
      p.trxId?.toLowerCase().includes(q) ||
      p.senderNumber?.toLowerCase().includes(q) ||
      p.clientName?.toLowerCase().includes(q) ||
      p.method?.toLowerCase().includes(q)
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#07080B] text-slate-100 flex flex-col items-center justify-start p-3 sm:p-6 relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Glass Card */}
      <div className="w-full max-w-5xl bg-white/[0.03] backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden relative z-10 transition-all my-4">
        
        {/* Top Navbar Header */}
        <div className="px-5 sm:px-7 py-3.5 flex items-center justify-between border-b border-white/10 bg-white/[0.02]">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>পোর্টফোলিওতে যান</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider text-slate-300 uppercase font-bold">
              Admin Portal
            </span>
          </div>

          <Link
            href="/pay"
            className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
          >
            <span>পেমেন্ট পেজ</span>
            <ExternalLink size={12} />
          </Link>
        </div>

        {/* Loading Initial State */}
        {isConfigured === null ? (
          <div className="p-16 text-center text-slate-400 space-y-3">
            <Loader size={26} className="animate-spin mx-auto text-emerald-400" />
            <p className="text-xs font-mono tracking-wider">সিকিউরিটি ক্রেডেনশিয়াল লোড হচ্ছে...</p>
          </div>
        ) : !isLoggedIn ? (
          /* ============================================================== */
          /* PREMIUM ADMIN LOGIN / MASTER SETUP SCREEN                      */
          /* ============================================================== */
          <div className="p-7 sm:p-12 space-y-6 max-w-md mx-auto">
            
            {/* Header Brand Icon & Titles */}
            <div className="text-center space-y-4">
              <div className="relative inline-block mx-auto">
                <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 shadow-[0_0_35px_rgba(16,185,129,0.3)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-black border border-white/20">
                    <img
                      src="/images/hero-portrait-01.png"
                      alt="Md. Mominul Islam"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center border-2 border-[#0B0F17] shadow-md">
                  {isConfigured ? <Lock size={13} /> : <KeyRound size={13} />}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                    Md. Mominul Islam
                  </h1>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono font-bold border border-emerald-500/30">
                    Super Admin
                  </span>
                </div>
                <h2 className="text-xs sm:text-sm font-semibold text-emerald-400 font-mono">
                  {isConfigured ? 'এডমিন ড্যাশবোর্ড এক্সেস' : 'মাস্টার পাসওয়ার্ড নির্ধারণ'}
                </h2>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed pt-1">
                  {isConfigured
                    ? 'আপনার গোপন এডমিন পাসওয়ার্ড দিয়ে লগইন করে পেমেন্ট রিকোয়েস্ট ও ভিজিটর ট্র্যাক করুন।'
                    : 'আপনার ব্যক্তিগত সিক্রেট পাসওয়ার্ড নির্ধারণ করুন। এটি ছাড়া অন্য কেউ এই পেজে ঢুকতে পারবে না।'}
                </p>
              </div>
            </div>

            {/* Error Notification */}
            {error && (
              <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2.5">
                <AlertCircle size={16} className="flex-shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Notification */}
            {success && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5">
                <CheckCircle2 size={16} className="flex-shrink-0 text-emerald-400" />
                <span>{success}</span>
              </div>
            )}

            {/* FORM: LOGIN */}
            {isConfigured ? (
              <form onSubmit={handleLogin} className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400 block tracking-wide">
                    মাস্টার পাসওয়ার্ড
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Lock size={15} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoFocus
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="আপনার সিক্রেট পাসওয়ার্ড টাইপ করুন"
                      className="w-full pl-10 pr-11 py-3 rounded-2xl border border-white/10 bg-black/40 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] active:scale-[0.99] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader size={16} className="animate-spin text-slate-950" />
                      <span>যাচাই হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Unlock size={15} />
                      <span>প্রবেশ করুন</span>
                    </>
                  )}
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setError('')
                      setSuccess('')
                      setShowResetModal(true)
                    }}
                    className="text-xs text-slate-400 hover:text-emerald-400 hover:underline cursor-pointer transition-colors"
                  >
                    পাসওয়ার্ড ভুলে গেছেন? সিক্রেট কি দিয়ে রিসেট করুন
                  </button>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1.5 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-emerald-400">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span className="font-semibold">PBKDF2 এনক্রিপশন ও ব্রুট-ফোর্স প্রোটেকশন সক্রিয়</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">
                    পরপর ৫ বার ভুল পাসওয়ার্ড দিলে সিস্টেম স্বয়ংক্রিয়ভাবে লক হয়ে যাবে
                  </p>
                </div>

                {/* RESET / RECOVERY FORM */}
                {showResetModal && (
                  <div className="mt-4 p-4 rounded-2xl bg-black/80 border border-emerald-500/40 space-y-3 shadow-2xl text-left">
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                      <h3 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <KeyRound size={14} />
                        <span>অ্যাডমিন রিকভারি কি দিয়ে রিসেট</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowResetModal(false)}
                        className="text-slate-400 hover:text-white text-xs cursor-pointer"
                      >
                        ✕ বন্ধ
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 block">
                        গোপন রিকভারি কি (Secret Recovery Key) *
                      </label>
                      <input
                        type="text"
                        required
                        value={resetKey}
                        onChange={(e) => setResetKey(e.target.value)}
                        placeholder="আপনার গোপন রিকভারি কি পেস্ট করুন"
                        className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/60 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-300 block">
                        নতুন মাস্টার পাসওয়ার্ড দিন *
                      </label>
                      <input
                        type="password"
                        required
                        value={resetNewPassword}
                        onChange={(e) => setResetNewPassword(e.target.value)}
                        placeholder="কমপক্ষে ৪ অক্ষরের নতুন পাসওয়ার্ড"
                        className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/60 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>

                    <div className="pt-1 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleEmergencyReset}
                        disabled={loading || !resetKey || !resetNewPassword}
                        className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity disabled:opacity-50 cursor-pointer"
                      >
                        {loading ? 'রিসেট হচ্ছে...' : 'পাসওয়ার্ড সেভ ও প্রবেশ'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowResetModal(false)}
                        className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-bold transition-colors cursor-pointer"
                      >
                        বাতিল
                      </button>
                    </div>
                  </div>
                )}
              </form>
            ) : (
              /* FORM: INITIAL SETUP */
              <form onSubmit={handleSetup} className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400 block tracking-wide">
                    নতুন গোপন পাসওয়ার্ড (কমপক্ষে ৪ অক্ষর) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Lock size={15} />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="পাসওয়ার্ড লিখুন"
                      className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-white/10 bg-black/40 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400 block tracking-wide">
                    পাসওয়ার্ড পুনরায় লিখুন *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Check size={15} />
                    </div>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                      className="w-full pl-10 pr-3.5 py-3 rounded-2xl border border-white/10 bg-black/40 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] active:scale-[0.99] disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader size={16} className="animate-spin text-slate-950" />
                      <span>সংরক্ষণ হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Save size={15} />
                      <span>পাসওয়ার্ড সেভ করে প্রবেশ করুন</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        ) : (
          /* ============================================================== */
          /* UNLOCKED EXECUTIVE DASHBOARD                                   */
          /* ============================================================== */
          <div className="p-4 sm:p-7 space-y-6">
            
            {/* Dashboard Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500/60 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] flex-shrink-0">
                  <img
                    src="/images/hero-portrait-01.png"
                    alt="Md. Mominul Islam"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-white">
                      Md. Mominul Islam
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono font-semibold border border-emerald-500/30">
                      Super Admin
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">মাস্টার কন্ট্রোল প্যানেল ও ট্র্যাকিং</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    loadPayments()
                    loadAnalytics()
                  }}
                  disabled={isRefreshing}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/5 cursor-pointer disabled:opacity-50"
                  title="রিফ্রেশ করুন"
                >
                  <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-emerald-400' : ''} />
                  <span>রিফ্রেশ</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowChangeModal(!showChangeModal)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/5 cursor-pointer"
                  title="পাসওয়ার্ড পরিবর্তন করুন"
                >
                  <KeyRound size={13} />
                  <span className="hidden sm:inline">পাসওয়ার্ড চেঞ্জ</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-red-500/20 cursor-pointer"
                  title="লগআউট"
                >
                  <LogOut size={13} />
                  <span>লগআউট</span>
                </button>
              </div>
            </div>

            {/* TAB SELECTOR PILLS */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('payments')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
                  activeTab === 'payments'
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                <CreditCard size={14} />
                <span>পেমেন্ট রিকোয়েস্ট (Add Money)</span>
                {paymentsStats.pendingCount > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                      activeTab === 'payments' ? 'bg-black text-amber-300' : 'bg-amber-500 text-black'
                    }`}
                  >
                    {paymentsStats.pendingCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
                  activeTab === 'analytics'
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                <BarChart3 size={14} />
                <span>ভিজিটর ও সেকশন অ্যানালিটিক্স</span>
                {analytics.summary.activeVisitors > 0 && (
                  <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-300 font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{analytics.summary.activeVisitors} লাইভ</span>
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer flex-shrink-0 ${
                  activeTab === 'settings'
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                <Smartphone size={14} />
                <span>গেটওয়ে সেটিংস (Gateway Numbers)</span>
              </button>
            </div>

            {/* Notifications */}
            {success && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2.5">
                <CheckCircle2 size={16} className="flex-shrink-0 text-emerald-400" />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2.5">
                <AlertCircle size={16} className="flex-shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Password Change Modal / Expandable Box */}
            {showChangeModal && (
              <form onSubmit={handleChangePassword} className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white flex items-center gap-2">
                    <KeyRound size={14} className="text-emerald-400" />
                    <span>মাস্টার পাসওয়ার্ড পরিবর্তন করুন</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowChangeModal(false)}
                    className="text-slate-400 hover:text-white text-xs cursor-pointer"
                  >
                    ✕ বন্ধ করুন
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">পুরাতন পাসওয়ার্ড *</label>
                    <input
                      type="password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="বর্তমান পাসওয়ার্ড"
                      className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/50 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">নতুন পাসওয়ার্ড (কমপক্ষে ৪ অক্ষর) *</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="নতুন সিক্রেট পাসওয়ার্ড"
                      className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/50 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                  >
                    আপডেট নিশ্চিত করুন
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowChangeModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-bold transition-colors cursor-pointer"
                  >
                    বাতিল
                  </button>
                </div>
              </form>
            )}

            {/* ============================================================== */}
            {/* VIEW 1: PAYMENTS MANAGEMENT (কে কত টাকা এড মানি করলো)        */}
            {/* ============================================================== */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                
                {/* 4 KPI Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">মোট পেমেন্ট ভলিউম</span>
                    <p className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                      ৳{paymentsStats.totalVolume.toLocaleString()}
                    </p>
                    <span className="text-[10px] text-slate-500">অনুমোদিত ট্রানজেকশন</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                    <span className="text-[11px] font-mono text-amber-300 uppercase">অপেক্ষমান রিকোয়েস্ট</span>
                    <p className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
                      {paymentsStats.pendingCount}
                    </p>
                    <span className="text-[10px] text-amber-400/80">ভেরিফিকেশনের জন্য বাকি</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                    <span className="text-[11px] font-mono text-emerald-300 uppercase">অনুমোদিত পেমেন্ট</span>
                    <p className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                      {paymentsStats.verifiedCount}
                    </p>
                    <span className="text-[10px] text-emerald-400/80">সফল কনফার্মেশন</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">মোট রিকোয়েস্ট</span>
                    <p className="text-xl sm:text-2xl font-bold font-mono text-white">
                      {paymentsStats.totalCount}
                    </p>
                    <span className="text-[10px] text-slate-500">সর্বমোট দাখিলকৃত</span>
                  </div>
                </div>

                {/* Search, Filter & Manual Add Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
                    <div className="relative w-full sm:w-72">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={paymentSearch}
                        onChange={(e) => setPaymentSearch(e.target.value)}
                        placeholder="TrxID, নম্বর বা নাম দিয়ে খুঁজুন..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowManualModal(true)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 shadow-lg shadow-emerald-500/20"
                    >
                      <Plus size={14} />
                      <span className="hidden sm:inline">নতুন পেমেন্ট যোগ করুন</span>
                      <span className="sm:hidden">পেমেন্ট যোগ</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto w-full sm:w-auto">
                    {(['all', 'pending', 'verified', 'rejected'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer flex-shrink-0 ${
                          statusFilter === st
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
                        }`}
                      >
                        {st === 'all'
                          ? 'সকল রিকোয়েস্ট'
                          : st === 'pending'
                          ? 'অপেক্ষমান (Pending)'
                          : st === 'verified'
                          ? 'অনুমোদিত'
                          : 'বাতিল'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Manual Payment Entry Modal */}
                {showManualModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-lg bg-[#0e121a] border border-white/15 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <CreditCard size={18} className="text-emerald-400" />
                          <h3 className="text-sm font-bold text-white">নতুন পেমেন্ট ট্রানজেকশন যুক্ত করুন</h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowManualModal(false)}
                          className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <form onSubmit={handleCreateManualPayment} className="space-y-3.5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-slate-300">পেমেন্ট মাধ্যম *</label>
                            <select
                              value={manualForm.method}
                              onChange={(e) => setManualForm({ ...manualForm, method: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                            >
                              <option value="bKash Personal">bKash (বিকাশ)</option>
                              <option value="Nagad Personal">Nagad (নগদ)</option>
                              <option value="Cellfin / Islami Bank">Cellfin (সেলফিন / ইসলামী ব্যাংক)</option>
                              <option value="Mercantile Bank">Mercantile Bank (মার্কেন্টাইল ব্যাংক)</option>
                              <option value="Direct Cash / Hand">Direct Cash / নগদ গ্রহণ</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-slate-300">Transaction ID (TrxID) *</label>
                            <input
                              type="text"
                              required
                              value={manualForm.trxId}
                              onChange={(e) => setManualForm({ ...manualForm, trxId: e.target.value.toUpperCase() })}
                              placeholder="e.g. BKT9823412"
                              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-slate-300">টাকার পরিমাণ (BDT) *</label>
                            <input
                              type="number"
                              required
                              value={manualForm.amount}
                              onChange={(e) => setManualForm({ ...manualForm, amount: e.target.value })}
                              placeholder="e.g. 5000"
                              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-slate-300">প্রেরকের নম্বর / একাউন্ট *</label>
                            <input
                              type="text"
                              required
                              value={manualForm.senderNumber}
                              onChange={(e) => setManualForm({ ...manualForm, senderNumber: e.target.value })}
                              placeholder="e.g. 01700000000"
                              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-slate-300">গ্রাহকের নাম (ঐচ্ছিক)</label>
                            <input
                              type="text"
                              value={manualForm.clientName}
                              onChange={(e) => setManualForm({ ...manualForm, clientName: e.target.value })}
                              placeholder="e.g. John Doe"
                              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-mono text-slate-300">স্ট্যাটাস</label>
                            <select
                              value={manualForm.status}
                              onChange={(e) => setManualForm({ ...manualForm, status: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                            >
                              <option value="verified">অনুমোদিত (Verified)</option>
                              <option value="pending">অপেক্ষমান (Pending)</option>
                              <option value="rejected">বাতিল (Rejected)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-mono text-slate-300">প্যাকেজ / সেবার বিবরণ</label>
                          <input
                            type="text"
                            value={manualForm.package}
                            onChange={(e) => setManualForm({ ...manualForm, package: e.target.value })}
                            placeholder="e.g. Mobile App Development / Website Starter"
                            className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-mono text-slate-300">অ্যাডমিন নোটস</label>
                          <input
                            type="text"
                            value={manualForm.notes}
                            onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                            placeholder="e.g. bKash SMS থেকে যাচাইকৃত"
                            className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div className="pt-2 flex gap-2">
                          <button
                            type="submit"
                            disabled={manualLoading}
                            className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-60"
                          >
                            {manualLoading ? (
                              <>
                                <Loader size={14} className="animate-spin" />
                                <span>রেকর্ড হচ্ছে...</span>
                              </>
                            ) : (
                              <>
                                <Check size={14} />
                                <span>পেমেন্ট সংরক্ষণ করুন</span>
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowManualModal(false)}
                            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-bold transition-colors cursor-pointer"
                          >
                            বাতিল
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Payments Table / Feed */}
                {filteredPayments.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 border border-white/5 rounded-2xl bg-black/20 space-y-2">
                    <CreditCard size={32} className="mx-auto text-slate-600" />
                    <p className="text-xs">এখনও কোনো পেমেন্ট রিকোয়েস্ট পাওয়া যায়নি।</p>
                    <p className="text-[11px] text-slate-600">
                      ক্লায়েন্টরা পেমেন্ট পেজ থেকে ভেরিফিকেশন ফর্ম পূরণ করলে এখানে স্বয়ংক্রিয়ভাবে দেখাবে।
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredPayments.map((p) => {
                      const isPending = p.status === 'pending'
                      const isVerified = p.status === 'verified'
                      const isRejected = p.status === 'rejected'

                      const brandBg =
                        p.method?.toLowerCase().includes('bkash')
                          ? 'border-[#E2136E]/30 bg-[#E2136E]/5'
                          : p.method?.toLowerCase().includes('nagad')
                          ? 'border-[#E53935]/30 bg-[#E53935]/5'
                          : p.method?.toLowerCase().includes('cellfin')
                          ? 'border-[#0A7B3E]/30 bg-[#0A7B3E]/5'
                          : 'border-[#0072BC]/30 bg-[#0072BC]/5'

                      return (
                        <div
                          key={p.id}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all ${brandBg} space-y-3 shadow-md`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
                            <div className="flex items-center gap-3">
                              <span className="font-mono font-bold text-lg text-emerald-400">
                                ৳{p.amount?.toLocaleString()} BDT
                              </span>
                              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase bg-white/10 text-white border border-white/10">
                                {p.method}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                  isPending
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                    : isVerified
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                    : 'bg-red-500/20 text-red-400 border border-red-500/40'
                                }`}
                              >
                                {isPending ? 'Pending Approval' : isVerified ? 'Verified' : 'Rejected'}
                              </span>
                            </div>

                            <span className="text-[11px] text-slate-400 font-mono">
                              {new Date(p.createdAt).toLocaleString('en-US', {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                              })}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                            <div className="space-y-1">
                              <span className="text-[10px] text-slate-400 uppercase font-mono">ক্লায়েন্ট ও প্যাকেজ:</span>
                              <p className="font-semibold text-white text-sm">{p.clientName || 'Valued Client'}</p>
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold">
                                <span>📦 {p.package || 'Online Service Payment'}</span>
                              </div>
                            </div>

                            <div className="space-y-0.5">
                              <span className="text-[10px] text-slate-400 uppercase font-mono">প্রেরক নম্বর / অ্যাকাউন্ট:</span>
                              <p className="font-mono font-bold text-white select-all">{p.senderNumber}</p>
                              {p.clientPhone && p.clientPhone !== p.senderNumber && (
                                <p className="text-[11px] text-slate-400">ফোন: {p.clientPhone}</p>
                              )}
                            </div>

                            <div className="space-y-0.5">
                              <span className="text-[10px] text-slate-400 uppercase font-mono">Transaction ID (TrxID):</span>
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-emerald-400 bg-black/40 px-2 py-0.5 rounded-lg border border-white/5 select-all">
                                  {p.trxId}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(p.trxId, p.id)}
                                  className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                                  title="কপি করুন"
                                >
                                  {copiedKey === p.id ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs">
                            <div className="flex items-center gap-2">
                              {isPending && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => handleUpdatePaymentStatus(p.id, 'verified')}
                                    className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                                  >
                                    <CheckCheck size={13} />
                                    <span>অনুমোদন করুন</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleUpdatePaymentStatus(p.id, 'rejected')}
                                    className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-red-500/30"
                                  >
                                    <XCircle size={13} />
                                    <span>বাতিল</span>
                                  </button>
                                </>
                              )}

                              {!isPending && (
                                <button
                                  type="button"
                                  onClick={() => handleUpdatePaymentStatus(p.id, 'pending')}
                                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] font-semibold cursor-pointer"
                                >
                                  Mark Pending
                                </button>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              {p.senderNumber && (
                                <a
                                  href={`https://wa.me/88${p.senderNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                    `Hello ${p.clientName},\n\nWe have received your payment of ৳${p.amount} BDT via ${p.method} (TrxID: ${p.trxId}). Your payment is verified and confirmed.\n\nThank you!\nMd. Mominul Islam`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] font-semibold flex items-center gap-1.5 transition-colors border border-[#25D366]/30"
                                >
                                  <FaWhatsapp size={13} />
                                  <span>WhatsApp এ মেসেজ দিন</span>
                                </a>
                              )}

                              <button
                                type="button"
                                onClick={() => handleDeletePayment(p.id)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                                title="মুছে ফেলুন"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                        </div>
                      )
                    })}
                  </div>
                )}

              </div>
            )}

            {/* ============================================================== */}
            {/* VIEW 2: VISITOR & SECTION ANALYTICS (কে কোন পেজ/সেকশন দেখছে)   */}
            {/* ============================================================== */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                
                {/* 4 Live Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-emerald-300 uppercase">বর্তমানে লাইভ ভিজিটর</span>
                      <Radio size={14} className="text-emerald-400 animate-pulse" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
                      {analytics.summary.activeVisitors}
                    </p>
                    <span className="text-[10px] text-emerald-400/80">গত ৩ মিনিটের মধ্যে সক্রিয়</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400 uppercase">সর্বমোট ভিজিটর</span>
                      <Users size={14} className="text-slate-400" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold font-mono text-white">
                      {analytics.summary.totalVisitors}
                    </p>
                    <span className="text-[10px] text-slate-500">মোট ইউনিক সেশন</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400 uppercase">গড়ে সাইটে সময়</span>
                      <Clock size={14} className="text-slate-400" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold font-mono text-white">
                      {formatSeconds(analytics.summary.avgTimePerVisitor)}
                    </p>
                    <span className="text-[10px] text-slate-500">প্রতি ভিজিটরে সময়</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400 uppercase">মোট পেজ ভিউ</span>
                      <ViewIcon size={14} className="text-slate-400" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold font-mono text-white">
                      {analytics.summary.totalPageviews}
                    </p>
                    <span className="text-[10px] text-slate-500">সর্বমোট পেজ লোড</span>
                  </div>
                </div>

                {/* 2-Column Grid: Section Dwell Times vs Pages */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  
                  {/* Card 1: সেকশন হোল্ড টাইম র‍্যাংকিং (কোন সেকশন কতক্ষণ ধরে দেখছে) */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Timer size={16} className="text-emerald-400" />
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                          কোন সেকশন কতক্ষণ হোল্ড করছে (Section Hold Time)
                        </h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">সময়কাল</span>
                    </div>

                    {analytics.sortedSections.length === 0 ? (
                      <p className="text-xs text-slate-500 py-6 text-center">
                        ভিজিটররা পোর্টফোলিও স্ক্রল করলে এখানে প্রতিটি সেকশনের সময়কাল রেকর্ড হবে।
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {analytics.sortedSections.map((sec: any) => {
                          const maxSec = analytics.sortedSections[0]?.seconds || 1
                          const pct = Math.min(100, Math.round((sec.seconds / maxSec) * 100))
                          return (
                            <div key={sec.section} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="font-mono font-bold text-slate-200 capitalize">
                                  #{sec.section}
                                </span>
                                <span className="font-mono text-emerald-400 font-bold">
                                  {formatSeconds(sec.seconds)}
                                </span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Card 2: পেজ ভিউ ও পেজ টাইম (কোন পেজ কতক্ষণ দেখছে) */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Compass size={16} className="text-emerald-400" />
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                          কোন পেজ কতক্ষণ দেখছে (Pageviews &amp; Dwell)
                        </h3>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">ভিজিট ও সময়</span>
                    </div>

                    {analytics.sortedPages.length === 0 ? (
                      <p className="text-xs text-slate-500 py-6 text-center">
                        পেজ ট্র্যাকিং ডাটা লোড হচ্ছে...
                      </p>
                    ) : (
                      <div className="space-y-2.5">
                        {analytics.sortedPages.map((pg: any) => (
                          <div
                            key={pg.path}
                            className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs"
                          >
                            <div>
                              <p className="font-mono font-bold text-white">
                                {pg.path === '/' ? '/ (Home Portfolio)' : pg.path}
                              </p>
                              <span className="text-[11px] text-slate-400">
                                {pg.views} views • গড়ে {formatSeconds(pg.avgSeconds)}/ভিজিট
                              </span>
                            </div>
                            <span className="font-mono font-bold text-emerald-400 text-sm">
                              {formatSeconds(pg.timeSpentSeconds)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Device distribution mini-cards */}
                    <div className="pt-2 border-t border-white/5 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                        <span className="text-[10px] text-slate-400 block">Desktop</span>
                        <span className="font-bold text-white font-mono">{analytics.deviceStats.Desktop || 0}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                        <span className="text-[10px] text-slate-400 block">Mobile</span>
                        <span className="font-bold text-white font-mono">{analytics.deviceStats.Mobile || 0}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-black/30 border border-white/5">
                        <span className="text-[10px] text-slate-400 block">Tablet</span>
                        <span className="font-bold text-white font-mono">{analytics.deviceStats.Tablet || 0}</span>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Card 3: লাইভ ভিজিটর তালিকা (কে কে ঢুকেছে ও কোন সেকশন কতক্ষণ দেখেছে) */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-emerald-400" />
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                        রিসেন্ট ভিজিটর লাইভ ফিড (Recent Visitor Feed)
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">
                        মোট {analytics.recentSessions?.length || 0} টি সেশন
                      </span>
                      <button
                        type="button"
                        onClick={handleResetAnalytics}
                        className="px-2 py-0.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-semibold transition-colors cursor-pointer border border-red-500/20"
                        title="অ্যানালিটিক্স ডাটা রিসেট করুন"
                      >
                        রিসেট ডাটা
                      </button>
                    </div>
                  </div>

                  {(!analytics.recentSessions || analytics.recentSessions.length === 0) ? (
                    <p className="text-xs text-slate-500 py-6 text-center">
                      কোনো ভিজিটর হিস্ট্রি নেই। আপনার সাইট ভিজিট হলে সাথে সাথে এখানে শো করবে।
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {analytics.recentSessions.map((s: any) => {
                        const now = Date.now()
                        const isActive = now - new Date(s.lastActive).getTime() <= 3 * 60 * 1000

                        return (
                          <div
                            key={s.id}
                            className="p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-white/5">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`w-2 h-2 rounded-full ${
                                    isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
                                  }`}
                                />
                                <span className="font-mono font-bold text-white">
                                  {s.device === 'Mobile' ? '📱 Mobile' : '💻 Desktop'} • {s.browser} on {s.os}
                                </span>
                                {isActive && (
                                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                                    ACTIVE NOW
                                  </span>
                                )}
                              </div>

                              <span className="text-[11px] text-slate-400 font-mono">
                                Last seen: {new Date(s.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <div>
                                <span className="text-[10px] text-slate-500 uppercase font-mono block">মোট সাইট টাইম:</span>
                                <span className="font-mono font-bold text-emerald-400">
                                  {formatSeconds(s.totalTimeSpentSeconds || 0)}
                                </span>
                              </div>

                              <div>
                                <span className="text-[10px] text-slate-500 uppercase font-mono block">বর্তমান পেজ:</span>
                                <span className="font-mono text-white truncate block">
                                  {s.currentPage || '/'}
                                </span>
                              </div>

                              <div>
                                <span className="text-[10px] text-slate-500 uppercase font-mono block">রেফারার / সোর্স:</span>
                                <span className="text-slate-300 truncate block">
                                  {s.referrer || 'Direct'}
                                </span>
                              </div>
                            </div>

                            {/* Section breakdown for this user */}
                            {s.sections && Object.keys(s.sections).length > 0 && (
                              <div className="pt-2 border-t border-white/5">
                                <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1">
                                  কোন সেকশন কতক্ষণ দেখেছে:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {Object.entries(s.sections).map(([sec, dur]: [string, any]) => (
                                    <span
                                      key={sec}
                                      className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/5 text-[11px] font-mono text-slate-300"
                                    >
                                      #{sec}: <strong className="text-emerald-400">{formatSeconds(dur)}</strong>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                          </div>
                        )
                      })}
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* ============================================================== */}
            {/* VIEW 3: GATEWAY NUMBERS & BANK SETTINGS                        */}
            {/* ============================================================== */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveNumbers} className="space-y-4">
                
                {/* Gateways Group 1: Mobile Banking */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider">
                    <Smartphone size={14} className="text-emerald-400" />
                    <span>মোবাইল ব্যাংকিং (Mobile Banking)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* bKash Number Card */}
                    <div className="p-4 rounded-2xl border border-[#E2136E]/30 bg-gradient-to-b from-[#E2136E]/10 to-transparent space-y-2">
                      <label className="text-xs font-bold text-[#E2136E] flex items-center gap-2">
                        <img src="/images/bkash.jpg" alt="bKash" className="w-5 h-5 rounded-full object-cover" />
                        <span>bKash বিকাশ নম্বর</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={settings.bkashNumber}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, bkashNumber: e.target.value }))
                        }
                        placeholder="01303482412"
                        className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/50 text-sm font-mono font-bold text-white focus:outline-none focus:border-[#E2136E]"
                      />
                    </div>

                    {/* Nagad Number Card */}
                    <div className="p-4 rounded-2xl border border-[#E53935]/30 bg-gradient-to-b from-[#E53935]/10 to-transparent space-y-2">
                      <label className="text-xs font-bold text-[#E53935] flex items-center gap-2">
                        <img src="/images/nagad.jpg" alt="Nagad" className="w-5 h-5 rounded-full object-cover" />
                        <span>Nagad নগদ নম্বর</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={settings.nagadNumber}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, nagadNumber: e.target.value }))
                        }
                        placeholder="01963259247"
                        className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/50 text-sm font-mono font-bold text-white focus:outline-none focus:border-[#E53935]"
                      />
                    </div>

                  </div>
                </div>

                {/* Gateways Group 2: Cellfin / Islami Bank */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider">
                    <Building2 size={14} className="text-emerald-400" />
                    <span>সেলফিন / ইসলামী ব্যাংক (Cellfin / Islami Bank Details)</span>
                  </div>

                  <div className="p-4 rounded-2xl border border-[#0A7B3E]/30 bg-gradient-to-b from-[#0A7B3E]/10 to-transparent space-y-3">
                    <div className="flex items-center justify-between pb-1 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <img src="/images/cellfin.png" alt="Cellfin" className="w-6 h-6 rounded-lg object-contain bg-white p-0.5" />
                        <span className="text-xs font-bold text-[#0A7B3E]">ইসলামী ব্যাংক বাংলাদেশ লিমিটেড (Cellfin)</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0A7B3E]/20 text-emerald-400 font-mono">
                        Cellfin / Bank A/C
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">হিসাব নম্বর (A/C No):</span>
                        <input
                          type="text"
                          value={settings.cellfinAccountNumber}
                          onChange={(e) => setSettings((prev) => ({ ...prev, cellfinAccountNumber: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/50 text-xs font-mono font-bold text-emerald-400 focus:outline-none focus:border-[#0A7B3E]"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">রাউটিং নম্বর:</span>
                        <input
                          type="text"
                          value={settings.cellfinRoutingNumber}
                          onChange={(e) => setSettings((prev) => ({ ...prev, cellfinRoutingNumber: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/50 text-xs font-mono font-bold text-white focus:outline-none focus:border-[#0A7B3E]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">হিসাবধারীর নাম (A/C Name):</span>
                      <input
                        type="text"
                        value={settings.cellfinAccountName}
                        onChange={(e) => setSettings((prev) => ({ ...prev, cellfinAccountName: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/50 text-xs font-mono font-bold text-white focus:outline-none focus:border-[#0A7B3E]"
                      />
                    </div>
                  </div>
                </div>

                {/* Gateways Group 3: Mercantile Bank */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider">
                    <Building2 size={14} className="text-[#0072BC]" />
                    <span>মার্কেন্টাইল ব্যাংক (Mercantile Bank Details)</span>
                  </div>

                  <div className="p-4 rounded-2xl border border-[#0072BC]/30 bg-gradient-to-b from-[#0072BC]/10 to-transparent space-y-3">
                    <div className="flex items-center justify-between pb-1 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <img src="/images/mercantile.jpg" alt="Mercantile Bank" className="w-6 h-6 rounded-lg object-contain bg-white p-0.5" />
                        <span className="text-xs font-bold text-[#0072BC]">{settings.bankName}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0072BC]/20 text-[#0072BC] font-mono">
                        Bank Transfer
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">হিসাব নম্বর (A/C No):</span>
                        <input
                          type="text"
                          value={settings.bankAccountNumber}
                          onChange={(e) => setSettings((prev) => ({ ...prev, bankAccountNumber: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/50 text-xs font-mono font-bold text-white focus:outline-none focus:border-[#0072BC]"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">রাউটিং নম্বর:</span>
                        <input
                          type="text"
                          value={settings.bankRoutingNumber}
                          onChange={(e) => setSettings((prev) => ({ ...prev, bankRoutingNumber: e.target.value }))}
                          className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/50 text-xs font-mono font-bold text-white focus:outline-none focus:border-[#0072BC]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">হিসাবধারীর নাম (A/C Name):</span>
                      <input
                        type="text"
                        value={settings.bankAccountName}
                        onChange={(e) => setSettings((prev) => ({ ...prev, bankAccountName: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/50 text-xs font-mono font-bold text-white focus:outline-none focus:border-[#0072BC]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Save Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] active:scale-[0.99] disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader size={16} className="animate-spin text-slate-950" />
                        <span>সংরক্ষণ হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <Save size={15} />
                        <span>গেটওয়ে সেটিংস সেভ করুন</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        )}

      </div>

    </div>
  )
}
