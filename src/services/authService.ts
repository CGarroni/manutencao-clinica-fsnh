import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  setPersistence, 
  browserSessionPersistence,
  User 
} from "firebase/auth";
import { auth } from "@/lib/firebase";

// Define persistência de sessão baseada no navegador/aba
if (typeof window !== 'undefined') {
  setPersistence(auth, browserSessionPersistence).catch((e) => {
    console.error("Erro ao definir persistência de autenticação:", e);
  });
}

export async function realizarLogin(email: string, senha: string) {
  try {
    await signInWithEmailAndPassword(auth, email.trim(), senha);
    return { ok: true };
  } catch (e: any) {
    let mensagem = 'E-mail ou senha incorretos.';
    if (e.code === 'auth/too-many-requests') {
      mensagem = 'Muitas tentativas. Aguarde alguns minutos.';
    } else if (e.code === 'auth/invalid-email') {
      mensagem = 'E-mail inválido.';
    } else if (e.code === 'auth/network-request-failed') {
      mensagem = 'Falha de conexão. Verifique sua internet.';
    }
    return { ok: false, mensagem };
  }
}

export async function realizarLogout() {
  try {
    await signOut(auth);
    return true;
  } catch (e) {
    console.error("Erro ao sair:", e);
    return false;
  }
}

export function observarEstadoAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}