const reactIconPackConfig = {
  si: {
    iconClass: 'text-slate-200',
    label: 'Simple Icons',
    loader: () => import('react-icons/si'),
  },
  fa6: {
    iconClass: 'text-amber-300',
    label: 'Font Awesome 6',
    loader: () => import('react-icons/fa6'),
  },
  md: {
    iconClass: 'text-sky-300',
    label: 'Material Design',
    loader: () => import('react-icons/md'),
  },
  lu: {
    iconClass: 'text-slate-200',
    label: 'Lucide',
    loader: () => import('react-icons/lu'),
  },
  tb: {
    iconClass: 'text-cyan-300',
    label: 'Tabler',
    loader: () => import('react-icons/tb'),
  },
}

const iconModuleCache = new Map()
const iconComponentCache = new Map()

export const searchableReactIconPacks = Object.keys(reactIconPackConfig)

export const normalizeStoredSkillIconValue = (value = '') => {
  const trimmedValue = value.toString().trim()

  if (!trimmedValue) {
    return ''
  }

  const parsedIcon = parseStoredReactIconId(trimmedValue)

  if (parsedIcon) {
    return parsedIcon.id
  }

  return trimmedValue.toLowerCase()
}

export const parseStoredReactIconId = (value = '') => {
  const trimmedValue = value.toString().trim()
  const iconMatch = trimmedValue.match(/^([a-z0-9]+):([A-Za-z][A-Za-z0-9]*)$/)

  if (!iconMatch) {
    return null
  }

  const [, rawPack, iconName] = iconMatch
  const pack = rawPack.toLowerCase()

  if (!reactIconPackConfig[pack]) {
    return null
  }

  return {
    iconName,
    id: `${pack}:${iconName}`,
    pack,
  }
}

export const getReactIconPackLabel = (pack = '') => reactIconPackConfig[pack]?.label || 'React Icons'
export const getReactIconPackClass = (pack = '') => reactIconPackConfig[pack]?.iconClass || 'text-slate-300'

export const loadStoredReactIconComponent = async (iconId = '') => {
  const parsedIcon = parseStoredReactIconId(iconId)

  if (!parsedIcon) {
    return null
  }

  if (iconComponentCache.has(parsedIcon.id)) {
    return iconComponentCache.get(parsedIcon.id)
  }

  const existingModulePromise = iconModuleCache.get(parsedIcon.pack)
  const modulePromise = existingModulePromise ?? reactIconPackConfig[parsedIcon.pack].loader()

  if (!existingModulePromise) {
    iconModuleCache.set(parsedIcon.pack, modulePromise)
  }

  const iconModule = await modulePromise
  const iconComponent = iconModule?.[parsedIcon.iconName] ?? null

  if (iconComponent) {
    iconComponentCache.set(parsedIcon.id, iconComponent)
  }

  return iconComponent
}
