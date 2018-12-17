import React, {Component} from 'react';

export default class Step extends Component {
    constructor() {
        super();

        this.state = {
            selectedId: null,
            data: null
        };
    }

    static getDerivedStateFromProps(props, state) {
        const selectedItem = props.data.list.find(x => x.selected) || {id: null};

        return {
            selectedId: selectedItem.id,
            data: props.data
        };
    }

    onSelect(eventData) {
        const selectedId = parseInt(eventData.target.value) || null;

        this.setState({selectedId});

        this.props.onSelect(selectedId)
    }

    render() {
        const selectedId = this.state.selectedId === null
            ? ''
            : this.state.selectedId;

        const options =  this.state.data.list.map(getOption);

        return (
            <div className="step">
                <div className="title">{this.state.data.title}</div>

                <div className="content">
                    <select value={selectedId} onChange={this.onSelect.bind(this)}>
                        {options}
                    </select>
                </div>
            </div>
        );
    }
}

function getOption(data, index) {
    return (<option value={data.id} key={index}>{data.value}</option>);
}