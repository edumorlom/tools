/**
 Copyright 2020 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import React from 'react';
import Configuration from './Configuration.json'
import Answer from "./Answer";
import Questions from './Questions.json'
// @ts-ignore
import QuestionSelection from './QuestionSelection';

type State = {
    screen: string,
    allData: {}, // copy of all the unparsed data
    selectedQuestion: string,
    selectedLast: string,
    selectedRegion: string, // current region selected
    selectedShowTopN: number, // default number of top counties/states to show
    selectedDate: string, // current date selected, latest is always default
    availableRegions: {}, // region -> geoId
    availableDates: {}, // id -> ISOdate
    availableShowTopN: number[], // available numbers to view, example: Top 10, Top 20, Top 30
    availableLast: {} // range example: last day, last 2 weeks, last month
    dcidMap: {}, // converts geoId to the region's name
}

class App extends React.Component <{}, State> {
    constructor(props: {}) {
        super(props);
        // Request latest data from server.
        this.sendRequest().then(r => console.log("Data has been loaded!"))
        window.addEventListener('popstate', (event) => {
            this.setState({screen: "questionSelection"})
        });
        window.history.pushState({name: "browserBack"}, "on browser back click", window.location.href);
    }

    state = {
        screen: "questionSelection",
        allData: {},
        selectedLast: Configuration.DEFAULT_LAST,
        selectedQuestion: Configuration.DEFAULT_QUESTION,
        selectedRegion: Configuration.DEFAULT_REGION,
        selectedShowTopN: Configuration.DEFAULT_SHOWTOPN,
        selectedDate: Configuration.DEFAULT_DATE,
        availableRegions: Configuration.REGIONS,
        availableDates: Configuration.DATES,
        availableShowTopN: Configuration.SHOWTOPN,
        availableLast: Configuration.LAST,
        dcidMap: {},
    }

    /**
     * In charge of changing the state when the region, date or showTopN are updated.
     * @param key
     * @param value
     */
    handleSelectUpdate = (key: string, value) =>{
        switch(key){
            case 'selectedRegion':
                this.setState({selectedRegion: value})
                break;
            case 'selectedDate':
                this.setState({selectedDate: value})
                break;
            case 'selectedQuestion':
                this.setState({selectedQuestion: value})
                break;
            case 'selectedShowTopN':
                this.setState({selectedShowTopN: value})
                break;
            case 'selectedLast':
                this.setState({selectedLast: value})
                break;
        }
    }

    /**
     * Sends AJAX request to get all the data from the server.
     * Stores the dates, dcidMap (converts geoId to name) and all the data.
     */
    sendRequest = async () => {
        const host = window.location.protocol + '//' + window.location.hostname
        const url: string = `${host}/get-all-data`
        await fetch(url, {mode: 'cors'}).then(response => response.json().then(res => {
            this.setState({availableDates: res['availableDates']})
            this.setState({availableRegions: {...this.state.availableRegions, ...res['availableRegions']}})
            this.setState({dcidMap: res['dcidMap']})
            this.setState({allData: res})
        }))
    }

    getAnswer = () => {
        this.setState({screen: "answer"})
    }

    getTitle = () => {
        return  <h1 className={"main-title"}>
                    {Configuration.TITLE + ' '}
                    <span style={{color: "#990001"}}>{Configuration.SUBTITLE}</span>
                </h1>
    }

    getContent = () => {
        if (this.state.screen === "questionSelection") {
            return <QuestionSelection handleSelectUpdate={this.handleSelectUpdate}
                                      availableRegions={this.state.availableRegions}
                                      availableDates={this.state.availableDates}
                                      availableLast={this.state.availableLast}
                                      onSubmit={this.getAnswer}/>
        } else {
            return <Answer charts={Questions[this.state.selectedQuestion].charts}
                           allData={this.state.allData}
                           selectedRegion={this.state.selectedRegion}
                           selectedDate={this.state.selectedDate}
                           selectedLast={this.state.selectedLast}
                           ISOSelectedDate={this.state.availableDates[this.state.selectedDate]}
                           region={this.state.selectedRegion}
                           dcidMap={this.state.dcidMap}
                           selectedShowTopN={this.state.selectedShowTopN}/>
        }
    }
    
    render = () => {
        return (
            <>
              {this.getTitle()}
              {this.getContent()}
            </>
        )
    }


}

export default App;
