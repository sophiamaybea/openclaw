import HiveClient from './HiveClient'
import './hive.css'

export const metadata = {
  title: 'HIVE · OpenClaw',
  robots: { index: false, follow: false },
}

export default function HivePage() {
  return <HiveClient />
}
