import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ancoatsoft.parking',
  appName: 'Park And Find',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
