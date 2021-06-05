import {
  v4 as uuidv4,
} from 'uuid';
import {
  YTTPenInterface,
  YTTWindowStyleInterface,
  YTTWindowPositionInterface,
  YTTParagraphInterface,
  YTTSpanInterface,
  YTTElementInterface,
} from './interfaces';

// YTT Class Member Interfaces
interface YTTIntermediateFormat {
  pens: YTTPenInterface[],
  windowStyles: YTTWindowStyleInterface[],
  windowPositions: YTTWindowPositionInterface[],
  paragraphs: YTTParagraphInterface[],
};

export interface YTTIndex {
  [key: string]: YTTElementInterface,
};

// YTT Class
export default class YTT {
  private pens: YTTPenInterface[];
  private windowStyles: YTTWindowStyleInterface[];
  private windowPositions: YTTWindowPositionInterface[];
  private paragraphs: YTTParagraphInterface[];
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
        ...this.paragraphs.map((p: YTTParagraphInterface) => {
          return p.children;
        }).flat(),
      ]) {
        const uuid = el.uuid || uuidv4();
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

