import {
  v4 as uuidv4,
} from 'uuid';
import {
  YTTRoot,
  YTTRootInterface,
} from './ytt/Root';
import {
  YTTParagraph,
  YTTParagraphInterface,
} from './ytt/Paragraph';
import {
  YTTSpan,
  YTTSpanInterface,
} from './ytt/Span';

// YTT Element
export type YTTBodyElementInterface = YTTParagraphInterface | YTTSpanInterface;
export type YTTElementInterface = YTTRootInterface | YTTParagraphInterface | YTTSpanInterface;

export class YTTElement {
  public readonly type: string = 'ytt#element';
  public readonly uuid: string;
  public readonly children: YTTBodyElement[] = [];

  constructor(props?: YTTElementInterface) {
    this.uuid = props?.uuid || uuidv4();
    if(props) {
      const _props = Object.fromEntries(
        Object.entries(props).map(([ key, value ]) => {
          return [ `_${key}`, value ];
        })
      );
      Object.assign(this, _props);
    }
  }

  add(element: YTTBodyElement): YTTElement {
    this.children.push(element);
    this.children.sort((a: YTTBodyElement, b: YTTBodyElement): number => {
      return (a.startTime - b.startTime);
    });
    return this;
  }

  export(): YTTElementInterface {
    return {
      type: 'ytt#root',
      uuid: this.uuid,
      children: [],
    };
  }
};

export class YTTBodyElement extends YTTElement {
  private _startTime: number = -1;
  private _duration: number = -1;

  get startTime() {
    return this['_startTime'];
  }
  set startTime(startTime: number) {
    this['_startTime'] = startTime;
  }

  get duration() {
    return this['_duration'];
  }
  set duration(duration: number) {
    this['_duration'] = duration;
  }

  export(): YTTBodyElementInterface {
    return {
      type: 'ytt#paragraph',
      uuid: this.uuid,
      startTime: -1,
      duration: -1,
      children: [],
    };
  }
}

// YTT Class
export default class YTT {
  static init(rootProps?: YTTRootInterface): YTTRoot {
    const root: YTTRoot = new YTTRoot(rootProps);
    return root;
  }
};
