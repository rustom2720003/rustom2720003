export function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const sectionClassName =
  'mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 lg:px-0 lg:py-14'

export const panelClassName =
  'card-reveal surface-lift rounded-[1.6rem] border border-line bg-surface shadow-portfolio backdrop-blur-xl'

export const eyebrowClassName =
  'inline-flex items-center gap-2 font-mono text-[0.8rem] font-bold uppercase tracking-[0.12em] text-accent-strong'

export const cardLabelClassName =
  'font-mono text-[0.8rem] font-bold uppercase tracking-[0.12em] text-teal'

export const bulletListClassName =
  'grid gap-2 pl-5 leading-7 text-ink marker:text-accent'

export const chipClassName =
  'inline-flex min-h-8 items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3.5 py-1.5 text-sm text-ink'

export const buttonClassNames = {
  primary:
    'inline-flex min-h-[3.2rem] items-center justify-center gap-2 rounded-full border border-transparent bg-gradient-to-br from-accent to-[#8e37ff] px-5 py-3 font-medium text-white shadow-[0_16px_32px_rgba(151,29,106,0.32)] transition duration-200 hover:-translate-y-0.5',
  secondary:
    'inline-flex min-h-[3.2rem] items-center justify-center gap-2 rounded-full border border-white/50 bg-white/72 px-5 py-3 font-medium text-ink shadow-[0_14px_28px_rgba(122,16,88,0.12)] transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-white/86',
  ghost:
    'inline-flex min-h-[3.2rem] items-center justify-center gap-2 rounded-full border border-line bg-transparent px-5 py-3 font-medium text-ink transition duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:bg-white/32',
}

export const pillClassNames = {
  default:
    'inline-flex items-center rounded-full bg-accent-soft px-3.5 py-1.5 text-sm text-accent-strong',
  strong:
    'inline-flex items-center rounded-full bg-teal-soft px-3.5 py-1.5 text-sm text-teal',
  muted:
    'inline-flex items-center rounded-full bg-black/5 px-3.5 py-1.5 text-sm text-muted',
}
