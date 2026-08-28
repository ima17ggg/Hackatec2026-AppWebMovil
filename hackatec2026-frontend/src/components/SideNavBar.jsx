import { NavLink, useNavigate } from 'react-router-dom'

const navItems = [
  { icon: 'dashboard',     label: 'Dashboard',       to: '/dashboard'     },
  { icon: 'badge',         label: 'Employees',        to: '/employees'     },
  { icon: 'assessment',    label: 'Reports',          to: '/reports'       },
  { icon: 'notifications', label: 'Notificaciones',   to: '/notifications' },
  { icon: 'logout',        label: 'Log Out',          to: '/logout'        },
]

export default function SideNavBar() {
  const navigate = useNavigate()
  return (
    <nav className="bg-primary text-on-primary left-0 h-full w-64 shadow-md flex flex-col fixed top-0 py-lg z-20 overflow-y-auto">
      <div className="px-lg pb-xl border-b border-primary-container mb-md">
        <div className="flex items-center gap-md mb-lg">
          <img
            alt="Organization Logo"
            className="w-10 h-10 rounded bg-white"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnVZR1wsVNuaz5wZsjuBXY0jC9Wwsm0PiZ__q2DGLPjIz6YXtIoJR8_9QwJFE4ed4tYkyVydnfpAR3zmplyZNAuI3QVoHhhb1UNUHwAcs_qUUgxAeSW4UgsSMS-tAw_1cOXhwiQ9rnRWwwpIP99u9O5COHDFOGoCW4teAkd9pK7ukLUJQGPuywS-Uo5vN3td-B70pyns9jiQBZ_q62wtUpjkKIZrjSbdhKtgInYjl63C6usavjXmgIoTgyJ72rfGj6XOwzViigDHw"
          />
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-on-primary leading-tight">
              Industrial Ops
            </h1>
            <p className="font-label-md text-label-md text-tertiary-fixed-dim mt-xs">Plant Alpha-4</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/qr-generate')}
          className="w-full bg-secondary text-on-secondary font-label-lg text-label-lg py-sm px-md rounded flex items-center justify-center gap-sm hover:bg-secondary-container transition-colors shadow-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
          QR Registration
        </button>
      </div>

      <ul className="flex-1 flex flex-col gap-sm px-sm">
        {navItems.map((item) => (
          <li key={item.label}>
            {item.to === '#' ? (
              <a
                href="#"
                className="flex items-center gap-md py-sm rounded pl-4 transition-all duration-150 hover:bg-primary-fixed-variant text-tertiary-fixed-dim opacity-80 hover:opacity-100"
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-label-lg text-label-lg">{item.label}</span>
              </a>
            ) : (
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-md py-sm rounded pl-4 transition-all duration-150 hover:bg-primary-fixed-variant ${
                    isActive
                      ? 'text-secondary-fixed font-bold border-l-4 border-secondary-fixed opacity-90'
                      : 'text-tertiary-fixed-dim opacity-80 hover:opacity-100'
                  }`
                }
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-label-lg text-label-lg">{item.label}</span>
              </NavLink>
            )}
            </li>
          
        ))}
      </ul>
    </nav>
  )
}
