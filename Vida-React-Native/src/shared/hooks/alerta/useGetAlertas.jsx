import { useState } from 'react'
import { getAlertRequest } from '../../../services/api.js'

export const useGetAlertas = () => {
    const [alerts, setAlerts] = useState(null)

    const getAlerts = async () => {
        try {
            const response = await getAlertRequest()
            if (response.error) {
                alert(
                    response.error.response.data.message ||
                    'Error al obtener los Alertas'
                )
            } else {
                setAlerts(response.data)
            }
        } catch (error) {
            console.error('Error al obtener los Alertas:', error)
        }
    }

    return {
        alerts,
        isFetching: !alerts,
        getAlerts,
    }
}
