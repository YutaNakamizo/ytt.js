// YTT Header Interfaces
export interface YTTPen {
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
  textCombinations: number,
};

export interface YTTWindowStyle {
  type: 'ytt#windowStyle',
  uuid?: string,
  justify: 'vertical' | 'horizontal',
  printDirection: number,
  scrollDirection: number,
};

export interface YTTWindowPosition {
    type: 'ytt#windowPosition',
    uuid?: string,
    anchorPoint: number,
    anchorHorizontal: number,
    anchorVertical: number,
};

// YTT Body Interfaces
export interface YTTParagraph {
  type: 'ytt#paragraph',
  uuid?: string,
  startTime: number,
  duration: number,
  penUuid: string,
  windowStyleUuid: string,
  windowPositionUuid: string,
  children: YTTSpan[],
};

export interface YTTSpan {
  type: 'ytt#span',
  uuid?: string,
  startTime: number,
  duration: number,
  penUuid: string,
  windowStyleUuid: string,
  windowPositionUuid: string,
};

// YTT Document Types
export type YTTElement = YTTPen | YTTWindowStyle | YTTWindowPosition | YTTParagraph | YTTSpan;

// YTT Class Member Interfaces
export interface YTTIntermediateFormat {
  pens: YTTPen[],
  windowStyles: YTTWindowStyle[],
  windowPositions: YTTWindowPosition[],
  paragraphs: YTTParagraph[],
};

export interface YTTIndex {
  [key: string]: YTTElement,
};
