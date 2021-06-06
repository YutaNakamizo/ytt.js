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
  public readonly type: 'ytt#span' = 'ytt#span';

  constructor(initParams: YTTSpanInterface, parentDocument: YTT) {
    super(initParams, parentDocument);
  }
};
