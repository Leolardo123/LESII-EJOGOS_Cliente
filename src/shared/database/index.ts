import { createConnections } from 'typeorm';

console.log('[BANCO DE DADOS 🎲] Tentando conectar.');

createConnections()
.then(() => {
  console.log('[BANCO DE DADOS 🎲] Conectado com sucesso!');
})
.catch(err => console.log(err));