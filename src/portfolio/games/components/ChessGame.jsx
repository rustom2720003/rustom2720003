import { useEffect, useState } from 'react'
import { Bot, Crown, RotateCcw } from 'lucide-react'
import {
  buttonClassNames,
  cardLabelClassName,
  chipClassName,
  cx,
} from '../../classes'

const CHESS_BOARD_SIZE = 8
const CHESS_FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const CHESS_RANKS = ['8', '7', '6', '5', '4', '3', '2', '1']
const CHESS_PIECE_VALUES = {
  pawn: 1,
  knight: 3,
  bishop: 3.25,
  rook: 5,
  queen: 9,
  king: 200,
}
const CHESS_PIECE_LABELS = {
  pawn: 'Pawn',
  knight: 'Knight',
  bishop: 'Bishop',
  rook: 'Rook',
  queen: 'Queen',
  king: 'King',
}
const CHESS_COLOR_LABELS = {
  white: 'White',
  black: 'Black',
}
const CHESS_PIECE_SYMBOLS = {
  white: {
    king: '\u2654',
    queen: '\u2655',
    rook: '\u2656',
    bishop: '\u2657',
    knight: '\u2658',
    pawn: '\u2659',
  },
  black: {
    king: '\u265A',
    queen: '\u265B',
    rook: '\u265C',
    bishop: '\u265D',
    knight: '\u265E',
    pawn: '\u265F',
  },
}
const CHESS_PIECE_FONT_FAMILY =
  '"Segoe UI Symbol","Noto Sans Symbols 2","Noto Sans Symbols","Arial Unicode MS",sans-serif'
const CHESS_PIECE_TOKEN_CLASSNAMES = {
  white:
    'border-white/75 bg-gradient-to-br from-white via-slate-100 to-slate-200 text-slate-900 shadow-[0_12px_26px_rgba(148,163,184,0.24)]',
  black:
    'border-slate-400/65 bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 text-slate-950 shadow-[0_12px_26px_rgba(15,23,42,0.2)]',
}
const CHESS_KNIGHT_OFFSETS = [
  { row: -2, col: -1 },
  { row: -2, col: 1 },
  { row: -1, col: -2 },
  { row: -1, col: 2 },
  { row: 1, col: -2 },
  { row: 1, col: 2 },
  { row: 2, col: -1 },
  { row: 2, col: 1 },
]
const CHESS_KING_OFFSETS = [
  { row: -1, col: -1 },
  { row: -1, col: 0 },
  { row: -1, col: 1 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
  { row: 1, col: -1 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
]
const CHESS_BISHOP_DIRECTIONS = [
  { row: -1, col: -1 },
  { row: -1, col: 1 },
  { row: 1, col: -1 },
  { row: 1, col: 1 },
]
const CHESS_ROOK_DIRECTIONS = [
  { row: -1, col: 0 },
  { row: 1, col: 0 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
]
const CHESS_QUEEN_DIRECTIONS = [
  ...CHESS_BISHOP_DIRECTIONS,
  ...CHESS_ROOK_DIRECTIONS,
]

function createChessPiece(type, color) {
  return {
    type,
    color,
    hasMoved: false,
  }
}

function createInitialChessBoard() {
  const board = Array.from({ length: CHESS_BOARD_SIZE }, () =>
    Array(CHESS_BOARD_SIZE).fill(null),
  )
  const backRank = [
    'rook',
    'knight',
    'bishop',
    'queen',
    'king',
    'bishop',
    'knight',
    'rook',
  ]

  backRank.forEach((type, columnIndex) => {
    board[0][columnIndex] = createChessPiece(type, 'black')
    board[7][columnIndex] = createChessPiece(type, 'white')
  })

  for (let columnIndex = 0; columnIndex < CHESS_BOARD_SIZE; columnIndex += 1) {
    board[1][columnIndex] = createChessPiece('pawn', 'black')
    board[6][columnIndex] = createChessPiece('pawn', 'white')
  }

  return board
}

function createInitialChessState() {
  return {
    board: createInitialChessBoard(),
    currentTurn: 'white',
    selectedSquare: null,
    legalMoves: [],
    status: 'playing',
    winner: null,
    inCheck: false,
    aiThinking: false,
    lastMove: null,
    moveCount: 0,
    capturedByWhite: [],
    capturedByBlack: [],
  }
}

function cloneChessBoard(board) {
  return board.map((row) =>
    row.map((piece) => (piece ? { ...piece } : null)),
  )
}

function isInsideChessBoard(row, column) {
  return (
    row >= 0 &&
    row < CHESS_BOARD_SIZE &&
    column >= 0 &&
    column < CHESS_BOARD_SIZE
  )
}

function getOpponentColor(color) {
  return color === 'white' ? 'black' : 'white'
}

function getChessSquareName(row, column) {
  return `${CHESS_FILES[column]}${CHESS_RANKS[row]}`
}

function getChessPieceName(piece) {
  return CHESS_PIECE_LABELS[piece.type].toLowerCase()
}

function isSameChessSquare(firstSquare, secondSquare) {
  return (
    firstSquare?.row === secondSquare?.row &&
    firstSquare?.column === secondSquare?.column
  )
}

function isSameChessMoveTarget(move, targetSquare) {
  return move.row === targetSquare.row && move.column === targetSquare.column
}

function findChessPathBlocker(board, fromSquare, toSquare) {
  const rowStep = Math.sign(toSquare.row - fromSquare.row)
  const columnStep = Math.sign(toSquare.column - fromSquare.column)
  let row = fromSquare.row + rowStep
  let column = fromSquare.column + columnStep

  while (row !== toSquare.row || column !== toSquare.column) {
    const piece = board[row][column]

    if (piece) {
      return {
        piece,
        square: { row, column },
      }
    }

    row += rowStep
    column += columnStep
  }

  return null
}

function collectDirectionalChessMoves(board, row, column, piece, directions) {
  const moves = []

  directions.forEach((direction) => {
    let nextRow = row + direction.row
    let nextColumn = column + direction.col

    while (isInsideChessBoard(nextRow, nextColumn)) {
      const targetPiece = board[nextRow][nextColumn]

      if (!targetPiece) {
        moves.push({ row: nextRow, column: nextColumn })
      } else {
        if (targetPiece.color !== piece.color) {
          moves.push({ row: nextRow, column: nextColumn })
        }

        break
      }

      nextRow += direction.row
      nextColumn += direction.col
    }
  })

  return moves
}

function findChessKing(board, color) {
  for (let rowIndex = 0; rowIndex < CHESS_BOARD_SIZE; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < CHESS_BOARD_SIZE; columnIndex += 1) {
      const piece = board[rowIndex][columnIndex]

      if (piece?.type === 'king' && piece.color === color) {
        return { row: rowIndex, column: columnIndex }
      }
    }
  }

  return null
}

function getPseudoChessMoves(board, row, column, options = {}) {
  const piece = board[row][column]

  if (!piece) {
    return []
  }

  const { forAttack = false } = options

  if (piece.type === 'pawn') {
    const moves = []
    const direction = piece.color === 'white' ? -1 : 1
    const startRow = piece.color === 'white' ? 6 : 1
    const promotionRow = piece.color === 'white' ? 0 : 7

    if (forAttack) {
      ;[-1, 1].forEach((columnDelta) => {
        const nextRow = row + direction
        const nextColumn = column + columnDelta

        if (isInsideChessBoard(nextRow, nextColumn)) {
          moves.push({ row: nextRow, column: nextColumn })
        }
      })

      return moves
    }

    const oneStepRow = row + direction

    if (isInsideChessBoard(oneStepRow, column) && !board[oneStepRow][column]) {
      moves.push({
        row: oneStepRow,
        column,
        promotion: oneStepRow === promotionRow ? 'queen' : null,
      })

      const twoStepRow = row + direction * 2

      if (row === startRow && !board[twoStepRow][column]) {
        moves.push({
          row: twoStepRow,
          column,
        })
      }
    }

    ;[-1, 1].forEach((columnDelta) => {
      const nextRow = row + direction
      const nextColumn = column + columnDelta

      if (!isInsideChessBoard(nextRow, nextColumn)) {
        return
      }

      const targetPiece = board[nextRow][nextColumn]

      if (targetPiece && targetPiece.color !== piece.color) {
        moves.push({
          row: nextRow,
          column: nextColumn,
          promotion: nextRow === promotionRow ? 'queen' : null,
        })
      }
    })

    return moves
  }

  if (piece.type === 'knight') {
    return CHESS_KNIGHT_OFFSETS.reduce((moves, offset) => {
      const nextRow = row + offset.row
      const nextColumn = column + offset.col

      if (!isInsideChessBoard(nextRow, nextColumn)) {
        return moves
      }

      const targetPiece = board[nextRow][nextColumn]

      if (!targetPiece || targetPiece.color !== piece.color) {
        moves.push({ row: nextRow, column: nextColumn })
      }

      return moves
    }, [])
  }

  if (piece.type === 'bishop') {
    return collectDirectionalChessMoves(
      board,
      row,
      column,
      piece,
      CHESS_BISHOP_DIRECTIONS,
    )
  }

  if (piece.type === 'rook') {
    return collectDirectionalChessMoves(
      board,
      row,
      column,
      piece,
      CHESS_ROOK_DIRECTIONS,
    )
  }

  if (piece.type === 'queen') {
    return collectDirectionalChessMoves(
      board,
      row,
      column,
      piece,
      CHESS_QUEEN_DIRECTIONS,
    )
  }

  if (piece.type === 'king') {
    const moves = CHESS_KING_OFFSETS.reduce((nextMoves, offset) => {
      const nextRow = row + offset.row
      const nextColumn = column + offset.col

      if (!isInsideChessBoard(nextRow, nextColumn)) {
        return nextMoves
      }

      const targetPiece = board[nextRow][nextColumn]

      if (!targetPiece || targetPiece.color !== piece.color) {
        nextMoves.push({ row: nextRow, column: nextColumn })
      }

      return nextMoves
    }, [])

    if (forAttack || piece.hasMoved) {
      return moves
    }

    const opponentColor = getOpponentColor(piece.color)

    if (isSquareUnderChessAttack(board, row, column, opponentColor)) {
      return moves
    }

    const kingsideRook = board[row][7]

    if (
      kingsideRook?.type === 'rook' &&
      kingsideRook.color === piece.color &&
      !kingsideRook.hasMoved &&
      !board[row][5] &&
      !board[row][6] &&
      !isSquareUnderChessAttack(board, row, 5, opponentColor) &&
      !isSquareUnderChessAttack(board, row, 6, opponentColor)
    ) {
      moves.push({
        row,
        column: 6,
        special: 'castle-kingside',
      })
    }

    const queensideRook = board[row][0]

    if (
      queensideRook?.type === 'rook' &&
      queensideRook.color === piece.color &&
      !queensideRook.hasMoved &&
      !board[row][1] &&
      !board[row][2] &&
      !board[row][3] &&
      !isSquareUnderChessAttack(board, row, 2, opponentColor) &&
      !isSquareUnderChessAttack(board, row, 3, opponentColor)
    ) {
      moves.push({
        row,
        column: 2,
        special: 'castle-queenside',
      })
    }

    return moves
  }

  return []
}

function isSquareUnderChessAttack(board, row, column, attackerColor) {
  for (let rowIndex = 0; rowIndex < CHESS_BOARD_SIZE; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < CHESS_BOARD_SIZE; columnIndex += 1) {
      const piece = board[rowIndex][columnIndex]

      if (!piece || piece.color !== attackerColor) {
        continue
      }

      const moves = getPseudoChessMoves(board, rowIndex, columnIndex, {
        forAttack: true,
      })

      if (moves.some((move) => move.row === row && move.column === column)) {
        return true
      }
    }
  }

  return false
}

function isChessKingInCheck(board, color) {
  const kingSquare = findChessKing(board, color)

  if (!kingSquare) {
    return true
  }

  return isSquareUnderChessAttack(
    board,
    kingSquare.row,
    kingSquare.column,
    getOpponentColor(color),
  )
}

function applyChessMove(board, fromSquare, move) {
  const nextBoard = cloneChessBoard(board)
  const movingPiece = nextBoard[fromSquare.row][fromSquare.column]
  const capturedPiece = nextBoard[move.row][move.column]

  nextBoard[fromSquare.row][fromSquare.column] = null

  if (move.special === 'castle-kingside') {
    nextBoard[move.row][move.column] = {
      ...movingPiece,
      hasMoved: true,
    }
    nextBoard[move.row][5] = {
      ...nextBoard[move.row][7],
      hasMoved: true,
    }
    nextBoard[move.row][7] = null
  } else if (move.special === 'castle-queenside') {
    nextBoard[move.row][move.column] = {
      ...movingPiece,
      hasMoved: true,
    }
    nextBoard[move.row][3] = {
      ...nextBoard[move.row][0],
      hasMoved: true,
    }
    nextBoard[move.row][0] = null
  } else {
    nextBoard[move.row][move.column] = {
      ...movingPiece,
      type: move.promotion ?? movingPiece.type,
      hasMoved: true,
    }
  }

  return {
    board: nextBoard,
    capturedPiece: capturedPiece ? { ...capturedPiece } : null,
    movedPiece: nextBoard[move.row][move.column],
    lastMove: {
      from: fromSquare,
      to: { row: move.row, column: move.column },
      piece: movingPiece.type,
      color: movingPiece.color,
      special: move.special ?? null,
      promoted: Boolean(move.promotion),
      captured: Boolean(capturedPiece),
    },
  }
}

function getLegalChessMovesForSquare(board, row, column) {
  const piece = board[row][column]

  if (!piece) {
    return []
  }

  return getPseudoChessMoves(board, row, column).filter((move) => {
    const nextBoard = applyChessMove(board, { row, column }, move).board
    return !isChessKingInCheck(nextBoard, piece.color)
  })
}

function getAllLegalChessMoves(board, color) {
  const moves = []

  for (let rowIndex = 0; rowIndex < CHESS_BOARD_SIZE; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < CHESS_BOARD_SIZE; columnIndex += 1) {
      const piece = board[rowIndex][columnIndex]

      if (!piece || piece.color !== color) {
        continue
      }

      const legalMoves = getLegalChessMovesForSquare(board, rowIndex, columnIndex)

      legalMoves.forEach((move) => {
        moves.push({
          from: { row: rowIndex, column: columnIndex },
          move,
          piece,
        })
      })
    }
  }

  return moves
}

function evaluateChessBoard(board) {
  let score = 0

  for (let rowIndex = 0; rowIndex < CHESS_BOARD_SIZE; rowIndex += 1) {
    for (let columnIndex = 0; columnIndex < CHESS_BOARD_SIZE; columnIndex += 1) {
      const piece = board[rowIndex][columnIndex]

      if (!piece) {
        continue
      }

      const baseValue = CHESS_PIECE_VALUES[piece.type]
      const filePressure = 3.5 - Math.abs(3.5 - columnIndex)
      const rankPressure = 3.5 - Math.abs(3.5 - rowIndex)
      const centerBonus = (filePressure + rankPressure) * 0.04
      const developmentBonus =
        piece.type === 'pawn'
          ? piece.color === 'black'
            ? rowIndex * 0.03
            : (7 - rowIndex) * 0.03
          : !piece.hasMoved
            ? 0
            : 0.08
      const signedValue =
        (baseValue + centerBonus + developmentBonus) *
        (piece.color === 'black' ? 1 : -1)

      score += signedValue
    }
  }

  return score
}

function minimaxChess(board, depth, color, alpha, beta) {
  const legalMoves = getAllLegalChessMoves(board, color)

  if (!legalMoves.length) {
    if (isChessKingInCheck(board, color)) {
      return color === 'black' ? -10000 - depth : 10000 + depth
    }

    return 0
  }

  if (depth === 0) {
    return evaluateChessBoard(board)
  }

  if (color === 'black') {
    let bestScore = -Infinity

    for (const option of legalMoves) {
      const nextBoard = applyChessMove(board, option.from, option.move).board
      const score = minimaxChess(nextBoard, depth - 1, 'white', alpha, beta)

      bestScore = Math.max(bestScore, score)
      alpha = Math.max(alpha, bestScore)

      if (beta <= alpha) {
        break
      }
    }

    return bestScore
  }

  let bestScore = Infinity

  for (const option of legalMoves) {
    const nextBoard = applyChessMove(board, option.from, option.move).board
    const score = minimaxChess(nextBoard, depth - 1, 'black', alpha, beta)

    bestScore = Math.min(bestScore, score)
    beta = Math.min(beta, bestScore)

    if (beta <= alpha) {
      break
    }
  }

  return bestScore
}

function chooseChessAiMove(board) {
  const legalMoves = getAllLegalChessMoves(board, 'black')

  if (!legalMoves.length) {
    return null
  }

  let bestScore = -Infinity
  let bestMoves = []

  for (const option of legalMoves) {
    const appliedMove = applyChessMove(board, option.from, option.move)
    const strategicBonus =
      (appliedMove.capturedPiece
        ? CHESS_PIECE_VALUES[appliedMove.capturedPiece.type] * 0.12
        : 0) +
      (isChessKingInCheck(appliedMove.board, 'white') ? 0.25 : 0)
    const score =
      minimaxChess(appliedMove.board, 1, 'white', -Infinity, Infinity) +
      strategicBonus

    if (score > bestScore + 0.001) {
      bestScore = score
      bestMoves = [option]
    } else if (Math.abs(score - bestScore) <= 0.001) {
      bestMoves.push(option)
    }
  }

  return bestMoves[Math.floor(Math.random() * bestMoves.length)]
}

function getChessMaterialEdge(capturedByWhite, capturedByBlack) {
  const whiteGain = capturedByWhite.reduce(
    (total, piece) => total + CHESS_PIECE_VALUES[piece.type],
    0,
  )
  const blackGain = capturedByBlack.reduce(
    (total, piece) => total + CHESS_PIECE_VALUES[piece.type],
    0,
  )
  const edge = whiteGain - blackGain

  if (edge === 0) {
    return 'Level'
  }

  return edge > 0 ? `White +${edge}` : `Black +${Math.abs(edge)}`
}

function getChessCastleInvalidReason(board, fromSquare, toSquare, piece) {
  const castleSide = toSquare.column > fromSquare.column ? 'kingside' : 'queenside'
  const rookColumn = castleSide === 'kingside' ? 7 : 0
  const pathColumns =
    castleSide === 'kingside' ? [5, 6] : [1, 2, 3]
  const kingTravelColumns =
    castleSide === 'kingside' ? [5, 6] : [3, 2]
  const rook = board[fromSquare.row][rookColumn]
  const opponentColor = getOpponentColor(piece.color)

  if (piece.hasMoved) {
    return 'Castling is not allowed because the king has already moved.'
  }

  if (!rook || rook.type !== 'rook' || rook.color !== piece.color) {
    return `Castling on the ${castleSide} is not available because the rook is not in place.`
  }

  if (rook.hasMoved) {
    return `Castling on the ${castleSide} is not allowed because that rook has already moved.`
  }

  if (isSquareUnderChessAttack(board, fromSquare.row, fromSquare.column, opponentColor)) {
    return 'You cannot castle while your king is in check.'
  }

  const blockedColumn = pathColumns.find(
    (column) => board[fromSquare.row][column],
  )

  if (blockedColumn !== undefined) {
    return `Castling on the ${castleSide} requires the path to be clear, but ${getChessSquareName(fromSquare.row, blockedColumn)} is occupied.`
  }

  const attackedColumn = kingTravelColumns.find((column) =>
    isSquareUnderChessAttack(board, fromSquare.row, column, opponentColor),
  )

  if (attackedColumn !== undefined) {
    return `You cannot castle through or into check because ${getChessSquareName(fromSquare.row, attackedColumn)} is under attack.`
  }

  return `Castling on the ${castleSide} is not legal from this position.`
}

function getChessLineBlockReason(board, fromSquare, toSquare) {
  const blocker = findChessPathBlocker(board, fromSquare, toSquare)

  if (!blocker) {
    return null
  }

  return `${CHESS_COLOR_LABELS[blocker.piece.color]} ${getChessPieceName(blocker.piece)} at ${getChessSquareName(blocker.square.row, blocker.square.column)} is blocking the path.`
}

function describeInvalidSelectedChessMove(board, fromSquare, toSquare) {
  const piece = board[fromSquare.row][fromSquare.column]

  if (!piece) {
    return 'Select one of your pieces first.'
  }

  const targetPiece = board[toSquare.row][toSquare.column]
  const rowDiff = toSquare.row - fromSquare.row
  const columnDiff = toSquare.column - fromSquare.column
  const absoluteRowDiff = Math.abs(rowDiff)
  const absoluteColumnDiff = Math.abs(columnDiff)

  if (piece.type === 'king' && rowDiff === 0 && absoluteColumnDiff === 2) {
    return getChessCastleInvalidReason(board, fromSquare, toSquare, piece)
  }

  if (targetPiece?.color === piece.color) {
    return `You cannot move to ${getChessSquareName(toSquare.row, toSquare.column)} because your own ${getChessPieceName(targetPiece)} is already there.`
  }

  if (piece.type === 'pawn') {
    const direction = piece.color === 'white' ? -1 : 1
    const startRow = piece.color === 'white' ? 6 : 1

    if (columnDiff === 0) {
      if (rowDiff === direction) {
        if (targetPiece) {
          return 'Pawns move straight only into empty squares.'
        }
      } else if (rowDiff === direction * 2) {
        if (fromSquare.row !== startRow) {
          return 'A pawn can move two squares only from its starting rank.'
        }

        const middleRow = fromSquare.row + direction

        if (board[middleRow][fromSquare.column]) {
          return `That pawn is blocked by a piece at ${getChessSquareName(middleRow, fromSquare.column)}.`
        }

        if (targetPiece) {
          return 'The destination square must be empty for a two-square pawn move.'
        }
      } else if (rowDiff * direction < 0) {
        return 'Pawns cannot move backward.'
      } else {
        return 'Pawns move straight ahead one square, or two squares from their starting rank.'
      }
    } else if (absoluteColumnDiff === 1 && rowDiff === direction) {
      if (!targetPiece) {
        return 'Pawns capture diagonally only when an opponent piece is on that square.'
      }
    } else if (rowDiff * direction < 0) {
      return 'Pawns cannot move backward.'
    } else {
      return 'Pawns move straight ahead and capture one square diagonally.'
    }
  }

  if (piece.type === 'knight') {
    if (
      !(
        (absoluteRowDiff === 2 && absoluteColumnDiff === 1) ||
        (absoluteRowDiff === 1 && absoluteColumnDiff === 2)
      )
    ) {
      return 'Knights move in an L shape: two squares in one direction and one in the other.'
    }
  }

  if (piece.type === 'bishop') {
    if (absoluteRowDiff !== absoluteColumnDiff) {
      return 'Bishops move diagonally.'
    }

    const blockReason = getChessLineBlockReason(board, fromSquare, toSquare)

    if (blockReason) {
      return blockReason
    }
  }

  if (piece.type === 'rook') {
    if (rowDiff !== 0 && columnDiff !== 0) {
      return 'Rooks move horizontally or vertically.'
    }

    const blockReason = getChessLineBlockReason(board, fromSquare, toSquare)

    if (blockReason) {
      return blockReason
    }
  }

  if (piece.type === 'queen') {
    if (
      rowDiff !== 0 &&
      columnDiff !== 0 &&
      absoluteRowDiff !== absoluteColumnDiff
    ) {
      return 'Queens move horizontally, vertically, or diagonally.'
    }

    const blockReason = getChessLineBlockReason(board, fromSquare, toSquare)

    if (blockReason) {
      return blockReason
    }
  }

  if (piece.type === 'king' && Math.max(absoluteRowDiff, absoluteColumnDiff) > 1) {
    return 'Kings move one square in any direction, unless they are castling.'
  }

  const matchingPseudoMove = getPseudoChessMoves(
    board,
    fromSquare.row,
    fromSquare.column,
  ).find((move) => isSameChessMoveTarget(move, toSquare))

  if (matchingPseudoMove) {
    const nextBoard = applyChessMove(board, fromSquare, matchingPseudoMove).board

    if (isChessKingInCheck(nextBoard, piece.color)) {
      return piece.type === 'king'
        ? 'The king cannot move into check.'
        : 'That move would leave your king in check.'
    }
  }

  return `That move is not legal for this ${getChessPieceName(piece)}.`
}

function describeInvalidChessClick(gameState, row, column) {
  const piece = gameState.board[row][column]

  if (!gameState.selectedSquare) {
    if (!piece) {
      return `Select one of the ${CHESS_COLOR_LABELS[gameState.currentTurn].toLowerCase()} pieces first.`
    }

    if (piece.color !== gameState.currentTurn) {
      return `It is ${CHESS_COLOR_LABELS[gameState.currentTurn]}'s turn, so you cannot move the ${piece.color} ${getChessPieceName(piece)} yet.`
    }

    return null
  }

  return describeInvalidSelectedChessMove(
    gameState.board,
    gameState.selectedSquare,
    { row, column },
  )
}

function resolveChessMove(gameState, fromSquare, move, mode) {
  const movingPiece = gameState.board[fromSquare.row][fromSquare.column]
  const appliedMove = applyChessMove(gameState.board, fromSquare, move)
  const nextTurn = getOpponentColor(movingPiece.color)
  const nextLegalMoves = getAllLegalChessMoves(appliedMove.board, nextTurn)
  const nextTurnInCheck = isChessKingInCheck(appliedMove.board, nextTurn)
  const status =
    nextLegalMoves.length === 0
      ? nextTurnInCheck
        ? 'checkmate'
        : 'stalemate'
      : 'playing'
  const winner =
    status === 'checkmate' ? movingPiece.color : status === 'stalemate' ? 'draw' : null

  return {
    board: appliedMove.board,
    currentTurn: nextTurn,
    selectedSquare: null,
    legalMoves: [],
    status,
    winner,
    inCheck: status === 'playing' ? nextTurnInCheck : false,
    aiThinking: mode === 'ai' && nextTurn === 'black' && status === 'playing',
    lastMove: appliedMove.lastMove,
    moveCount: gameState.moveCount + 1,
    capturedByWhite:
      movingPiece.color === 'white' && appliedMove.capturedPiece
        ? [...gameState.capturedByWhite, appliedMove.capturedPiece]
        : gameState.capturedByWhite,
    capturedByBlack:
      movingPiece.color === 'black' && appliedMove.capturedPiece
        ? [...gameState.capturedByBlack, appliedMove.capturedPiece]
        : gameState.capturedByBlack,
  }
}

function describeChessStatus(gameState, mode) {
  if (gameState.status === 'checkmate') {
    if (gameState.winner === 'draw') {
      return 'Checkmate reached.'
    }

    if (mode === 'ai' && gameState.winner === 'black') {
      return 'AI delivered checkmate.'
    }

    if (mode === 'ai' && gameState.winner === 'white') {
      return 'You delivered checkmate.'
    }

    return `${gameState.winner === 'white' ? 'White' : 'Black'} wins by checkmate.`
  }

  if (gameState.status === 'stalemate') {
    return 'Stalemate. No legal moves remain.'
  }

  if (gameState.aiThinking) {
    return 'AI is calculating the next move.'
  }

  if (gameState.inCheck) {
    return `${gameState.currentTurn === 'white' ? 'White' : 'Black'} is in check.`
  }

  if (mode === 'ai') {
    return gameState.currentTurn === 'white'
      ? 'Your move as White.'
      : 'AI to move as Black.'
  }

  return `${gameState.currentTurn === 'white' ? 'White' : 'Black'} to move.`
}

function ChessMetric({ label, value, hint }) {
  return (
    <div className="rounded-[1.25rem] border border-line bg-[color:var(--portfolio-glass-soft)] px-4 py-3 shadow-[var(--portfolio-soft-shadow)]">
      <p className={cardLabelClassName}>{label}</p>
      <p className="mt-2 font-display text-[1.45rem] leading-none tracking-[-0.05em] text-ink">
        {value}
      </p>
      <p className="mt-1 text-xs leading-6 text-muted">{hint}</p>
    </div>
  )
}

function ChessPieceToken({ piece, isSelected }) {
  return (
    <span className="pointer-events-none absolute inset-[3px] flex items-center justify-center sm:inset-1">
      <span
        aria-hidden="true"
        className={cx(
          'flex h-full w-full select-none items-center justify-center rounded-[0.82rem] border text-[1.95rem] leading-none transition duration-200 sm:text-[2.1rem]',
          CHESS_PIECE_TOKEN_CLASSNAMES[piece.color],
          isSelected && 'scale-[1.04]',
        )}
        style={{
          fontFamily: CHESS_PIECE_FONT_FAMILY,
          transform: 'translateY(1px)',
        }}
      >
        {CHESS_PIECE_SYMBOLS[piece.color][piece.type]}
      </span>
    </span>
  )
}

function ChessCapturedRow({ label, pieces, accentClassName }) {
  return (
    <div className="rounded-[1.2rem] border border-line bg-[color:var(--portfolio-glass-soft)] px-4 py-3 shadow-[var(--portfolio-soft-shadow)]">
      <div className="flex items-center justify-between gap-4">
        <p className={cardLabelClassName}>{label}</p>
        <span className={chipClassName}>
          {pieces.length ? `${pieces.length} taken` : 'No captures yet'}
        </span>
      </div>

      <div className="mt-3 flex min-h-10 flex-wrap items-center gap-2">
        {pieces.length ? (
          pieces.map((piece, index) => (
            <span
              key={`${piece.color}-${piece.type}-${index}`}
              className={cx(
                'inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-2 text-xl shadow-[var(--portfolio-soft-shadow)]',
                accentClassName,
              )}
            >
              {CHESS_PIECE_SYMBOLS[piece.color][piece.type]}
            </span>
          ))
        ) : (
          <p className="text-sm leading-7 text-muted">
            Captured pieces will appear here during the game.
          </p>
        )}
      </div>
    </div>
  )
}

function ChessGame() {
  const [mode, setMode] = useState('ai')
  const [moveFeedback, setMoveFeedback] = useState('')
  const [scoreboard, setScoreboard] = useState({
    white: 0,
    black: 0,
    draws: 0,
  })
  const [gameState, setGameState] = useState(createInitialChessState)

  const recordChessResult = (winner) => {
    if (!winner) {
      return
    }

    const scoreKey = winner === 'draw' ? 'draws' : winner

    setScoreboard((currentScoreboard) => ({
      ...currentScoreboard,
      [scoreKey]: currentScoreboard[scoreKey] + 1,
    }))
  }

  useEffect(() => {
    if (
      !gameState.aiThinking ||
      mode !== 'ai' ||
      gameState.currentTurn !== 'black' ||
      gameState.status !== 'playing'
    ) {
      return undefined
    }

    const timerId = window.setTimeout(() => {
      const aiChoice = chooseChessAiMove(gameState.board)

      if (!aiChoice) {
        const aiHasMoves = getAllLegalChessMoves(gameState.board, 'black').length > 0
        const aiInCheck = isChessKingInCheck(gameState.board, 'black')
        const fallbackState = {
          ...gameState,
          aiThinking: false,
          status: aiHasMoves ? 'playing' : aiInCheck ? 'checkmate' : 'stalemate',
          winner: aiHasMoves ? null : aiInCheck ? 'white' : 'draw',
        }

        setGameState(fallbackState)
        recordChessResult(fallbackState.winner)

        return
      }

      const nextState = resolveChessMove(
        gameState,
        aiChoice.from,
        aiChoice.move,
        mode,
      )

      setGameState(nextState)
      recordChessResult(nextState.winner)
    }, 430)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [gameState, mode])

  const resetBoard = () => {
    setMoveFeedback('')
    setGameState(createInitialChessState())
  }

  const handleModeChange = (nextMode) => {
    if (
      nextMode === mode &&
      gameState.moveCount === 0 &&
      gameState.status === 'playing'
    ) {
      return
    }

    setMode(nextMode)
    setMoveFeedback('')
    setGameState(createInitialChessState())
  }

  const handleSquareClick = (row, column) => {
    if (gameState.status !== 'playing') {
      setMoveFeedback('This round is over. Start a new chess round to continue.')
      return
    }

    if (gameState.aiThinking || (mode === 'ai' && gameState.currentTurn === 'black')) {
      setMoveFeedback('Please wait for the AI to finish its move.')
      return
    }

    const nextSquare = { row, column }
    const selectedMove = gameState.legalMoves.find(
      (move) => isSameChessMoveTarget(move, nextSquare),
    )

    if (gameState.selectedSquare && selectedMove) {
      setMoveFeedback('')
      const nextState = resolveChessMove(
        gameState,
        gameState.selectedSquare,
        selectedMove,
        mode,
      )

      setGameState(nextState)
      recordChessResult(nextState.winner)

      return
    }

    const piece = gameState.board[row][column]

    if (gameState.selectedSquare) {
      if (isSameChessSquare(gameState.selectedSquare, nextSquare)) {
        setMoveFeedback('')
        setGameState({
          ...gameState,
          selectedSquare: null,
          legalMoves: [],
        })
        return
      }

      if (piece && piece.color === gameState.currentTurn) {
        setMoveFeedback('')
        setGameState({
          ...gameState,
          selectedSquare: nextSquare,
          legalMoves: getLegalChessMovesForSquare(gameState.board, row, column),
        })
        return
      }

      setMoveFeedback(describeInvalidChessClick(gameState, row, column))
      return
    }

    if (!piece || piece.color !== gameState.currentTurn) {
      setMoveFeedback(describeInvalidChessClick(gameState, row, column))
      setGameState({
        ...gameState,
        selectedSquare: null,
        legalMoves: [],
      })
      return
    }

    setMoveFeedback('')
    setGameState({
      ...gameState,
      selectedSquare: nextSquare,
      legalMoves: getLegalChessMovesForSquare(gameState.board, row, column),
    })
  }

  const statusText = describeChessStatus(gameState, mode)
  const materialEdge = getChessMaterialEdge(
    gameState.capturedByWhite,
    gameState.capturedByBlack,
  )

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <ChessMetric
          hint={mode === 'ai' ? 'You always start as White' : 'White score across rounds'}
          label="White wins"
          value={scoreboard.white}
        />
        <ChessMetric
          hint={mode === 'ai' ? 'AI plays as Black' : 'Black score across rounds'}
          label={mode === 'ai' ? 'AI wins' : 'Black wins'}
          value={scoreboard.black}
        />
        <ChessMetric
          hint={statusText}
          label="Draws"
          value={scoreboard.draws}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] xl:items-start">
        <div className="grid gap-4 rounded-[1.55rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-4 shadow-[var(--portfolio-soft-shadow)] sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div>
              <p className={cardLabelClassName}>Chess board</p>
              <h4 className="mt-2 font-display text-[1.7rem] leading-[1.05] tracking-[-0.04em] text-ink">
                Classic chess with local and AI play
              </h4>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className={chipClassName}>
                {mode === 'ai' ? (
                  <>
                    <Bot size={14} />
                    AI as Black
                  </>
                ) : (
                  <>
                    <Crown size={14} />
                    2 Players
                  </>
                )}
              </span>
              <span className={chipClassName}>
                Move {gameState.moveCount + 1}
              </span>
              <span className={chipClassName}>{materialEdge}</span>
            </div>
          </div>

          <div className="grid gap-2">
            {gameState.board.map((row, rowIndex) => (
              <div className="flex items-center gap-2" key={`chess-row-${rowIndex}`}>
                <span className="w-4 text-center text-xs font-semibold text-muted">
                  {CHESS_RANKS[rowIndex]}
                </span>
                <div className="grid flex-1 grid-cols-8 gap-1">
                  {row.map((piece, columnIndex) => {
                    const isLightSquare = (rowIndex + columnIndex) % 2 === 0
                    const isSelected = isSameChessSquare(gameState.selectedSquare, {
                      row: rowIndex,
                      column: columnIndex,
                    })
                    const isLegalTarget = gameState.legalMoves.some(
                      (move) =>
                        move.row === rowIndex && move.column === columnIndex,
                    )
                    const isLastMoveSquare =
                      isSameChessSquare(gameState.lastMove?.from, {
                        row: rowIndex,
                        column: columnIndex,
                      }) ||
                      isSameChessSquare(gameState.lastMove?.to, {
                        row: rowIndex,
                        column: columnIndex,
                      })
                    const squareLabel = `${CHESS_FILES[columnIndex]}${CHESS_RANKS[rowIndex]}`
                    const pieceLabel = piece
                      ? `${piece.color} ${CHESS_PIECE_LABELS[piece.type]}`
                      : 'empty square'

                    return (
                      <button
                        key={`chess-square-${rowIndex}-${columnIndex}`}
                        type="button"
                        className={cx(
                          'relative aspect-square overflow-hidden rounded-[0.95rem] border p-0.5 transition duration-200 sm:p-1',
                          isLightSquare
                            ? 'bg-[color:var(--portfolio-glass-hover)]'
                            : 'bg-[color:var(--portfolio-glass-inline)]',
                          isSelected &&
                            'border-accent shadow-[0_0_0_2px_rgba(22,185,221,0.24)]',
                          isLegalTarget &&
                            'border-[color:var(--portfolio-glass-border-strong)] shadow-[0_0_0_2px_rgba(46,115,255,0.18)]',
                          isLastMoveSquare &&
                            'bg-gradient-to-br from-amber-300/24 via-orange-300/18 to-rose-300/20',
                          !piece &&
                            'hover:-translate-y-0.5 hover:border-line-strong',
                        )}
                        aria-label={`${pieceLabel} on ${squareLabel}`}
                        onClick={() => handleSquareClick(rowIndex, columnIndex)}
                      >
                        {piece ? (
                          <ChessPieceToken
                            isSelected={isSelected}
                            piece={piece}
                          />
                        ) : isLegalTarget ? (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_0_8px_rgba(22,185,221,0.14)]" />
                          </span>
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="ml-6 grid grid-cols-8 gap-1">
              {CHESS_FILES.map((file) => (
                <span
                  className="text-center text-xs font-semibold text-muted"
                  key={`file-${file}`}
                >
                  {file}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <p className={cardLabelClassName}>Game mode</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {[
                { value: 'two-player', label: '2 Players' },
                { value: 'ai', label: 'vs AI' },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={cx(
                    'rounded-full border px-4 py-2 text-sm font-semibold transition duration-200 hover:-translate-y-0.5',
                    mode === option.value
                      ? 'border-[color:var(--portfolio-glass-border-strong)] bg-[color:var(--portfolio-glass-strong)] text-ink shadow-[var(--portfolio-soft-shadow)]'
                      : 'border-line bg-[color:var(--portfolio-glass-inline)] text-muted hover:border-line-strong hover:bg-[color:var(--portfolio-glass-hover)] hover:text-ink',
                  )}
                  onClick={() => handleModeChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-line bg-[color:var(--portfolio-glass-soft)] p-5 shadow-[var(--portfolio-soft-shadow)]">
            <p className={cardLabelClassName}>Round status</p>
            <p className="mt-3 text-base leading-8 text-muted">{statusText}</p>
            {moveFeedback ? (
              <div
                aria-live="polite"
                className="mt-4 rounded-[1.1rem] border border-rose-300/35 bg-rose-500/10 px-4 py-3 shadow-[var(--portfolio-soft-shadow)]"
              >
                <p className={cardLabelClassName}>Why that move is invalid</p>
                <p className="mt-2 text-sm leading-7 text-ink">{moveFeedback}</p>
              </div>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-3">
              <span className={chipClassName}>
                {gameState.currentTurn === 'white' ? 'White to move' : 'Black to move'}
              </span>
              {gameState.inCheck ? (
                <span className={chipClassName}>Check active</span>
              ) : null}
              {gameState.lastMove?.promoted ? (
                <span className={chipClassName}>Pawn promoted to queen</span>
              ) : null}
            </div>
          </div>

          <ChessCapturedRow
            accentClassName="border-emerald-300/35 bg-gradient-to-br from-emerald-400/22 via-teal-400/16 to-cyan-500/18 text-white"
            label="Captured by White"
            pieces={gameState.capturedByWhite}
          />

          <ChessCapturedRow
            accentClassName="border-fuchsia-300/35 bg-gradient-to-br from-fuchsia-500/24 via-pink-500/18 to-violet-500/20 text-white"
            label="Captured by Black"
            pieces={gameState.capturedByBlack}
          />

          <button
            type="button"
            className={cx(buttonClassNames.ghost, 'w-full')}
            onClick={resetBoard}
          >
            <RotateCcw size={18} />
            New chess round
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChessGame
