// ============================================================
// auth.js — Módulo de autenticação Firebase Auth
// Importado por todas as páginas protegidas
// ============================================================

import { initializeApp }                        from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey:            "AIzaSyA3FrGpdN7Ja4fyiYjxgjbeqvFCrd-RYOw",
  authDomain:        "manutencao-clinica-fsnh.firebaseapp.com",
  projectId:         "manutencao-clinica-fsnh",
  storageBucket:     "manutencao-clinica-fsnh.firebasestorage.app",
  messagingSenderId: "669634366108",
  appId:             "1:669634366108:web:80440c3f2116aeb7b8bb59"
};

export const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/**
 * Protege uma página autenticada.
 * Se não estiver logado, redireciona para /auth/login.html
 * @param {function} onReady - Callback com o usuário logado
 */
export function requireAuth(onReady) {
  onAuthStateChanged(auth, user => {
    if (!user) {
      location.href = '/auth/login.html?next=' + encodeURIComponent(location.pathname);
    } else {
      onReady(user);
    }
  });
}

/**
 * Faz logout e redireciona para login
 */
export async function logout() {
  await signOut(auth);
  location.href = '/auth/login.html';
}

/**
 * Retorna o usuário atual (ou null)
 */
export function getCurrentUser() {
  return auth.currentUser;
}