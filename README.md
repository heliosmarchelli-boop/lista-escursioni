# Lista Escursioni

App mobile React Native (Expo) per tracciare le proprie escursioni.

## Funzionalità

- Elenco delle escursioni salvate (nome, data, dislivello)
- Aggiunta di una nuova escursione tramite il pulsante `+`
- Possibilità di allegare una foto dalla galleria del telefono, con anteprima nella lista
- Possibilità di segnare un'escursione come completata
- Possibilità di cancellare un'escursione
- Persistenza permanente sul dispositivo (dati con AsyncStorage, foto copiate nella cartella documenti dell'app)

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

## Generare un APK installabile con EAS Build

Per ottenere un file `.apk` da installare direttamente sul telefono (senza passare dal Play Store), il progetto è configurato con un profilo EAS Build dedicato, `preview`, che genera un APK invece dell'AAB usato per la pubblicazione sullo store.

1. Crea un account gratuito su [expo.dev](https://expo.dev) se non ne hai già uno.
2. Accedi da terminale:

   ```bash
   npx eas-cli login
   ```

3. Al primo utilizzo, collega il progetto al tuo account Expo:

   ```bash
   npx eas-cli init
   ```

4. Avvia la build dell'APK:

   ```bash
   npm run build:apk
   ```

   (equivale a `npx eas-cli build --platform android --profile preview`)

5. La build viene eseguita sui server di Expo (richiede qualche minuto). Al termine, il terminale mostra un link per scaricare il file `.apk`.
6. Scarica l'APK sul telefono e installalo (potrebbe essere necessario abilitare "Installa da fonti sconosciute" nelle impostazioni Android).

> Nota: `app.json` definisce già `android.package` (`com.heliosmarchelli.listaescursioni`), necessario per la build. Se vuoi pubblicare l'app sul Play Store in futuro, usa invece il profilo `production` (genera un AAB): `npx eas-cli build --platform android --profile production`.
