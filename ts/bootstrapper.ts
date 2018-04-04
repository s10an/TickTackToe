import {gameEngine} from "./gameEngine";
// /// <reference path="gameEngine.ts" />

var engine = new gameEngine();
engine.StartTrainingMatch();
ko.applyBindings(engine);