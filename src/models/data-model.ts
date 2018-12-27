export interface IDataItemModel {
    id: number | null,
    value: string,
    prevStepId?: number,
    selected?: boolean
}

export interface IDataModel {
    title: string,
    list: Array<IDataItemModel>
}