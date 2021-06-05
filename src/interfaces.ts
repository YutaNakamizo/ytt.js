import {
  v4 as uuidv4,
} from 'uuid';
import YTT from './index';

// YTT Document Types
export type YTTElementInterface = YTTPenInterface | YTTWindowStyleInterface | YTTWindowPositionInterface | YTTParagraphInterface | YTTSpanInterface;
export class YTTElement {
  uuid: string;
  parentDocument: YTT;

  constructor(initParams: YTTElementInterface, parentDocument: YTT) {
    Object.assign(this, initParams);
    this.uuid = uuidv4();
    this.parentDocument = parentDocument;
  }
};

// YTT Header Interfaces
interface YTTPenInterface {
  type: 'ytt#pen',
  uuid?: string,
  bold: boolean,
  italic: boolean,
  underline: boolean,
  fontColor: string,
  fontOpacity: number,
  backgroundColor: string,
  backgroudOpacity: number,
  edgeColor: string,
  edgeType: number,
  fontStyle: number,
  fontSize: number,
  ruby: number,
  offset: number,
  textEnphasis: number,
  textCombinations: boolean,
};
export class YTTPen extends YTTElement {
  type:'ytt#pen' = 'ytt#pen';
  uuid: string = '';
  bold: boolean = false;
  italic: boolean = false;
  underline: boolean = false;
  fontColor: string = '#FFFFFF';
  fontOpacity: number = 255;
  backgroundColor: string = '#000000';
  backgroudOpacity: number = 255;
  edgeColor: string = '#000000';
  edgeType: number = 1;
  fontStyle: number = 0;
  fontSize: number = 100;
  ruby: number = 1;
  offset: number = 0;
  textEnphasis: number = 0;
  textCombinations: boolean = false;

  constructor(initParams: YTTPenInterface, parentDocument: YTT) {
    super(initParams, parentDocument);
  }
};

interface YTTWindowStyleInterface {
  type: 'ytt#windowStyle',
  uuid?: string,
  justify: 'vertical' | 'horizontal',
  printDirection: number,
  scrollDirection: number,
};
export class YTTWindowStyle extends YTTElement {
  type: 'ytt#windowStyle' = 'ytt#windowStyle';
  uuid: string = '';
  justify: 'vertical' | 'horizontal' = 'horizontal';
  printDirection: number = 0;
  scrollDirection: number = 0;

  constructor(initParams: YTTWindowStyleInterface, parentDocument: YTT) {
    super(initParams, parentDocument);
  }
};

interface YTTWindowPositionInterface {
  type: 'ytt#windowPosition',
  uuid?: string,
  anchorPoint: number,
  anchorHorizontal: number,
  anchorVertical: number,
};
export class YTTWindowPosition extends YTTElement {
  type: 'ytt#windowPosition' = 'ytt#windowPosition';
  uuid: string = '';
  anchorPoint: number = 7;
  anchorHorizontal: number = 50;
  anchorVertical: number = 100;
  
  constructor(initParams: YTTWindowStyleInterface, parentDocument: YTT) {
    super(initParams, parentDocument);
  }
};

// YTT Body Interfaces
interface YTTParagraphInterface {
  type: 'ytt#paragraph',
  uuid?: string,
  startTime: number,
  duration: number,
  penUuid: string,
  windowStyleUuid: string,
  windowPositionUuid: string,
  children: YTTSpanInterface[],
};
export class YTTParagraph extends YTTElement {
  type: 'ytt#paragraph' = 'ytt#paragraph';
  uuid: string = '';
  startTime: number = 0;
  duration: number = 0;
  penUuid: string = '';
  windowStyleUuid: string = '';
  windowPositionUuid: string = '';
  children: YTTSpan[] = [];

  constructor(initParams: YTTParagraphInterface, parentDocument: YTT) {
    super(initParams, parentDocument);
  }

  addSpan(span: YTTSpan): YTTParagraph {
    this.children.push(span);
    const uuid = span.uuid || uuidv4();
    this.parentDocument.index[uuid] = span;
    return this;
  }
};

interface YTTSpanInterface {
  type: 'ytt#span',
  uuid?: string,
  startTime: number,
  duration: number,
  penUuid: string,
  windowStyleUuid: string,
  windowPositionUuid: string,
};
export class YTTSpan  extends YTTElement implements YTTSpanInterface {
  type: 'ytt#span' = 'ytt#span';
  uuid: string = '';
  startTime: number = 0;
  duration: number = 0;
  penUuid: string = '';
  windowStyleUuid: string = '';
  windowPositionUuid: string = '';

  constructor(initParams: YTTSpanInterface, parentDocument: YTT) {
    super(initParams, parentDocument);
  }
};
