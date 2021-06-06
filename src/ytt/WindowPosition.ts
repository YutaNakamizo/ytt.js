import YTT, {
  YTTHeadElement,
} from '../index';

export interface YTTWindowPositionInterface {
  type: 'ytt#windowPosition',
  uuid?: string,
  anchorPoint: number,
  anchorHorizontal: number,
  anchorVertical: number,
};
export class YTTWindowPosition extends YTTHeadElement {
  public readonly type: string = 'ytt#windowPosition';
  public readonly anchorPoint: number = 7;
  public readonly anchorHorizontal: number = 50;
  public readonly anchorVertical: number = 100;
  
  constructor(initParams: YTTWindowPositionInterface, parentDocument: YTT) {
    super(initParams, parentDocument);
  }

  export(): YTTWindowPositionInterface {
    return {
      type: 'ytt#windowPosition',
      uuid: this.uuid,
      anchorPoint: this.anchorPoint,
      anchorHorizontal: this.anchorHorizontal,
      anchorVertical: this.anchorVertical,
    };
  }
};
