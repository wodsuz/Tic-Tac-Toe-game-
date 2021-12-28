import { useState,useEffect } from "react"
import Square from "../components/Square";
type Player = "X" | "O" | "BOTH" | null;
function calculatevwinner(squares: Player[]){
    const lines = [
        [0,1,2], 
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(let i=0; i <lines.length; i++){
        const [a,b,c] = lines[i]
        if( squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null)); // calling all squares, 9 empty squares 
    const [currentPlayer, setCurrentPlayer] = useState <"X" | "O"> ( // making first player X or O
        Math.round(Math.random() * 1) === 1 ? "X" : "O"
    );
    const [winner,setWinner] = useState<Player>(null)  //winner

    function SetSquareValue(index: number){
        const newData = squares.map((val,i) => {
            if(i === index) {
                return currentPlayer
            }
            return val;
        })
        setSquares(newData)
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }

    const reset = () => {
        setSquares(Array(9).fill(null))
        setWinner(null)
        setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O")
    }

    useEffect( () => {
        const w = calculatevwinner(squares)
        if(w) {
            setWinner(w)
        }
        if (!w && !squares.filter((square) => !square).length){
            setWinner("BOTH");
        }
    })

    return (
        <div> 
        {!winner    &&   <p> Hi,  {currentPlayer}, it's your turn!   </p>}
        {winner &&  winner !=="BOTH" && <p> Congrats! {winner} </p>}
        {winner && winner ==="BOTH" && <p> Congrats you're both! </p>}

            <div className="grid">
                {Array(9)
                .fill(null)
                .map((_, i) => { // 9 squares making, by using flex-grid
                    return (
                    <Square 
                    winner={winner}
                    key={i} 
                    onClick={() => SetSquareValue(i)}
                    value = {squares[i]} // getting the value of 0 or X
                    />
                );    
            })}
            </div>
            <button className='reset' onClick={reset}    > Reset </button>
        </div>
    ) 

}
export default Board