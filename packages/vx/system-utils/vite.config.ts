import react from '@vitejs/plugin-react-swc'

import { defineLibConfig } from '@vx/config/vite'

export default defineLibConfig({
  root: __dirname,
  plugins: [react()]
})
