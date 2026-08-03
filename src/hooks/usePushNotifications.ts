// src/hooks/usePushNotifications.ts
import { useState, useEffect } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '@/lib/firebase';

export const usePushNotifications = () => {
  const [token, setToken] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    // Verifica se a permissão já foi concedida anteriormente
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        setPermissionGranted(true);
        handleGetToken();
      }
    }
  }, []);

  const handleGetToken = async () => {
    try {
      if (!messaging) return;

      // Substitua pela sua Chave VAPID Pública gerada no Console do Firebase (Cloud Messaging -> Web Push certificates)
      const VAPID_KEY = 'BF5xFsChBoXtmhxM6GLUOhVDsLUogX9EPUAeTngUThXRh-Nl7BgzvoOM1qZVmqBhzHWrW6Bcs9TOSp9EQyaWMfY';
      
      const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
      if (currentToken) {
        setToken(currentToken);
        console.log('FCM Token:', currentToken);
        // Aqui você pode salvar o token no Firestore vinculado ao usuário, se desejar
      } else {
        console.log('Nenhum token de registro disponível.');
      }
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
    }
  };

  const requestPermission = async () => {
    try {
      if (typeof window === 'undefined' || !('Notification' in window)) return;

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Permissão de notificação concedida.');
        setPermissionGranted(true);
        await handleGetToken();
      } else {
        console.log('Permissão de notificação negada.');
        setPermissionGranted(false);
      }
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
    }
  };

  // Listener para mensagens quando o app está em primeiro plano (foreground)
  useEffect(() => {
    if (messaging) {
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log('Mensagem recebida em primeiro plano:', payload);
        alert(`Nova Notificação: ${payload.notification?.title || 'Atualização'}`);
      });
      return () => {
        if (typeof unsubscribe === 'function') unsubscribe();
      };
    }
  }, []);

  return { token, permissionGranted, requestPermission };
};