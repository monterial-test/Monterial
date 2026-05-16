'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return (
    <div className="h-screen w-full overflow-hidden">
      <NextStudio config={config} />
    </div>
  )
}
