# Lista Escursioni

App mobile React Native (Expo) per tracciare le proprie escursioni.

## Funzionalità

- Elenco delle escursioni salvate (nome, data, dislivello)
- Aggiunta di una nuova escursione tramite il pulsante `+`
- Possibilità di segnare un'escursione come completata
- Possibilità di cancellare un'escursione
- Persistenza locale con AsyncStorage

## Avvio

```bash
npm install
npm start
```

Poi scegli la piattaforma (`npm run android`, `npm run ios` o `npm run web`).

## Testare sul telefono con Expo Go

1. Installa l'app **Expo Go** sul telefono:
   - Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
2. Assicurati che il telefono e il computer siano connessi alla **stessa rete Wi-Fi**.
3. Avvia il server di sviluppo:

   ```bash
   npm start
   ```

4. Nel terminale comparirà un **QR code**. Inquadralo con:
   - Android: l'opzione "Scan QR code" dentro l'app Expo Go
   - iOS: l'app Fotocamera (poi tocca la notifica per aprire Expo Go)
5. L'app si aprirà automaticamente dentro Expo Go sul telefono.

Se il telefono non può raggiungere il computer sulla stessa rete (es. reti Wi-Fi diverse, rete aziendale che blocca le connessioni locali), usa la modalità tunnel:

```bash
npm run start:tunnel
```

Questa modalità è più lenta ma funziona anche su reti diverse, passando attraverso i server di Expo.
