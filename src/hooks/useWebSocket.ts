import { useEffect, useRef, useState } from 'react';

export function useWebSocket(channel: string) {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Connect to WebSocket server
    const ws = new WebSocket(`wss://api.perintis.id/ws/${channel}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      setLastMessage(event.data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        if (wsRef.current?.readyState === WebSocket.CLOSED) {
          wsRef.current = new WebSocket(`wss://api.perintis.id/ws/${channel}`);
        }
      }, 5000);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [channel]);

  const sendMessage = (message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    } else {
      console.error('WebSocket is not connected');
    }
  };

  return { lastMessage, sendMessage };
} 