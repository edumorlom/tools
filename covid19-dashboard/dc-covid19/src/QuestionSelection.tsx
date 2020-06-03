import React, {ChangeEvent} from "react";
import Configuration from './Configuration.json'
import Questions from './Questions.json'
import './question-selection.css'
import PrettifyDate from "./PrettifyDate";

type Props = {
    handleSelectUpdate: any,
    onSubmit: any,
    availableRegions: {},
    availableDates: {},
    availableLast: {}
}

export default class QuestionSelection extends React.Component <Props, {}> {

    state = {
        subRegion: 'state',
        region: "USA",
        last: Configuration.DEFAULT_LAST
    }

    handleSelect = (e: ChangeEvent) => {
        const newSelection: string = (e.target as HTMLInputElement).value
        const id: string = (e.target as HTMLInputElement).id
        this.props.handleSelectUpdate("selected" + id, newSelection)
    }

    handleSubRegion = (e: ChangeEvent) => {
        const newSelection: string = (e.target as HTMLInputElement).value
        console.log(newSelection)
        this.setState({subRegion: newSelection})
    }

    handleRegion = (e: ChangeEvent) => {
        const newSelection: string = (e.target as HTMLInputElement).value
        console.log(newSelection)
        this.setState({region: newSelection})
    }

    handleLast = (e: ChangeEvent) => {
        const newSelection: string = (e.target as HTMLInputElement).value
        this.setState({last: newSelection})
        this.props.handleSelectUpdate('selectedLast', this.state.last)
    }

    onSubmit = () => {
        if (this.state.region === 'USA') {
            this.props.handleSelectUpdate('selectedRegion', this.state.subRegion)
        } else {
            this.props.handleSelectUpdate('selectedRegion', this.state.region)
        }
        this.props.onSubmit()
    }

    render() {
        const showTopNOptions: JSX.Element[] = Configuration.SHOWTOPN.map(
            n => <option value={n}>Top {n}</option>)

        // If county, then add a space after it
        const regionOptions: JSX.Element[] = Object.keys(this.props.availableRegions).map(region => {
            let regionName = this.props.availableRegions[region]
            if (region !== 'USA') regionName += ", USA"
            return <option value={region}>{regionName}</option>
        })

        // If county, then add a space after it
        const questionOptions: JSX.Element[] = Object.keys(Questions).map(questionId => {
            return (
                <React.Fragment>
                    <option value={questionId}>{Questions[questionId]["text"]}</option>
                </React.Fragment>)
        })

        // Sort all available dates
        const sortedDates: string[]= Object.keys(this.props.availableDates).sort((a, b) =>
                (this.props.availableDates[a] > this.props.availableDates[b]) ? -1 :
                    ((this.props.availableDates[a] < this.props.availableDates[b]) ? 1 : 0))

        // Get all the date options
        const dateOptions: JSX.Element[] = sortedDates.map(date => <option value={date}>{PrettifyDate(this.props.availableDates[date])}</option>)

        const lastOptions: JSX.Element[] = Object.keys(this.props.availableLast).map(last =>
            <option value={last}>{this.props.availableLast[last]}</option>)

        return (
            <div className={"container"}>
                <div className={"centered shadow question-panel"}>
                    <div>
                        <select className="dropdown" onChange={this.handleSubRegion} id={"SubRegion"} defaultValue={this.state.subRegion}>
                            {this.state.region === "USA" && <option value={"state"}>States</option>}
                            <option value={"county"}>Counties</option>
                        </select>
                    <a>that have</a>
                    </div>
                    <div>
                        <select className="dropdown" onChange={this.handleSelect} id={"Question"} defaultValue={Configuration.DEFAULT_QUESTION}>
                        {questionOptions}
                        </select>
                            <a>in</a>
                        </div>
                    <div>
                    <select className="dropdown" onChange={this.handleRegion} id={"Region"} defaultValue={this.state.region}>
                        {regionOptions}
                    </select>
                    <a>during the</a>'
                    </div>
                        <div>
                    <select className="dropdown" onChange={this.handleLast} id={"Last"} defaultValue={this.state.last}>
                        {lastOptions}
                    </select>
                    <a>{this.state.last === "daily" ? "of" : "before"}</a>
                    <select className="dropdown" onChange={this.handleSelect} id={"Date"} defaultValue={Configuration.DEFAULT_DATE}>
                        {dateOptions}
                    </select>
                        </div>
                </div>
                <div id={"submit"}>
                    <button onClick={this.onSubmit} className={"shadow"}>View Charts</button>
                </div>
            </div>
        )
    }
}