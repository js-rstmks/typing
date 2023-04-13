import {useState,useEffect, useRef} from "react"

function useGameLogic(){
    const STARTING_TIME = 30

    const PROBLEM_COUNT = 5
    
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    // もう一度ゲームをプレイする」を表示させる
    const [finishFlg, setFinishFlg] = useState(false)

    const [problem, setProblem] = useState("")

    // タイピングに成功したワードの数
    const [count, setCount] = useState(0)

    const problems = []

    const [words, setWords] = useState([])

    const [wordCount, setWordCount] = useState(0)

    const [pressedWords, setPressedWords] = useState("")
    
    const calculateWordCount = (text) => {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }
    useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if(timeRemaining === 0) {
            endGame()
        }
    }, [timeRemaining, isTimeRunning])

    useEffect( async() => {

        const fetchData = async () => {
            // const problems = []
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PROBLEM_COUNT}`, {
                method: 'GET'
            })
            const dataArrays = await response.json()
    
            const pokemons = dataArrays.results
    
            pokemons.forEach(pokemon => {
                problems.push(pokemon.name)
            })

            setWords(pokemons.map(pokemon => pokemon.name))
    
            setProblem(problems[0])
        }

        const rree = await fetchData()
        console.log(rree)

    }, [])

    useEffect(() => {
        const handleKeyDown = (e) => {
          // console.log(problems)
      
          // ゲーム中のみ
          if (!isTimeRunning) {
            return
          }
      
          // 問題の先頭文字でなければそれ以降の処理を行わない
          if (e.key !== Array.from(problem)[0]) {
            return 
          }
      
          // 正しくタイピングした英文字を赤色で表示
          setPressedWords(pressedWords.concat(e.key))
      
          let oiu = problem.slice(1)
      
          // ワードの先頭文字削除
          setProblem(oiu)
      
          // 文字を打ち終えたら
          // if (problem.length === 0) {
          if (oiu.length === 0) {
            setPressedWords("")
            setCount(count + 1)
      
            words.shift()
      
            const words2 = words
      
            setWords(words2)
      
            setProblem(words[0])
      
            if (words.length === 0) {
              endGame()
            }
      
            console.log(words)
          }
        }
      
        document.addEventListener('keydown', handleKeyDown)
      
        return () => {
          document.removeEventListener('keydown', handleKeyDown)
        }
      }, [isTimeRunning, problem, pressedWords, words])
    
    const startGame = () => {
        setIsTimeRunning(true)
    }
    
    const endGame = () => {
        setIsTimeRunning(false)
        setFinishFlg(true)
    }

    const stopGame = () => {
        setIsTimeRunning(false)
    }

    const restartGame = () => {
        setFinishFlg(false)
        setIsTimeRunning(true)
        setTimeRemaining(STARTING_TIME)
    }
    
    return [problem, count, pressedWords, finishFlg, timeRemaining, startGame, stopGame, restartGame,isTimeRunning, wordCount]
    
}
export default useGameLogic