import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'

interface ToastOptions {
  message: string
  actionLabel?: string
  onAction?: () => void
  icon?: ReactNode
}

interface ToastState extends ToastOptions {
  id: number
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const TOAST_DURATION_MS = 3200

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null)
  const [visible, setVisible] = useState(false)
  const hideTimer = useRef<number | undefined>(undefined)
  const removeTimer = useRef<number | undefined>(undefined)

  const clearTimers = useCallback(() => {
    window.clearTimeout(hideTimer.current)
    window.clearTimeout(removeTimer.current)
  }, [])

  const showToast = useCallback(
    (options: ToastOptions) => {
      clearTimers()
      const id = Date.now()
      setToast({ id, ...options })
      setVisible(true)
      hideTimer.current = window.setTimeout(() => {
        setVisible(false)
        removeTimer.current = window.setTimeout(
          () => setToast(null),
          250,
        )
      }, TOAST_DURATION_MS)
    },
    [clearTimers],
  )

  useEffect(() => clearTimers, [clearTimers])

  const frame =
    typeof document !== 'undefined'
      ? (document.getElementById('phone-frame') ?? document.body)
      : null

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast &&
        frame &&
        createPortal(
          <div className="pointer-events-none absolute inset-x-3 bottom-[76px] z-40 flex justify-center">
            <div
              role="status"
              className={`pointer-events-auto flex w-full items-center gap-3 rounded-xl bg-[#000000]/85 px-4 py-3 text-white shadow-lg backdrop-blur-sm transition-all duration-200 ${
                visible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-2 opacity-0'
              }`}
            >
              {toast.icon && (
                <span className="shrink-0" aria-hidden="true">
                  {toast.icon}
                </span>
              )}
              <span className="min-w-0 flex-1 text-[14px] leading-snug">
                {toast.message}
              </span>
              {toast.actionLabel && (
                <button
                  type="button"
                  onClick={() => {
                    toast.onAction?.()
                  }}
                  className="shrink-0 text-[15px] font-semibold text-[#2d88ff]"
                >
                  {toast.actionLabel}
                </button>
              )}
            </div>
          </div>,
          frame,
        )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
