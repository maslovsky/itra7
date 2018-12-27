import React from 'react';

import {IDataModel} from '../../../models/data-model';

interface IStepSummaryProps {
    data: Array<IDataModel>
}

export default function StepSummary(props: IStepSummaryProps) {
    return (
        <div className="step-summary">
            <div className="title">Summary</div>

            <div className="content">
                {props.data.map(getSummaryRow)}
            </div>
        </div>
    );
}

function getSummaryRow(stepData: IDataModel, index: number) {
    return (<div key={index}>{stepData.list.find(x => !!x.selected)!.value}</div>);
}