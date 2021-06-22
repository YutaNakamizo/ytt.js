import {
  YTTElement,
  YTTBodyElement,
  YTTBodyElementInterface,
} from "..";
import {
  YTTParagraph,
  YTTParagraphInterface,
} from './Paragraph';
import {
  YTTSpan,
  YTTSpanInterface,
} from './Span';

export interface YTTRootInterface {
  type: 'ytt#root',
  uuid?: string,
  children?: YTTBodyElementInterface[],
};

export class YTTRoot extends YTTElement {
  public readonly type: 'ytt#root' = 'ytt#root';

  constructor(rootProps?: YTTRootInterface) {
    super(rootProps);
    if(rootProps) this.parse(rootProps);
  }

  private parse(rootProps: YTTRootInterface): void {
    for(const child of rootProps.children || []) {
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
  };

  export(): YTTRootInterface {
    return {
      type: 'ytt#root',
      uuid: this.uuid,
      children: this.children.map((child: YTTBodyElement): YTTBodyElementInterface => {
        return child.export();
      }),
    }
  }
};
