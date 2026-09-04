import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import KPITile from '../components/KPITile'
import MapModule from '../components/MapModule'
import ActivityFeed from '../components/ActivityFeed'

export default function Dashboard() {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadEmployees() {
      try {
        const res = await fetch('/api/empleados')
        const json = await res.json()
        if (!cancelled && json.success) {
          setEmployees(json.data)
        }
      } catch (err) {
        console.error('Error cargando empleados:', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadEmployees()
    const interval = setInterval(loadEmployees, 30000) // refresco cada 30s
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  const arrivedEmployees = employees.filter((e) => e.arrived_today && e.location)

  const kpiData = [
    {
      label: 'Empleados totales',
      icon: 'badge',
      value: employees.length.toString(),
      trend: { trendIcon: 'trending_up', text: `${arrivedEmployees.length} en planta`, color: 'text-[#15803d]' },
    },
    {
      label: 'Clientes Activos',
      icon: 'business_center',
      value: '47',
      trend: { trendIcon: 'horizontal_rule', text: 'No change', color: 'text-on-surface-variant' },
    },
    {
      label: 'Incidentes pendientes',
      icon: 'report_problem',
      iconColor: 'text-error',
      value: '03',
      trend: { dot: 'bg-error', text: 'Action Required', color: 'text-error', valueColor: 'text-error' },
    },
    {
      label: 'GPS',
      icon: 'directions_car',
      value: loading ? '...' : '100%',
      trend: { dot: 'bg-[#15803d]', text: 'All vehicles transmitting', color: 'text-[#15803d]' },
    },
  ]

  return (
    <main className="flex-1 p-lg pt-lg grid grid-cols-12 gap-lg bg-background">
      {/* Section Header y QR Banner igual que antes... */}

      {kpiData.map((kpi) => (
        <KPITile key={kpi.label} {...kpi} />
      ))}

      <MapModule employees={arrivedEmployees} loading={loading} />
      <ActivityFeed />
    </main>
  )
}