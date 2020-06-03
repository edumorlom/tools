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
import Row from "./Row";
import Configuration from './Configuration.json'

type Props = {
    charts: string[],
    allData: {},
    selectedDate: string,
    region: string,
    ISOSelectedDate: string,
    dcidMap: {},
    selectedRegion: string,
    selectedShowTopN: number,
    selectedLast: string,
}
export default function Answer(props: Props) {
    const rows = props.charts.map(dataId =>
        <Row data={props.allData}
             typeOfData={dataId}
             selectedDate={props.selectedDate}
             selectedLast={props.selectedLast}
             ISOSelectedDate={props.ISOSelectedDate}
             region={props.selectedRegion}
             dcidMap={props.dcidMap}
             selectedShowTopN={props.selectedShowTopN}/>)

    return (
        <div className={"container"}>
            {rows}
            <h5 className={"footer"}>{Configuration.FOOTER}</h5>
        </div>
    )
}