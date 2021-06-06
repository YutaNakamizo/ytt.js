import YTT, {
  YTTHeadElement,
} from '../index';

// YTT Header Interfaces
export interface YTTPenInterface {
  type: 'ytt#pen',
  uuid?: string,
  bold: boolean,
  italic: boolean,
  underline: boolean,
  fontColor: string,
  fontOpacity: number,
  backgroundColor: string,
  backgroudOpacity: number,
  edgeColor: string,
  edgeType: number,
  fontStyle: number,
  fontSize: number,
  ruby: number,
  offset: number,
  textEnphasis: number,
  textCombinations: boolean,
};
export class YTTPen extends YTTHeadElement {
  public readonly type: string = 'ytt#pen';
  public readonly bold: boolean = false;
  public readonly italic: boolean = false;
  public readonly underline: boolean = false;
  public readonly fontColor: string = '#FFFFFF';
  public readonly fontOpacity: number = 255;
  public readonly backgroundColor: string = '#000000';
  public readonly backgroudOpacity: number = 255;
  public readonly edgeColor: string = '#000000';
  public readonly edgeType: number = 1;
  public readonly fontStyle: number = 0;
  public readonly fontSize: number = 100;
  public readonly ruby: number = 1;
  public readonly offset: number = 0;
  public readonly textEnphasis: number = 0;
  public readonly textCombinations: boolean = false;

  constructor(initParams: YTTPenInterface, parentDocument: YTT) {
    super(initParams, parentDocument);
  }

  export(): YTTPenInterface {
    return {
      type: 'ytt#pen',
      uuid: this.uuid,
      bold: this.bold,
      italic: this.italic,
      underline: this.underline,
      fontColor: this.fontColor,
      fontOpacity: this.fontOpacity,
      backgroundColor: this.backgroundColor,
      backgroudOpacity: this.backgroudOpacity,
      edgeColor: this.edgeColor,
      edgeType: this.edgeType,
      fontStyle: this.fontStyle,
      fontSize: this.fontSize,
      ruby: this.ruby,
      offset: this.offset,
      textEnphasis: this.textEnphasis,
      textCombinations: this.textCombinations,
    };
  }
};
