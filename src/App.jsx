// styles
import './App.scss'

// react
import { useCallback, useEffect, useState } from 'react'

// dependencies
import { wordsList } from "./data/words"

// components
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'

const stages = ["start","game","end"]

function App() {
  const [currentStage, setCurrentStage] = useState(stages[0])
  const [words] = useState(wordsList)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(5)
  const [score, setScore] = useState(0)

  const startGame = () => {
    resetLetters()
    const { word, category } = pickWordAndCategory()
    const wordLetters = word.split("").map((c) => c.toLowerCase())
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)
    setCurrentStage(stages[1])
  }

  const checkGuess = (guessedLetter) => {
    const letter = guessedLetter.toLowerCase()

    // it skips the attempt case the letter has already been used before
    if(guessedLetters.includes(letter) || wrongLetters.includes(letter))
      return

    if(letters.includes(letter) ) {
      setGuessedLetters((current) => [...current, letter])
      setScore((current) => current += 50)
    } 
    else {
      setWrongLetters((current) => [...current, letter])
      setGuesses((current) => current - 1)
    }
  }

  const restartGame = () => {
    resetAll()
    setCurrentStage(stages[0])
  }

  const resetAll = () => {
    resetLetters()
    setGuesses(5)
    setScore(0)
  }

  const resetLetters = () =>{
    setLetters([])
    setGuessedLetters([])
    setWrongLetters([])
  }

  const pickWordAndCategory = () => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * categories.length)]
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    return { word, category }
  }

  // check lose condition
  useEffect(()=> {
    if(guesses <= 0) 
      setCurrentStage(stages[2])
  }, [guesses])

  // check win condition
  useEffect(()=> {
    const uniqueLetters = [... new Set(letters)]
    if(guessedLetters.length == uniqueLetters.length) {
      setScore((current) => current += 100)
      startGame()
    }
  }, [guessedLetters, letters, startGame])

  return (
    <div className="App">
      { currentStage === "start" && <StartScreen startGame={startGame} /> }
      { currentStage === "game" && (
        <Game 
          checkGuess={checkGuess}
          pickedCategory={pickedCategory}
          pickedWord={pickedWord}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      ) }
      { currentStage === "end" && <GameOver restartGame={restartGame} score={score} /> }
    </div>
  )
}

export default App
