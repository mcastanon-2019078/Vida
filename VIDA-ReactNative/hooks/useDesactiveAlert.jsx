import { useState } from 'react'
import { desactivarAlerta } from '../services/api' // Ajusta la importación según tu estructura de archivos

export const useDesactivarAlerta = () => {
  const [mensaje, setMensaje] = useState('') // Estado para mostrar mensajes de éxito o error

  const desactivar = async (alertaId) => {
    try {
      // Puedes verificar si la alerta existe antes de intentar desactivarla
      // Aquí asumimos que desactivarAlerta devuelve un objeto con el estado actualizado de la alerta
      const response = await desactivarAlerta(alertaId)

      if (response.status === 200) {
        setMensaje('Alerta desactivada exitosamente')
        // Actualizar la interfaz o realizar otras acciones si es necesario
      } else {
        console.error('Error al desactivar la alerta:', response.statusText)
        setMensaje('Error al desactivar la alerta')
      }
    } catch (error) {
      console.error('Error al desactivar la alerta:', error);
      setMensaje('Error al desactivar la alerta')
    }
  }

  return {
    mensaje,
    desactivar,
  }
}
