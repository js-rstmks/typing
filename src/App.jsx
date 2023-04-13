import React, {useState, useEffect, useRef} from "react"
import useGameLogic from "./useGameLogic"

function App() {

const [pressedWords, count, problem, finishFlg, timeRemaining, startGame, stopGame, restartGame, isTimeRunning,wordCount] = useGameLogic()    
    return (
        <>
            <h1>How many words can you type in 30 seconds?</h1>

            <span style={{color: "blue"}}>{problem}</span>
            <span style={{color: "yellow"}}>{pressedWords}</span>
            {/* <textarea
                ref={textBoxRef}
                onChange={handleChange}
                value={text}
                disabled={!isTimeRunning}
            /> */}
            <h4>Time remaining: {timeRemaining}</h4>
            <button 
                onClick={startGame}
                disabled={isTimeRunning}
            >
                Start
            </button>
            <button 
                onClick={stopGame}
                disabled={!isTimeRunning}
            >
                Stop
            </button>
            <h1>Word count: {count}</h1>

            <div>
                {finishFlg && <button onClick={restartGame}>Play Again</button>}
            </div>
        </>
    )
}

export default App