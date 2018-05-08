import { MatTableDataSource } from '@angular/material';

export class List<T> {
  private _dataSource = new MatTableDataSource<T>();

  constructor(data: T[]) {
    this._dataSource.data = data;
  }

  public get dataSource() {
    return this._dataSource;
  }

  add(item: T): void {
    this._dataSource.data.push(item);
    this.refreshDataSource();
  }

  remove(predicate: (item: T) => boolean) {
    const index = this._dataSource.data.findIndex(item => predicate(item));
    this._dataSource.data.splice(index, 1);
    this.refreshDataSource();
  }

  update(entry: T, predicate: (item: T) => boolean): void {
    const index = this._dataSource.data.findIndex(item => predicate(item));
    this._dataSource.data[index] = Object.assign({}, entry);
    this.refreshDataSource();
  }

  private refreshDataSource(): void {
    this._dataSource.data = this.dataSource.data.splice(0);
  }
}
