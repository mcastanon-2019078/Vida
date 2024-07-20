import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { getGenderCounts } from '../../services/api';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: '#1cc910',
  backgroundGradientFrom: '#eff3ff',
  backgroundGradientTo: '#efefef',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
  style: {
    borderRadius: 50,
  },
  propsForBackgroundLines: {
    strokeDasharray: "", // solid background lines with no dashes
  },
  yAxisSuffix: '',
  yAxisInterval: 1, // optional, defaults to 1
};

const Estadisticas = () => {
  const [data, setData] = useState({
    labels: ['Femenino', 'Masculino'],
    datasets: [
      {
        data: [0, 0],
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getGenderCounts();
        console.log('Response from backend:', responseData); 
      } catch (error) {
        console.error("Error fetching data: ", error);
      } 
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estas son las estadísticas de personas desaparecidas por género</Text>
      <BarChart
        style={styles.chart}
        data={data}
        width={screenWidth - 32}
        height={220}
        yAxisLabel=""
        yAxisSuffix="%"
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        fromZero
        showValuesOnTopOfBars
        yLabelsOffset={10}
        withInnerLines={true}
        segments={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Estadisticas
