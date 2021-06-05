import {
  v4 as uuidv4,
} from 'uuid';
import {
  YTTPen,
  YTTWindowStyle,
  YTTWindowPosition,
  YTTParagraph,
  YTTSpan,
  YTTElement,
  YTTIntermediateFormat,
  YTTIndex,
} from './interfaces';

// YTT Class
export default class YTT {
  private pens: YTTPen[];
  private windowStyles: YTTWindowStyle[];
  private windowPositions: YTTWindowPosition[];
  private paragraphs: YTTParagraph[];
  private index: YTTIndex = {};

  constructor(intermediate?: YTTIntermediateFormat) {
    if(intermediate) {
      this.pens = intermediate?.pens || [];
      this.windowStyles = intermediate?.windowStyles || [];
      this.windowPositions = intermediate?.windowPositions || [];
      this.paragraphs = intermediate?.paragraphs || [];
      for(const el of [
        ...this.pens,
        ...this.windowStyles,
        ...this.windowPositions,
        ...this.paragraphs,
        ...this.paragraphs.map((p: YTTParagraph) => {
          return p.children;
        }).flat(),
      ]) {
        const uuid = uuidv4();
        el.uuid = uuid;
        this.index[uuid] = el;
      }
    }
    else {
      this.pens = [];
      this.windowStyles = [];
      this.windowPositions = [];
      this.paragraphs = [];
    }
  }
};

