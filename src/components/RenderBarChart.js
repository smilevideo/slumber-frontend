import React from 'react';
import {
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip,
    Legend, 
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
        >
            {payload.value}
        </Text>
    ) 
};

const RenderBarChart = props => {
    const { data, period } = props;

    return (<>
        <p><strong>{`Hours slept in the past ${period}`}</strong></p>

        <BarChart 
            width={750} height={450}
            data={data} 
            margin={{ top: 0, right: 5, bottom: 5, left: 5 }}
            barCategoryGap='0%'
        >
            <XAxis dataKey="string" interval={0} tick={<CustomizedAxisTick />} height={100} />
            <YAxis />
            <Tooltip />
            {/* <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '30px' }} /> */}
            <Bar name='Hours Slept' dataKey="timeSleptInHours" fill="#7489ca">
                <LabelList dataKey="timeSleptInHours" position="top" />
            </Bar>
        </BarChart>
    </>)
}

export default RenderBarChart;