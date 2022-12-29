export default class WorkerBuilder {
  private static _intance: WorkerBuilder
  private static _worker: Worker
  public static get instance() {
    if (!this._intance) this._intance = new WorkerBuilder()
    return this._intance
  }
  public static get worker() {
    if (!this._worker) this._worker = new Worker("/wokers.js")
    return this._worker
  }
}
