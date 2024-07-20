import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { getStatus } from '../../services/api'; // Importa la función correcta desde tu archivo de servicios

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: '#1cc910',
  backgroundGradientFrom: '#eff3ff',
  backgroundGradientTo: '#efefef',
  decimalPlaces: 0, // Ajuste para mostrar números enteros en la gráfica
  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  barPercentage: 2.5, // Ajuste para hacer las barras más juntas
};

const EstadisticasNoDesaparecido = () => {
  const [data, setData] = useState({
    labels: ['Desaparecido', 'Encontrado'],
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
        const responseData = await getStatus(); 
        setData({
          labels: ['Desaparecido', 'Encontrado'],
          datasets: [
            {
              data: [responseData.cantidadDesaparecidos, responseData.cantidadEncontrados],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); // Marca el estado de carga como falso cuando se completa la solicitud
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
      <Text style={styles.header}>Estadistica de personas desaparecidas y personas encontradas</Text>
      <BarChart
        style={styles.chart}
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        fromZero
        showValuesOnTopOfBars
        maxsegments = {100}
        segments={6}
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

export default EstadisticasNoDesaparecido