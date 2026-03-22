// ============================================================
// firebase.js — Integração com Firebase Firestore
// Projeto: Manutenção Clínica FSPNH
// ============================================================

import { initializeApp }                                                from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, doc,
         query, where, getDocs, serverTimestamp }                       from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

// ── SALVAR CHAMADO (abertura) ─────────────────────────────────
window.salvarNoFirebase = async function(dados) {
  try {
    const { sig_tecnico, sig_resp, ...dadosSemAssinaturas } = dados;
    const docRef = await addDoc(collection(db, "chamados"), {
      ...dadosSemAssinaturas,
      temAssinaturaTecnico: !!sig_tecnico,
      temAssinaturaResp:    !!sig_resp,
      criadoEm:             serverTimestamp()
    });
    console.log("Firebase salvo ID:", docRef.id);
    return docRef.id;
  } catch(e) {
    console.error("Firebase erro:", e.code, e.message);
    return null;
  }
};

// ── BUSCAR CHAMADO POR NÚMERO ─────────────────────────────────
window.buscarChamadoPorNumero = async function(numero) {
  try {
    const q    = query(collection(db, "chamados"), where("numero", "==", numero.trim().toUpperCase()));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const docSnap = snap.docs[0];
    return { id: docSnap.id, ...docSnap.data() };
  } catch(e) {
    console.error("Firebase busca erro:", e.code, e.message);
    return null;
  }
};

// ── FINALIZAR CHAMADO NO FIREBASE ────────────────────────────
window.finalizarNoFirebase = async function(docId, dadosFinalizacao) {
  try {
    const ref = doc(db, "chamados", docId);
    await updateDoc(ref, {
      ...dadosFinalizacao,
      status:       "finalizado",
      finalizadoEm: serverTimestamp()
    });
    console.log("Firebase chamado finalizado:", docId);
    return true;
  } catch(e) {
    console.error("Firebase finalizar erro:", e.code, e.message);
    return false;
  }
};