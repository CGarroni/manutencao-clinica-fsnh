// ============================================================
// firebase.js — Integração com Firebase Firestore
// Projeto: Manutenção Clínica FSPNH
// ============================================================

import { initializeApp }                                     from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── CREDENCIAIS ───────────────────────────────────────────────
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

/**
 * Salva dados do chamado no Firestore.
 * Assinaturas base64 são excluídas do banco (limite de tamanho)
 * e enviadas apenas por e-mail.
 */
window.salvarNoFirebase = async function(dados) {
  try {
    const { sig_tecnico, sig_resp, ...dadosSemAssinaturas } = dados;
    const docRef = await addDoc(collection(db, "chamados"), {
      ...dadosSemAssinaturas,
      temAssinaturaTecnico: !!sig_tecnico,
      temAssinaturaResp:    !!sig_resp,
      criadoEm:             serverTimestamp()
    });
    console.log("Firebase chamado salvo ID:", docRef.id);
    return docRef.id;
  } catch(e) {
    console.error("Firebase erro:", e.code, e.message);
    return null;
  }
};