// ============================================================
// firebase.js — Módulo Firebase centralizado
// Projeto: Manutenção Clínica FSPNH
// ============================================================

import { initializeApp }    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, updateDoc, deleteDoc,
  doc, query, where, orderBy, getDocs, runTransaction, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyA3FrGpdN7Ja4fyiYjxgjbeqvFCrd-RYOw",
  authDomain:        "manutencao-clinica-fsnh.firebaseapp.com",
  projectId:         "manutencao-clinica-fsnh",
  storageBucket:     "manutencao-clinica-fsnh.firebasestorage.app",
  messagingSenderId: "669634366108",
  appId:             "1:669634366108:web:80440c3f2116aeb7b8bb59"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ── NUMERAÇÃO CENTRALIZADA ────────────────────────────────────
// Usa transação para garantir unicidade entre dispositivos
window.getNextNumOS = async function() {
  const now = new Date();
  const ym  = now.getFullYear().toString().slice(-2) + String(now.getMonth()+1).padStart(2,'0');
  const ref = doc(db, 'config', 'contador_os');
  const seq = await runTransaction(db, async t => {
    const snap = await t.get(ref);
    const data = snap.exists() ? snap.data() : { ym: '', seq: 0 };
    const newSeq = data.ym === ym ? data.seq + 1 : 1;
    t.set(ref, { ym, seq: newSeq });
    return newSeq;
  });
  return 'MC-' + ym + '-' + String(seq).padStart(4, '0');
};

// ── CHAMADOS ──────────────────────────────────────────────────
// Salva chamado ao abrir (status: aberto)
window.salvarNoFirebase = async function(dados) {
  try {
    const { sig_tecnico, sig_resp, ...dadosSemAssinaturas } = dados;
    const docRef = await addDoc(collection(db, 'chamados'), {
      ...dadosSemAssinaturas,
      temAssinaturaTecnico: !!sig_tecnico,
      temAssinaturaResp:    !!sig_resp,
      status:               'aberto',
      criadoEm:             serverTimestamp()
    });
    console.log('Firebase: chamado salvo ID:', docRef.id);
    return docRef.id;
  } catch(e) {
    console.error('Firebase erro:', e.code, e.message);
    return null;
  }
};

// Busca chamado pelo número (ex: MC-2603-0001)
window.buscarOS = async function(numero) {
  const q    = query(collection(db, 'chamados'), where('numero', '==', numero.trim().toUpperCase()));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { _id: d.id, ...d.data() };
};

// Alias para compatibilidade com código antigo
window.buscarChamadoPorNumero = window.buscarOS;

// Lista todos os chamados ordenados por data
window.listarChamados = async function() {
  const snap = await getDocs(query(collection(db, 'chamados'), orderBy('criadoEm', 'desc')));
  return snap.docs.map(d => ({ _id: d.id, ...d.data() }));
};

// Finaliza chamado (atualiza status e dados de conclusão)
window.finalizarNoFirebase = async function(docId, dadosFinalizacao) {
  try {
    const { sig_tecnico, sig_resp, ...dadosSemAssinaturas } = dadosFinalizacao;
    await updateDoc(doc(db, 'chamados', docId), {
      ...dadosSemAssinaturas,
      status:       'finalizado',
      finalizadoEm: serverTimestamp()
    });
    console.log('Firebase: chamado finalizado:', docId);
    return true;
  } catch(e) {
    console.error('Firebase finalizar erro:', e.code, e.message);
    return false;
  }
};

// Alias para compatibilidade
window.finalizarOS = window.finalizarNoFirebase;

// ── EQUIPAMENTOS ──────────────────────────────────────────────
// Lista todos os equipamentos
window.carregarEquip = async function() {
  const snap = await getDocs(query(collection(db, 'equipamentos'), orderBy('tipo')));
  return snap.docs.map(d => ({ _id: d.id, ...d.data() }));
};

// Salva equipamento no cadastro
window.salvarEquip = async function(dados) {
  const docRef = await addDoc(collection(db, 'equipamentos'), {
    ...dados,
    criadoEm: serverTimestamp()
  });
  return docRef.id;
};

// Remove equipamento
window.deletarEquip = async function(id) {
  await deleteDoc(doc(db, 'equipamentos', id));
};

// Busca equipamento pelo número de patrimônio
window.buscarPatrimonioFb = async function(patrimonio) {
  const snap  = await getDocs(collection(db, 'equipamentos'));
  const found = snap.docs.find(d => d.data().patrimonio === patrimonio.trim());
  return found ? { _id: found.id, ...found.data() } : null;
};

// Alias para compatibilidade
window.buscarEquipPorPatrimonio = window.buscarPatrimonioFb;