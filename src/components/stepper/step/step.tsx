import React from 'react';

import {IDataItemModel, IDataModel} from '../../../models/data-model';

interface IStepProps {
    data: IDataModel,
    onSelect: (id: number | null) => void
}

export default function Step(props: IStepProps) {
    const selectedItem = props.data.list.find(x => !!x.selected) || {id: ''};

    const options = props.data.list.map(getOption);

    return (
        <div className="step">
            <div className="title">{props.data.title}</div>

            <div className="content">
                <select value={selectedItem.id || ''} onChange={onSelect.bind(null, props)}>
                    {options}
                </select>
            </div>
        </div>
    );
}

function onSelect(props: IStepProps, eventData: React.FormEvent<HTMLSelectElement>) {
    const selectedId = parseInt(eventData.currentTarget.value) || null;

    props.onSelect(selectedId);
}

function getOption(data: IDataItemModel, index: number) {
    return (<option value={data.id || 'null'} key={index}>{data.value}</option>);
}