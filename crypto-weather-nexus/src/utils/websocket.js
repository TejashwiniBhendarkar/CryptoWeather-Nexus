export function connectCryptoWebSocket(updateCryptoData) {
    const socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum");
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      updateCryptoData(data);
    };
  
    return () => socket.close();
  }
  