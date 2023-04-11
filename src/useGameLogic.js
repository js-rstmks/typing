import {useState,useEffect, useRef} from "react"

function useGameLogic(){
    const STARTING_TIME = 3

    const PROBLEM_COUNT = 5
    
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    // もう一度ゲームをプレイする」を表示させる
    const [finishFlg, setFinishFlg] = useState(false)

    // 問題を入れる
    const [problemList, setProblemList] = useState([])
    const [wordCount, setWordCount] = useState(0)
    const textBoxRef = useRef(null)
    
    const handleChange = (e) => {
        const {value} = e.target
        setText(value)
    }
    
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

    // useEffect( () => {

        
    // }, [])
    fetchData()

    const fetchData = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PROBLEM_COUNT}`, {
            method: 'GET'
        })
        const dataArrays = await response.json()

        const pokemons = dataArrays.results

        // return pokemons
        setProblemList(pokemons)
    }
    
    const startGame = () => {
        setIsTimeRunning(true)
        // setTimeRemaining(STARTING_TIME)
        // setText("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }
    
    const endGame = () => {
        setIsTimeRunning(false)
        setWordCount(calculateWordCount(text))
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
    
    return [textBoxRef, handleChange, text, finishFlg, timeRemaining, startGame, stopGame, restartGame,isTimeRunning, wordCount]
    
}
export default useGameLogic