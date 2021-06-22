import {
  YTTElement,
  YTTBodyElement,
  YTTBodyElementInterface,
} from '..';
import {
  YTTSpan,
  YTTSpanInterface,
} from './Span';

export interface YTTParagraphInterface {
  type: 'ytt#paragraph',
  uuid?: string,
  startTime: number,
  duration: number,
  children?: YTTBodyElementInterface[],
};

export class YTTParagraph extends YTTBodyElement {
  public readonly type: 'ytt#paragraph' = 'ytt#paragraph';
  public readonly children: YTTBodyElement[] = [];

  constructor(paragraphProps: YTTParagraphInterface) {
    super(paragraphProps);
    this.parse(paragraphProps);
  }

  private parse(paragraphProps: YTTParagraphInterface): void {
    for(const child of paragraphProps.children || []) {
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

  export(): YTTParagraphInterface {
    return {
      type: 'ytt#paragraph',
      uuid: this.uuid,
      startTime: this.startTime,
      duration: this.duration,
      children: this.children.map((child: YTTBodyElement): YTTBodyElementInterface => {
        return child.export();
      }),
    };
  }
};
