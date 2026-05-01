import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bot,
  RotateCcw,
  Star,
  Trophy,
  Users,
} from 'lucide-react'
import {
  buttonClassNames,
  cardLabelClassName,
  chipClassName,
  cx,
} from '../../classes'

const LUDO_PLAYER_COUNT_OPTIONS = [2, 3, 4]
const LUDO_PLAYER_COLOR_SETS = {
  2: ['red', 'yellow'],
  3: ['red', 'blue', 'yellow'],
  4: ['red', 'blue', 'yellow', 'green'],
}
const LUDO_LAST_TRACK_PROGRESS = 50
const LUDO_FINAL_PROGRESS = 56
const LUDO_SAFE_TRACK_INDICES = new Set([0, 8, 13, 21, 26, 34, 39, 47])
const LUDO_PLACEMENT_LABELS = {
  1: '1st',
  2: '2nd',
  3: '3rd',
}
const LUDO_DICE_PIPS = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
}
const LUDO_TRACK_COORDS = [
  { row: 6, column: 1 },
  { row: 6, column: 2 },
  { row: 6, column: 3 },
  { row: 6, column: 4 },
  { row: 6, column: 5 },
  { row: 5, column: 6 },
  { row: 4, column: 6 },
  { row: 3, column: 6 },
  { row: 2, column: 6 },
  { row: 1, column: 6 },
  { row: 0, column: 6 },
  { row: 0, column: 7 },
  { row: 0, column: 8 },
  { row: 1, column: 8 },
  { row: 2, column: 8 },
  { row: 3, column: 8 },
  { row: 4, column: 8 },
  { row: 5, column: 8 },
  { row: 6, column: 9 },
  { row: 6, column: 10 },
  { row: 6, column: 11 },
  { row: 6, column: 12 },
  { row: 6, column: 13 },
  { row: 6, column: 14 },
  { row: 7, column: 14 },
  { row: 8, column: 14 },
  { row: 8, column: 13 },
  { row: 8, column: 12 },
  { row: 8, column: 11 },
  { row: 8, column: 10 },
  { row: 8, column: 9 },
  { row: 9, column: 8 },
  { row: 10, column: 8 },
  { row: 11, column: 8 },
  { row: 12, column: 8 },
  { row: 13, column: 8 },
  { row: 14, column: 8 },
  { row: 14, column: 7 },
  { row: 14, column: 6 },
  { row: 13, column: 6 },
  { row: 12, column: 6 },
  { row: 11, column: 6 },
  { row: 10, column: 6 },
  { row: 9, column: 6 },
  { row: 8, column: 5 },
  { row: 8, column: 4 },
  { row: 8, column: 3 },
  { row: 8, column: 2 },
  { row: 8, column: 1 },
  { row: 8, column: 0 },
  { row: 7, column: 0 },
  { row: 6, column: 0 },
]
const LUDO_PLAYER_DEFS = {
  red: {
    id: 'red',
    label: 'Red',
    short: 'R',
    startIndex: 0,
    pipTone: 'bg-rose-600',
    cellTone:
      'bg-gradient-to-br from-rose-500/26 via-red-500/18 to-orange-400/14',
    laneTone:
      'bg-[linear-gradient(145deg,rgba(159,18,57,0.8),rgba(153,27,27,0.72),rgba(154,52,18,0.64))]',
    tokenTone:
      'border-rose-300/45 bg-gradient-to-br from-rose-500 via-red-600 to-orange-500 text-white',
    summaryTone:
      'border-rose-300/35 bg-gradient-to-br from-rose-500/18 via-red-500/12 to-orange-400/12 text-ink',
    diceTone:
      'border-rose-300/40 bg-gradient-to-br from-rose-500/22 via-red-500/15 to-orange-400/16',
  },
  blue: {
    id: 'blue',
    label: 'Blue',
    short: 'B',
    startIndex: 13,
    pipTone: 'bg-sky-600',
    cellTone:
      'bg-gradient-to-br from-sky-500/24 via-cyan-500/18 to-blue-500/14',
    laneTone:
      'bg-[linear-gradient(145deg,rgba(3,105,161,0.82),rgba(8,145,178,0.72),rgba(30,64,175,0.66))]',
    tokenTone:
      'border-sky-300/45 bg-gradient-to-br from-sky-500 via-cyan-600 to-blue-600 text-white',
    summaryTone:
      'border-sky-300/35 bg-gradient-to-br from-sky-500/18 via-cyan-500/12 to-blue-500/12 text-ink',
    diceTone:
      'border-sky-300/40 bg-gradient-to-br from-sky-500/22 via-cyan-500/15 to-blue-500/16',
  },
  yellow: {
    id: 'yellow',
    label: 'Yellow',
    short: 'Y',
    startIndex: 26,
    pipTone: 'bg-amber-600',
    cellTone:
      'bg-gradient-to-br from-amber-300/30 via-yellow-300/22 to-orange-300/14',
    laneTone:
      'bg-[linear-gradient(145deg,rgba(180,83,9,0.76),rgba(202,138,4,0.7),rgba(161,98,7,0.64))]',
    tokenTone:
      'border-amber-200/55 bg-gradient-to-br from-amber-300 via-yellow-300 to-orange-300 text-slate-900',
    summaryTone:
      'border-amber-300/35 bg-gradient-to-br from-amber-300/18 via-yellow-300/14 to-orange-300/12 text-ink',
    diceTone:
      'border-amber-300/40 bg-gradient-to-br from-amber-300/24 via-yellow-300/18 to-orange-300/16',
  },
  green: {
    id: 'green',
    label: 'Green',
    short: 'G',
    startIndex: 39,
    pipTone: 'bg-emerald-600',
    cellTone:
      'bg-gradient-to-br from-emerald-500/24 via-green-500/18 to-teal-400/14',
    laneTone:
      'bg-[linear-gradient(145deg,rgba(5,150,105,0.82),rgba(22,163,74,0.72),rgba(13,148,136,0.64))]',
    tokenTone:
      'border-emerald-300/45 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-500 text-white',
    summaryTone:
      'border-emerald-300/35 bg-gradient-to-br from-emerald-500/18 via-green-500/12 to-teal-400/12 text-ink',
    diceTone:
      'border-emerald-300/40 bg-gradient-to-br from-emerald-500/22 via-green-500/15 to-teal-400/16',
  },
}
const LUDO_HOME_LANES = {
  red: [
    { row: 7, column: 1 },
    { row: 7, column: 2 },
    { row: 7, column: 3 },
    { row: 7, column: 4 },
    { row: 7, column: 5 },
  ],
  blue: [
    { row: 1, column: 7 },
    { row: 2, column: 7 },
    { row: 3, column: 7 },
    { row: 4, column: 7 },
    { row: 5, column: 7 },
  ],
  yellow: [
    { row: 7, column: 13 },
    { row: 7, column: 12 },
    { row: 7, column: 11 },
    { row: 7, column: 10 },
    { row: 7, column: 9 },
  ],
  green: [
    { row: 13, column: 7 },
    { row: 12, column: 7 },
    { row: 11, column: 7 },
    { row: 10, column: 7 },
    { row: 9, column: 7 },
  ],
}
const LUDO_BASE_SLOTS = {
  red: [
    { row: 2, column: 2 },
    { row: 2, column: 4 },
    { row: 4, column: 2 },
    { row: 4, column: 4 },
  ],
  blue: [
    { row: 2, column: 10 },
    { row: 2, column: 12 },
    { row: 4, column: 10 },
    { row: 4, column: 12 },
  ],
  yellow: [
    { row: 10, column: 10 },
    { row: 10, column: 12 },
    { row: 12, column: 10 },
    { row: 12, column: 12 },
  ],
  green: [
    { row: 10, column: 2 },
    { row: 10, column: 4 },
    { row: 12, column: 2 },
    { row: 12, column: 4 },
  ],
}
const LUDO_BASE_AREAS = {
  red: { rowStart: 0, rowEnd: 5, columnStart: 0, columnEnd: 5 },
  blue: { rowStart: 0, rowEnd: 5, columnStart: 9, columnEnd: 14 },
  yellow: { rowStart: 9, rowEnd: 14, columnStart: 9, columnEnd: 14 },
  green: { rowStart: 9, rowEnd: 14, columnStart: 0, columnEnd: 5 },
}
const LUDO_CLASSIC_TONES = {
  red: {
    color: '#ef1b24',
    base: 'bg-[#ef1b24]',
    lane: 'bg-[#ef1b24]',
    start: 'bg-[#ef1b24]',
    token: 'bg-[#ef1b24]',
    border: 'border-[#9f1118]',
  },
  green: {
    color: '#05a84f',
    base: 'bg-[#05a84f]',
    lane: 'bg-[#05a84f]',
    start: 'bg-[#05a84f]',
    token: 'bg-[#05a84f]',
    border: 'border-[#047338]',
  },
  yellow: {
    color: '#f7d719',
    base: 'bg-[#f7d719]',
    lane: 'bg-[#f7d719]',
    start: 'bg-[#f7d719]',
    token: 'bg-[#f7d719]',
    border: 'border-[#b69b00]',
  },
  blue: {
    color: '#27aeea',
    base: 'bg-[#27aeea]',
    lane: 'bg-[#27aeea]',
    start: 'bg-[#27aeea]',
    token: 'bg-[#27aeea]',
    border: 'border-[#157aa8]',
  },
}
const LUDO_DICE_DOCK_PLACEMENTS = {
  red: 'left-2 top-2 sm:left-4 sm:top-4',
  blue: 'right-2 top-2 sm:right-4 sm:top-4',
  yellow: 'bottom-2 right-2 sm:bottom-4 sm:right-4',
  green: 'bottom-2 left-2 sm:bottom-4 sm:left-4',
}
const LUDO_HOME_ARROW_BY_KEY = {
  '7-0': { Icon: ArrowRight, playerId: 'red' },
  '0-7': { Icon: ArrowDown, playerId: 'blue' },
  '7-14': { Icon: ArrowLeft, playerId: 'yellow' },
  '14-7': { Icon: ArrowUp, playerId: 'green' },
}
const LUDO_EXTRA_HOME_PATH_BY_KEY = {
  '7-0': 'red',
  '6-1': 'red',
  '7-6': 'red',
  '7-8': 'yellow',
  '8-13': 'yellow',
  '7-14': 'yellow',
  '0-7': 'blue',
  '1-8': 'blue',
  '6-7': 'blue',
  '8-7': 'green',
  '13-6': 'green',
  '14-7': 'green',
}
const LUDO_CLASSIC_HOME_PATH_BY_KEY = {
  ...[0, 1, 2, 3, 4, 5, 6].reduce((map, column) => {
    map[`7-${column}`] = 'red'
    return map
  }, {}),
  ...[8, 9, 10, 11, 12, 13, 14].reduce((map, column) => {
    map[`7-${column}`] = 'yellow'
    return map
  }, {}),
  ...[0, 1, 2, 3, 4, 5, 6].reduce((map, row) => {
    map[`${row}-7`] = 'blue'
    return map
  }, {}),
  ...[8, 9, 10, 11, 12, 13, 14].reduce((map, row) => {
    map[`${row}-7`] = 'green'
    return map
  }, {}),
}
const LUDO_CENTER_TRIANGLES = [
  {
    id: 'top',
    playerId: 'blue',
    clipPath: 'polygon(0 0, 100% 0, 50% 50%)',
  },
  {
    id: 'right',
    playerId: 'yellow',
    clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)',
  },
  {
    id: 'bottom',
    playerId: 'green',
    clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)',
  },
  {
    id: 'left',
    playerId: 'red',
    clipPath: 'polygon(0 0, 0 100%, 50% 50%)',
  },
]
const LUDO_VISUAL_MOVE_STEP_MS = 170
const LUDO_STACKED_TOKEN_POSITIONS = [
  { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' },
  { left: '36%', top: '36%', transform: 'translate(-50%, -50%)' },
  { left: '64%', top: '64%', transform: 'translate(-50%, -50%)' },
  { left: '64%', top: '36%', transform: 'translate(-50%, -50%)' },
  { left: '36%', top: '64%', transform: 'translate(-50%, -50%)' },
]
const LUDO_DEFAULT_CONTROLLERS = {
  red: 'human',
  blue: 'human',
  yellow: 'human',
  green: 'human',
}

const ludoTrackIndexByKey = LUDO_TRACK_COORDS.reduce((map, coordinate, index) => {
  map[`${coordinate.row}-${coordinate.column}`] = index
  return map
}, {})

const ludoBaseSlotByKey = Object.entries(LUDO_BASE_SLOTS).reduce(
  (map, [playerId, slots]) => {
    slots.forEach((slot, tokenIndex) => {
      map[`${slot.row}-${slot.column}`] = {
        playerId,
        tokenIndex,
      }
    })

    return map
  },
  {},
)

const ludoHomeLaneByKey = Object.entries(LUDO_HOME_LANES).reduce(
  (map, [playerId, cells]) => {
    cells.forEach((cell, laneIndex) => {
      map[`${cell.row}-${cell.column}`] = {
        playerId,
        laneIndex,
      }
    })

    return map
  },
  {},
)

const ludoBaseAreaByKey = Object.entries(LUDO_BASE_AREAS).reduce(
  (map, [playerId, area]) => {
    for (let row = area.rowStart; row <= area.rowEnd; row += 1) {
      for (let column = area.columnStart; column <= area.columnEnd; column += 1) {
        map[`${row}-${column}`] = playerId
      }
    }

    return map
  },
  {},
)

function getActiveLudoColorIds(playerCount) {
  return LUDO_PLAYER_COLOR_SETS[playerCount] ?? LUDO_PLAYER_COLOR_SETS[4]
}

function createInitialDiceValues() {
  return {
    red: 1,
    blue: 1,
    yellow: 1,
    green: 1,
  }
}

let ludoAudioContext = null

function getLudoAudioContext() {
  if (typeof window === 'undefined') {
    return null
  }

  const AudioContext = window.AudioContext || window.webkitAudioContext

  if (!AudioContext) {
    return null
  }

  if (!ludoAudioContext || ludoAudioContext.state === 'closed') {
    ludoAudioContext = new AudioContext()
  }

  if (ludoAudioContext.state === 'suspended') {
    ludoAudioContext.resume().catch(() => {})
  }

  return ludoAudioContext
}

function scheduleLudoTokenStepSound(audioContext, stepIndex, startTime) {
  const oscillator = audioContext.createOscillator()
  const snapOscillator = audioContext.createOscillator()
  const gain = audioContext.createGain()
  const snapGain = audioContext.createGain()

  oscillator.type = 'square'
  oscillator.frequency.setValueAtTime(520 + (stepIndex % 4) * 80, startTime)
  gain.gain.setValueAtTime(0.0001, startTime)
  gain.gain.exponentialRampToValueAtTime(0.34, startTime + 0.006)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.09)

  snapOscillator.type = 'triangle'
  snapOscillator.frequency.setValueAtTime(980 + (stepIndex % 2) * 140, startTime)
  snapGain.gain.setValueAtTime(0.0001, startTime)
  snapGain.gain.exponentialRampToValueAtTime(0.22, startTime + 0.004)
  snapGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04)

  oscillator.connect(gain)
  gain.connect(audioContext.destination)
  snapOscillator.connect(snapGain)
  snapGain.connect(audioContext.destination)
  oscillator.start(startTime)
  oscillator.stop(startTime + 0.1)
  snapOscillator.start(startTime)
  snapOscillator.stop(startTime + 0.045)
}

function playLudoDiceRollSound() {
  const audioContext = getLudoAudioContext()

  if (!audioContext) {
    return
  }

  try {
    const masterGain = audioContext.createGain()
    const compressor = audioContext.createDynamicsCompressor()
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.52, audioContext.sampleRate)
    const noiseData = noiseBuffer.getChannelData(0)

    for (let index = 0; index < noiseData.length; index += 1) {
      const fade = 1 - index / noiseData.length
      noiseData[index] = (Math.random() * 2 - 1) * fade * fade
    }

    const noise = audioContext.createBufferSource()
    const filter = audioContext.createBiquadFilter()
    const noiseGain = audioContext.createGain()
    noise.buffer = noiseBuffer
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1250, audioContext.currentTime)
    filter.Q.setValueAtTime(2.5, audioContext.currentTime)
    noiseGain.gain.setValueAtTime(0.0001, audioContext.currentTime)
    noiseGain.gain.exponentialRampToValueAtTime(0.82, audioContext.currentTime + 0.018)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.52)
    noise.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(masterGain)
    masterGain.gain.setValueAtTime(0.0001, audioContext.currentTime)
    masterGain.gain.exponentialRampToValueAtTime(0.72, audioContext.currentTime + 0.018)
    masterGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.72)
    compressor.threshold.setValueAtTime(-18, audioContext.currentTime)
    compressor.knee.setValueAtTime(18, audioContext.currentTime)
    compressor.ratio.setValueAtTime(8, audioContext.currentTime)
    compressor.attack.setValueAtTime(0.002, audioContext.currentTime)
    compressor.release.setValueAtTime(0.16, audioContext.currentTime)
    masterGain.connect(compressor)
    compressor.connect(audioContext.destination)
    noise.start(audioContext.currentTime)
    noise.stop(audioContext.currentTime + 0.52)

    for (let index = 0; index < 14; index += 1) {
      const oscillator = audioContext.createOscillator()
      const clickGain = audioContext.createGain()
      const startTime = audioContext.currentTime + index * 0.036

      oscillator.type = index % 2 ? 'square' : 'sawtooth'
      oscillator.frequency.setValueAtTime(260 + Math.random() * 820, startTime)
      clickGain.gain.setValueAtTime(0.0001, startTime)
      clickGain.gain.exponentialRampToValueAtTime(0.48, startTime + 0.005)
      clickGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.052)
      oscillator.connect(clickGain)
      clickGain.connect(masterGain)
      oscillator.start(startTime)
      oscillator.stop(startTime + 0.06)
    }
  } catch {
    // Audio playback can be blocked by browser policy; the dice roll still works.
  }
}

function playLudoTokenMoveSound(stepCount) {
  const audioContext = getLudoAudioContext()

  if (!audioContext || stepCount <= 0) {
    return
  }

  try {
    const stepSeconds = LUDO_VISUAL_MOVE_STEP_MS / 1000
    const firstStepTime = audioContext.currentTime + 0.012

    for (let index = 0; index < stepCount; index += 1) {
      scheduleLudoTokenStepSound(
        audioContext,
        index,
        firstStepTime + index * stepSeconds,
      )
    }
  } catch {
    // Movement audio is optional; token movement should never be blocked by sound.
  }
}

function createLudoPlayers(playerCount, controllerMap) {
  return getActiveLudoColorIds(playerCount).map((playerId) => ({
    ...LUDO_PLAYER_DEFS[playerId],
    controller: controllerMap[playerId] ?? 'human',
    tokens: Array.from({ length: 4 }, (_, tokenIndex) => ({
      id: `${playerId}-${tokenIndex}`,
      tokenIndex,
      progress: -1,
    })),
  }))
}

function getInitialLudoMessage(players) {
  const openingPlayer = players[0]

  if (!openingPlayer) {
    return 'Choose a player setup to begin.'
  }

  return openingPlayer.controller === 'ai'
    ? `${openingPlayer.label} AI will roll first.`
    : `Click ${openingPlayer.label}'s dice to start the round.`
}

function createInitialLudoState(playerCount, controllerMap) {
  const players = createLudoPlayers(playerCount, controllerMap)

  return {
    players,
    currentPlayerIndex: 0,
    currentRoll: null,
    legalMoves: [],
    lastRoll: null,
    moveCount: 0,
    winner: null,
    placements: [],
    latestPlacement: null,
    roundComplete: false,
    turnSixCount: 0,
    message: getInitialLudoMessage(players),
  }
}

function getLudoPlacementLabel(rank) {
  return LUDO_PLACEMENT_LABELS[rank] ?? `${rank}th`
}

function getLudoPlacementTarget(playerTotal) {
  return Math.min(Math.max(playerTotal - 1, 1), 3)
}

function getLudoTrackIndex(player, progress) {
  if (progress < 0 || progress > LUDO_LAST_TRACK_PROGRESS) {
    return null
  }

  return (player.startIndex + progress) % LUDO_TRACK_COORDS.length
}

function getFinishedTokenCount(player) {
  return player.tokens.filter((token) => token.progress === LUDO_FINAL_PROGRESS).length
}

function getLudoTrackOccupants(players, trackIndex) {
  const occupants = []

  players.forEach((player, playerIndex) => {
    player.tokens.forEach((token) => {
      if (getLudoTrackIndex(player, token.progress) === trackIndex) {
        occupants.push({
          playerId: player.id,
          playerIndex,
          tokenIndex: token.tokenIndex,
        })
      }
    })
  })

  return occupants
}

function getNextLudoPlayerIndex(players, currentIndex) {
  let nextIndex = currentIndex

  do {
    nextIndex = (nextIndex + 1) % players.length
  } while (
    getFinishedTokenCount(players[nextIndex]) === players[nextIndex].tokens.length &&
    nextIndex !== currentIndex
  )

  return nextIndex
}

function createSingleLudoMove(players, playerIndex, tokenIndex, roll) {
  const player = players[playerIndex]
  const token = player.tokens[tokenIndex]

  if (token.progress === LUDO_FINAL_PROGRESS) {
    return null
  }

  let nextProgress

  if (token.progress === -1) {
    if (roll !== 6) {
      return null
    }

    nextProgress = 0
  } else {
    nextProgress = token.progress + roll

    if (nextProgress > LUDO_FINAL_PROGRESS) {
      return null
    }
  }

  const landingTrackIndex = getLudoTrackIndex(player, nextProgress)
  let captures = []

  if (landingTrackIndex !== null) {
    const occupants = getLudoTrackOccupants(players, landingTrackIndex).filter(
      (occupant) =>
        !(
          occupant.playerId === player.id &&
          occupant.tokenIndex === token.tokenIndex
        ),
    )

    if (!LUDO_SAFE_TRACK_INDICES.has(landingTrackIndex)) {
      const opponentStacks = occupants
        .filter((occupant) => occupant.playerId !== player.id)
        .reduce((stacks, occupant) => {
          stacks[occupant.playerId] = [
            ...(stacks[occupant.playerId] ?? []),
            occupant,
          ]
          return stacks
        }, {})

      if (Object.values(opponentStacks).some((stack) => stack.length > 1)) {
        return null
      }

      captures = occupants.filter((occupant) => occupant.playerId !== player.id)
    }
  }

  return {
    playerId: player.id,
    playerIndex,
    tokenIndex,
    from: token.progress,
    to: nextProgress,
    roll,
    captures,
    enters: token.progress === -1,
    reachesHomeLane:
      token.progress >= 0 &&
      token.progress <= LUDO_LAST_TRACK_PROGRESS &&
      nextProgress > LUDO_LAST_TRACK_PROGRESS,
    finishes: nextProgress === LUDO_FINAL_PROGRESS,
  }
}

function getLegalLudoMoves(players, playerIndex, roll) {
  return players[playerIndex].tokens.reduce((moves, token) => {
    const nextMove = createSingleLudoMove(
      players,
      playerIndex,
      token.tokenIndex,
      roll,
    )

    if (nextMove) {
      moves.push(nextMove)
    }

    return moves
  }, [])
}

function resolveLudoRoll(currentState, roll) {
  const activePlayer = currentState.players[currentState.currentPlayerIndex]
  const nextSixCount = roll === 6 ? currentState.turnSixCount + 1 : 0

  if (nextSixCount === 3) {
    return {
      ...currentState,
      currentPlayerIndex: getNextLudoPlayerIndex(
        currentState.players,
        currentState.currentPlayerIndex,
      ),
      currentRoll: null,
      legalMoves: [],
      lastRoll: roll,
      latestPlacement: null,
      moveCount: currentState.moveCount + 1,
      turnSixCount: 0,
      message: `${activePlayer.label} rolled three 6s in a row, so the turn passes on.`,
    }
  }

  const legalMoves = getLegalLudoMoves(
    currentState.players,
    currentState.currentPlayerIndex,
    roll,
  )

  if (!legalMoves.length) {
    return {
      ...currentState,
      currentPlayerIndex: getNextLudoPlayerIndex(
        currentState.players,
        currentState.currentPlayerIndex,
      ),
      currentRoll: null,
      legalMoves: [],
      lastRoll: roll,
      latestPlacement: null,
      moveCount: currentState.moveCount + 1,
      turnSixCount: 0,
      message: `${activePlayer.label} rolled ${roll}, but no token can move.`,
    }
  }

  return {
    ...currentState,
    currentRoll: roll,
    legalMoves,
    lastRoll: roll,
    latestPlacement: null,
    moveCount: currentState.moveCount + 1,
    turnSixCount: nextSixCount,
    message:
      activePlayer.controller === 'ai'
        ? `${activePlayer.label} rolled ${roll}. AI is choosing the best token.`
        : `${activePlayer.label} rolled ${roll}. Choose one of the highlighted tokens.`,
  }
}

function applyLudoMove(currentState, move) {
  const nextPlayers = currentState.players.map((player) => ({
    ...player,
    tokens: player.tokens.map((token) => ({ ...token })),
  }))
  const movedPlayer = nextPlayers[move.playerIndex]
  const movedToken = movedPlayer.tokens[move.tokenIndex]

  movedToken.progress = move.to

  move.captures.forEach((capture) => {
    nextPlayers[capture.playerIndex].tokens[capture.tokenIndex].progress = -1
  })

  const playerFinished =
    getFinishedTokenCount(movedPlayer) === movedPlayer.tokens.length
  const alreadyPlaced = currentState.placements.includes(movedPlayer.id)
  const placements = playerFinished && !alreadyPlaced
    ? [...currentState.placements, movedPlayer.id]
    : currentState.placements
  const latestPlacement =
    playerFinished && !alreadyPlaced
      ? {
          playerId: movedPlayer.id,
          rank: placements.length,
          label: getLudoPlacementLabel(placements.length),
        }
      : null
  const winner =
    currentState.winner ??
    (latestPlacement?.rank === 1 ? movedPlayer.id : null)
  const roundComplete =
    placements.length >= getLudoPlacementTarget(nextPlayers.length)
  const getsBonusTurn =
    !latestPlacement &&
    !roundComplete &&
    (currentState.currentRoll === 6 || move.captures.length > 0 || move.finishes)
  const nextPlayerIndex = roundComplete
    ? currentState.currentPlayerIndex
    : latestPlacement
      ? getNextLudoPlayerIndex(nextPlayers, currentState.currentPlayerIndex)
    : getsBonusTurn
      ? currentState.currentPlayerIndex
      : getNextLudoPlayerIndex(nextPlayers, currentState.currentPlayerIndex)
  const message = latestPlacement
    ? roundComplete
      ? `${movedPlayer.label} takes ${latestPlacement.label} place. Round standings are settled.`
      : `${movedPlayer.label} takes ${latestPlacement.label} place. The battle continues for the next spot.`
    : move.captures.length
      ? `${movedPlayer.label} captured a token and keeps the turn.`
      : move.finishes
        ? `${movedPlayer.label} brought token ${move.tokenIndex + 1} home and rolls again.`
        : move.enters
          ? `${movedPlayer.label} entered token ${move.tokenIndex + 1} onto the board.`
          : getsBonusTurn
            ? `${movedPlayer.label} moved token ${move.tokenIndex + 1} and keeps the turn.`
            : `${movedPlayer.label} moved token ${move.tokenIndex + 1}.`

  return {
    ...currentState,
    players: nextPlayers,
    currentPlayerIndex: nextPlayerIndex,
    currentRoll: null,
    legalMoves: [],
    latestPlacement,
    placements,
    roundComplete,
    winner,
    turnSixCount: getsBonusTurn && currentState.currentRoll === 6 ? currentState.turnSixCount : 0,
    message,
  }
}

function createLudoVisualProgressSequence(move) {
  if (move.from === -1) {
    return [0]
  }

  const sequence = []

  for (let progress = move.from + 1; progress <= move.to; progress += 1) {
    sequence.push(progress)
  }

  return sequence
}

function createLudoPlayersWithVisualProgress(players, move, progress) {
  return players.map((player, playerIndex) => {
    if (playerIndex !== move.playerIndex) {
      return player
    }

    return {
      ...player,
      tokens: player.tokens.map((token) =>
        token.tokenIndex === move.tokenIndex
          ? {
              ...token,
              progress,
            }
          : token,
      ),
    }
  })
}

function chooseBestLudoAiMove(currentState) {
  const activePlayer = currentState.players[currentState.currentPlayerIndex]

  return [...currentState.legalMoves]
    .map((move) => {
      const landingTrackIndex = getLudoTrackIndex(activePlayer, move.to)
      let score = move.to

      if (move.finishes) {
        score += 120
      }

      if (move.captures.length) {
        score += 90 + move.captures.length * 12
      }

      if (move.enters) {
        score += 28
      }

      if (landingTrackIndex !== null && LUDO_SAFE_TRACK_INDICES.has(landingTrackIndex)) {
        score += 10
      }

      if (move.from === -1 && move.roll === 6) {
        score += 8
      }

      return {
        move,
        score,
      }
    })
    .sort((firstOption, secondOption) => secondOption.score - firstOption.score)[0]?.move
}

function isLudoBaseInnerCell(row, column, playerId) {
  const innerBounds = {
    red: { rowStart: 1, rowEnd: 4, columnStart: 1, columnEnd: 4 },
    blue: { rowStart: 1, rowEnd: 4, columnStart: 10, columnEnd: 13 },
    yellow: { rowStart: 10, rowEnd: 13, columnStart: 10, columnEnd: 13 },
    green: { rowStart: 10, rowEnd: 13, columnStart: 1, columnEnd: 4 },
  }[playerId]

  return (
    innerBounds &&
    row >= innerBounds.rowStart &&
    row <= innerBounds.rowEnd &&
    column >= innerBounds.columnStart &&
    column <= innerBounds.columnEnd
  )
}

function isLudoCenterBlock(row, column) {
  return row >= 6 && row <= 8 && column >= 6 && column <= 8
}

function getLudoColor(playerId) {
  return LUDO_CLASSIC_TONES[playerId]?.color ?? '#ffffff'
}

function getLudoCellBackgroundColor({
  baseAreaOwnerId,
  classicHomePathPlayerId,
  extraHomePathPlayerId,
  homeLanePlayerId,
  isBaseInner,
  isCenterBlock,
  isHomeArrowCell,
  isPathCell,
  trackIndex,
}) {
  if (isCenterBlock) {
    return 'transparent'
  }

  if (isHomeArrowCell) {
    return '#ffffff'
  }

  if (classicHomePathPlayerId) {
    return getLudoColor(classicHomePathPlayerId)
  }

  if (homeLanePlayerId) {
    return getLudoColor(homeLanePlayerId)
  }

  if (extraHomePathPlayerId) {
    return getLudoColor(extraHomePathPlayerId)
  }

  if (isBaseInner || isPathCell || trackIndex !== undefined) {
    return '#ffffff'
  }

  if (baseAreaOwnerId) {
    return getLudoColor(baseAreaOwnerId)
  }

  return '#ffffff'
}

function LudoMetric({ label, value, hint }) {
  return (
    <div className="rounded-[1.25rem] border border-line bg-[color:var(--portfolio-glass-soft)] px-4 py-3 shadow-[var(--portfolio-soft-shadow)]">
      <p className={cardLabelClassName}>{label}</p>
      <p className="mt-2 font-display text-[1.55rem] leading-none tracking-[-0.05em] text-ink">
        {value}
      </p>
      <p className="mt-1 text-xs leading-6 text-muted">{hint}</p>
    </div>
  )
}

function LudoToken({ player, tokenIndex, isMovable, onClick, compact = false }) {
  const interactiveProps =
    typeof onClick === 'function'
      ? {
          onClick,
        }
      : {}

  return (
    <button
      className={cx(
        'relative inline-flex items-end justify-center bg-transparent transition duration-200',
        compact
          ? 'h-[clamp(0.82rem,3.4vw,1.48rem)] w-[clamp(0.72rem,3vw,1.18rem)]'
          : 'h-[clamp(1.05rem,4.6vw,2.05rem)] w-[clamp(0.9rem,4vw,1.65rem)]',
        isMovable &&
          '-translate-y-0.5 scale-[1.08] animate-[bounce_1.2s_ease-in-out_infinite] drop-shadow-[0_0_16px_rgba(255,255,255,0.22)]',
      )}
      title={`${player.label} token ${tokenIndex + 1}`}
      type="button"
      {...interactiveProps}
    >
      <span className="pointer-events-none relative block h-full w-full drop-shadow-[0_4px_5px_rgba(15,23,42,0.38)]">
        <span
          className="absolute left-1/2 top-[1%] h-[72%] w-[74%] -translate-x-1/2 rounded-[55%_55%_55%_55%/62%_62%_42%_42%] border border-slate-500/35 bg-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_2px_4px_rgba(15,23,42,0.28)]"
          style={{ clipPath: 'polygon(50% 100%, 10% 54%, 14% 18%, 50% 0, 86% 18%, 90% 54%)' }}
        />
        <span
          className={cx(
            'absolute left-1/2 top-[13%] h-[34%] w-[44%] -translate-x-1/2 rounded-full border border-slate-700/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.35)]',
            LUDO_CLASSIC_TONES[player.id]?.token,
          )}
        />
      </span>
      <span className="sr-only">{`${player.label} token ${tokenIndex + 1}`}</span>
    </button>
  )
}

function LudoDie({
  player,
  value,
  isRolling,
  canRoll,
  onRoll,
  compact = false,
  isActiveTurn = false,
}) {
  const pips = LUDO_DICE_PIPS[value] ?? LUDO_DICE_PIPS[1]
  const sizeClassName = compact
    ? 'h-[clamp(1.65rem,6.2vw,2.35rem)] w-[clamp(1.65rem,6.2vw,2.35rem)] rounded-[clamp(0.34rem,0.85vw,0.52rem)]'
    : 'h-14 w-14 rounded-[0.58rem] sm:h-16 sm:w-16'

  return (
    <button
      aria-label={`${player.label} die showing ${value}`}
      type="button"
      className={cx(
        'group relative inline-grid shrink-0 place-items-center border-0 bg-transparent p-0 outline-none transition duration-200',
        sizeClassName,
        canRoll
          ? 'pointer-events-auto hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
          : isActiveTurn
            ? 'pointer-events-none cursor-default'
            : 'pointer-events-none cursor-default opacity-75',
        isActiveTurn &&
          !isRolling &&
          'z-10 scale-[1.06] shadow-[0_0_0_3px_rgba(255,255,255,0.18),0_14px_28px_rgba(15,23,42,0.18)] before:absolute before:inset-[-0.26rem] before:rounded-[inherit] before:border before:border-white/35 before:content-[""] before:animate-ping',
        isRolling && 'scale-[1.08] -rotate-6 animate-[pulse_0.48s_ease-in-out_infinite] shadow-[0_18px_34px_rgba(15,23,42,0.22)]',
      )}
      disabled={!canRoll}
      onClick={onRoll}
    >
      <span
        className={cx(
          'relative grid h-full w-full grid-cols-3 grid-rows-3 rounded-[inherit] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(241,245,249,0.96)_55%,rgba(226,232,240,0.95))] shadow-[0_8px_18px_rgba(15,23,42,0.12),inset_0_1px_4px_rgba(255,255,255,0.78),inset_0_-5px_10px_rgba(148,163,184,0.2)] transition duration-200',
          compact
            ? 'gap-[clamp(0.05rem,0.18vw,0.12rem)] p-[clamp(0.24rem,0.68vw,0.38rem)]'
            : 'gap-1 p-2',
          canRoll && 'group-hover:shadow-[0_12px_22px_rgba(15,23,42,0.16),inset_0_1px_4px_rgba(255,255,255,0.78),inset_0_-5px_10px_rgba(148,163,184,0.2)]',
        )}
      >
        {Array.from({ length: 9 }, (_, index) => (
          <span
            className={cx(
              'self-center justify-self-center rounded-full transition duration-150',
              compact
                ? 'h-[clamp(0.22rem,0.78vw,0.38rem)] w-[clamp(0.22rem,0.78vw,0.38rem)]'
                : 'h-2.5 w-2.5',
              pips.includes(index)
                ? `${player.pipTone} shadow-[0_1px_3px_rgba(15,23,42,0.25)]`
                : 'opacity-0',
            )}
            key={`pip-${player.id}-${value}-${index}`}
          />
        ))}
      </span>
    </button>
  )
}

function LudoDiceDock({
  activePlayer,
  diceValues,
  gameState,
  handleRollClick,
  player,
  rollingPlayerId,
}) {
  const canRoll =
    !gameState.roundComplete &&
    !gameState.currentRoll &&
    !rollingPlayerId &&
    activePlayer?.id === player.id &&
    player.controller === 'human'
  const isActiveTurn = !gameState.roundComplete && activePlayer?.id === player.id

  return (
    <div
      className={cx(
        'absolute z-20 flex items-center gap-1.5 rounded-[0.78rem] border border-yellow-300/80 bg-[#1f4aa9]/92 p-1 shadow-[0_12px_20px_rgba(15,23,42,0.24)] backdrop-blur-md sm:gap-2 sm:p-1.5',
        LUDO_DICE_DOCK_PLACEMENTS[player.id],
        isActiveTurn && 'ring-2 ring-yellow-300',
      )}
    >
      <span
        className={cx(
          'inline-flex h-9 w-9 items-center justify-center rounded-[0.45rem] border-2 bg-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.85)] transition duration-200 sm:h-10 sm:w-10',
          LUDO_CLASSIC_TONES[player.id]?.border,
          isActiveTurn && 'z-10 -translate-y-1 scale-110 shadow-[0_10px_18px_rgba(15,23,42,0.28),inset_0_2px_4px_rgba(255,255,255,0.85)]',
        )}
      >
        <LudoToken
          isMovable={isActiveTurn}
          player={player}
          tokenIndex={0}
        />
      </span>

      <LudoDie
        canRoll={canRoll}
        isActiveTurn={isActiveTurn}
        isRolling={rollingPlayerId === player.id}
        onRoll={() => handleRollClick(player.id)}
        player={player}
        value={diceValues[player.id]}
      />
    </div>
  )
}

function LudoGame() {
  const [playerCount, setPlayerCount] = useState(2)
  const [controllerMap, setControllerMap] = useState(LUDO_DEFAULT_CONTROLLERS)
  const [scoreboard, setScoreboard] = useState({
    red: 0,
    blue: 0,
    yellow: 0,
    green: 0,
  })
  const [diceValues, setDiceValues] = useState(createInitialDiceValues)
  const [rollingPlayerId, setRollingPlayerId] = useState(null)
  const [moveFeedback, setMoveFeedback] = useState('')
  const [gameState, setGameState] = useState(() =>
    createInitialLudoState(2, LUDO_DEFAULT_CONTROLLERS),
  )
  const [visualPlayers, setVisualPlayers] = useState(null)
  const [animatingMoveKey, setAnimatingMoveKey] = useState('')
  const [celebration, setCelebration] = useState(null)
  const rollIntervalRef = useRef(null)
  const settleTimeoutRef = useRef(null)
  const celebrationTimeoutRef = useRef(null)
  const visualMoveTimersRef = useRef([])

  const activePlayer = gameState.players[gameState.currentPlayerIndex]
  const renderedPlayers = visualPlayers ?? gameState.players
  const activeColorIds = getActiveLudoColorIds(playerCount)
  const placementTarget = getLudoPlacementTarget(gameState.players.length)
  const finishedPlayers = renderedPlayers.filter(
    (player) => getFinishedTokenCount(player) === player.tokens.length,
  )
  const baseTokenByCell = {}
  const trackTokensByCell = {}
  const homeTokensByCell = {}
  const centerTokens = []

  renderedPlayers.forEach((player) => {
    player.tokens.forEach((token) => {
      if (token.progress === -1) {
        const baseSlot = LUDO_BASE_SLOTS[player.id][token.tokenIndex]
        baseTokenByCell[`${baseSlot.row}-${baseSlot.column}`] = {
          player,
          tokenIndex: token.tokenIndex,
        }
        return
      }

      if (token.progress === LUDO_FINAL_PROGRESS) {
        centerTokens.push({
          player,
          tokenIndex: token.tokenIndex,
        })
        return
      }

      if (token.progress <= LUDO_LAST_TRACK_PROGRESS) {
        const trackCoordinate =
          LUDO_TRACK_COORDS[getLudoTrackIndex(player, token.progress)]
        const key = `${trackCoordinate.row}-${trackCoordinate.column}`

        trackTokensByCell[key] = [
          ...(trackTokensByCell[key] ?? []),
          {
            player,
            tokenIndex: token.tokenIndex,
          },
        ]
        return
      }

      const homeCoordinate = LUDO_HOME_LANES[player.id][token.progress - 51]
      const key = `${homeCoordinate.row}-${homeCoordinate.column}`

      homeTokensByCell[key] = [
        ...(homeTokensByCell[key] ?? []),
        {
          player,
          tokenIndex: token.tokenIndex,
        },
      ]
    })
  })

  const clearRollTimers = () => {
    window.clearInterval(rollIntervalRef.current)
    window.clearTimeout(settleTimeoutRef.current)
  }

  const clearVisualMoveTimers = () => {
    visualMoveTimersRef.current.forEach((timerId) => window.clearTimeout(timerId))
    visualMoveTimersRef.current = []
  }

  const clearCelebrationTimer = () => {
    window.clearTimeout(celebrationTimeoutRef.current)
  }

  const recordWinner = (winnerId) => {
    if (!winnerId) {
      return
    }

    setScoreboard((currentScoreboard) => ({
      ...currentScoreboard,
      [winnerId]: currentScoreboard[winnerId] + 1,
    }))
  }

  const resetRound = (nextPlayerCount = playerCount, nextControllerMap = controllerMap) => {
    clearRollTimers()
    clearVisualMoveTimers()
    clearCelebrationTimer()
    setRollingPlayerId(null)
    setVisualPlayers(null)
    setAnimatingMoveKey('')
    setMoveFeedback('')
    setCelebration(null)
    setDiceValues(createInitialDiceValues())
    setGameState(createInitialLudoState(nextPlayerCount, nextControllerMap))
  }

  const settleRollForPlayer = (playerId, roll, stateSnapshot) => {
    const player = stateSnapshot.players[stateSnapshot.currentPlayerIndex]

    if (!player || player.id !== playerId) {
      return
    }

    const nextState = resolveLudoRoll(stateSnapshot, roll)

    setDiceValues((currentValues) => ({
      ...currentValues,
      [playerId]: roll,
    }))
    setRollingPlayerId(null)
    setMoveFeedback('')

    if (
      player.controller === 'human' &&
      nextState.currentRoll &&
      nextState.legalMoves.length === 1
    ) {
      commitMove(nextState.legalMoves[0], nextState)
      return
    }

    setGameState(nextState)
  }

  const startRollForPlayer = (playerId, stateSnapshot) => {
    if (rollingPlayerId || stateSnapshot.roundComplete || stateSnapshot.currentRoll) {
      return
    }

    clearRollTimers()
    playLudoDiceRollSound()
    setRollingPlayerId(playerId)
    setMoveFeedback('')

    rollIntervalRef.current = window.setInterval(() => {
      setDiceValues((currentValues) => ({
        ...currentValues,
        [playerId]: Math.floor(Math.random() * 6) + 1,
      }))
    }, 90)

    settleTimeoutRef.current = window.setTimeout(() => {
      clearRollTimers()
      settleRollForPlayer(playerId, Math.floor(Math.random() * 6) + 1, stateSnapshot)
    }, 880)
  }

  const commitMove = (move, stateSnapshot) => {
    const nextState = applyLudoMove(stateSnapshot, move)
    const visualSequence = createLudoVisualProgressSequence(move)
    const moveKey = `${move.playerId}-${move.tokenIndex}`

    clearVisualMoveTimers()
    setMoveFeedback('')
    setAnimatingMoveKey(moveKey)
    setVisualPlayers(stateSnapshot.players)
    playLudoTokenMoveSound(visualSequence.length)

    visualSequence.forEach((progress, index) => {
      const timerId = window.setTimeout(() => {
        setVisualPlayers(
          createLudoPlayersWithVisualProgress(
            stateSnapshot.players,
            move,
            progress,
          ),
        )
      }, index * LUDO_VISUAL_MOVE_STEP_MS)

      visualMoveTimersRef.current.push(timerId)
    })

    const settleTimerId = window.setTimeout(() => {
      setVisualPlayers(null)
      setAnimatingMoveKey('')
      setGameState(nextState)

      if (nextState.latestPlacement?.rank === 1) {
        recordWinner(nextState.latestPlacement.playerId)
      }
    }, Math.max(visualSequence.length, 1) * LUDO_VISUAL_MOVE_STEP_MS + 80)

    visualMoveTimersRef.current.push(settleTimerId)
  }

  useEffect(() => {
    return () => {
      clearRollTimers()
      clearVisualMoveTimers()
      clearCelebrationTimer()
    }
  }, [])

  useEffect(() => {
    if (
      !activePlayer ||
      gameState.roundComplete ||
      gameState.currentRoll ||
      rollingPlayerId ||
      animatingMoveKey
    ) {
      return undefined
    }

    if (activePlayer.controller !== 'ai') {
      return undefined
    }

    const timerId = window.setTimeout(() => {
      startRollForPlayer(activePlayer.id, gameState)
    }, 720)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [activePlayer, animatingMoveKey, gameState, rollingPlayerId])

  useEffect(() => {
    if (
      !activePlayer ||
      gameState.roundComplete ||
      !gameState.currentRoll ||
      rollingPlayerId ||
      animatingMoveKey
    ) {
      return undefined
    }

    if (activePlayer.controller !== 'ai') {
      return undefined
    }

    const timerId = window.setTimeout(() => {
      const aiMove = chooseBestLudoAiMove(gameState)

      if (aiMove) {
        commitMove(aiMove, gameState)
      }
    }, 680)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [activePlayer, animatingMoveKey, gameState, rollingPlayerId])

  useEffect(() => {
    if (!gameState.latestPlacement) {
      return undefined
    }

    const placedPlayer =
      gameState.players.find(
        (player) => player.id === gameState.latestPlacement.playerId,
      ) ?? LUDO_PLAYER_DEFS[gameState.latestPlacement.playerId]

    setCelebration({
      ...gameState.latestPlacement,
      player: placedPlayer,
      message:
        gameState.latestPlacement.rank === 1
          ? `${placedPlayer.label} claims 1st place!`
          : `${placedPlayer.label} secures ${gameState.latestPlacement.label} place!`,
    })

    clearCelebrationTimer()
    celebrationTimeoutRef.current = window.setTimeout(() => {
      setCelebration(null)
    }, 2200)

    return () => {
      clearCelebrationTimer()
    }
  }, [gameState.latestPlacement, gameState.players])

  const handleRollClick = (playerId) => {
    if (!activePlayer || activePlayer.id !== playerId) {
      return
    }

    if (
      activePlayer.controller !== 'human' ||
      gameState.roundComplete ||
      gameState.currentRoll ||
      rollingPlayerId ||
      animatingMoveKey
    ) {
      return
    }

    startRollForPlayer(playerId, gameState)
  }

  const handleTokenClick = (playerId, tokenIndex) => {
    if (!activePlayer || activePlayer.controller !== 'human' || animatingMoveKey) {
      return
    }

    if (!gameState.currentRoll || playerId !== activePlayer.id) {
      return
    }

    const matchingMove = gameState.legalMoves.find(
      (move) => move.playerId === playerId && move.tokenIndex === tokenIndex,
    )

    if (!matchingMove) {
      setMoveFeedback('That token cannot move for the current dice roll.')
      return
    }

    commitMove(matchingMove, gameState)
  }

  const handlePlayerCountChange = (nextPlayerCount) => {
    setPlayerCount(nextPlayerCount)
    resetRound(nextPlayerCount, controllerMap)
  }

  const handleControllerChange = (playerId, nextController) => {
    const nextControllerMap = {
      ...controllerMap,
      [playerId]: nextController,
    }

    setControllerMap(nextControllerMap)
    resetRound(playerCount, nextControllerMap)
  }

  const isTokenMovable = (token) =>
    animatingMoveKey === `${token.player.id}-${token.tokenIndex}` ||
    gameState.legalMoves.some(
      (move) =>
        move.playerId === token.player.id &&
        move.tokenIndex === token.tokenIndex &&
        activePlayer?.controller === 'human',
    )

  const renderLudoTokenStack = (tokens, cellKey, options = {}) => {
    const { allowClick = true, compact = tokens.length > 1 } = options

    if (!tokens.length) {
      return null
    }

    if (tokens.length === 1) {
      const token = tokens[0]

      return (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <LudoToken
            compact={compact}
            isMovable={isTokenMovable(token)}
            key={`${token.player.id}-${token.tokenIndex}-${cellKey}`}
            onClick={
              allowClick
                ? () => handleTokenClick(token.player.id, token.tokenIndex)
                : undefined
            }
            player={token.player}
            tokenIndex={token.tokenIndex}
          />
        </div>
      )
    }

    return (
      <div className="absolute inset-0 z-20">
        {tokens.map((token, index) => {
          const tokenIsMovable = isTokenMovable(token)
          const position =
            LUDO_STACKED_TOKEN_POSITIONS[index] ??
            LUDO_STACKED_TOKEN_POSITIONS[LUDO_STACKED_TOKEN_POSITIONS.length - 1]

          return (
            <span
              className="absolute flex items-center justify-center"
              key={`${token.player.id}-${token.tokenIndex}-${cellKey}`}
              style={{
                ...position,
                zIndex: tokenIsMovable ? 30 + index : 10 + index,
              }}
            >
              <LudoToken
                compact
                isMovable={tokenIsMovable}
                onClick={
                  allowClick
                    ? () => handleTokenClick(token.player.id, token.tokenIndex)
                    : undefined
                }
                player={token.player}
                tokenIndex={token.tokenIndex}
              />
            </span>
          )
        })}
      </div>
    )
  }

  const currentTurnSummary = activePlayer
    ? `${activePlayer.label} ${activePlayer.controller === 'ai' ? 'AI' : 'player'}`
    : '--'
  const turnHint = gameState.roundComplete
    ? 'Top placements are settled for this round.'
    : activePlayer?.controller === 'ai'
      ? rollingPlayerId === activePlayer?.id
        ? `${activePlayer.label} AI is rolling the die.`
        : gameState.currentRoll
          ? 'AI is choosing the strongest token move.'
          : `${activePlayer?.label} AI will roll automatically.`
      : gameState.currentRoll
        ? 'Tap one of the highlighted tokens on the board.'
        : `Tap ${activePlayer?.label}'s dice panel to roll.`
  const placementByPlayerId = gameState.placements.reduce((placementMap, playerId, index) => {
    placementMap[playerId] = getLudoPlacementLabel(index + 1)
    return placementMap
  }, {})

  if (gameState.roundComplete) {
    gameState.players
      .filter((player) => !placementByPlayerId[player.id])
      .forEach((player, index) => {
        placementByPlayerId[player.id] = getLudoPlacementLabel(
          gameState.placements.length + index + 1,
        )
      })
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <LudoMetric
          hint="Current turn owner"
          label="Active turn"
          value={gameState.roundComplete ? 'Standings settled' : currentTurnSummary}
        />
        <LudoMetric
          hint="Most recent dice result"
          label="Last roll"
          value={gameState.lastRoll ?? '--'}
        />
        <LudoMetric
          hint="Placements decided this round"
          label="Standings"
          value={`${gameState.placements.length}/${placementTarget}`}
        />
      </div>

      <div className="grid gap-5 2xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] 2xl:items-start">
        <div className="grid gap-4 rounded-[1.55rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-4 shadow-[var(--portfolio-soft-shadow)] sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div>
              <p className={cardLabelClassName}>Classic Ludo</p>
              <h4 className="mt-2 font-display text-[1.7rem] leading-[1.05] tracking-[-0.04em] text-ink">
                Four-token race with local and AI players
              </h4>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className={chipClassName}>
                <Users size={14} />
                {playerCount} players
              </span>
              <span className={chipClassName}>Exact home finish</span>
              <span className={chipClassName}>Each player has a die</span>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <div className="relative mx-auto w-full max-w-[50rem] rounded-[1.4rem] border border-slate-900/20 bg-[radial-gradient(circle_at_18%_12%,rgba(46,115,255,0.3),transparent_28%),radial-gradient(circle_at_82%_82%,rgba(14,165,233,0.22),transparent_30%),linear-gradient(145deg,#0c1d48,#163b8f)] p-12 shadow-[0_24px_48px_rgba(15,23,42,0.28)] sm:p-16">
              {celebration ? (
                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(15,23,42,0.08),transparent_62%)]" />
                  <span
                    className={cx(
                      'absolute left-[14%] top-[18%] h-20 w-20 rounded-full blur-2xl animate-pulse',
                      celebration.player.cellTone,
                    )}
                  />
                  <span
                    className={cx(
                      'absolute right-[12%] top-[24%] h-16 w-16 rounded-full blur-2xl animate-pulse',
                      celebration.player.cellTone,
                    )}
                  />
                  <span
                    className={cx(
                      'absolute bottom-[16%] left-[20%] h-16 w-16 rounded-full blur-2xl animate-pulse',
                      celebration.player.cellTone,
                    )}
                  />
                  <div
                    className={cx(
                      'relative mx-4 flex max-w-[20rem] flex-col items-center gap-2 rounded-[1.6rem] border px-5 py-4 text-center shadow-[0_30px_60px_rgba(15,23,42,0.22)] backdrop-blur-md animate-[bounce_1.1s_ease-in-out_2]',
                      celebration.player.summaryTone,
                    )}
                  >
                    <span className="absolute inset-[-18px] rounded-[1.9rem] border border-white/18 animate-ping" />
                    <span className={cardLabelClassName}>Board Celebration</span>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/14 text-white shadow-[var(--portfolio-soft-shadow)]">
                      <Trophy size={22} />
                    </span>
                    <p className="font-display text-[1.45rem] leading-[1.05] tracking-[-0.04em] text-ink">
                      {celebration.message}
                    </p>
                    <p className="text-sm leading-6 text-muted">
                      {celebration.rank === placementTarget
                        ? 'This round ranking is complete.'
                        : `${placementTarget - celebration.rank} placement${placementTarget - celebration.rank === 1 ? '' : 's'} still to decide.`}
                    </p>
                  </div>
                </div>
              ) : null}
              {gameState.players.map((player) => (
                <LudoDiceDock
                  activePlayer={activePlayer}
                  diceValues={diceValues}
                  gameState={gameState}
                  handleRollClick={handleRollClick}
                  key={`dice-dock-${player.id}`}
                  player={player}
                  rollingPlayerId={rollingPlayerId}
                />
              ))}

              <div className="relative grid overflow-hidden rounded-[1.05rem] border-[3px] border-slate-800 bg-white shadow-[0_12px_24px_rgba(15,23,42,0.25)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute z-10 overflow-hidden border border-slate-400/70 bg-white"
                  style={{
                    height: '20%',
                    left: '40%',
                    top: '40%',
                    width: '20%',
                  }}
                >
                  {LUDO_CENTER_TRIANGLES.map((triangle) => (
                    <span
                      className="absolute inset-0"
                      key={`center-triangle-${triangle.id}`}
                      style={{
                        backgroundColor: getLudoColor(triangle.playerId),
                        clipPath: triangle.clipPath,
                      }}
                    />
                  ))}
                </div>
                {Array.from({ length: 15 }, (_, rowIndex) => (
                  <div
                    className="grid grid-cols-[repeat(15,minmax(0,1fr))]"
                    key={`ludo-row-${rowIndex}`}
                  >
                    {Array.from({ length: 15 }, (_, columnIndex) => {
                      const key = `${rowIndex}-${columnIndex}`
                      const trackIndex = ludoTrackIndexByKey[key]
                      const baseSlotInfo = ludoBaseSlotByKey[key]
                      const homeLaneInfo = ludoHomeLaneByKey[key]
                      const homeArrow = LUDO_HOME_ARROW_BY_KEY[key]
                      const HomeArrowIcon = homeArrow?.Icon
                      const extraHomePathPlayerId = LUDO_EXTRA_HOME_PATH_BY_KEY[key]
                      const classicHomePathPlayerId = LUDO_CLASSIC_HOME_PATH_BY_KEY[key]
                      const baseAreaOwnerId = ludoBaseAreaByKey[key]
                      const baseAreaOwner = baseAreaOwnerId
                        ? LUDO_PLAYER_DEFS[baseAreaOwnerId]
                        : null
                      const slotOwner = baseSlotInfo
                        ? gameState.players.find(
                            (player) => player.id === baseSlotInfo.playerId,
                          ) ?? LUDO_PLAYER_DEFS[baseSlotInfo.playerId]
                        : null
                      const homeLaneOwner = homeLaneInfo
                        ? LUDO_PLAYER_DEFS[homeLaneInfo.playerId]
                        : null
                      const classicHomePathOwner = classicHomePathPlayerId
                        ? LUDO_PLAYER_DEFS[classicHomePathPlayerId]
                        : null
                      const tokens = baseSlotInfo
                        ? baseTokenByCell[key]
                          ? [baseTokenByCell[key]]
                          : []
                        : trackTokensByCell[key] ??
                          homeTokensByCell[key] ??
                          (rowIndex === 7 && columnIndex === 7 ? centerTokens : [])
                      const isCenter = rowIndex === 7 && columnIndex === 7
                      const isCenterBlock = isLudoCenterBlock(rowIndex, columnIndex)
                      const isBaseInner =
                        baseAreaOwnerId &&
                        isLudoBaseInnerCell(rowIndex, columnIndex, baseAreaOwnerId)
                      const isPathCell =
                        trackIndex !== undefined ||
                        Boolean(homeLaneInfo) ||
                        Boolean(extraHomePathPlayerId) ||
                        Boolean(classicHomePathOwner) ||
                        isCenter ||
                        isCenterBlock
                      const isSafeTrack =
                        trackIndex !== undefined && LUDO_SAFE_TRACK_INDICES.has(trackIndex)
                      const cellBackgroundColor = getLudoCellBackgroundColor({
                        baseAreaOwnerId,
                        classicHomePathPlayerId,
                        extraHomePathPlayerId,
                        homeLanePlayerId: homeLaneInfo?.playerId,
                        isBaseInner,
                        isCenterBlock,
                        isHomeArrowCell: Boolean(HomeArrowIcon),
                        isPathCell,
                        trackIndex,
                      })

                      let cellClassName =
                        'relative aspect-square min-w-0 overflow-visible border border-slate-400/55'

                      if (baseAreaOwner) {
                        cellClassName = cx(
                          cellClassName,
                          'border-transparent shadow-[inset_0_0_0_999px_rgba(255,255,255,0.01)]',
                        )
                      }

                      if (isBaseInner) {
                        cellClassName = cx(
                          cellClassName,
                          'border-white shadow-[inset_0_0_0_1px_rgba(15,23,42,0.03)]',
                        )
                      }

                      if (isPathCell) {
                        cellClassName = cx(
                          cellClassName,
                          'border-slate-400/70',
                        )
                      }

                      if (homeLaneOwner || classicHomePathOwner) {
                        cellClassName = cx(
                          cellClassName,
                          'shadow-[inset_0_0_0_999px_rgba(255,255,255,0.02)]',
                        )
                      }

                      return (
                        <div
                          className={cellClassName}
                          key={key}
                          style={{ backgroundColor: cellBackgroundColor }}
                        >
                          {isSafeTrack ? (
                            <span
                              className={cx(
                                'pointer-events-none absolute text-slate-400 drop-shadow-[0_1px_1px_rgba(255,255,255,0.75)]',
                                tokens.length
                                  ? 'right-1 top-1'
                                  : 'inset-0 flex items-center justify-center',
                              )}
                            >
                              <Star
                                fill="currentColor"
                                size={tokens.length ? 8 : 12}
                              />
                            </span>
                          ) : null}

                          {HomeArrowIcon ? (
                            <span
                              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
                              style={{ color: getLudoColor(homeArrow.playerId) }}
                            >
                              <HomeArrowIcon
                                size={18}
                                strokeWidth={2.8}
                                className="drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]"
                              />
                            </span>
                          ) : null}

                          {isCenter ? (
                            <div className="relative h-full w-full">
                              {tokens.length ? (
                                renderLudoTokenStack(tokens, `center-${key}`, {
                                  allowClick: false,
                                })
                              ) : finishedPlayers.length ? (
                                <span className="absolute inset-0 inline-flex items-center justify-center text-white/90">
                                  <Trophy size={18} />
                                </span>
                              ) : null}
                            </div>
                          ) : baseSlotInfo && slotOwner ? (
                            <div className="flex h-full w-full items-center justify-center">
                              <span
                                className={cx(
                                  'inline-flex h-[72%] w-[72%] rounded-full border-2 shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)]',
                                  LUDO_CLASSIC_TONES[baseAreaOwner?.id]?.token ?? 'bg-white',
                                  LUDO_CLASSIC_TONES[baseAreaOwner?.id]?.border ?? 'border-slate-300',
                                )}
                              />
                              {tokens.length ? (
                                renderLudoTokenStack(tokens, key)
                              ) : null}
                            </div>
                          ) : tokens.length ? (
                            renderLudoTokenStack(tokens, key)
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <div className="flex items-center justify-between gap-4">
              <p className={cardLabelClassName}>Setup</p>
              <span className={chipClassName}>Classic rules</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {LUDO_PLAYER_COUNT_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={cx(
                    'rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 hover:-translate-y-0.5',
                    playerCount === option
                      ? 'border-[color:var(--portfolio-glass-border-strong)] bg-[color:var(--portfolio-glass-strong)] text-ink shadow-[var(--portfolio-soft-shadow)]'
                      : 'border-line bg-[color:var(--portfolio-glass-inline)] text-muted hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)] hover:text-ink',
                  )}
                  onClick={() => handlePlayerCountChange(option)}
                >
                  {option} players
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-3">
              {activeColorIds.map((playerId) => {
                const player = LUDO_PLAYER_DEFS[playerId]

                return (
                  <div
                    className={cx(
                      'rounded-[1rem] border px-4 py-3 shadow-[var(--portfolio-soft-shadow)]',
                      player.summaryTone,
                    )}
                    key={`controller-${playerId}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={cx(
                            'inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-black uppercase shadow-[var(--portfolio-soft-shadow)]',
                            player.tokenTone,
                          )}
                        >
                          {player.short}
                        </span>
                        <div>
                          <p className="font-medium text-ink">{player.label}</p>
                          <p className="text-xs text-muted">Human or AI control</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {['human', 'ai'].map((mode) => (
                          <button
                            key={`${playerId}-${mode}`}
                            type="button"
                            className={cx(
                              'rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition duration-200',
                              controllerMap[playerId] === mode
                                ? 'border-[color:var(--portfolio-glass-border-strong)] bg-[color:var(--portfolio-glass-strong)] text-ink shadow-[var(--portfolio-soft-shadow)]'
                                : 'border-line bg-[color:var(--portfolio-glass-inline)] text-muted hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)] hover:text-ink',
                            )}
                            onClick={() => handleControllerChange(playerId, mode)}
                          >
                            {mode === 'ai' ? <Bot size={12} className="inline" /> : null}{' '}
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <p className={cardLabelClassName}>Round status</p>
            <p className="mt-3 text-base leading-8 text-muted">{gameState.message}</p>
            {moveFeedback ? (
              <div className="mt-4 rounded-[1rem] border border-amber-300/35 bg-amber-300/10 px-4 py-3">
                <p className={cardLabelClassName}>Move note</p>
                <p className="mt-2 text-sm leading-7 text-ink">{moveFeedback}</p>
              </div>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-3">
              <span className={chipClassName}>
                Need 6 to leave base
              </span>
              <span className={chipClassName}>
                Exact roll to reach home
              </span>
              <span className={chipClassName}>
                Safe squares are star marked
              </span>
              <span className={chipClassName}>
                {gameState.placements.length}/{placementTarget} places decided
              </span>
              <span className={chipClassName}>
                {turnHint}
              </span>
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <div className="flex items-center justify-between gap-4">
              <p className={cardLabelClassName}>Scoreboard</p>
              <span className={chipClassName}>Wins by color</span>
            </div>

            <div className="mt-4 grid gap-3">
              {gameState.players.map((player) => (
                <div
                  className={cx(
                    'rounded-[1rem] border px-4 py-3 shadow-[var(--portfolio-soft-shadow)]',
                    player.summaryTone,
                  )}
                  key={`score-${player.id}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={cx(
                          'inline-flex h-9 w-9 items-center justify-center rounded-full border text-xs font-black uppercase shadow-[var(--portfolio-soft-shadow)]',
                          player.tokenTone,
                        )}
                      >
                        {player.short}
                      </span>
                      <span className="font-medium text-ink">{player.label}</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <span className={chipClassName}>{scoreboard[player.id]} wins</span>
                      <span className={chipClassName}>
                        {placementByPlayerId[player.id]
                          ? `${placementByPlayerId[player.id]} place`
                          : 'In play'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className={cx(buttonClassNames.secondary, 'w-full sm:w-auto')}
              onClick={() => resetRound()}
            >
              <RotateCcw size={18} />
              New round
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LudoGame
