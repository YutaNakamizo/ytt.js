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
} from './interfaces';

// YTT Class Member Interfaces
interface YTTIntermediateFormat {
  pens: YTTPen[],
  windowStyles: YTTWindowStyle[],
  windowPositions: YTTWindowPosition[],
  paragraphs: YTTParagraph[],
};

interface YTTIndex {
  [key: string]: YTTElement,
};

// YTT Class
export default class YTT {
  pens: YTTPen[];
  windowStyles: YTTWindowStyle[];
  windowPositions: YTTWindowPosition[];
  paragraphs: YTTParagraph[];
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
        ...this.paragraphs.map((p: YTTParagraph) => {
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

  add(element: YTTElement): YTT {
    return this;
  }

  addPen(pen: YTTPen): YTT {
    this.pens.push(pen);
    const uuid = pen.uuid || uuidv4();
    this.index[uuid] = pen;
    return this;
  }

  addWindowStyle(windowStyle: YTTWindowStyle): YTT {
    this.windowStyles.push(windowStyle);
    const uuid = windowStyle.uuid || uuidv4();
    this.index[uuid] = windowStyle;
    return this;
  }

  addWindowPosition(windowPosition: YTTWindowPosition): YTT {
    this.windowPositions.push(windowPosition);
    const uuid = windowPosition.uuid || uuidv4();
    this.index[uuid] = windowPosition;
    return this;
  }

  addParagraph(paragraph: YTTParagraph): YTT {
    this.paragraphs.push(paragraph);
    const uuid = paragraph.uuid || uuidv4();
    this.index[uuid] = paragraph;
    return this;
  }
};

