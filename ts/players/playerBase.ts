import {markers} from "./../enums/markers";
import {board} from "./../common/board"
import {iPlayer} from "./interfaces/iPlayer";

export abstract class playerBase implements iPlayer {
    constructor(public readonly playerMarker : markers, public readonly playerName : string, public learingMode : boolean){
    }
    abstract readonly PlayerEngineId : number;

    public Move = (currentBoard : board) : board => {
        let moveIndex = this.CalculateMove(currentBoard);
        let newPostition = this.GetNewPosition(moveIndex, currentBoard);
        let opponentsMarker = this.GetOpponentsMarker();
        let newBoard = new board(newPostition, opponentsMarker)
        return newBoard;
    }

    protected GetNewPosition = (moveIndex: number, currentBoard: board) : Array<markers> => {
        let newPosition = currentBoard.position.slice(0);
        if(moveIndex < 0 || moveIndex > 8 ) throw Error("Illegal move");
        if(newPosition[moveIndex] != markers.b) throw Error("Player marker already at this position");
        newPosition[moveIndex] = this.playerMarker;
        return newPosition;
    }

    public GetOpponentsMarker = () : markers => {
        if(this.playerMarker == markers.x) return markers.o;
        return markers.x;
    }

    abstract CalculateMove = (currentBoard : board) : number => {return 0};

    abstract LearnFromGame = (completeGame : Array<board>) => {};

    
}