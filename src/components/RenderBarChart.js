import React from 'react';
import {
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip,
    LabelList, 
    Text
} from 'recharts';

const CustomizedAxisTick = props => {
    const { x, y, payload } = props;
          
    return (
        <Text 
            x={x}
            y={y}
            width={75} 
            textAnchor="middle" 
            verticalAnchor="start"
            fill='lightblue'   
        >
            {payload.value}
        </Text>
    ) 
};

const RenderBarChart = props => {
    const { data, period } = props;

    return (<div className='chart'>
        <p style={{textAlign: "center"}}><strong>{`Hours Slept in the Past ${period}`}</strong></p>

        <BarChart 
            width={750} height={450}
            data={data} 
            margin={{ top: 0, right: 5, bottom: 5, left: 5 }}
            barCategoryGap='0%'
        >
            <XAxis dataKey="string" interval={0} tick={<CustomizedAxisTick />} height={100} />
            <YAxis tick={{fill: 'lightblue'}} />
            <Tooltip />
            <Bar fill='#4d4aa3' name='Hours Slept' dataKey="timeSleptInHours">
                <LabelList dataKey="timeSleptInHours" position="top" fill='lightblue' />
            </Bar>
        </BarChart>
    </div>)
}

export default RenderBarChart;