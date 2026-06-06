// ============================================================
// db.js — Módulo Firebase Firestore centralizado
// Importado por todas as páginas que acessam o banco
// ============================================================

import { initializeApp }    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, updateDoc, deleteDoc,
  doc, query, where, orderBy, getDocs, serverTimestamp
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

// ── NUMERAÇÃO CENTRALIZADA ─────────────────────────────────────────────────
// Busca o próximo número de OS no Firebase (garante unicidade entre dispositivos)
export async function getNextNumOS() {
  const now  = new Date();
  const ym   = now.getFullYear().toString().slice(-2) + String(now.getMonth()+1).padStart(2,'0');
  const ref  = doc(db, 'config', 'contador_os');
  // Usa transação para evitar duplicidade
  const { runTransaction } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
  const seq = await runTransaction(db, async t => {
    const snap = await t.get(ref);
    const data = snap.exists() ? snap.data() : { ym: '', seq: 0 };
    const newSeq = data.ym === ym ? data.seq + 1 : 1;
    t.set(ref, { ym, seq: newSeq });
    return newSeq;
  });
  return `MC-${ym}-${String(seq).padStart(4,'0')}`;
}

// ── CHAMADOS ───────────────────────────────────────────────────────────────
export async function abrirChamado(dados) {
  return await addDoc(collection(db,'chamados'), {
    ...dados, status:'aberto', criadoEm: serverTimestamp()
  });
}

export async function buscarChamadoPorNumero(numero) {
  const q    = query(collection(db,'chamados'), where('numero','==',numero.trim().toUpperCase()));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { _id: d.id, ...d.data() };
}

export async function listarChamados() {
  const snap = await getDocs(query(collection(db,'chamados'), orderBy('criadoEm','desc')));
  return snap.docs.map(d => ({ _id: d.id, ...d.data() }));
}

export async function finalizarChamado(id, dados) {
  await updateDoc(doc(db,'chamados',id), {
    ...dados, status:'finalizado', finalizadoEm: serverTimestamp()
  });
}

// ── EQUIPAMENTOS ───────────────────────────────────────────────────────────
export async function listarEquipamentos() {
  const snap = await getDocs(query(collection(db,'equipamentos'), orderBy('tipo')));
  return snap.docs.map(d => ({ _id: d.id, ...d.data() }));
}

export async function salvarEquipamento(dados) {
  return await addDoc(collection(db,'equipamentos'), {
    ...dados, criadoEm: serverTimestamp()
  });
}

export async function deletarEquipamento(id) {
  await deleteDoc(doc(db,'equipamentos',id));
}

export async function buscarEquipamentoPorPatrimonio(patrimonio) {
  const snap = await getDocs(collection(db,'equipamentos'));
  const found = snap.docs.find(d => d.data().patrimonio === patrimonio.trim());
  return found ? { _id: found.id, ...found.data() } : null;
}

export async function atualizarLocalizacaoEquipamento(id, localizacao) {
  await updateDoc(doc(db,'equipamentos',id), { localizacao, atualizadoEm: serverTimestamp() });
}