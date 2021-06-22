import { threadId } from 'worker_threads';
import {
  YTTElement,
  YTTBodyElement,
  YTTBodyElementInterface,
} from '..';
import {
  YTTParagraph,
  YTTParagraphInterface,
} from './Paragraph';

export interface YTTSpanInterface {
  type: 'ytt#span',
  uuid?: string,
  startTime: number,
  duration: number,
  children?: YTTBodyElementInterface[],
};

export class YTTSpan extends YTTBodyElement {
  public readonly type: 'ytt#span' = 'ytt#span';
  public readonly children: YTTBodyElement[] = [];

  constructor(spanProps: YTTSpanInterface) {
    super(spanProps);
    this.parse(spanProps);
  }

  private parse(spanProps: YTTSpanInterface): void {
    for(const child of spanProps.children || []) {
      const element: YTTBodyElement = (() => {
        switch(child.type) {
          case 'ytt#paragraph': {
            return new YTTParagraph(child);
          }
          case 'ytt#span': {
            return new YTTSpan(child);
          }
        }
      })();
      this.add(element);
    }
    return;
  }

  export(): YTTSpanInterface {
    return {
      type: 'ytt#span',
      uuid: this.uuid,
      startTime: this.startTime,
      duration: this.duration,
      children: this.children.map((child: YTTBodyElement): YTTBodyElementInterface => {
        return child.export();
      }),
    };
  }
};
