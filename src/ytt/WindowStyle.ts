import YTT, {
  YTTHeadElement,
} from '../index';

export interface YTTWindowStyleInterface {
  type: 'ytt#windowStyle',
  uuid?: string,
  justify: 'vertical' | 'horizontal',
  printDirection: number,
  scrollDirection: number,
};
export class YTTWindowStyle extends YTTHeadElement {
  public readonly type: string = 'ytt#windowStyle';
  public readonly justify: 'vertical' | 'horizontal' = 'horizontal';
  public readonly printDirection: number = 0;
  public readonly scrollDirection: number = 0;

  constructor(initParams: YTTWindowStyleInterface, parentDocument: YTT) {
    super(initParams, parentDocument);
  }
};
