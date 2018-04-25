import {matchEngine} from "./matchEngine";
// /// <reference path="gameEngine.ts" />

var engine = new matchEngine();
engine.PlayMatch(true);
ko.applyBindings(engine);