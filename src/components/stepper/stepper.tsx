import React, {Component} from 'react';

import Step from './step/step';
import StepSummary from './step-summary/step-summary';

import {IDataModel} from '../../models/data-model';

import './stepper.css';

interface IStepperState {
    activeStepIndex: number,
    data: Array<IDataModel>
}

interface IStepperProps {
    data: Array<IDataModel>
}

export default class Stepper extends Component<IStepperProps, IStepperState> {
    constructor(props: IStepperProps) {
        super(props);

        this.state = {
            activeStepIndex: 0,
            data: props.data
        };
    }

    stepForward() {
        const {activeStepIndex} = this.state;

        this.setState({activeStepIndex: activeStepIndex + 1});
    }

    stepBack() {
        const {activeStepIndex} = this.state;

        this.setState({activeStepIndex: activeStepIndex - 1});
    }

    onSelect(activeStepIndex: number, id: number | null) {
        const newData: Array<IDataModel> = Object.assign([], this.state.data);

        newData[activeStepIndex].list.forEach(x => x.selected = x.id === id);

        this.setState({data: newData});
    }

    getStepSource() {
        const currentStepData = this.state.data[this.state.activeStepIndex];

        if (this.state.activeStepIndex === 0) {
            return currentStepData;
        }

        const selectedParentId = this.state.data[this.state.activeStepIndex - 1].list.find(x => !!x.selected)!.id;

        const filteredList = currentStepData.list.filter(x => x.prevStepId === selectedParentId || x.prevStepId === undefined);

        return Object.assign({}, currentStepData, {list: filteredList});
    }

    render() {
        return (
            <div className="stepper-container">
                {
                    (this.state.activeStepIndex < this.state.data.length ? this.renderStep() : this.renderStepSummary())
                }

                <div className="navigation">
                    <button className="back" onClick={this.stepBack.bind(this)} disabled={this.state.activeStepIndex === 0}>Back</button>
                    <button className="next" onClick={this.stepForward.bind(this)} disabled={!this.canStepForward()}>Next</button>
                </div>
            </div>
        )
    }

    canStepForward() {
        return this.state.activeStepIndex < this.state.data.length && this.hasSelectedValue();
    }

    hasSelectedValue() {
        const currentSource = this.state.data[this.state.activeStepIndex].list;
        return currentSource.some(x => !!x.selected && x.id !== null);
    }

    renderStep() {
        const stepSource = this.getStepSource();

        return (
            <Step data={stepSource}
                  onSelect={this.onSelect.bind(this, this.state.activeStepIndex)} />
        )
    }

    renderStepSummary() {
        return (<StepSummary data={this.state.data} />);
    }
};