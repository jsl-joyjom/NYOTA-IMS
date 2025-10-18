// Simple startup script for Nyota Platform
const { spawn } = require('child_process');
const path = require('path');

console.log('🌟 Starting Nyota Platform...\n');

// Start frontend
console.log('🚀 Starting Frontend (Next.js)...');
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: true
});

// Wait a bit then start backend
setTimeout(() => {
  console.log('\n🔧 Starting Backend (Node.js)...');
  const backend = spawn('npm', ['run', 'dev'], {
    cwd: path.join(process.cwd(), 'server'),
    stdio: 'inherit',
    shell: true
  });
  
  backend.on('error', (error) => {
    console.error('❌ Backend error:', error);
  });
  
}, 3000);

frontend.on('error', (error) => {
  console.error('❌ Frontend error:', error);
});

console.log('\n📱 Platform URLs:');
console.log('   Frontend: http://localhost:3000');
console.log('   Backend:  http://localhost:3001');
console.log('\n⏹️  Press Ctrl+C to stop both servers\n');
