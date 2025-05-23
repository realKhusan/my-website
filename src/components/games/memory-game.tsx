"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Star, Sun, Moon, Cloud, Flower2, type LucideIcon } from "lucide-react"

type MemoryCard = {
  id: number
  icon: LucideIcon
  isMatched: boolean
  color: string
}

interface MemoryGameProps {
  onGameComplete?: () => void
}

const createCards = () => {
  const iconConfigs = [
    { icon: Heart, color: "text-rose-400" },
    { icon: Star, color: "text-amber-400" },
    { icon: Sun, color: "text-yellow-400" },
    { icon: Moon, color: "text-purple-400" },
    { icon: Cloud, color: "text-sky-400" },
    { icon: Flower2, color: "text-emerald-400" },
  ]

  const cards: MemoryCard[] = []

  iconConfigs.forEach(({ icon, color }, index) => {
    cards.push({ id: index * 2, icon, color, isMatched: false }, { id: index * 2 + 1, icon, color, isMatched: false })
  })

  return cards.sort(() => Math.random() - 0.5)
}

export default function MemoryGame({ onGameComplete }: MemoryGameProps) {
  const [cards, setCards] = useState<MemoryCard[]>(createCards())
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([])
  const [isChecking, setIsChecking] = useState(false)
  const [matches, setMatches] = useState(0)

  const handleCardClick = (clickedIndex: number) => {
    // Prevent clicking if already checking or card is already matched
    if (isChecking || cards[clickedIndex].isMatched) return
    // Prevent clicking if card is already flipped
    if (flippedIndexes.includes(clickedIndex)) return
    // Prevent clicking if two cards are already flipped
    if (flippedIndexes.length === 2) return

    // Add clicked card to flipped cards
    const newFlipped = [...flippedIndexes, clickedIndex]
    setFlippedIndexes(newFlipped)

    // If we now have two cards flipped, check for a match
    if (newFlipped.length === 2) {
      setIsChecking(true)
      const [firstIndex, secondIndex] = newFlipped
      const firstCard = cards[firstIndex]
      const secondCard = cards[secondIndex]

      if (firstCard.icon === secondCard.icon) {
        // Match found
        setTimeout(() => {
          const updatedCards = cards.map((card, index) =>
            index === firstIndex || index === secondIndex ? { ...card, isMatched: true } : card,
          )
          setCards(updatedCards)
          setFlippedIndexes([])
          const newMatches = matches + 1
          setMatches(newMatches)
          setIsChecking(false)

          // Check if all matches are found
          if (newMatches === cards.length / 2) {
            onGameComplete?.()
          }
        }, 500)
      } else {
        // No match - reset after delay
        setTimeout(() => {
          setFlippedIndexes([])
          setIsChecking(false)
        }, 1000)
      }
    }
  }

  const resetGame = () => {
    // First, make sure all cards are closed by clearing flipped indexes
    setFlippedIndexes([])
    setIsChecking(false)

    // Wait for card closing animation to complete
    setTimeout(() => {
      // Then completely reset the game with new randomized cards
      setCards(createCards())
      setMatches(0)
    }, 400) // Wait for card flip animation to complete (300ms) plus a little extra
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-8">
      <div className="grid grid-cols-3 gap-3 md:gap-5 p-6 rounded-xl bg-green-500/20 border border-green-500/30 backdrop-blur-sm">
        {cards.map((card, index) => (
          <div key={card.id} className="h-24 w-24 md:h-22 md:w-22">
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{
                rotateY: card.isMatched || flippedIndexes.includes(index) ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full cursor-pointer [transform-style:preserve-3d]"
              onClick={() => handleCardClick(index)}
            >
              {/* Card Back */}
              <div
                className={`absolute inset-0 rounded-md border flex items-center justify-center [backface-visibility:hidden] ${card.isMatched
                  ? "bg-indigo-900/50 border-indigo-400/50"
                  : "bg-indigo-950 border-indigo-800 hover:border-indigo-600 hover:bg-indigo-900/80"
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-500/5 to-white/5 rounded-md" />
              </div>

              {/* Card Front */}
              <div
                className={`absolute inset-0 rounded-md border flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] ${card.isMatched ? "bg-indigo-900/50 border-indigo-400/50" : "bg-indigo-800/50 border-indigo-500/50"
                  }`}
              >
                <card.icon
                  className={`w-12 h-12 ${card.isMatched ? `${card.color} filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]` : card.color
                    }`}
                />
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      <Button
        onClick={resetGame}
        variant="outline"
        size="lg"
        className="bg-indigo-950 border-indigo-700 hover:bg-indigo-900 hover:border-indigo-500 text-indigo-200 hover:text-indigo-100"
      >
        Start New Game
      </Button>
    </div>
  )
}
