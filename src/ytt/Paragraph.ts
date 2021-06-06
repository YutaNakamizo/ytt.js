import YTT, {
  YTTBodyElement,
} from '../index';
import {
  YTTSpan,
  YTTSpanInterface,
} from './Span';

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
export class YTTParagraph extends YTTBodyElement {
  public readonly type: 'ytt#paragraph' = 'ytt#paragraph';
  public readonly children: YTTSpan[] = [];

  constructor(initParams: YTTParagraphInterface, parentDocument: YTT) {
    super(initParams, parentDocument);
    this.children = initParams.children?.map((span: YTTSpanInterface) => {
      return new YTTSpan(span, this.parentDocument);
    });
  }

  addSpan(span: YTTSpan): YTTParagraph {
    this.parentDocument.addBody(span, this.children);
    return this;
  };
};
