// /// <reference path="./../enums/markers.ts" />
// /// <reference path="./../enums/gameStatuses.ts" />
import {markers} from "./../enums/markers";
import {gameStatuses} from "./../enums/gameStatuses";

export class moveAndMarker {
    constructor(public readonly marker: markers, public readonly moveIndex: number){}
}

export class board{

    public GameStatus: gameStatuses;
    public moveSequence = Array<moveAndMarker>();

    constructor(public position: Array<markers>, public markerToMove: markers, public playerResign : boolean){
        this.ValidatePosition();
        // Set gamestatus (winning, draw or playable)
        this.GameStatus = this.GetGameStatus();
    }

    public GetGameStatus = (): gameStatuses => {
        if(this.playerResign) {
            if (this.markerToMove == markers.x)  return gameStatuses.oresign ;
            else return  gameStatuses.xresign;    
        }
        if (this.CheckPositionWinning(markers.x))  return gameStatuses.xwins ;
        if (this.CheckPositionWinning(markers.o)) return  gameStatuses.owins;
        if(this.CheckNoLegalMoves()) return gameStatuses.draw;
        return gameStatuses.play;
    }
    
    public GetNewBoard = (moveIndex: number, playerResign : boolean) : board => {
        let newPostition : Array<markers>;
        if(playerResign) newPostition = this.position.slice(0);
        else newPostition = this.GetNewPosition(moveIndex); 
        let opponentsMarker = this.GetOpponentsMarker();
        let newBoard = new board(newPostition, opponentsMarker, playerResign);
        newBoard.moveSequence = this.moveSequence.slice(0);
        newBoard.moveSequence.push(new moveAndMarker(this.markerToMove, moveIndex));
        return newBoard;
    }

    public GetOpponentsMarker = () : markers => {
        if(this.markerToMove == markers.x) return markers.o;
        return markers.x;
    }

    public GetNewPosition = (moveIndex: number) : Array<markers> => {
        let newPosition = this.position.slice(0);
        if(moveIndex < 0 || moveIndex > 8 ) throw Error("Illegal move");
        if(newPosition[moveIndex] != markers.b) throw Error("Player marker already at this position");
        newPosition[moveIndex] = this.markerToMove;
        return newPosition;
    }

    private CheckPositionWinning = (marker: markers) : boolean => {
        // horizonal check
        if(this.position[0] == marker && this.position[1] == marker && this.position[2] == marker ) return true;
        if(this.position[3] == marker && this.position[4] == marker && this.position[5] == marker ) return true;
        if(this.position[6] == marker && this.position[7] == marker && this.position[8] == marker ) return true;
        // vertical check
        if(this.position[0] == marker && this.position[3] == marker && this.position[6] == marker ) return true;
        if(this.position[1] == marker && this.position[4] == marker && this.position[7] == marker ) return true;
        if(this.position[2] == marker && this.position[5] == marker && this.position[8] == marker ) return true;
        // cross check
        if(this.position[0] == marker && this.position[4] == marker && this.position[8] == marker ) return true;
        if(this.position[6] == marker && this.position[4] == marker && this.position[2] == marker ) return true;
        return false;;
    }

    private CheckNoLegalMoves = () : boolean => {
        let bMarkers = this.position.filter(function(marker){
            return (marker === markers.b);
        });
        if(bMarkers.length > 0) return false;
        return true;
    }

    public ValidatePosition = () : void => {

        // Check if array length is correct
        if(this.position.length != 9) throw new Error("Invalid position");
        // Check no marker is no set to be in the move
        if(this.markerToMove === markers.b) throw new Error("Invalid marker in move"); 
        
        
        // Check if diff between o and x markers are correct
        let xMarkers = this.position.filter(function(marker){
            return (marker === markers.x);
        });
        let oMarkers = this.position.filter(function(marker){
            return marker === markers.o;
        })
        if(xMarkers.length - oMarkers.length == 0 ) return;
        if(this.playerResign){
            if(this.markerToMove === markers.o) xMarkers.push(markers.x);
            else oMarkers.push(markers.o);
        }
        else{
             
            if(this.markerToMove === markers.x) xMarkers.push(markers.x);
            else oMarkers.push(markers.o);
        }
        if(xMarkers.length - oMarkers.length == 0) return;
        throw new Error("Diff between markers on board are wrong");
    }

    public static GetStartBoard = (markerToStart: markers) : board => {
        let positionStart: Array<markers> = [
            markers.b, markers.b, markers.b,
            markers.b, markers.b, markers.b,
            markers.b, markers.b, markers.b
        ];
        let startBoard : board = new board(positionStart, markerToStart, false);
        return startBoard;
    }

}




