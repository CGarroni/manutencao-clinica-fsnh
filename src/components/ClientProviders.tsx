// src/components/ClientProviders.tsx
'use client';

import { usePushNotifications } from '@/hooks/usePushNotifications';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  // Inicializa o hook de notificação no cliente
  usePushNotifications();

  return <>{children}</>;
}