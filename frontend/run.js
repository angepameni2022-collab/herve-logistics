const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Read PORT from .env if present
let port = process.env.PORT || 3000;
const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  const match = content.match(/^PORT\s*=\s*([^\s#]+)/m);
  if (match && match[1]) {
    port = match[1].replace(/['"]/g, '');
  }
}

const action = process.argv[2] || 'dev';
const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';

console.log(`[TransLogix] Démarrage de Next.js (${action}) sur le port ${port} (défini dans .env)...`);

const child = spawn(npxCmd, ['next', action, '-p', port.toString()], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname,
  env: {
    ...process.env,
    PORT: port.toString()
  }
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
