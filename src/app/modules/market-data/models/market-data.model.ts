export class MarketDataItemModel {
  public d: Date;
  public v: number;
  public key: string;
  public hasPercent: boolean;
  public isNegative: boolean;

  constructor(key: string, value: number, date: string) {
    this.key = this.mapKey(key);
    this.d = date ? new Date(date) : undefined;
    this.v = value ? value : undefined;
    this.isNegative = value < 0;
  }

  private mapKey(key: string) {
    switch(key) {
      case 'CLOSE_ADJ_NORM': return 'Close';
      case 'LVAL_NORM': return 'Last';
      case 'NC2_PR_NORM': {
        this.hasPercent = true;
        return 'Day Change %';
      }
      case 'NC2_NORM': return 'Day Change';
      case 'VOL': return 'Volumen';
      case 'TUR': return 'Turnover';
      case 'PY_CLOSE': return 'Previous year close';
      case 'YTD_PR_NORM': {
        this.hasPercent = true;
        return 'YTD %';
      }
    }
  }
}