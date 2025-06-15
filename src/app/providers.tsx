import { initializeServerCache } from '@/lib/server/init';

export async function Providers() {
  await initializeServerCache();
  return null;
} 