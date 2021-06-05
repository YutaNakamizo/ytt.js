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
  YTTPen,
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

export interface YTTInterface {
  pens: YTTPenInterface[],
  windowStyles: YTTWindowStyleInterface[],
  windowPositions: YTTWindowPositionInterface[],
  paragraphs: YTTParagraphInterface[],
  index: YTTIndex,
};

// YTT Class
export default class YTT implements YTTInterface {
  pens: YTTPenInterface[];
  windowStyles: YTTWindowStyleInterface[];
  windowPositions: YTTWindowPositionInterface[];
  paragraphs: YTTParagraphInterface[];
  index: YTTIndex = {};

  constructor(intermediate?: YTTIntermediateFormat) {
    if(intermediate) {
      this.pens = intermediate?.pens.map(pen => new YTTPen(pen, this)) || [];
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

  add(element: YTTElementInterface): YTTInterface {
    return this;
  }

  addPen(pen: YTTPenInterface): YTTInterface {
    this.pens.push(pen);
    const uuid = pen.uuid || uuidv4();
    this.index[uuid] = pen;
    return this;
  }

  addWindowStyle(windowStyle: YTTWindowStyleInterface): YTTInterface {
    this.windowStyles.push(windowStyle);
    const uuid = windowStyle.uuid || uuidv4();
    this.index[uuid] = windowStyle;
    return this;
  }

  addWindowPosition(windowPosition: YTTWindowPositionInterface): YTTInterface {
    this.windowPositions.push(windowPosition);
    const uuid = windowPosition.uuid || uuidv4();
    this.index[uuid] = windowPosition;
    return this;
  }

  addParagraph(paragraph: YTTParagraphInterface): YTTInterface {
    this.paragraphs.push(paragraph);
    const uuid = paragraph.uuid || uuidv4();
    this.index[uuid] = paragraph;
    return this;
  }
};

