import React from 'react';
import numberWithCommas from "./NumberWithCommas";
import {Bar, BarChart, LabelList, Tooltip, XAxis, YAxis} from 'recharts'
import ToolTipContent from "./ToolTipContent";

type dataHolder = {regionName: string, value: number, absolute: number, population: number, dcid: string, labelListLabel: string}
type Props = {data: dataHolder[], label: string, region: string, color: string, dcidMap: {}, showTopN: number}
export default function Chart(props: Props) {
    /**
     * In charge of displaying the tooltip on-hover on the chart.
     * @param active
     * @param payload
     * @param label
     */
    const customTooltip = ({active, payload, label}) => {
        // Make sure that the current bar is actively being hovered on.
        let texts: string[]= []
        let disclaimer: string = ''
        if (active) {
            const data = payload[0].payload
            if (data.dcid === 'geoId/3651000' || data.dcid === 'geoId/2938000')
                disclaimer = `All counties in ${data.regionName} are combined and reported as one.`

            // Per-capita chart.
            if (payload[0].payload.absolute && payload[0].payload.population) {
                texts = [`${payload[0].payload.value} ${props.label} per 10,000 people`,
                        `New ${props.label}: ${numberWithCommas(data.absolute)}`,
                        `Total population: ${numberWithCommas(data.population)} people`]

            // Percent increase chart.
            } else if (payload[0].payload.absolute && !payload[0].payload.population) {
                texts = [`Percent increase: ${numberWithCommas(data.value)}%`,
                        `Absolute increase: ${numberWithCommas(data.absolute)} ${props.label}`]

            // Every other type of chart.
            } else {
                texts = [`${numberWithCommas(data.value)} ${props.label}`]
            }
            return (<ToolTipContent chartInfo={texts} disclaimer={disclaimer}/>);
        }
        return null;
    };

    /**
     * Function triggered when each bar in the cart is clicked.
     * Opens a new tab and takes the user to GNI.
     * @param e
     */
    let barOnClick = (e) => {
        let URL: string = `https://browser.datacommons.org/gni#&place=${e.dcid}&ptpv=MedicalConditionIncident,cumulativeCount,medicalStatus,ConfirmedOrProbableCase,incidentType,COVID_19__MedicalConditionIncident,cumulativeCount,medicalStatus,PatientDeceased,incidentType,COVID_19&pc=1`
        window.open(URL, '_blank');
    }


    /**
     * Function in charge of displaying the labeListLabel string stored in each dataHolder point.
     * @param metadata: contains data about the bar in the chart as well as the value to print out
     */
    let renderCustomizedLabel = (metadata) => {
        const {x, y, width, height, value} = metadata;
        return (
            <g>
                <text fontSize={9}
                      x={x + width / 2}
                      y={y + height / 2}
                      fill="#fff"
                      textAnchor="middle"
                      dominantBaseline="middle">
                    {value}
                </text>
            </g>
        );
    };

    return (
        <BarChart width={400}
            height={35 * props.data.length}
            data={props.data}
            barSize={20}
            layout="vertical">
                <XAxis type="number"
                       tick={{fill: '#868E96', fontSize: 12, fontWeight: 'bold'}}/>
                <YAxis type="category"
                       dataKey="regionName"
                       tick={{ill: '#868E96', fontSize: 10}}
                       width={75}
                       interval={0}
                       domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]}/>
                <Tooltip content={customTooltip}/>
                <Bar dataKey={"value"}
                     fill={props.color}
                     onClick={barOnClick}
                     radius={[3, 3, 3, 3]}
                     isAnimationActive={true}>
                        <LabelList className={"labelList"}
                                   dataKey={"labelListLabel"}
                                   content={renderCustomizedLabel}/>
                </Bar>
        </BarChart>
    );
}