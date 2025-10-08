import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.taskflow',
  appName: 'TaskFlow',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
