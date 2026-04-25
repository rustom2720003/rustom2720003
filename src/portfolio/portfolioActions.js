import {
  education,
  experience,
  profile,
  projects,
  skillGroups,
} from './portfolioData'

const STATIC_RESUME_FILE_NAME = 'Rustom-Singh-Yadav-Resume.pdf'
const STATIC_RESUME_URL = `${import.meta.env.BASE_URL}resume/${STATIC_RESUME_FILE_NAME}`
const PDF_PAGE_WIDTH = 595.28
const PDF_PAGE_HEIGHT = 841.89
const PDF_MARGIN_X = 48
const PDF_MARGIN_TOP = 54
const PDF_MARGIN_BOTTOM = 48
const PDF_CONTENT_WIDTH = PDF_PAGE_WIDTH - PDF_MARGIN_X * 2

const pdfTextStyles = {
  name: {
    color: [0.0627, 0.1608, 0.1843],
    font: 'bold',
    gapAfter: 6,
    gapBefore: 0,
    indent: 0,
    leading: 28,
    size: 22,
  },
  contact: {
    color: [0.3373, 0.3961, 0.4157],
    font: 'normal',
    gapAfter: 10,
    gapBefore: 0,
    indent: 0,
    leading: 14,
    size: 11,
  },
  section: {
    color: [0.5608, 0.2588, 0.1255],
    font: 'bold',
    gapAfter: 4,
    gapBefore: 14,
    indent: 0,
    leading: 16,
    size: 12,
  },
  subhead: {
    color: [0.0627, 0.1608, 0.1843],
    font: 'bold',
    gapAfter: 0,
    gapBefore: 8,
    indent: 0,
    leading: 15,
    size: 11.5,
  },
  meta: {
    color: [0.3373, 0.3961, 0.4157],
    font: 'normal',
    gapAfter: 4,
    gapBefore: 0,
    indent: 0,
    leading: 13,
    size: 10,
  },
  paragraph: {
    color: [0.0627, 0.1608, 0.1843],
    font: 'normal',
    gapAfter: 4,
    gapBefore: 0,
    indent: 0,
    leading: 14,
    size: 10.5,
  },
  bullet: {
    color: [0.0627, 0.1608, 0.1843],
    font: 'normal',
    gapAfter: 2,
    gapBefore: 0,
    indent: 12,
    leading: 14,
    size: 10.5,
  },
}

let textMeasureContext

function getTextMeasureContext() {
  if (textMeasureContext || typeof document === 'undefined') {
    return textMeasureContext
  }

  const canvas = document.createElement('canvas')
  textMeasureContext = canvas.getContext('2d')

  return textMeasureContext
}

function measureTextWidth(text, fontSize, fontWeight) {
  const context = getTextMeasureContext()

  if (!context) {
    return text.length * fontSize * (fontWeight === 'bold' ? 0.58 : 0.53)
  }

  const pixelFontSize = (fontSize * 96) / 72
  context.font = `${fontWeight === 'bold' ? '700' : '400'} ${pixelFontSize}px Arial`

  return (context.measureText(text).width * 72) / 96
}

function splitLongWord(word, maxWidth, fontSize, fontWeight) {
  const pieces = []
  let currentPiece = ''

  for (const character of word) {
    const nextPiece = `${currentPiece}${character}`

    if (
      !currentPiece ||
      measureTextWidth(nextPiece, fontSize, fontWeight) <= maxWidth
    ) {
      currentPiece = nextPiece
      continue
    }

    pieces.push(currentPiece)
    currentPiece = character
  }

  if (currentPiece) {
    pieces.push(currentPiece)
  }

  return pieces
}

function wrapText(text, maxWidth, fontSize, fontWeight) {
  const words = text.trim().split(/\s+/).filter(Boolean)

  if (!words.length) {
    return ['']
  }

  const lines = []
  let currentLine = ''

  for (const word of words) {
    if (measureTextWidth(word, fontSize, fontWeight) > maxWidth) {
      const brokenWordParts = splitLongWord(word, maxWidth, fontSize, fontWeight)

      if (currentLine) {
        lines.push(currentLine)
        currentLine = ''
      }

      if (brokenWordParts.length > 1) {
        lines.push(...brokenWordParts.slice(0, -1))
      }

      currentLine = brokenWordParts[brokenWordParts.length - 1]
      continue
    }

    if (!currentLine) {
      currentLine = word
      continue
    }

    const nextLine = `${currentLine} ${word}`

    if (measureTextWidth(nextLine, fontSize, fontWeight) <= maxWidth) {
      currentLine = nextLine
      continue
    }

    lines.push(currentLine)
    currentLine = word
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

function sanitizePdfText(text) {
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\r?\n/g, ' ')
    .replace(/[^\x20-\x7E]/g, '?')
}

function buildResumeItems() {
  return [
    { style: 'name', text: profile.name },
    {
      style: 'contact',
      text: `${profile.phoneDisplay} | ${profile.email} | LinkedIn: ${profile.linkedinUrl}`,
    },
    { style: 'section', text: 'PROFESSIONAL OVERVIEW' },
    { style: 'paragraph', text: profile.overview },
    { style: 'section', text: 'EDUCATION' },
    {
      style: 'subhead',
      text: `${education.institute} - ${education.degree}`,
    },
    {
      style: 'meta',
      text: `${education.location} | ${education.period} | ${education.score}`,
    },
    { style: 'section', text: 'EXPERIENCE' },
    ...experience.flatMap((item) => [
      { style: 'subhead', text: `${item.role} - ${item.company}` },
      { style: 'meta', text: `${item.location} | ${item.period}` },
      { style: 'paragraph', text: item.summary },
      ...item.highlights.map((highlight) => ({
        style: 'bullet',
        text: `- ${highlight}`,
      })),
    ]),
    { style: 'section', text: 'PROJECTS' },
    ...projects.flatMap((project) => [
      { style: 'subhead', text: project.name },
      { style: 'meta', text: `${project.client} | ${project.period}` },
      {
        style: 'paragraph',
        text: `Stack: ${project.stack.join(', ')}`,
      },
      { style: 'paragraph', text: project.summary },
      ...project.highlights.map((highlight) => ({
        style: 'bullet',
        text: `- ${highlight}`,
      })),
    ]),
    { style: 'section', text: 'TECHNICAL SKILLS' },
    ...skillGroups.map((group) => ({
      style: 'paragraph',
      text: `${group.title}: ${group.items.join(', ')}`,
    })),
  ]
}

function buildResumePages() {
  const pages = [[]]
  const items = buildResumeItems()
  let pageIndex = 0
  let currentY = PDF_PAGE_HEIGHT - PDF_MARGIN_TOP

  const addPage = () => {
    pages.push([])
    pageIndex = pages.length - 1
    currentY = PDF_PAGE_HEIGHT - PDF_MARGIN_TOP
  }

  for (const item of items) {
    const style = pdfTextStyles[item.style]
    const availableWidth = PDF_CONTENT_WIDTH - style.indent

    if (currentY - style.gapBefore < PDF_MARGIN_BOTTOM) {
      addPage()
    }

    currentY -= style.gapBefore

    const lines = wrapText(item.text, availableWidth, style.size, style.font)

    for (const line of lines) {
      if (currentY - style.leading < PDF_MARGIN_BOTTOM) {
        addPage()
      }

      pages[pageIndex].push({
        color: style.color,
        font: style.font,
        size: style.size,
        text: line,
        x: PDF_MARGIN_X + style.indent,
        y: currentY,
      })

      currentY -= style.leading
    }

    currentY -= style.gapAfter
  }

  return pages
}

function buildPageStream(lines) {
  return lines
    .map((line) => {
      const fontName = line.font === 'bold' ? 'F2' : 'F1'
      const [red, green, blue] = line.color

      return [
        'BT',
        `/${fontName} ${line.size.toFixed(2)} Tf`,
        `${red} ${green} ${blue} rg`,
        `1 0 0 1 ${line.x.toFixed(2)} ${line.y.toFixed(2)} Tm`,
        `(${sanitizePdfText(line.text)}) Tj`,
        'ET',
      ].join('\n')
    })
    .join('\n')
}

function buildPdfBlob() {
  const pageStreams = buildResumePages().map(buildPageStream)
  const objects = []
  const encoder = new TextEncoder()

  const addObject = (content) => {
    objects.push(content)
    return objects.length
  }

  const regularFontNumber = addObject(
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  )
  const boldFontNumber = addObject(
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  )
  const pagesTreeNumber = addObject('<< /Type /Pages /Kids [] /Count 0 >>')

  const contentNumbers = pageStreams.map((stream) =>
    addObject(
      `<< /Length ${encoder.encode(stream).length} >>\nstream\n${stream}\nendstream`,
    ),
  )

  const pageNumbers = contentNumbers.map((contentNumber) =>
    addObject(
      `<< /Type /Page /Parent ${pagesTreeNumber} 0 R /MediaBox [0 0 ${PDF_PAGE_WIDTH} ${PDF_PAGE_HEIGHT}] /Resources << /Font << /F1 ${regularFontNumber} 0 R /F2 ${boldFontNumber} 0 R >> >> /Contents ${contentNumber} 0 R >>`,
    ),
  )

  objects[pagesTreeNumber - 1] =
    `<< /Type /Pages /Kids [${pageNumbers.map((number) => `${number} 0 R`).join(' ')}] /Count ${pageNumbers.length} >>`

  const catalogNumber = addObject(
    `<< /Type /Catalog /Pages ${pagesTreeNumber} 0 R >>`,
  )

  let pdf = '%PDF-1.4\n'
  const offsets = [0]

  objects.forEach((content, index) => {
    offsets[index + 1] = pdf.length
    pdf += `${index + 1} 0 obj\n${content}\nendobj\n`
  })

  const xrefOffset = pdf.length
  pdf += `xref\n0 ${objects.length + 1}\n`
  pdf += '0000000000 65535 f \n'

  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, '0')} 00000 n \n`
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogNumber} 0 R >>\n`
  pdf += `startxref\n${xrefOffset}\n%%EOF`

  return new Blob([pdf], { type: 'application/pdf' })
}

function triggerDownload(url, fileName = STATIC_RESUME_FILE_NAME) {
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}

async function downloadAttachedResume() {
  try {
    const response = await fetch(STATIC_RESUME_URL, {
      cache: 'no-store',
      method: 'HEAD',
    })

    if (!response.ok) {
      return false
    }

    triggerDownload(STATIC_RESUME_URL)

    return true
  } catch {
    return false
  }
}

export async function downloadResume() {
  const hasAttachedResume = await downloadAttachedResume()

  if (hasAttachedResume) {
    return
  }

  const resumeBlob = buildPdfBlob()
  const url = URL.createObjectURL(resumeBlob)

  triggerDownload(url)

  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}
