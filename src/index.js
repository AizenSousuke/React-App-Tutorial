import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

class Board extends React.Component {
	renderSquare(i) {
		return (
			<Square
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [
				{
					squares: Array(9).fill(null)
				}
			],
			xIsNext: true,
			stepNumber: 0
		};
	}

	handleClick(i) {
		// Throw away future history if any (if we go back in time)
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		console.log("History Length: " + history.length);
		const current = history[history.length - 1];
		// Set values in the arrays. Array is immutable (does not change directly)
		const squares = current.squares.slice();
		// If there is a winner of if a square is already filled
		if (calculateWinner(squares) || squares[i]) {
			console.log(
				"Square is already filled or someone is already a winner."
			);
			return;
		}
		squares[i] = this.state.xIsNext ? "X" : "O";
		this.setState({
			// Concat method doesn't mutate the array
			history: history.concat([
				{
					squares: squares
				}
			]),
			xIsNext: !this.state.xIsNext,
			stepNumber: history.length
		});
	}

	jumpTo(step) {
		// Set xIsNext to true if the number that we’re changing stepNumber to is even:
		this.setState({
			stepNumber: step,
			xIsNext: step % 2 === 0
		});
    }
    
    newGame() {
        // New game
        console.log("New Game is clicked");
        const history = this.state.history.slice(0);
        const current = history[0];
        const squares = current.squares.slice(0);
        this.setState({
            history: [{
                squares
            }],
            stepNumber: 0,
            xIsNext: true,
        })
    }

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			const desc = move ? "Go to move #" + move : "Go to Game Start";
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		});

		let status;
		if (winner) {
			status = "Winner: " + winner;
		} else {
			status = "Next player: " + (this.state.xIsNext ? "X" : "O");
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={i => this.handleClick(i)}
					/>
                    <button
                        onClick={() => this.newGame()}
                    >
                        New Game
                    </button>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			console.log("Winner is found");
			return squares[a];
		}
	}
	return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
