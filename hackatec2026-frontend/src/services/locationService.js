// services/locationService.js
const API_BASE = '/api'
const LOCATIONS_KEY = 'gps_locations:v1'
const SESSION_KEY = 'gps_session:v1'

// Ajusta a las coordenadas reales si tu versión actual ya las tiene distintas
export const PLANT_CENTER = { lat: 25.5428, lng: -103.4068 }

/**
 * Guarda la última posición mientras la aplicación está en modo local.
 * El backend actual no expone un endpoint para recibir posiciones, por lo que
 * conservarla en el navegador evita perder el rastreo y permite mostrarla
 * como respaldo si la API no está disponible.
 */
export function sendLocation(employeeId, name, role, lat, lng) {
  if (!employeeId || !Number.isFinite(lat) || !Number.isFinite(lng)) return

  const locations = readStoredLocations()
  locations[employeeId] = { name, role, lat, lng, updatedAt: Date.now() }
  localStorage.setItem(LOCATIONS_KEY, JSON.stringify(locations))
}

export function startTrackingSession(employee) {
  if (!employee?.id) return
  localStorage.setItem(SESSION_KEY, JSON.stringify({ ...employee, active: true }))
}

export function stopTrackingSession() {
  const session = getTrackingSession()
  if (!session) return

  const locations = readStoredLocations()
  delete locations[session.id]
  localStorage.setItem(LOCATIONS_KEY, JSON.stringify(locations))
  localStorage.setItem(SESSION_KEY, JSON.stringify({ ...session, active: false }))
}

export function getTrackingSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

// Como todos los empleados de una planta comparten el mismo lat/lng exacto,
// esto separa un poco los pines para que no se encimen (offset ~15-30m)
function jitter(id) {
  const seed = Number(id) || 0
  const angle = ((seed * 137.5) % 360) * (Math.PI / 180)
  const radius = 0.00015 + (seed % 5) * 0.00003
  return { dLat: Math.cos(angle) * radius, dLng: Math.sin(angle) * radius }
}

export async function getAllLocations() {
  let json
  try {
    const res = await fetch(`${API_BASE}/empleados`, { credentials: 'include' })
    if (!res.ok) return readStoredLocations()
    json = await res.json()
  } catch {
    return readStoredLocations()
  }

  if (!json?.success || !Array.isArray(json.data)) return readStoredLocations()

  const locations = {}
  for (const emp of json.data) {
    if (!emp.on_site || !emp.location) continue
    const { dLat, dLng } = jitter(emp.id_empleado)

    locations[emp.id_empleado] = {
      lat: emp.location.lat + dLat,
      lng: emp.location.lng + dLng,
      name: emp.name,
      role: emp.role,
      plant: emp.location.plant_name,
      updatedAt: emp.checkInRaw ? new Date(emp.checkInRaw).getTime() : Date.now(),
    }
  }
  return locations
}

function readStoredLocations() {
  try {
    const raw = localStorage.getItem(LOCATIONS_KEY)
    const locations = raw ? JSON.parse(raw) : {}
    return locations && typeof locations === 'object' ? locations : {}
  } catch {
    return {}
  }
}
