import { History, MessageSquare, Send, X } from 'lucide-react'
import { buttonClassNames, cardLabelClassName, cx, panelClassName } from './classes'
import { useRemarks } from './useRemarks'

const remarkTimeFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

function RemarksWidget() {
  const {
    closePanel,
    draft,
    isOpen,
    openPanel,
    remarks,
    remarksCount,
    setDraft,
    statusMessage,
    storageLabel,
    submitRemark,
    togglePanel,
  } = useRemarks()

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-30 flex max-w-[calc(100vw-1rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <div
        className={cx(
          panelClassName,
          'pointer-events-auto w-[min(26rem,calc(100vw-1rem))] origin-bottom-right overflow-hidden p-4 shadow-[0_26px_80px_rgba(34,8,29,0.34)] transition duration-300 sm:p-5',
          isOpen
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-5 opacity-0',
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className={cardLabelClassName}>Remarks</p>
            <h3 className="mt-2 font-display text-[1.45rem] leading-[1.1] text-ink">
              Share a comment anytime
            </h3>
            <p className="mt-2 text-sm leading-7 text-muted">
              Add a quick thought from any tab and keep it saved for later review.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-[color:var(--portfolio-glass-soft)] text-ink transition duration-200 hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)]"
            aria-label="Close remarks panel"
            onClick={closePanel}
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-ink">Your remark</span>
            <textarea
              className="min-h-[7.5rem] w-full rounded-[1.2rem] border border-line bg-[color:var(--portfolio-glass-soft)] px-4 py-3 text-sm leading-7 text-ink shadow-[var(--portfolio-inline-shadow)] outline-none transition duration-200 placeholder:text-muted focus:border-line-strong focus:bg-[color:var(--portfolio-glass-hover)]"
              onChange={(event) => setDraft(event.target.value)}
              onFocus={openPanel}
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
                  event.preventDefault()
                  submitRemark()
                }
              }}
              placeholder="Write your comment or feedback here..."
              rows={4}
              value={draft}
            />
          </label>

          <button
            type="button"
            className={cx(buttonClassNames.primary, 'w-full')}
            onClick={submitRemark}
          >
            <Send size={17} />
            Submit remark
          </button>

          <div className="flex items-center justify-between gap-3 text-sm">
            <p
              className={cx(
                'min-h-[1.5rem] text-sm',
                statusMessage ? 'text-accent-strong' : 'text-muted',
              )}
            >
              {statusMessage || 'Saved remarks stay available on this browser.'}
            </p>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[color:var(--portfolio-glass-border-strong)] bg-[color:var(--portfolio-glass-chip)] px-3 py-1 text-xs font-medium text-ink">
              {remarksCount} saved
            </span>
          </div>
        </div>

        <div className="mt-5 border-t border-line pt-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-ink">
            <History size={16} />
            Recent remarks
          </div>

          <div className="grid max-h-64 gap-3 overflow-y-auto pr-1">
            {remarks.length ? (
              remarks.map((remark) => (
                <article
                  className="rounded-2xl border border-line bg-[color:var(--portfolio-glass-soft)] px-4 py-3"
                  key={remark.id}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className={cardLabelClassName}>{remark.pageLabel}</p>
                    <span className="text-xs text-muted">
                      {remarkTimeFormatter.format(new Date(remark.createdAt))}
                    </span>
                  </div>
                  <p className="mt-2 break-words text-sm leading-7 text-ink">
                    {remark.message}
                  </p>
                </article>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-line px-4 py-5 text-sm leading-7 text-muted">
                Your submitted remarks will appear here.
              </p>
            )}
          </div>

          <p className="mt-3 text-xs leading-6 text-muted">{storageLabel}</p>
        </div>
      </div>

      <button
        type="button"
        className="pointer-events-auto inline-flex h-14 items-center gap-3 rounded-full bg-gradient-to-r from-accent via-[#d946ef] to-[#8b5cf6] px-5 text-sm font-semibold text-white shadow-[0_24px_50px_rgba(151,29,106,0.36)] transition duration-200 hover:-translate-y-1"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Hide remarks panel' : 'Open remarks panel'}
        onClick={togglePanel}
      >
        <MessageSquare size={20} />
        <span className="hidden min-[420px]:inline">Remarks</span>
        {remarksCount ? (
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-white/20 px-1.5 text-xs font-bold">
            {remarksCount}
          </span>
        ) : null}
      </button>
    </div>
  )
}

export default RemarksWidget
