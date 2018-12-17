import React, {Component} from 'react';

export default class StepSummary extends Component {
    constructor() {
        super();

        this.state = {
            data: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.data
        };
    }

    render() {
        return (
            <div className="step-summary">
                <div className="title">Summary</div>

                <div className="content">
                    {
                        this.state.data.map((stepData, index) => <div key={index}>{stepData.list.find(x => x.selected).value}</div>)
                    }
                </div>
            </div>
        );
    }
}