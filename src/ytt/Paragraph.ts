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
  public readonly type: string = 'ytt#paragraph';
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

  export(): YTTParagraphInterface {
    return {
      type: 'ytt#paragraph',
      uuid: this.uuid,
      startTime: this.startTime,
      duration: this.duration,
      penUuid: this.penUuid,
      windowStyleUuid: this.windowStyleUuid,
      windowPositionUuid: this.windowPositionUuid,
      children: this.children.map((span: YTTSpan): YTTSpanInterface => {
        return span.export();
      }),
    };
  }
};
