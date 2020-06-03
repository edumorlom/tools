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
import React from "react";
import PanelInfo from './PanelInfo.json'
import Panel from './Panel'
import prettifyDate from './PrettifyDate'

type Props = {
    data: {},
    typeOfData: string,
    selectedDate: string,
    region: string,
    ISOSelectedDate: string,
    selectedShowTopN: number,
    dcidMap: {},
    selectedLast: string
}

/**
 * Each row has two panels, where each panel contains a chart.
 * Each panel is either cases or deaths.
 * @param props
 * @constructor
 */
export default function Row(props: Props) {
    const prettifiedDate = prettifyDate(props.ISOSelectedDate)
    const sectionTitle = PanelInfo[props.typeOfData].sectionTitle.replace("{DATE}", prettifiedDate)
    const typeOfGraph = PanelInfo[props.typeOfData].typeOfGraph
    return (
        <div className={"row"}>
            {// If there is a section title, then show the text.
                sectionTitle && <h1 className={"section-title"}>{sectionTitle}</h1>}
            {// If there is a section title, then show a separator line as well.
                sectionTitle && <hr style={{width: '100%'}}/>}
            <div className={"left"}>
                <Panel dcidMap={props.dcidMap}
                       data={props.data}
                       selectedDate={props.selectedDate}
                       ISOSelectedDate={props.ISOSelectedDate}
                       label={"cases"}
                       region={props.region}
                       selectedShowTopN={props.selectedShowTopN}
                       typeOfData={props.typeOfData}
                       selectedLast={props.selectedLast}
                       typeOfGraph={typeOfGraph}/>
            </div>
            <div className={"right"}>
                <Panel dcidMap={props.dcidMap}
                       data={props.data}
                       selectedDate={props.selectedDate}
                       ISOSelectedDate={props.ISOSelectedDate}
                       label={"deaths"}
                       region={props.region}
                       selectedShowTopN={props.selectedShowTopN}
                       typeOfData={props.typeOfData}
                       selectedLast={props.selectedLast}
                       typeOfGraph={typeOfGraph}/>
            </div>
        </div>
    )
}