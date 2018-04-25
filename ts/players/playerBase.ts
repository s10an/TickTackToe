import {markers} from "./../enums/markers";
import {board} from "./../common/board"
import {iPlayer} from "./interfaces/iPlayer";
import {gameStatuses} from "./../enums/gameStatuses";
//import {moveSequence} from "./../common/board"

export abstract class playerBase implements iPlayer {
    constructor(public readonly playerMarker : markers, public readonly playerName : string, public learingMode : boolean){
    }
    abstract readonly PlayerEngineId : number;

    public readonly markerForPlayerInternaly : markers = markers.x;

    public Move = (currentBoard : board) : board => {
        if(currentBoard.GameStatus != gameStatuses.play ) throw new Error("player - Move(): Cant move - game is over");
        this.switchInternalMarkers(currentBoard);
        let moveIndex : number = this.CalculateMove(currentBoard); 
        let playerResign : boolean = false;
        let newPostition = new Array<markers>();
        if(moveIndex == -1){
            playerResign = true;
            newPostition = currentBoard.position;
        }
        this.switchInternalMarkers(currentBoard);
        let newBoard = currentBoard.GetNewBoard(moveIndex, playerResign )
        return newBoard;
    }

    abstract CalculateMove = (currentBoard : board) : number => {return 0};

    abstract LearnFromGame = (finalGameResult : gameStatuses) => {};

    abstract loadKnowledge = () : void => {};

    abstract saveKnowledge = () : void => {};

    public switchInternalMarkers = (board : board) => {
        if(this.playerMarker == this.markerForPlayerInternaly) return
        for (let i = 0; i < board.position.length; i++) {
            if(board.position[i] == markers.x) board.position[i] = markers.o;
            else if (board.position[i] == markers.o) board.position[i] = markers.x;
        }
        if(board.markerToMove == markers.x) {
            board.markerToMove = markers.o;
        }
        else {
            board.markerToMove = markers.x;
        }
        return board;  
    }

    
}