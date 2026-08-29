import { useNavigate } from 'react-router-dom'
import KPITile from '../components/KPITile'
import MapModule from '../components/MapModule'
import ActivityFeed from '../components/ActivityFeed'

const kpiData = [
  {
    label: 'Empleados totales',
    icon: 'badge',
    value: '1,284',
    trend: {
      trendIcon: 'trending_up',
      text: '+42 from last shift',
      color: 'text-[#15803d]',
    },
  },
  {
    label: 'Clientes Activos',
    icon: 'business_center',
    value: '47',
    trend: {
      trendIcon: 'horizontal_rule',
      text: 'No change',
      color: 'text-on-surface-variant',
    },
  },
  {
    label: 'Incidentes pendientes',
    icon: 'report_problem',
    iconColor: 'text-error',
    value: '03',
    trend: {
      dot: 'bg-error',
      text: 'Action Required',
      color: 'text-error',
      valueColor: 'text-error',
    },
  },
  {
    label: 'GPS',
    icon: 'directions_car',
    value: '100%',
    trend: {
      dot: 'bg-[#15803d]',
      text: 'All vehicles transmitting',
      color: 'text-[#15803d]',
    },
  },
]

export default function Dashboard() {
  const navigate = useNavigate()
  return (
    <main className="flex-1 p-lg pt-lg grid grid-cols-12 gap-lg bg-background">
      {/* Section Header */}
      <div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-xl flex flex-col md:flex-row md:justify-between md:items-center gap-md">
        <div>
          <div className="inline-flex items-center gap-xs bg-surface-container-low rounded-full px-sm py-xs mb-sm border border-outline-variant">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
            <span className="font-label-md text-label-md text-on-surface-variant">Live Sync Active</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-background">
            Live Operations Overview
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-xs max-w-md">
            Real-time metrics for Plant Alpha-4 across all shifts.
          </p>
        </div>
      </div>

      {/* QR Registration Banner */}
      <div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col md:flex-row justify-between items-center gap-md relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        <div className="flex items-center gap-lg relative z-10">
          <div className="p-md bg-secondary-container text-on-primary rounded-xl shadow-sm fill-icon">
            <span className="material-symbols-outlined text-[32px]">qr_code_scanner</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-primary">QR Registration Active</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
              Streamline access for employees and clients with the new contactless check-in system.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/qr-generate')}
          className="mt-md md:mt-0 bg-primary text-on-primary font-label-lg text-label-lg py-sm px-lg rounded-full flex items-center justify-center gap-sm hover:bg-primary-container transition-colors shadow-sm relative z-10 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
          Generate Pass
        </button>
      </div>

      {/* KPI Tiles */}
      {kpiData.map((kpi) => (
        <KPITile key={kpi.label} {...kpi} />
      ))}

      {/* Map + Activity Feed */}
      <MapModule />
      <ActivityFeed />
    </main>
  )
}