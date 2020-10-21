import {Graphic, Backdrop, Bug, Carousel, Fullscreen, LowerThird, OTS, Panel, Slate, Ticker, Timer, CustomGraphic} from './graphic.model.js';

const graphicClasses = {
    Graphic,
    Backdrop,
    Bug,
    Carousel,
    Fullscreen,
    LowerThird,
    OTS,
    Panel,
    Slate,
    Ticker,
    Timer,
    CustomGraphic
}

export class DynamicClass {
    constructor(className, options, fields) {
      return new graphicClasses[className](options, fields);
    }
  }