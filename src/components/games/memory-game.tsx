"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Star, Sun, Moon, Cloud, Flower2, type LucideIcon } from "lucide-react"

type MemoryCard = {
  id: number
  icon: LucideIcon
  isMatched: boolean
  color: string
}

type Notification = {
  message: string
  visible: boolean
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

export default function MemoryGame() {
  const [cards, setCards] = useState<MemoryCard[]>(createCards())
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([])
  const [matches, setMatches] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const [notification, setNotification] = useState<Notification>({ message: "", visible: false })

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

          // Check for game completion - fixed the condition
          if (newMatches === cards.length / 2) {
            setNotification({ message: "🎉 Congratulations! You've found all the matches! 🎈", visible: true })
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
    setCards(createCards())
    setFlippedIndexes([])
    setMatches(0)
    setIsChecking(false)
    setNotification({ message: "", visible: false })
  }

  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        setNotification({ message: "", visible: false })
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification.visible])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8 bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 text-transparent bg-clip-text">
          Memory Match Game
        </h1>
        <p className="text-indigo-200">
          Matches found: {matches} of {cards.length / 2}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 md:gap-6 p-6 rounded-xl bg-indigo-950/50 backdrop-blur-sm">
        {cards.map((card, index) => (
          <div key={card.id} className="h-24 w-24 md:h-32 md:w-32 [perspective:1000px]">
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

      <AnimatePresence>
        {notification.visible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-purple-900 text-purple-100 border border-purple-700 px-4 py-2 rounded-md shadow-lg"
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
