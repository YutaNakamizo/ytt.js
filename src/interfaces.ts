import {
  v4 as uuidv4,
} from 'uuid';

// YTT Document Types
export type YTTElementInterface = YTTPenInterface | YTTWindowStyleInterface | YTTWindowPositionInterface | YTTParagraphInterface | YTTSpanInterface;
export const YTTElement = class {
  uuid: string;

  constructor(initParams: YTTElementInterface) {
    Object.assign(this, initParams);
    this.uuid = uuidv4();
  }
};

// YTT Header Interfaces
export interface YTTPenInterface {
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
export const YTTPen = class extends YTTElement implements YTTPenInterface {
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

  constructor(initParams: YTTPenInterface) {
    super(initParams);
  }
};

export interface YTTWindowStyleInterface {
  type: 'ytt#windowStyle',
  uuid?: string,
  justify: 'vertical' | 'horizontal',
  printDirection: number,
  scrollDirection: number,
};
export const YTTWindowStyle = class extends YTTElement implements YTTWindowStyleInterface {
  type: 'ytt#windowStyle' = 'ytt#windowStyle';
  uuid: string = '';
  justify: 'vertical' | 'horizontal' = 'horizontal';
  printDirection: number = 0;
  scrollDirection: number = 0;

  constructor(initParams: YTTWindowStyleInterface) {
    super(initParams);
  }
};

export interface YTTWindowPositionInterface {
  type: 'ytt#windowPosition',
  uuid?: string,
  anchorPoint: number,
  anchorHorizontal: number,
  anchorVertical: number,
};
export const YTTWindowPosition = class extends YTTElement implements YTTWindowPositionInterface {
  type: 'ytt#windowPosition' = 'ytt#windowPosition';
  uuid: string = '';
  anchorPoint: number = 7;
  anchorHorizontal: number = 50;
  anchorVertical: number = 100;
  
  constructor(initParams: YTTWindowStyleInterface) {
    super(initParams);
  }
};

// YTT Body Interfaces
export interface YTTParagraphInterface {
  type: 'ytt#paragraph',
  uuid?: string,
  startTime: number,
  duration: number,
  penUuid: string,
  windowStyleUuid: string,
  windowPositionUuid: string,
  children: YTTSpanInterface[],
};
export const YTTParagraph = class extends YTTElement implements YTTParagraphInterface {
  type: 'ytt#paragraph' = 'ytt#paragraph';
  uuid: string = '';
  startTime: number = 0;
  duration: number = 0;
  penUuid: string = '';
  windowStyleUuid: string = '';
  windowPositionUuid: string = '';
  children: YTTSpanInterface[] = [];

  constructor(initParams: YTTParagraphInterface) {
    super(initParams);
  }
};

export interface YTTSpanInterface {
  type: 'ytt#span',
  uuid?: string,
  startTime: number,
  duration: number,
  penUuid: string,
  windowStyleUuid: string,
  windowPositionUuid: string,
};
export const YTTSpan = class extends YTTElement implements YTTSpanInterface {
  type: 'ytt#span' = 'ytt#span';
  uuid: string = '';
  startTime: number = 0;
  duration: number = 0;
  penUuid: string = '';
  windowStyleUuid: string = '';
  windowPositionUuid: string = '';

  constructor(initParams: YTTSpanInterface) {
    super(initParams);
  }
};
