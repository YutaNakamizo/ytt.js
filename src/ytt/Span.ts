import YTT, {
  YTTBodyElement,
} from '../index';

export interface YTTSpanInterface {
  type: 'ytt#span',
  uuid?: string,
  startTime: number,
  duration: number,
  penUuid: string,
  windowStyleUuid: string,
  windowPositionUuid: string,
};
export class YTTSpan  extends YTTBodyElement {
  public readonly type: string = 'ytt#span';

  constructor(initParams: YTTSpanInterface, parentDocument: YTT) {
    super(initParams, parentDocument);
  }

  export(): YTTSpanInterface {
    return {
      type: 'ytt#span',
      uuid: this.uuid,
      startTime: this.startTime,
      duration: this.duration,
      penUuid: this.penUuid,
      windowStyleUuid: this.windowStyleUuid,
      windowPositionUuid: this.windowPositionUuid,
    };
  }
};
