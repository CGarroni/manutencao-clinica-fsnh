# 🏥 Manutenção Clínica — FSPNH

Sistema digital de Ordens de Serviço para a equipe de Manutenção Clínica da **Fundação de Saúde Pública de Novo Hamburgo**.

---

## 📋 Sobre o Projeto

Aplicação web responsiva que substitui fichas físicas de chamados técnicos hospitalares. Permite abertura, execução e finalização de ordens de serviço com assinatura digital diretamente no celular.

---

## ✨ Funcionalidades

- 📝 **Abertura de chamado** pelo setor solicitante
- 📨 **E-mail automático** para a equipe de Manutenção Clínica
- ✍️ **Assinatura digital** do técnico e do responsável pelo setor (funciona no celular)
- 📧 **E-mail de arquivamento** com relatório e assinaturas para o responsável
- 🔥 **Registro automático** no Firebase Firestore para métricas e histórico
- 🔢 **Numeração automática** e progressiva dos chamados (ex: MC-2603-0001)
- 📱 **Totalmente responsivo** — funciona em qualquer celular ou tablet

---

## 🗂️ Estrutura de Pastas

```
manutencao-clinica-fsnh/
│
├── index.html                  # Página principal
│
├── src/
│   ├── css/
│   │   └── style.css           # Estilos globais
│   │
│   ├── js/
│   │   ├── main.js             # Lógica principal (formulário, e-mail, assinaturas)
│   │   └── firebase.js         # Integração com Firebase Firestore
│   │
│   └── assets/
│       ├── logo.jpg            # Logo FSPNH
│       └── hospital.jpg        # Foto do Hospital Municipal
│
├── docs/
│   └── EMAILJS.md              # Guia de configuração do EmailJS
│
├── .gitignore
└── README.md
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- [VS Code](https://code.visualstudio.com/)
- Extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/manutencao-clinica-fsnh.git
   ```
2. Abra a pasta no VS Code
3. Clique com botão direito em `index.html` → **"Open with Live Server"**
4. Acesse `http://127.0.0.1:5500`

> ⚠️ **Importante:** Abrir via `file://` não funciona — o Firebase requer servidor HTTP.

---

## ⚙️ Configuração

### 🔑 EmailJS
Edite as variáveis no topo de `src/js/main.js`:

```js
const EMAILJS_PUBLIC_KEY  = 'SUA_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'SEU_SERVICE_ID';
const TEMPLATE_MANUTENCAO = 'ID_TEMPLATE_MANUTENCAO';
const TEMPLATE_ARQUIVO    = 'ID_TEMPLATE_ARQUIVO';
const EMAIL_RESPONSAVEL   = 'responsavel@fspnh.com.br';
```

Consulte o guia completo em [`docs/EMAILJS.md`](docs/EMAILJS.md).

### 🔥 Firebase
As credenciais estão em `src/js/firebase.js`. Para usar em outro projeto, substitua o objeto `firebaseConfig` com as credenciais do seu projeto Firebase.

---

## 📧 Fluxo de E-mails

```
Setor abre chamado
       ↓
E-mail 1 → Equipe de Manutenção Clínica
(número, equipamento, setor, problema)
       ↓
Técnico executa o serviço
       ↓
Assinatura técnico + responsável setor
       ↓
E-mail 2 → Responsável de Arquivamento
(relatório completo + assinaturas)
       ↓
Firebase → Registro para métricas
```

---

## 🗄️ Firebase Firestore

Cada chamado finalizado é salvo automaticamente na coleção **`chamados`** com os campos:

| Campo | Descrição |
|---|---|
| `numero` | Número do chamado (ex: MC-2603-0001) |
| `dataHora` | Data e hora de abertura |
| `solicitante` | Nome do solicitante |
| `setor` | Setor solicitante |
| `leito` | Leito ou quarto |
| `equipamento` | Tipo de equipamento |
| `marca` | Marca e modelo |
| `falha` | Tipo de falha identificada |
| `descricao` | Descrição do problema |
| `tecnico_nome` | Nome do técnico responsável |
| `resp_nome` | Nome do responsável do setor |
| `obs_tecnico` | Serviço executado |
| `dataFim` | Data e hora de finalização |
| `status` | `aberto` ou `finalizado` |
| `temAssinaturaTecnico` | `true/false` |
| `temAssinaturaResp` | `true/false` |

---

## 🚀 Deploy

O projeto está hospedado na **Vercel**:

🔗 **URL de produção:** `https://manutencao-clinica-fsnh.vercel.app`

### Como fazer deploy na Vercel:
1. Faça push para o GitHub
2. Acesse [vercel.com](https://vercel.com) → importe o repositório
3. Clique em **Deploy** — sem configuração adicional

---

## 📱 Acesso pelo Celular

Após o deploy, qualquer dispositivo pode acessar via:
- **URL direta** no navegador do celular
- **QR Code** fixado nos setores do hospital (recomendado)

---

## 🛣️ Roadmap

- [ ] Dashboard de métricas com gráficos
- [ ] Exportação para Google Sheets
- [ ] Filtros por setor, equipamento e período
- [ ] Sistema de login por setor
- [ ] Notificações push para técnicos
- [ ] Migração para React Native (App hospitalar)

---

## 🏗️ Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 / CSS3 / JS | Base da aplicação |
| [Tailwind CSS](https://tailwindcss.com) | Estilização (futuro) |
| [Firebase Firestore](https://firebase.google.com) | Banco de dados em nuvem |
| [EmailJS](https://emailjs.com) | Envio de e-mails sem backend |
| [Signature Pad](https://github.com/szimek/signature_pad) | Assinatura digital |
| [Vercel](https://vercel.com) | Deploy e hospedagem |

---

## 👤 Desenvolvido para

**Fundação de Saúde Pública de Novo Hamburgo — FSPNH**
Hospital Municipal de Novo Hamburgo

---

## 📄 Licença

Uso interno — FSPNH © 2025