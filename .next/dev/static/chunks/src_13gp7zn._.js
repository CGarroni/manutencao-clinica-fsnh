(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/firebase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STATUS",
    ()=>STATUS,
    "atualizarChamado",
    ()=>atualizarChamado,
    "auth",
    ()=>auth,
    "buscarChamadoPorId",
    ()=>buscarChamadoPorId,
    "buscarChamadoPorNumero",
    ()=>buscarChamadoPorNumero,
    "db",
    ()=>db,
    "deletarEquipamento",
    ()=>deletarEquipamento,
    "gerarNumeroOS",
    ()=>gerarNumeroOS,
    "listarChamados",
    ()=>listarChamados,
    "listarEquipamentos",
    ()=>listarEquipamentos,
    "salvarChamado",
    ()=>salvarChamado,
    "salvarEquipamento",
    ()=>salvarEquipamento
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a___as__getFirestore$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-456515ba.esm.js [app-client] (ecmascript) <export a_ as getFirestore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aR__as__collection$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-456515ba.esm.js [app-client] (ecmascript) <export aR as collection>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a9__as__doc$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-456515ba.esm.js [app-client] (ecmascript) <export a9 as doc>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b4__as__serverTimestamp$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-456515ba.esm.js [app-client] (ecmascript) <export b4 as serverTimestamp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$d90d2ee5$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__p__as__getAuth$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index-d90d2ee5.js [app-client] (ecmascript) <export p as getAuth>");
;
;
;
const firebaseConfig = {
    apiKey: "AIzaSyA3FrGpdN7Ja4fyiYjxgjbeqvFCrd-RYOw",
    authDomain: "manutencao-clinica-fsnh.firebaseapp.com",
    projectId: "manutencao-clinica-fsnh",
    storageBucket: "manutencao-clinica-fsnh.firebasestorage.app",
    messagingSenderId: "669634366108",
    appId: "1:669634366108:web:80440c3f2116aeb7b8bb59"
};
// Inicialização segura do Firebase (evita duplicidade no SSR do Next.js)
const app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])().length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApp"])() : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initializeApp"])(firebaseConfig);
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a___as__getFirestore$3e$__["getFirestore"])(app);
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$d90d2ee5$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__p__as__getAuth$3e$__["getAuth"])(app);
const STATUS = {
    ABERTO: 'aberto',
    EM_ANDAMENTO: 'em_andamento',
    PENDENTE: 'pendente',
    FINALIZADO: 'finalizado'
};
async function gerarNumeroOS() {
    const now = new Date();
    const ym = now.getFullYear().toString().slice(-2) + String(now.getMonth() + 1).padStart(2, '0');
    const counterRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a9__as__doc$3e$__["doc"])(db, "contadores", `os_${ym}`);
    try {
        const newSeq = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["runTransaction"])(db, async (transaction)=>{
            const counterDoc = await transaction.get(counterRef);
            let seq = 1;
            if (counterDoc.exists()) {
                seq = counterDoc.data().seq + 1;
            }
            transaction.set(counterRef, {
                ym,
                seq,
                ultimaAtualizacao: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b4__as__serverTimestamp$3e$__["serverTimestamp"])()
            });
            return seq;
        });
        return 'MC-' + ym + '-' + String(newSeq).padStart(4, '0');
    } catch (e) {
        console.error("Erro ao gerar número de OS:", e);
        return 'MC-' + ym + '-' + Date.now().toString().slice(-4);
    }
}
async function salvarChamado(dados) {
    try {
        const { sig_tecnico, sig_resp, ...dadosSemAssinaturas } = dados;
        const docRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aR__as__collection$3e$__["collection"])(db, "chamados"), {
            ...dadosSemAssinaturas,
            temAssinaturaTecnico: !!sig_tecnico,
            temAssinaturaResp: !!sig_resp,
            status: STATUS.ABERTO,
            criadoEm: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b4__as__serverTimestamp$3e$__["serverTimestamp"])()
        });
        return docRef.id;
    } catch (e) {
        console.error("Firebase erro ao salvar chamado:", e);
        return null;
    }
}
async function buscarChamadoPorNumero(numero) {
    try {
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aR__as__collection$3e$__["collection"])(db, "chamados"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["where"])("numero", "==", numero.trim().toUpperCase()));
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDocs"])(q);
        if (snap.empty) return null;
        const docSnap = snap.docs[0];
        return {
            id: docSnap.id,
            ...docSnap.data()
        };
    } catch (e) {
        console.error("Firebase busca erro:", e);
        return null;
    }
}
async function listarChamados(filtroStatus = null) {
    try {
        let q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aR__as__collection$3e$__["collection"])(db, "chamados"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["orderBy"])("criadoEm", "desc"));
        if (filtroStatus) {
            q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aR__as__collection$3e$__["collection"])(db, "chamados"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["where"])("status", "==", filtroStatus), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["orderBy"])("criadoEm", "desc"));
        }
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDocs"])(q);
        return snap.docs.map((d)=>({
                id: d.id,
                ...d.data()
            }));
    } catch (e) {
        console.error("Firebase listar erro:", e);
        return [];
    }
}
async function salvarEquipamento(dados) {
    try {
        const docRef = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aR__as__collection$3e$__["collection"])(db, "equipamentos"), {
            ...dados,
            criadoEm: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b4__as__serverTimestamp$3e$__["serverTimestamp"])()
        });
        return docRef.id;
    } catch (e) {
        console.error("Firebase salvar equipamento erro:", e);
        return null;
    }
}
async function listarEquipamentos() {
    try {
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aR__as__collection$3e$__["collection"])(db, "equipamentos"));
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDocs"])(q);
        return snap.docs.map((d)=>({
                id: d.id,
                ...d.data()
            }));
    } catch (e) {
        console.error("Firebase listar equipamentos erro:", e);
        return [];
    }
}
async function deletarEquipamento(docId) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a9__as__doc$3e$__["doc"])(db, "equipamentos", docId));
        return true;
    } catch (e) {
        console.error("Firebase deletar equipamento erro:", e);
        return false;
    }
}
async function buscarChamadoPorId(id) {
    try {
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a9__as__doc$3e$__["doc"])(db, "chamados", id);
        const docSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDoc"])(docRef);
        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            };
        }
        return null;
    } catch (error) {
        console.error("Erro ao buscar chamado por ID:", error);
        return null;
    }
}
async function atualizarChamado(id, dadosAtualizados) {
    try {
        const docRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$456515ba$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__a9__as__doc$3e$__["doc"])(db, "chamados", id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])(docRef, dadosAtualizados);
        return true;
    } catch (error) {
        console.error("Erro ao atualizar chamado:", error);
        return false;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/assets/logo-fsnh.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.q("/_next/static/media/logo-fsnh.0mqjoddy4zqg..png");}),
"[project]/src/assets/logo-fsnh.png.mjs { IMAGE => \"[project]/src/assets/logo-fsnh.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2d$fsnh$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/assets/logo-fsnh.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2d$fsnh$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 200,
    height: 200,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAyUlEQVR42lWPzQuCQBDF3dkPozCCcrfUtMw+3LAURLtER08GgaduQRBCRy/996l0yAePmeH9Dm8U5SdN66mMYjLoU9ZTKVH+BZiAjGVc5E5WPja3MHJWCKEOowwMd5ffs7L6XF76dDjphAgB4rZMiiB9VtfTe72dLTsApYysZnPL48IKHcdzLUNgjKENCSbYMue6v5WLvR+44SHy5E7anIsRaopQQjVzaiZCF0c+5pFt2ufaqSGMAADab+oJrIYpIGD1rjZ346beF90DFDhNrXhiAAAAAElFTkSuQmCC"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2d$fsnh$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$logo$2d$fsnh$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/src/assets/logo-fsnh.png.mjs { IMAGE => "[project]/src/assets/logo-fsnh.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$d90d2ee5$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__signOut$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index-d90d2ee5.js [app-client] (ecmascript) <export D as signOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function DashboardPage() {
    _s();
    const [chamados, setChamados] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [filtroStatus, setFiltroStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("todos");
    const [busca, setBusca] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [osSelecionada, setOsSelecionada] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Estados dos campos de atendimento detalhado
    const [resolucao, setResolucao] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [motivoPendencia, setMotivoPendencia] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [novoStatus, setNovoStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("em_andamento");
    // Referências para os Canvas de Assinatura Digital e controle de desenho
    const canvasSolicitanteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasTecnicoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isDrawing, setIsDrawing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [temAssinaturaSolicitante, setTemAssinaturaSolicitante] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [temAssinaturaTecnico, setTemAssinaturaTecnico] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].onAuthStateChanged({
                "DashboardPage.useEffect.unsubscribe": (user)=>{
                    if (!user) {
                        router.push("/login");
                    } else {
                        carregarDadosDashboard();
                    }
                }
            }["DashboardPage.useEffect.unsubscribe"]);
            return ({
                "DashboardPage.useEffect": ()=>unsubscribe()
            })["DashboardPage.useEffect"];
        }
    }["DashboardPage.useEffect"], [
        router
    ]);
    async function carregarDadosDashboard() {
        setLoading(true);
        const dados = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listarChamados"])();
        setChamados(dados || []);
        setLoading(false);
    }
    // Métricas calculadas para os Cards do Topo
    const totalOS = chamados.length;
    const emAberto = chamados.filter((c)=>c.status === "aberto" || !c.status).length;
    const pendente = chamados.filter((c)=>c.status === "pendente").length;
    const emprestimo = chamados.filter((c)=>c.status === "emprestimo").length;
    const finalizados = chamados.filter((c)=>c.status === "finalizado").length;
    const descarte = chamados.filter((c)=>c.status === "descarte").length;
    // Filtragem dos chamados para a listagem
    const chamadosFiltrados = chamados.filter((c)=>{
        const matchStatus = filtroStatus === "todos" ? true : filtroStatus === "aberto" ? c.status === "aberto" || !c.status : c.status === filtroStatus;
        const termo = busca.toLowerCase();
        const matchBusca = !busca || c.numero?.toLowerCase().includes(termo) || c.setor?.toLowerCase().includes(termo) || c.equipamento?.toLowerCase().includes(termo) || c.solicitante?.toLowerCase().includes(termo);
        return matchStatus && matchBusca;
    });
    // --- FUNÇÕES BLINDADAS DE DESENHO NO CANVAS (Com suporte a Touch Mobile e prevenção de scroll) ---
    const iniciarDesenho = (e, tipo)=>{
        if (osSelecionada?.status === "finalizado") return;
        if (e.cancelable) e.preventDefault(); // Impede o scroll da tela no celular
        const canvas = tipo === "solicitante" ? canvasSolicitanteRef.current : canvasTecnicoRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = (clientX - rect.left) * (canvas.width / rect.width);
        const y = (clientY - rect.top) * (canvas.height / rect.height);
        setIsDrawing(true);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#0f172a";
    };
    const desenhar = (e, tipo)=>{
        if (!isDrawing) return;
        if (osSelecionada?.status === "finalizado") return;
        if (e.cancelable) e.preventDefault(); // Impede o scroll da tela no celular
        const canvas = tipo === "solicitante" ? canvasSolicitanteRef.current : canvasTecnicoRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = (clientX - rect.left) * (canvas.width / rect.width);
        const y = (clientY - rect.top) * (canvas.height / rect.height);
        ctx.lineTo(x, y);
        ctx.stroke();
        if (tipo === "solicitante") setTemAssinaturaSolicitante(true);
        if (tipo === "tecnico") setTemAssinaturaTecnico(true);
    };
    const pararDesenho = ()=>{
        setIsDrawing(false);
    };
    const limparAssinatura = (tipo)=>{
        if (osSelecionada?.status === "finalizado") return;
        const canvas = tipo === "solicitante" ? canvasSolicitanteRef.current : canvasTecnicoRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (tipo === "solicitante") {
            setTemAssinaturaSolicitante(false);
            setOsSelecionada((prev)=>({
                    ...prev,
                    assinaturaSolicitante: null
                }));
        }
        if (tipo === "tecnico") {
            setTemAssinaturaTecnico(false);
            setOsSelecionada((prev)=>({
                    ...prev,
                    assinaturaTecnico: null
                }));
        }
    };
    async function handleSalvarAtendimento(e) {
        e.preventDefault();
        if (!osSelecionada) return;
        let assinaturaSolUrl = osSelecionada.assinaturaSolicitante || "";
        let assinaturaTecUrl = osSelecionada.assinaturaTecnico || "";
        if (canvasSolicitanteRef.current && temAssinaturaSolicitante) {
            assinaturaSolUrl = canvasSolicitanteRef.current.toDataURL("image/png");
        }
        if (canvasTecnicoRef.current && temAssinaturaTecnico) {
            assinaturaTecUrl = canvasTecnicoRef.current.toDataURL("image/png");
        }
        const agoraStr = new Date().toLocaleString("pt-BR");
        const usuarioAtual = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].currentUser?.email || "Técnico Plantonista";
        const logsAtuais = Array.isArray(osSelecionada.historicoLogs) ? osSelecionada.historicoLogs : [];
        let descricaoAlteracao = `Status alterado para: [${novoStatus.toUpperCase()}]`;
        if (resolucao && resolucao !== osSelecionada.resolucao) {
            descricaoAlteracao += ` | Resolução atualizada.`;
        }
        if (novoStatus === "pendente" && motivoPendencia) {
            descricaoAlteracao += ` | Pendência: ${motivoPendencia}`;
        }
        const novoLog = {
            data: agoraStr,
            autor: usuarioAtual,
            acao: descricaoAlteracao
        };
        const historicoAtualizado = [
            novoLog,
            ...logsAtuais
        ];
        const sucesso = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atualizarChamado"])(osSelecionada.id, {
            status: novoStatus,
            resolucao: resolucao,
            motivoPendencia: novoStatus === "pendente" ? motivoPendencia : "",
            assinaturaSolicitante: assinaturaSolUrl,
            assinaturaTecnico: assinaturaTecUrl,
            historicoLogs: historicoAtualizado,
            atualizadoEm: new Date().toISOString()
        });
        if (sucesso) {
            alert("Ordem de Serviço, e histórico atualizados com sucesso!");
            setOsSelecionada(null);
            setResolucao("");
            setMotivoPendencia("");
            carregarDadosDashboard();
        } else {
            alert("Erro ao atualizar a Ordem de Serviço.");
        }
    }
    async function handleSair() {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2d$d90d2ee5$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__signOut$3e$__["signOut"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"]);
            router.push("/login");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-100 flex flex-col justify-between text-slate-800",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "w-full bg-[#0a2342] text-white px-4 py-3 shadow-md border-b border-slate-800",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-full border-2 border-[#00b4d8] bg-white p-1 relative overflow-hidden shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2d$fsnh$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$logo$2d$fsnh$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                        alt: "Logo FSNH",
                                        width: 35,
                                        height: 35,
                                        className: "object-contain"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 241,
                                        columnNumber: 8
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 240,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "font-['Barlow_Condensed'] text-base md:text-lg font-bold uppercase tracking-wider leading-tight",
                                            children: "Dashboard — Manutenção Clínica"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 250,
                                            columnNumber: 8
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] md:text-xs text-slate-400 tracking-wide",
                                            children: "Hospital Municipal de Novo Hamburgo (FSNH)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 253,
                                            columnNumber: 8
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 249,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 239,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard/equipamentos",
                                    className: "bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors",
                                    children: "🔧 Equipamentos"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 261,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard/relatorios",
                                    className: "bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors",
                                    children: "📊 Relatório Geral"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/manual",
                                    className: "bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors",
                                    children: "📖 Manual do Sistema"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 273,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/qrcode",
                                    className: "bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors",
                                    children: "📱 Gerar QR Code"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 279,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSair,
                                    className: "bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer",
                                    children: "🚪 Sair / Logoff"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 285,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 260,
                            columnNumber: 6
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex md:hidden overflow-x-auto pb-1 gap-2 scrollbar-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard/equipamentos",
                                    className: "shrink-0 bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1",
                                    children: "🔧 Equipamentos"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 295,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard/relatorios",
                                    className: "shrink-0 bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1",
                                    children: "📊 Relatórios"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 301,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/manual",
                                    className: "shrink-0 bg-cyan-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1",
                                    children: "📖 Manual"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 307,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/qrcode",
                                    className: "shrink-0 bg-amber-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1",
                                    children: "📱 QR Code"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 313,
                                    columnNumber: 7
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSair,
                                    className: "shrink-0 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1",
                                    children: "🚪 Sair"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 319,
                                    columnNumber: 7
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 294,
                            columnNumber: 6
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 238,
                    columnNumber: 5
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 237,
                columnNumber: 4
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-7xl w-full mx-auto p-6 space-y-6 flex-1 print:p-0 print:m-0 print:max-w-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 print:hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setFiltroStatus("todos"),
                                className: "bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-600 cursor-pointer hover:shadow-md transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold uppercase text-slate-400 block",
                                        children: "Total de OS"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 337,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl font-bold text-slate-700",
                                        children: totalOS
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 340,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 333,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setFiltroStatus("aberto"),
                                className: "bg-white p-4 rounded-xl shadow-sm border-l-4 border-amber-500 cursor-pointer hover:shadow-md transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold uppercase text-amber-600 block",
                                        children: "Em Aberto"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 347,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl font-bold text-slate-700",
                                        children: emAberto
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 350,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 343,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setFiltroStatus("pendente"),
                                className: "bg-white p-4 rounded-xl shadow-sm border-l-4 border-orange-500 cursor-pointer hover:shadow-md transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold uppercase text-orange-600 block",
                                        children: "Pendente"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 359,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl font-bold text-slate-700",
                                        children: pendente
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 362,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 355,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setFiltroStatus("emprestimo"),
                                className: "bg-white p-4 rounded-xl shadow-sm border-l-4 border-purple-500 cursor-pointer hover:shadow-md transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold uppercase text-purple-700 block",
                                        children: "Empréstimo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 371,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl font-bold text-slate-700",
                                        children: emprestimo
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 374,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 367,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setFiltroStatus("finalizado"),
                                className: "bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-500 cursor-pointer hover:shadow-md transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold uppercase text-emerald-600 block",
                                        children: "Finalizados"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 383,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl font-bold text-slate-700",
                                        children: finalizados
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 386,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 379,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>setFiltroStatus("descarte"),
                                className: "bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500 cursor-pointer hover:shadow-md transition",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold uppercase text-red-600 block",
                                        children: "Descarte"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 395,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl font-bold text-slate-700",
                                        children: descarte
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 398,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 391,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 332,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 print:hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFiltroStatus("todos"),
                                        className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${filtroStatus === "todos" ? "bg-[#0a192f] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`,
                                        children: "Todos"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 407,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFiltroStatus("aberto"),
                                        className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${filtroStatus === "aberto" ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`,
                                        children: "Em Aberto"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 413,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFiltroStatus("pendente"),
                                        className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${filtroStatus === "pendente" ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`,
                                        children: "Pendente"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 419,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFiltroStatus("emprestimo"),
                                        className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${filtroStatus === "emprestimo" ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`,
                                        children: "Empréstimo"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 425,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFiltroStatus("finalizado"),
                                        className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${filtroStatus === "finalizado" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`,
                                        children: "Finalizados"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 431,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setFiltroStatus("descarte"),
                                        className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${filtroStatus === "descarte" ? "bg-red-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`,
                                        children: "Descarte"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 437,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 406,
                                columnNumber: 6
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full md:w-72",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: busca,
                                    onChange: (e)=>setBusca(e.target.value),
                                    placeholder: "Buscar por setor, OS, equipamento...",
                                    className: "w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 446,
                                    columnNumber: 7
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 445,
                                columnNumber: 6
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 405,
                        columnNumber: 5
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-xl shadow-sm p-6 print:hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-3 mb-6 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "📋 Ordens de Serviço (",
                                            chamadosFiltrados.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 459,
                                        columnNumber: 7
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        target: "_blank",
                                        className: "bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold transition shadow",
                                        children: "+ Abrir Nova OS"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 460,
                                        columnNumber: 7
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 458,
                                columnNumber: 6
                            }, this),
                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center py-10 text-xs text-slate-400",
                                children: "Carregando chamados..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 470,
                                columnNumber: 7
                            }, this) : chamadosFiltrados.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-center py-10 text-xs text-slate-400",
                                children: "Nenhuma Ordem de Serviço encontrada."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 474,
                                columnNumber: 7
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                                children: chamadosFiltrados.map((os)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between items-center border-b border-slate-200 pb-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-mono font-bold text-sm text-blue-900",
                                                                children: os.numero || "MC-0000"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                                lineNumber: 486,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${os.status === "finalizado" ? "bg-emerald-100 text-emerald-700" : os.status === "pendente" ? "bg-orange-100 text-orange-700" : os.status === "emprestimo" ? "bg-purple-100 text-purple-700" : os.status === "descarte" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`,
                                                                children: os.status || "aberto"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                                lineNumber: 489,
                                                                columnNumber: 12
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                                        lineNumber: 485,
                                                        columnNumber: 11
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs space-y-1 text-slate-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        className: "text-slate-700 uppercase text-[10px]",
                                                                        children: "Setor:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                                                        lineNumber: 508,
                                                                        columnNumber: 13
                                                                    }, this),
                                                                    " ",
                                                                    os.setor
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                                lineNumber: 507,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        className: "text-slate-700 uppercase text-[10px]",
                                                                        children: "Equipamento:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                                                        lineNumber: 514,
                                                                        columnNumber: 13
                                                                    }, this),
                                                                    " ",
                                                                    os.equipamento
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                                lineNumber: 513,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        className: "text-slate-700 uppercase text-[10px]",
                                                                        children: "Falha:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                                                        lineNumber: 520,
                                                                        columnNumber: 13
                                                                    }, this),
                                                                    " ",
                                                                    os.falha
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                                lineNumber: 519,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        className: "text-slate-700 uppercase text-[10px]",
                                                                        children: "Solicitante:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                                                        lineNumber: 526,
                                                                        columnNumber: 13
                                                                    }, this),
                                                                    " ",
                                                                    os.solicitante
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                                lineNumber: 525,
                                                                columnNumber: 12
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        className: "text-slate-700 uppercase text-[10px]",
                                                                        children: "Abertura:"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                                                        lineNumber: 532,
                                                                        columnNumber: 13
                                                                    }, this),
                                                                    " ",
                                                                    os.dataHora || os.dataAbertura
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                                lineNumber: 531,
                                                                columnNumber: 12
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 11
                                                    }, this),
                                                    os.descricao && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-white p-2 rounded border border-slate-200 text-[11px] text-slate-500 italic",
                                                        children: [
                                                            '"',
                                                            os.descricao,
                                                            '"'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                                        lineNumber: 540,
                                                        columnNumber: 12
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 484,
                                                columnNumber: 10
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 pt-3 border-t border-slate-200 flex flex-col gap-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setOsSelecionada(os);
                                                        setNovoStatus(os.status || "em_andamento");
                                                        setResolucao(os.resolucao || "");
                                                        setMotivoPendencia(os.motivoPendencia || "");
                                                        setTemAssinaturaSolicitante(!!os.assinaturaSolicitante);
                                                        setTemAssinaturaTecnico(!!os.assinaturaTecnico);
                                                    },
                                                    className: `py-2 rounded-lg text-[11px] font-semibold transition text-center cursor-pointer shadow ${os.status === "finalizado" ? "bg-slate-300 hover:bg-slate-400 text-slate-800" : "bg-blue-600 hover:bg-blue-500 text-white"}`,
                                                    children: os.status === "finalizado" ? "👁️ Visualizar OS" : "🔧 Abrir para finalizar"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 547,
                                                    columnNumber: 11
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 546,
                                                columnNumber: 10
                                            }, this)
                                        ]
                                    }, os.id, true, {
                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                        lineNumber: 480,
                                        columnNumber: 9
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/page.tsx",
                                lineNumber: 478,
                                columnNumber: 7
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/page.tsx",
                        lineNumber: 457,
                        columnNumber: 5
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 330,
                columnNumber: 4
            }, this),
            osSelecionada && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-3 md:p-6 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white text-slate-800 rounded-2xl max-w-2xl w-full p-5 md:p-6 shadow-2xl space-y-4 my-6 print:shadow-none print:m-0 print:p-0 print:max-w-none",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden print:flex items-center justify-between border-b-2 border-slate-900 pb-3 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$logo$2d$fsnh$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$logo$2d$fsnh$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                            alt: "Logo FSNH",
                                            width: 40,
                                            height: 40,
                                            className: "object-contain"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 581,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "font-bold text-sm uppercase text-slate-900",
                                                    children: "Hospital Municipal de Novo Hamburgo"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 589,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-slate-600 uppercase font-semibold",
                                                    children: "Fundação de Saúde de Novo Hamburgo (FSNH) — Setor de Manutenção Clínica"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 592,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 588,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 580,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-right",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-mono font-bold text-sm",
                                            children: [
                                                "OS: ",
                                                osSelecionada.numero
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 599,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-slate-500",
                                            children: [
                                                "Data: ",
                                                osSelecionada.dataHora || osSelecionada.dataAbertura
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 602,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 598,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 579,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between border-b border-slate-200 pb-4 gap-3 print:hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-0.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 flex-wrap",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xs md:text-sm font-extrabold uppercase tracking-wide text-blue-950 font-mono",
                                                children: [
                                                    "Ordem de Serviço: ",
                                                    osSelecionada.numero
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 612,
                                                columnNumber: 10
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 611,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-slate-500",
                                            children: "Atendimento Técnico e Histórico — Manutenção Clínica FSNH"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 616,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 610,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>window.print(),
                                            className: "bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-sm",
                                            children: [
                                                "🖨️",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hidden sm:inline",
                                                    children: "Imprimir / Gerar PDF"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 629,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "sm:hidden",
                                                    children: "Imprimir"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 630,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 623,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setOsSelecionada(null),
                                            className: "w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold text-sm transition cursor-pointer",
                                            title: "Fechar",
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 632,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 622,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 609,
                            columnNumber: 7
                        }, this),
                        osSelecionada.status === "finalizado" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-amber-50 border border-amber-300 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 print:hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold text-amber-900",
                                            children: "OS Finalizada (Modo Somente Leitura)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 646,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-amber-700",
                                            children: "Caso tenha chegado o laudo do fabricante ou precise de ajustes, você pode reabri-la."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 649,
                                            columnNumber: 10
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 645,
                                    columnNumber: 9
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: async ()=>{
                                        if (confirm("Deseja reabrir esta OS para edição? O status passará para Pendente e o evento será registrado no histórico.")) {
                                            const agoraStr = new Date().toLocaleString("pt-BR");
                                            const usuarioAtual = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auth"].currentUser?.email || "Técnico Plantonista";
                                            const logsAtuais = Array.isArray(osSelecionada.historicoLogs) ? osSelecionada.historicoLogs : [];
                                            const novoLog = {
                                                data: agoraStr,
                                                autor: usuarioAtual,
                                                acao: "🔓 OS Reaberta excepcionalmente para edição/ajuste."
                                            };
                                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atualizarChamado"])(osSelecionada.id, {
                                                status: "pendente",
                                                historicoLogs: [
                                                    novoLog,
                                                    ...logsAtuais
                                                ]
                                            });
                                            alert("OS reaberta com sucesso!");
                                            setOsSelecionada(null);
                                            carregarDadosDashboard();
                                        }
                                    },
                                    className: "bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow cursor-pointer shrink-0",
                                    children: "🔓 Reabrir para Edição"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 654,
                                    columnNumber: 9
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 644,
                            columnNumber: 8
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-slate-50/80 print:bg-white print:border print:border-slate-300 p-3.5 rounded-xl text-xs space-y-1.5 text-slate-700 border border-slate-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-bold text-blue-900 print:text-slate-900 uppercase text-[10px] tracking-wider",
                                    children: "1. Reclamação / Problema Relatado:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 695,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-600",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Setor:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 700,
                                                    columnNumber: 10
                                                }, this),
                                                " ",
                                                osSelecionada.setor
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 699,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Solicitante:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 703,
                                                    columnNumber: 10
                                                }, this),
                                                " ",
                                                osSelecionada.solicitante
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 702,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 698,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Equipamento:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 707,
                                            columnNumber: 9
                                        }, this),
                                        " ",
                                        osSelecionada.equipamento,
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-slate-400 font-mono text-[11px]",
                                            children: [
                                                "(Patrimônio: ",
                                                osSelecionada.patrimonio || "S/N",
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 708,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 706,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-slate-700 print:text-slate-800 mt-2 bg-white print:bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            className: "text-slate-900 font-semibold",
                                            children: "Falha relatada:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 713,
                                            columnNumber: 9
                                        }, this),
                                        " ",
                                        osSelecionada.falha,
                                        " —",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "italic",
                                            children: [
                                                '"',
                                                osSelecionada.descricao,
                                                '"'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 717,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 712,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 694,
                            columnNumber: 7
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSalvarAtendimento,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "print:hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-[11px] font-bold uppercase text-slate-600 mb-1",
                                            children: "Alterar Status da OS"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 723,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            disabled: osSelecionada.status === "finalizado",
                                            value: novoStatus,
                                            onChange: (e)=>setNovoStatus(e.target.value),
                                            className: "w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold disabled:bg-slate-200 disabled:cursor-not-allowed text-slate-800 shadow-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "aberto",
                                                    children: "Aberto"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 732,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "em_andamento",
                                                    children: "Em Andamento (Interno)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 733,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "pendente",
                                                    children: "Pendente (Calibração / Falta de Peça / Externo)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 734,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "emprestimo",
                                                    children: "Empréstimo"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 737,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "finalizado",
                                                    children: "Finalizado / Consertado"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 738,
                                                    columnNumber: 10
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "descarte",
                                                    children: "Descarte"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 739,
                                                    columnNumber: 10
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 726,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 722,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden print:block text-xs font-bold uppercase text-slate-800 border-b pb-1",
                                    children: [
                                        "Status Atual da OS:",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-blue-950 underline",
                                            children: novoStatus
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 746,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 744,
                                    columnNumber: 8
                                }, this),
                                (novoStatus === "pendente" || osSelecionada.motivoPendencia) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-orange-50/70 print:bg-amber-50 p-3.5 rounded-xl border border-orange-200 print:border-amber-300 space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-[11px] font-bold uppercase text-orange-900 print:text-amber-900",
                                            children: "Motivo da Pendência *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 752,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "print:hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                disabled: osSelecionada.status === "finalizado",
                                                rows: 2,
                                                value: motivoPendencia,
                                                onChange: (e)=>setMotivoPendencia(e.target.value),
                                                placeholder: "Descreva detalhadamente o motivo pelo qual o equipamento ficou pendente...",
                                                className: "w-full bg-white border border-orange-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none disabled:bg-slate-100 disabled:cursor-not-allowed shadow-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 756,
                                                columnNumber: 11
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 755,
                                            columnNumber: 10
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "hidden print:block text-xs text-slate-700 italic",
                                            children: [
                                                '"',
                                                motivoPendencia || osSelecionada.motivoPendencia || "N/A",
                                                '"'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 765,
                                            columnNumber: 10
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 751,
                                    columnNumber: 9
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-[11px] font-bold uppercase text-slate-600 mb-1",
                                            children: "2. Resolução / Serviço Executado *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 774,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "print:hidden",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                disabled: osSelecionada.status === "finalizado",
                                                rows: 3,
                                                value: resolucao,
                                                onChange: (e)=>setResolucao(e.target.value),
                                                placeholder: "Descreva a solução aplicada, peças substituídas ou testes realizados...",
                                                className: "w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none disabled:bg-slate-200 disabled:cursor-not-allowed shadow-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/page.tsx",
                                                lineNumber: 778,
                                                columnNumber: 10
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 777,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hidden print:block bg-slate-50 border border-slate-300 p-3 rounded-lg text-xs min-h-15 text-slate-800",
                                            children: resolucao || osSelecionada.resolucao || "Serviço em andamento / Não informado."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 787,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 773,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-slate-50/80 border border-slate-200 p-3.5 rounded-xl space-y-2 print:border-slate-300",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-[11px] font-bold uppercase text-blue-900",
                                            children: "📜 Histórico de Movimentações (Trilha de Auditoria)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 796,
                                            columnNumber: 9
                                        }, this),
                                        Array.isArray(osSelecionada.historicoLogs) && osSelecionada.historicoLogs.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "max-h-32 overflow-y-auto space-y-1.5 text-[11px] pr-1",
                                            children: osSelecionada.historicoLogs.map((log, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-white p-2.5 rounded-lg border border-slate-200/80 flex flex-col shadow-2xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between text-[10px] text-slate-400 font-mono",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: log.data
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                                    lineNumber: 809,
                                                                    columnNumber: 15
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-slate-600",
                                                                    children: log.autor
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                                    lineNumber: 810,
                                                                    columnNumber: 15
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                                            lineNumber: 808,
                                                            columnNumber: 14
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-slate-700 mt-1",
                                                            children: log.acao
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                                            lineNumber: 814,
                                                            columnNumber: 14
                                                        }, this)
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 804,
                                                    columnNumber: 13
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 801,
                                            columnNumber: 10
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-slate-400 italic",
                                            children: "Nenhum registro de movimentação anterior."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 820,
                                            columnNumber: 10
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 795,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-4 pt-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[10px] font-bold uppercase text-slate-600 tracking-wider",
                                                            children: "Assinatura do Solicitante"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                                            lineNumber: 831,
                                                            columnNumber: 11
                                                        }, this),
                                                        osSelecionada.status !== "finalizado" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>limparAssinatura("solicitante"),
                                                            className: "text-[10px] font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer bg-red-50 px-2 py-0.5 rounded",
                                                            children: "Limpar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                                            lineNumber: 835,
                                                            columnNumber: 12
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 830,
                                                    columnNumber: 10
                                                }, this),
                                                osSelecionada.assinaturaSolicitante && !temAssinaturaSolicitante ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-white p-2 rounded-xl border border-slate-200 text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: osSelecionada.assinaturaSolicitante,
                                                            alt: "Assinatura Solicitante",
                                                            className: "max-h-16 mx-auto object-contain"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                                            lineNumber: 848,
                                                            columnNumber: 12
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] text-emerald-600 font-bold block mt-1",
                                                            children: "✓ Assinado digitalmente"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                                            lineNumber: 853,
                                                            columnNumber: 12
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 847,
                                                    columnNumber: 11
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-white border border-slate-300 rounded-xl overflow-hidden flex justify-center shadow-2xs",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                                        ref: canvasSolicitanteRef,
                                                        width: 260,
                                                        height: 90,
                                                        onMouseDown: (e)=>iniciarDesenho(e, "solicitante"),
                                                        onMouseMove: (e)=>desenhar(e, "solicitante"),
                                                        onMouseUp: pararDesenho,
                                                        onMouseLeave: pararDesenho,
                                                        onTouchStart: (e)=>iniciarDesenho(e, "solicitante"),
                                                        onTouchMove: (e)=>desenhar(e, "solicitante"),
                                                        onTouchEnd: pararDesenho,
                                                        className: "touch-none bg-white w-full cursor-crosshair h-20 md:h-24"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                                        lineNumber: 859,
                                                        columnNumber: 12
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 858,
                                                    columnNumber: 11
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 829,
                                            columnNumber: 9
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[10px] font-bold uppercase text-slate-600 tracking-wider",
                                                            children: "Assinatura do Técnico (Eng. Clínica)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                                            lineNumber: 879,
                                                            columnNumber: 11
                                                        }, this),
                                                        osSelecionada.status !== "finalizado" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>limparAssinatura("tecnico"),
                                                            className: "text-[10px] font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer bg-red-50 px-2 py-0.5 rounded",
                                                            children: "Limpar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                                            lineNumber: 883,
                                                            columnNumber: 12
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 878,
                                                    columnNumber: 10
                                                }, this),
                                                osSelecionada.assinaturaTecnico && !temAssinaturaTecnico ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-white p-2 rounded-xl border border-slate-200 text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: osSelecionada.assinaturaTecnico,
                                                            alt: "Assinatura Técnico",
                                                            className: "max-h-16 mx-auto object-contain"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                                            lineNumber: 895,
                                                            columnNumber: 12
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] text-emerald-600 font-bold block mt-1",
                                                            children: "✓ Assinado digitalmente"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                                            lineNumber: 900,
                                                            columnNumber: 12
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 894,
                                                    columnNumber: 11
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-white border border-slate-300 rounded-xl overflow-hidden flex justify-center shadow-2xs",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                                        ref: canvasTecnicoRef,
                                                        width: 260,
                                                        height: 90,
                                                        onMouseDown: (e)=>iniciarDesenho(e, "tecnico"),
                                                        onMouseMove: (e)=>desenhar(e, "tecnico"),
                                                        onMouseUp: pararDesenho,
                                                        onMouseLeave: pararDesenho,
                                                        onTouchStart: (e)=>iniciarDesenho(e, "tecnico"),
                                                        onTouchMove: (e)=>desenhar(e, "tecnico"),
                                                        onTouchEnd: pararDesenho,
                                                        className: "touch-none bg-white w-full cursor-crosshair h-20 md:h-24"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/page.tsx",
                                                        lineNumber: 906,
                                                        columnNumber: 12
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                                    lineNumber: 905,
                                                    columnNumber: 11
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 877,
                                            columnNumber: 9
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 827,
                                    columnNumber: 8
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-slate-200 print:hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setOsSelecionada(null),
                                            className: "w-full sm:flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer",
                                            children: "Fechar"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 926,
                                            columnNumber: 9
                                        }, this),
                                        osSelecionada.status !== "finalizado" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "w-full sm:flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer shadow-md",
                                            children: "Salvar Atendimento"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/page.tsx",
                                            lineNumber: 935,
                                            columnNumber: 10
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/page.tsx",
                                    lineNumber: 925,
                                    columnNumber: 8
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/page.tsx",
                            lineNumber: 721,
                            columnNumber: 7
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/page.tsx",
                    lineNumber: 577,
                    columnNumber: 6
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/page.tsx",
                lineNumber: 576,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/page.tsx",
        lineNumber: 235,
        columnNumber: 3
    }, this);
}
_s(DashboardPage, "k+bErRc/Sd5GINqOWAvR5cAIltQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_13gp7zn._.js.map