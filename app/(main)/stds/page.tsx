import { redirect } from 'next/navigation'
import { getStdLibsList } from '@/lib/stdlibs-config'

export default async function DefaultPage() {
  // Get standard library list from configuration and redirect to first standard library
  const stdLibs = getStdLibsList()
  const firstLib = stdLibs.length > 0 ? stdLibs[0].slug : 'co'
  
  redirect(`/stds/${firstLib}`)
}