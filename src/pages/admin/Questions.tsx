import { EmployerTableCard } from '@/components/employer/EmployerTableCard'
import { AdminLayout } from '@/components/layouts/AdminLayout'
import {
  CloudUpload,
  FileUp,
  LayoutGrid,
  List,
  MoreVertical,
  RefreshCw,
  ShieldCheck,
  Terminal,
  Wrench,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

const MAX_BYTES = 10 * 1024 * 1024

type SetStatus = 'completed' | 'inProgress'
type ValidationState = 'ok' | 'syncing'

type QuestionSetRow = {
  id: string
  title: string
  version: string
  questionCount: number
  updatedLabel: string
  status: SetStatus
  validation: ValidationState
  icon: 'js' | 'tool' | 'terminal'
}

const INITIAL_SETS: QuestionSetRow[] = [
  {
    id: '1',
    title: 'Advanced Node.js architecture',
    version: 'v2.4.0',
    questionCount: 45,
    updatedLabel: 'Updated 2 days ago',
    status: 'completed',
    validation: 'ok',
    icon: 'js',
  },
  {
    id: '2',
    title: 'DevOps & CI/CD fundamentals',
    version: 'v1.1.2',
    questionCount: 32,
    updatedLabel: 'Updated 5 hours ago',
    status: 'inProgress',
    validation: 'syncing',
    icon: 'tool',
  },
  {
    id: '3',
    title: 'Systems design interview pack',
    version: 'v3.0.0',
    questionCount: 28,
    updatedLabel: 'Updated 1 week ago',
    status: 'completed',
    validation: 'ok',
    icon: 'terminal',
  },
]

function validateJsonFiles(files: File[]): { valid: File[]; errors: string[] } {
  const valid: File[] = []
  const errors: string[] = []
  for (const f of files) {
    if (!f.name.toLowerCase().endsWith('.json')) {
      errors.push(`“${f.name}” is not a .json file`)
      continue
    }
    if (f.size > MAX_BYTES) {
      errors.push(`“${f.name}” exceeds 10MB`)
      continue
    }
    valid.push(f)
  }
  return { valid, errors }
}

const AdminQuestions = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [importNotice, setImportNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [stats, setStats] = useState({ active: 12, processing: 2, failed: 0 })
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [sets, setSets] = useState<QuestionSetRow[]>(INITIAL_SETS)
  const [activeById, setActiveById] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(INITIAL_SETS.map((s) => [s.id, s.id !== '2'])),
  )
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const syncPercent =
    stats.failed > 0 ? Math.max(0, 100 - stats.failed * 12) : stats.processing > 0 ? 96 : 100

  const queueImport = useCallback((files: File[]) => {
    if (files.length === 0) return
    const { valid, errors } = validateJsonFiles(files)
    if (errors.length) {
      setImportNotice({ type: 'error', text: errors.join(' · ') })
    }
    if (valid.length === 0) return

    setImportNotice({
      type: 'success',
      text: `${valid.length} file${valid.length > 1 ? 's' : ''} queued for validation.`,
    })
    setStats((s) => ({ ...s, processing: s.processing + valid.length }))

    window.setTimeout(() => {
      setStats((s) => ({
        active: s.active + valid.length,
        processing: Math.max(0, s.processing - valid.length),
        failed: s.failed,
      }))
      setImportNotice((n) => (n?.type === 'success' ? null : n))
    }, 1600)
  }, [])

  useEffect(() => {
    if (importNotice?.type !== 'success') return
    const t = window.setTimeout(() => setImportNotice(null), 5000)
    return () => window.clearTimeout(t)
  }, [importNotice])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragActive(false)
      queueImport(Array.from(e.dataTransfer.files))
    },
    [queueImport],
  )

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const list = e.target.files
      if (list?.length) queueImport(Array.from(list))
      e.target.value = ''
    },
    [queueImport],
  )

  return (
    <AdminLayout>
      <div className="flex min-h-0 flex-1 flex-col gap-8 px-6 py-8 sm:px-8">
        <header className="flex w-full min-w-0 flex-col gap-1">
          <h1 className="fs-30 font-bold font-heading tracking-[-0.75px] text-[#191C1E]">Question bank</h1>
          <p className="max-w-2xl fs-16 font-normal leading-6 text-[#434655] font-body">
            Import structured JSON, monitor validation health, and manage active assessment question sets.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <EmployerTableCard className="shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
            <div className="relative border-b border-slate-100 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-fs-size-18 font-bold font-heading leading-7 text-[#191C1E]">Import question bank</h2>
                  <p className="mt-1 text-fs-size-14 font-normal leading-5 text-[#64748B] font-body">
                    Upload structured JSON files to expand your assessment library.
                  </p>
                </div>
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <FileUp className="size-5" strokeWidth={2} aria-hidden />
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div
                role="button"
                tabIndex={0}
                aria-label="Drop JSON files here or click to browse"
                onDragEnter={(e) => {
                  e.preventDefault()
                  setDragActive(true)
                }}
                onDragLeave={(e) => {
                  e.preventDefault()
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragActive(false)
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    fileInputRef.current?.click()
                  }
                }}
                className={`flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-4 py-10 transition-colors ${
                  dragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-200/90 bg-[#F9FAFB] hover:border-primary/35 hover:bg-primary/3'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex size-14 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <CloudUpload className="size-7" strokeWidth={1.75} aria-hidden />
                </div>
                <p className="text-center text-fs-size-14 font-semibold text-[#191C1E] font-body">Drag & drop JSON files here</p>
                <p className="text-center text-fs-size-12 text-[#64748B] font-body">Maximum file size: 10MB</p>
                <button
                  type="button"
                  className="text-fs-size-14 font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-sm font-body"
                  onClick={(e) => {
                    e.stopPropagation()
                    fileInputRef.current?.click()
                  }}
                >
                  Or browse files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  multiple
                  className="sr-only"
                  aria-label="Choose JSON files"
                  onChange={onFileChange}
                />
              </div>
              {importNotice ? (
                <p
                  role="status"
                  className={`mt-4 text-fs-size-13 font-medium font-body ${
                    importNotice.type === 'success' ? 'text-teal-700' : 'text-red-700'
                  }`}
                >
                  {importNotice.text}
                </p>
              ) : null}
            </div>
          </EmployerTableCard>

          <EmployerTableCard className="shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
            <div className="border-b border-slate-100 p-6 sm:p-8">
              <h2 className="text-fs-size-18 font-bold font-heading leading-7 text-[#191C1E]">Validation health</h2>
            </div>
            <div className="flex flex-col gap-6 p-6 sm:p-8">
              <ul className="flex flex-col gap-4">
                <HealthRow dotClass="bg-primary" label="Active sets" value={stats.active} />
                <HealthRow dotClass="bg-amber-500" label="Processing" value={stats.processing} />
                <HealthRow dotClass="bg-red-500" label="Failed validation" value={stats.failed} />
              </ul>
              <div className="border-t border-slate-100 pt-6">
                <p className="text-fs-size-11 font-bold uppercase tracking-wider text-[#64748B] font-body">Global sync status</p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="text-fs-size-20 font-bold tabular-nums text-[#191C1E] font-heading">{syncPercent}%</span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-primary to-[#6D28D9] transition-[width] duration-500"
                    style={{ width: `${syncPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </EmployerTableCard>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-fs-size-20 font-bold font-heading leading-7 text-[#191C1E]">Active question sets</h2>
          <div
            className="inline-flex rounded-xl border border-slate-200/80 bg-[#F2F4F6] p-1 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)]"
            role="group"
            aria-label="Layout"
          >
            <button
              type="button"
              onClick={() => setView('list')}
              className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-4 py-2 text-fs-size-12 font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 font-body ${
                view === 'list'
                  ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200/90'
                  : 'text-[#64748B] hover:bg-white/70 hover:text-[#191C1E]'
              }`}
            >
              <List className="size-4" strokeWidth={2} aria-hidden />
              List
            </button>
            <button
              type="button"
              onClick={() => setView('grid')}
              className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-4 py-2 text-fs-size-12 font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 font-body ${
                view === 'grid'
                  ? 'bg-white text-primary shadow-sm ring-1 ring-slate-200/90'
                  : 'text-[#64748B] hover:bg-white/70 hover:text-[#191C1E]'
              }`}
            >
              <LayoutGrid className="size-4" strokeWidth={2} aria-hidden />
              Grid
            </button>
          </div>
        </div>

        {view === 'list' ? (
          <QuestionSetsListView
            sets={sets}
            activeById={activeById}
            onToggle={(id, on) => setActiveById((m) => ({ ...m, [id]: on }))}
            openMenuId={openMenuId}
            onMenuToggle={(id) => setOpenMenuId((cur) => (cur === id ? null : id))}
            onMenuClose={() => setOpenMenuId(null)}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {sets.map((row) => (
              <QuestionSetGridCard
                key={row.id}
                row={row}
                enabled={activeById[row.id] ?? true}
                onToggle={(on) => setActiveById((m) => ({ ...m, [row.id]: on }))}
                menuOpen={openMenuId === row.id}
                onMenuToggle={() => setOpenMenuId((id) => (id === row.id ? null : row.id))}
                onMenuClose={() => setOpenMenuId(null)}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

function HealthRow({ dotClass, label, value }: { dotClass: string; label: string; value: number }) {
  return (
    <li className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className={`size-2 shrink-0 rounded-full ${dotClass}`} aria-hidden />
        <span className="text-fs-size-14 font-medium text-[#64748B] font-body">{label}</span>
      </div>
      <span className="text-fs-size-18 font-bold tabular-nums text-[#191C1E] font-heading">{value}</span>
    </li>
  )
}

function SetIcon({ kind, size = 'md' }: { kind: QuestionSetRow['icon']; size?: 'sm' | 'md' | 'lg' }) {
  const box =
    size === 'sm'
      ? 'size-10 rounded-lg'
      : size === 'lg'
        ? 'size-16 rounded-2xl'
        : 'size-12 rounded-xl'
  const jsText = size === 'lg' ? 'text-fs-size-16' : size === 'sm' ? 'text-fs-size-12' : 'text-fs-size-14'
  const iconClass = size === 'lg' ? 'size-8' : size === 'sm' ? 'size-5' : 'size-6'

  if (kind === 'js')
    return (
      <div
        className={`flex shrink-0 items-center justify-center bg-linear-to-br from-primary to-[#6D28D9] text-white shadow-sm ring-1 ring-black/5 ${box}`}
      >
        <span className={`font-heading font-bold ${jsText}`}>JS</span>
      </div>
    )
  if (kind === 'tool')
    return (
      <div
        className={`flex shrink-0 items-center justify-center bg-linear-to-br from-amber-500 to-orange-600 text-white shadow-sm ring-1 ring-black/5 ${box}`}
      >
        <Wrench className={iconClass} strokeWidth={2} aria-hidden />
      </div>
    )
  return (
    <div
      className={`flex shrink-0 items-center justify-center bg-linear-to-br from-sky-400 to-sky-600 text-white shadow-sm ring-1 ring-black/5 ${box}`}
    >
      <Terminal className={iconClass} strokeWidth={2} aria-hidden />
    </div>
  )
}

function StatusPill({ row }: { row: QuestionSetRow }) {
  const completed = row.status === 'completed'
  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-3 py-1 text-fs-size-10 font-bold uppercase tracking-wide font-body ${
        completed
          ? 'bg-primary/12 text-primary ring-1 ring-primary/15'
          : 'bg-amber-600 text-white ring-1 ring-amber-700/20'
      }`}
    >
      {completed ? 'Completed' : 'In progress'}
    </span>
  )
}

function ValidationGlyph({ row }: { row: QuestionSetRow }) {
  if (row.validation === 'ok') {
    return <ShieldCheck className="size-5 shrink-0 text-primary" strokeWidth={2} aria-label="Validated" />
  }
  return (
    <RefreshCw className="size-5 shrink-0 text-amber-600 animate-spin" style={{ animationDuration: '2.5s' }} aria-label="Syncing" />
  )
}

function ActiveSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: (on: boolean) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-fs-size-11 font-bold uppercase tracking-wide text-[#64748B] font-body">
        {enabled ? 'Active' : 'Inactive'}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onToggle(!enabled)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 ${
          enabled ? 'bg-primary' : 'bg-slate-300'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 size-6 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}

function OverflowMenu({
  rowTitle,
  menuOpen,
  onMenuToggle,
  onMenuClose,
}: {
  rowTitle: string
  menuOpen: boolean
  onMenuToggle: () => void
  onMenuClose: () => void
}) {
  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={onMenuToggle}
        className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#191C1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        aria-label={`More actions for ${rowTitle}`}
      >
        <MoreVertical className="size-5" strokeWidth={2} />
      </button>
      {menuOpen ? (
        <>
          <button type="button" className="fixed inset-0 z-10 cursor-default bg-transparent" aria-label="Close menu" onClick={onMenuClose} />
          <ul
            role="menu"
            className="absolute right-0 top-full z-20 mt-1 min-w-[168px] rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
          >
            <li role="none">
              <button
                type="button"
                role="menuitem"
                className="flex w-full px-4 py-2.5 text-left text-fs-size-14 font-semibold text-[#191C1E] hover:bg-slate-50 font-body"
                onClick={onMenuClose}
              >
                Edit set
              </button>
            </li>
            <li role="none">
              <button
                type="button"
                role="menuitem"
                className="flex w-full px-4 py-2.5 text-left text-fs-size-14 font-semibold text-[#191C1E] hover:bg-slate-50 font-body"
                onClick={onMenuClose}
              >
                Duplicate
              </button>
            </li>
            <li role="none">
              <button
                type="button"
                role="menuitem"
                className="flex w-full px-4 py-2.5 text-left text-fs-size-14 font-semibold text-red-700 hover:bg-red-50 font-body"
                onClick={onMenuClose}
              >
                Archive
              </button>
            </li>
          </ul>
        </>
      ) : null}
    </div>
  )
}

function QuestionSetsListView({
  sets,
  activeById,
  onToggle,
  openMenuId,
  onMenuToggle,
  onMenuClose,
}: {
  sets: QuestionSetRow[]
  activeById: Record<string, boolean>
  onToggle: (id: string, on: boolean) => void
  openMenuId: string | null
  onMenuToggle: (id: string) => void
  onMenuClose: () => void
}) {
  return (
    <EmployerTableCard className="overflow-hidden shadow-[0_20px_40px_rgba(0,74,198,0.06)]">
      <div className="hidden border-b border-slate-100 bg-[#F9FAFB] px-6 py-3.5 lg:grid lg:grid-cols-[minmax(0,1fr)_124px_44px_132px_44px] lg:items-center lg:gap-4">
        <span className="text-fs-size-12 font-bold uppercase tracking-wide text-[#64748B] font-body">Question set</span>
        <span className="text-center text-fs-size-12 font-bold uppercase tracking-wide text-[#64748B] font-body">Status</span>
        <span className="text-center text-fs-size-12 font-bold uppercase tracking-wide text-[#64748B] font-body">Sync</span>
        <span className="text-center text-fs-size-12 font-bold uppercase tracking-wide text-[#64748B] font-body">Active</span>
        <span className="sr-only">Actions</span>
      </div>
      <ul className="divide-y divide-slate-100">
        {sets.map((row) => {
          const enabled = activeById[row.id] ?? true
          return (
            <li key={row.id} className="transition-colors hover:bg-[#F8FAFC]">
              <div className="flex flex-col gap-4 px-5 py-5 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_124px_44px_132px_44px] lg:items-center lg:gap-4 lg:py-4">
                <div className="flex min-w-0 items-center gap-4">
                  <SetIcon kind={row.icon} size="sm" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-fs-size-15 font-bold font-heading leading-5 text-[#191C1E]">{row.title}</h3>
                    <p className="mt-0.5 text-fs-size-13 leading-4 text-[#64748B] font-body">
                      {row.version} · {row.questionCount} questions · {row.updatedLabel}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 lg:flex-nowrap lg:justify-center lg:border-t-0 lg:pt-0">
                  <span className="text-fs-size-11 font-bold uppercase tracking-wide text-[#64748B] lg:hidden font-body">Status</span>
                  <div className="lg:flex lg:justify-center">
                    <StatusPill row={row} />
                  </div>
                </div>

                <div className="flex items-center gap-3 lg:justify-center">
                  <span className="text-fs-size-11 font-bold uppercase tracking-wide text-[#64748B] lg:hidden font-body">Sync</span>
                  <ValidationGlyph row={row} />
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4 lg:justify-center lg:border-t-0 lg:pt-0">
                  <span className="text-fs-size-11 font-bold uppercase tracking-wide text-[#64748B] lg:hidden font-body">Active</span>
                  <ActiveSwitch enabled={enabled} onToggle={(on) => onToggle(row.id, on)} />
                </div>

                <div className="flex justify-end lg:justify-center">
                  <OverflowMenu
                    rowTitle={row.title}
                    menuOpen={openMenuId === row.id}
                    onMenuToggle={() => onMenuToggle(row.id)}
                    onMenuClose={onMenuClose}
                  />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </EmployerTableCard>
  )
}

function QuestionSetGridCard({
  row,
  enabled,
  onToggle,
  menuOpen,
  onMenuToggle,
  onMenuClose,
}: {
  row: QuestionSetRow
  enabled: boolean
  onToggle: (on: boolean) => void
  menuOpen: boolean
  onMenuToggle: () => void
  onMenuClose: () => void
}) {
  return (
    <EmployerTableCard className="flex h-full flex-col shadow-[0_20px_40px_rgba(0,74,198,0.06)] transition-shadow hover:shadow-[0_24px_44px_rgba(0,74,198,0.09)]">
      <div className="flex flex-1 flex-col p-6">
        <div className="flex gap-4">
          <SetIcon kind={row.icon} size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="text-fs-size-16 font-bold font-heading leading-6 text-[#191C1E]">{row.title}</h3>
            <p className="mt-2 text-fs-size-13 leading-5 text-[#64748B] font-body">
              {row.version} · {row.questionCount} questions
            </p>
            <p className="mt-1 text-fs-size-12 text-[#94a3b8] font-body">{row.updatedLabel}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <StatusPill row={row} />
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-100">
            <ValidationGlyph row={row} />
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
          <ActiveSwitch enabled={enabled} onToggle={onToggle} />
          <OverflowMenu rowTitle={row.title} menuOpen={menuOpen} onMenuToggle={onMenuToggle} onMenuClose={onMenuClose} />
        </div>
      </div>
    </EmployerTableCard>
  )
}

export default AdminQuestions
