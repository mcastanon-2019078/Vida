import { useState } from 'react'
import { getAlertClientRequest } from '../services/api.js'

export const useGetAlertasClient = () => {
    const [alerts, setAlerts] = useState(null)

    const getAlertsClient = async () => {
        try {
            const response = await getAlertClientRequest()
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
        getAlertsClient,
    }
}

