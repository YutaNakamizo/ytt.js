import assert from 'assert';
import {
  v4 as uuidv4,
} from 'uuid';
import {
  YTTPen,
  YTTPenInterface,
} from './ytt/Pen';
import {
  YTTWindowStyle,
  YTTWindowStyleInterface,
} from './ytt/WindowStyle';
import {
  YTTWindowPosition,
  YTTWindowPositionInterface,
} from './ytt/WindowPosition';
import {
  YTTParagraph,
  YTTParagraphInterface,
} from './ytt/Paragraph';
import {
  YTTSpan,
  YTTSpanInterface,
} from './ytt/Span';
import { runInThisContext } from 'vm';

// YTT Element
export class YTTElement {
  public readonly type: string = 'ytt#element';
  public readonly uuid: string;
  public readonly parentDocument: YTT;

  constructor(
    initParams: YTTPenInterface | YTTWindowStyleInterface | YTTWindowPositionInterface | YTTParagraphInterface | YTTSpanInterface,
    parentDocument: YTT
  ) {
    Object.assign(this, initParams);
    this.uuid = uuidv4();
    this.parentDocument = parentDocument;
  }
};

export class YTTHeadElement extends YTTElement {
  public readonly type: string = 'ytt#headElement';

  constructor(
    initParams: YTTPenInterface | YTTWindowStyleInterface | YTTWindowPositionInterface,
    parentDocument: YTT
  ) {
    super(initParams, parentDocument);
  }
}

export class YTTBodyElement extends YTTElement {
  public readonly type: string = 'ytt#bodyElement';
  public readonly startTime: number = 0;
  public readonly duration: number = 0;
  public readonly penUuid: string = '';
  public readonly windowStyleUuid: string = '';
  public readonly windowPositionUuid: string = '';

  constructor(
    initParams: YTTParagraphInterface | YTTSpanInterface,
    parentDocument: YTT
  ) {
    super(initParams, parentDocument);
  }
};

// YTT Class Member Interfaces
interface YTTIntermediateFormat {
  pens: YTTPenInterface[],
  windowStyles: YTTWindowStyleInterface[],
  windowPositions: YTTWindowPositionInterface[],
  paragraphs: YTTParagraphInterface[],
};

interface YTTIndex {
  [key: string]: YTTElement,
};

// YTT Class
export default class YTT {
  private readonly pens: YTTPen[];
  private readonly windowStyles: YTTWindowStyle[];
  private readonly windowPositions: YTTWindowPosition[];
  private readonly paragraphs: YTTParagraph[];
  private readonly index: YTTIndex = {};

  constructor(intermediate?: YTTIntermediateFormat) {
    if(intermediate) {
      this.pens = intermediate?.pens?.map((pen: YTTPenInterface): YTTPen => {
        return new YTTPen(pen, this);
      }) || [];
      this.windowStyles = intermediate?.windowStyles?.map((windowStyle: YTTWindowStyleInterface): YTTWindowStyle => {
        return new YTTWindowStyle(windowStyle, this);
      }) || [];
      this.windowPositions = intermediate?.windowPositions?.map((windowPosition: YTTWindowPositionInterface): YTTWindowPosition => {
        return new YTTWindowPosition(windowPosition, this);
      }) || [];
      this.paragraphs = intermediate?.paragraphs?.map((paragraph: YTTParagraphInterface): YTTParagraph => {
        return new YTTParagraph(paragraph, this);
      }) || [];
      for(const element of [
        ...this.pens,
        ...this.windowStyles,
        ...this.windowPositions,
        ...this.paragraphs,
        ...this.paragraphs.map((p: YTTParagraph) => {
          return p.children;
        }).flat(),
      ]) {
        const uuid: string = element.uuid || uuidv4();
        this.index[uuid] = element;
      }
    }
    else {
      this.pens = [];
      this.windowStyles = [];
      this.windowPositions = [];
      this.paragraphs = [];
    }
  }

  private add<T extends YTTElement>(element: T, container: T[]): YTT {
    container.push(element);
    assert(element.uuid);
    this.index[element.uuid] = element;
    return this;
  }

  private sortByStartTime(container: YTTBodyElement[], asc: boolean = true): YTT {
    container.sort((a: YTTBodyElement, b: YTTBodyElement): number => {
      return (a.startTime - b.startTime) * (asc ? 1 : -1);
    });
    return this;
  }

  addHead<T extends YTTHeadElement>(element: T, container: T[]): YTT {
    this.add<T>(element, container);
    return this;
  }

  addBody<T extends YTTBodyElement>(element: T, container: T[]): YTT {
    this.add<T>(element, container);
    this.sortByStartTime(container, true);
    return this;
  }

  addPen(pen: YTTPen): YTT {
    return this.addHead<YTTPen>(pen, this.pens);
  }

  addWindowStyle(windowStyle: YTTWindowStyle): YTT {
    return this.addHead<YTTWindowStyle>(windowStyle, this.windowStyles);
  }

  addWindowPosition(windowPosition: YTTWindowPosition): YTT {
    return this.addHead<YTTWindowPosition>(windowPosition, this.windowPositions);
  }

  addParagraph(paragraph: YTTParagraph): YTT {
    return this.addBody<YTTParagraph>(paragraph, this.paragraphs);
  }

  export(): YTTIntermediateFormat {
    return {
      pens: this.pens.map((pen: YTTPen): YTTPenInterface => {
        return pen.export();
      }),
      windowStyles: this.windowStyles.map((windowStyle: YTTWindowStyle): YTTWindowStyleInterface => {
        return windowStyle.export();
      }),
      windowPositions: this.windowPositions.map((windowPosition: YTTWindowPosition): YTTWindowPositionInterface => {
        return windowPosition.export();
      }),
      paragraphs: this.paragraphs.map((paragraph: YTTParagraph): YTTParagraphInterface => {
        return paragraph.export();
      }),
    };
  }
};
