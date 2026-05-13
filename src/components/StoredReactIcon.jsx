import React, { useEffect, useState } from 'react'
import { LuCode } from 'react-icons/lu'
import { loadStoredReactIconComponent } from '../lib/reactIconsLibrary'

const StoredReactIcon = ({ className = '', fallbackIcon: FallbackIcon = LuCode, iconId = '' }) => {
  const [resolvedIcon, setResolvedIcon] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadIcon = async () => {
      const nextIcon = await loadStoredReactIconComponent(iconId)

      if (!isMounted) {
        return
      }

      setResolvedIcon(() => nextIcon)
    }

    setResolvedIcon(null)

    if (!iconId) {
      return () => {
        isMounted = false
      }
    }

    loadIcon()

    return () => {
      isMounted = false
    }
  }, [iconId])

  const IconComponent = resolvedIcon ?? FallbackIcon

  return <IconComponent className={className} />
}

export default StoredReactIcon
