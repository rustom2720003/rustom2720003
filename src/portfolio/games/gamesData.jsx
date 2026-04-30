import {
  Bot,
  Brain,
  Coins,
  Crown,
  Dice5,
  Gamepad2,
  Keyboard,
} from 'lucide-react'
import ChessGame from './components/ChessGame'
import CoinTossGame from './components/CoinTossGame'
import LudoGame from './components/LudoGame'
import {
  MemoryCardGame,
  SnakeGame,
  TicTacToeGame,
  TypingChallengeGame,
} from './components/FunZone'

export const gamesCatalog = [
  {
    id: 'cointoss',
    icon: Coins,
    title: 'Coin Toss',
    blurb: 'Call Heads or Tails, flip the coin, and track your streak.',
    tags: ['Instant', 'Luck', 'Quick'],
    rules: [
      'Pick Heads or Tails before flipping the coin.',
      'The coin will spin briefly, then reveal the final result.',
      'Track your wins, accuracy, streak, and recent toss history.',
    ],
    component: CoinTossGame,
  },
  {
    id: 'ludo',
    icon: Dice5,
    title: 'Classic Ludo',
    blurb: 'Play a full four-token ludo race with 2 to 4 players, AI support, and animated dice.',
    tags: ['Classic', '2-4 Players', 'AI'],
    rules: [
      'Choose 2, 3, or 4 players, then decide which colors are Human or AI.',
      'A 6 is needed to leave base, captures send opposing tokens back, and an exact roll is required to reach home.',
      'Each player rolls from their own animated die, and AI players handle their turns automatically.',
    ],
    component: LudoGame,
  },
  {
    id: 'memory',
    icon: Brain,
    title: 'Memory Card Game',
    blurb: 'Flip React-inspired pairs and clear the board in the fewest moves.',
    tags: ['Quick', 'Visual', 'Mobile friendly'],
    rules: [
      'Tap a card to reveal it, then tap a second card to find its pair.',
      'Matched pairs stay open while mismatched cards flip back after a short pause.',
      'Clear all six pairs to finish the round.',
    ],
    component: MemoryCardGame,
  },
  {
    id: 'typing',
    icon: Keyboard,
    title: 'Typing Challenge',
    blurb: 'Race through React-friendly lines and check your speed and accuracy.',
    tags: ['Focus', 'Keyboard', 'Stats'],
    rules: [
      'The timer starts on your first keystroke.',
      'Type the shown line as accurately as possible before time runs out.',
      'Watch your progress, words per minute, and accuracy update live.',
    ],
    component: TypingChallengeGame,
  },
  {
    id: 'tictactoe',
    icon: Bot,
    title: 'Tic-Tac-Toe',
    blurb: 'Play with a friend or switch to AI mode for a sharper challenge.',
    tags: ['Classic', '2 Players', 'AI'],
    rules: [
      'Choose either 2 Players or vs AI before starting the round.',
      'Player X always moves first, and in AI mode the computer plays as O.',
      'Complete a row, column, or diagonal before your opponent to win.',
    ],
    component: TicTacToeGame,
  },
  {
    id: 'chess',
    icon: Crown,
    title: 'Chess',
    blurb: 'Play full-board chess in 2-player mode or challenge a lightweight AI.',
    tags: ['Strategy', '2 Players', 'AI'],
    rules: [
      'Choose either 2 Players or vs AI before the round begins.',
      'Tap one of your pieces to see legal moves, then tap a highlighted square to play it.',
      'Pawns auto-promote to a queen for faster play, and the AI controls Black in vs AI mode.',
    ],
    component: ChessGame,
  },
  {
    id: 'snake',
    icon: Gamepad2,
    title: 'Snake Game',
    blurb: 'Guide the snake, collect food, and keep growing without crashing.',
    tags: ['Arcade', 'Arrow keys', 'Fast paced'],
    rules: [
      'Use arrow keys or the touch controls to steer the snake.',
      'Each food pickup grows the snake and increases your score.',
      'Avoid walls and your own body to survive longer.',
    ],
    component: SnakeGame,
  },
]
