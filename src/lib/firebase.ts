import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc, 
  doc,
  query, 
  where, 
  getDocs,
  getDoc,  
  orderBy,
  serverTimestamp,
  runTransaction,
  deleteDoc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3FrGpdN7Ja4fyiYjxgjbeqvFCrd-RYOw",
  authDomain: "manutencao-clinica-fsnh.firebaseapp.com",
  projectId: "manutencao-clinica-fsnh",
  storageBucket: "manutencao-clinica-fsnh.firebasestorage.app",
  messagingSenderId: "669634366108",
  appId: "1:669634366108:web:80440c3f2116aeb7b8bb59"
};

// Inicialização segura do Firebase (evita duplicidade no SSR do Next.js)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Status dos Chamados
export const STATUS = {
  ABERTO: 'aberto',
  EM_ANDAMENTO: 'em_andamento',
  PENDENTE: 'pendente',
  FINALIZADO: 'finalizado'
};

// ── Gerar Número Sequencial de OS (MC-AAMM-NNNN) ──
export async function gerarNumeroOS(): Promise<string> {
  const now = new Date();
  const ym = now.getFullYear().toString().slice(-2) + String(now.getMonth() + 1).padStart(2, '0');
  const counterRef = doc(db, "contadores", `os_${ym}`);
  
  try {
    const newSeq = await runTransaction(db, async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      let seq = 1;
      
      if (counterDoc.exists()) {
        seq = counterDoc.data().seq + 1;
      }
      
      transaction.set(counterRef, { 
        ym, 
        seq, 
        ultimaAtualizacao: serverTimestamp() 
      });
      
      return seq;
    });
    
    return 'MC-' + ym + '-' + String(newSeq).padStart(4, '0');
  } catch (e) {
    console.error("Erro ao gerar número de OS:", e);
    return 'MC-' + ym + '-' + Date.now().toString().slice(-4);
  }
}

// ── Funções de Chamados ──
export async function salvarChamado(dados: any) {
  try {
    const { sig_tecnico, sig_resp, ...dadosSemAssinaturas } = dados;
    const docRef = await addDoc(collection(db, "chamados"), {
      ...dadosSemAssinaturas,
      temAssinaturaTecnico: !!sig_tecnico,
      temAssinaturaResp: !!sig_resp,
      status: STATUS.ABERTO,
      criadoEm: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Firebase erro ao salvar chamado:", e);
    return null;
  }
}

export async function buscarChamadoPorNumero(numero: string) {
  try {
    const q = query(collection(db, "chamados"), where("numero", "==", numero.trim().toUpperCase()));
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const docSnap = snap.docs[0];
    return { id: docSnap.id, ...docSnap.data() };
  } catch (e) {
    console.error("Firebase busca erro:", e);
    return null;
  }
}

export async function listarChamados(filtroStatus: string | null = null) {
  try {
    let q = query(collection(db, "chamados"), orderBy("criadoEm", "desc"));
    if (filtroStatus) {
      q = query(collection(db, "chamados"), where("status", "==", filtroStatus), orderBy("criadoEm", "desc"));
    }
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error("Firebase listar erro:", e);
    return [];
  }
}

// ── Funções de Equipamentos ──
export async function salvarEquipamento(dados: any) {
  try {
    const docRef = await addDoc(collection(db, "equipamentos"), {
      ...dados,
      criadoEm: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Firebase salvar equipamento erro:", e);
    return null;
  }
}

export async function listarEquipamentos() {
  try {
    const q = query(collection(db, "equipamentos"));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error("Firebase listar equipamentos erro:", e);
    return [];
  }
}

export async function deletarEquipamento(docId: string) {
  try {
    await deleteDoc(doc(db, "equipamentos", docId));
    return true;
  } catch (e) {
    console.error("Firebase deletar equipamento erro:", e);
    return false;
  }
}

// Buscar um chamado específico pelo ID
export async function buscarChamadoPorId(id: string) {
  try {
    const docRef = doc(db, "chamados", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar chamado por ID:", error);
    return null;
  }
}

// Atualizar dados de um chamado (mudar status, laudo, técnico, etc.)
export async function atualizarChamado(id: string, dadosAtualizados: any) {
  try {
    const docRef = doc(db, "chamados", id);
    await updateDoc(docRef, dadosAtualizados);
    return true;
  } catch (error) {
    console.error("Erro ao atualizar chamado:", error);
    return false;
  }
}