// /// <reference path="./../enums/markers.ts" />
// /// <reference path="./../enums/gameStatuses.ts" />
import {markers} from "./../enums/markers";
import {gameStatuses} from "./../enums/gameStatuses";


export class board{

    readonly GameStatus: gameStatuses;

    constructor(public position: Array<markers>, public markerToMove: markers){
        this.ValidatePosition();
        // Set gamestatus (winning, draw or playable)
        this.GameStatus = this.GetGameStatus();
    }

    public GetGameStatus = (): gameStatuses => {
        if (this.CheckPositionWinning(markers.x))  return gameStatuses.xwins ;
        if (this.CheckPositionWinning(markers.o)) return  gameStatuses.owins;
        if(this.CheckNoLegalMoves()) return gameStatuses.draw;
        return gameStatuses.play;
        
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
        if(this.markerToMove === markers.x) xMarkers.push(markers.x);
        else oMarkers.push(markers.o);
        if(xMarkers.length - oMarkers.length == 0) return;

        throw new Error("Diff between markers on board are wrong");
    }
}




