import React from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

interface DataPoint {
  value: number;
  label: string;
}

const SimpleChart = () => {
  const data: DataPoint[] = [
    { value: 50, label: 'Jan' },
    { value: 80, label: 'Feb' },
    { value: 90, label: 'Mar' },
    { value: 70, label: 'Apr' },
  ];

  return (
    <View>
      <BarChart
        data={data}
        width={300}
        height={200}
        yAxisLabelWidth={40}
      />
    </View>
  );
};

export default SimpleChart;