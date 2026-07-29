# 🏥 Manutenção Clínica — FSNH

Sistema digital de Ordens de Serviço para a equipe de Manutenção Clínica da **Fundação de Saúde Pública de Novo Hamburgo**.

---

## 📋 Sobre o Projeto

Aplicação web responsiva que substitui fichas físicas de chamados técnicos hospitalares. Permite **abertura, execução, acompanhamento e finalização** de ordens de serviço com assinatura digital diretamente no celular, além de **dashboard de gestão**, **cadastro de equipamentos** e **rastreabilidade por patrimônio**.

> 🔄 **Versão refatorada:** numeração de OS sequencial centralizada no Firebase, login unificado entre as áreas protegidas, novos status de fluxo (Em Andamento / Pendente externo) e vínculo entre chamado e equipamento.

---

## ✨ Funcionalidades

- 📝 **Abertura de chamado** pelo setor solicitante (público, sem login)
- 🔢 **Numeração automática e sequencial** gerada no Firebase via transação atômica (ex: `MC-2506-0001`) — confiável entre qualquer dispositivo ou navegador
- 🔗 **Vínculo com equipamento por patrimônio** — preenchimento automático de tipo, marca e modelo, garantindo rastreabilidade
- 📨 **E-mail automático** para a equipe de Manutenção Clínica
- ✍️ **Assinatura digital** do técnico e do responsável pelo setor (funciona no celular)
- 📧 **E-mail de arquivamento** com relatório e assinaturas
- 🔐 **Login seguro via Firebase Authentication** — sem senha no código; apenas e-mails autorizados acessam Dashboard e Equipamentos
- 📊 **Dashboard de gestão** com filtros, métricas e alteração de status
- 🗂️ **Cadastro de equipamentos** com histórico por patrimônio
- 🔄 **Fluxo de status completo:** Em Aberto → Em Andamento → Pendente (externo) → Finalizado
- 📱 **Totalmente responsivo** — funciona em qualquer celular ou tablet

---

## 🗂️ Estrutura de Pastas

```
manutencao-clinica-fsnh/
│
├── index.html                  # Abertura de chamado (PÚBLICO)
│
├── os/
│   └── index.html              # Finalização/visualização da OS (via link)
│
├── dashboard/
│   └── index.html              # Relatórios e gestão (LOGIN)
│
├── equipamentos/
│   └── index.html              # Cadastro de equipamentos (LOGIN)
│
├── src/
│   ├── css/
│   │   └── style.css           # Estilos globais
│   │
│   ├── js/
│   │   ├── config.js           # Configurações (Firebase, EmailJS, Status) — SEM SENHA
│   │   ├── auth.js             # Autenticação via Firebase Authentication (e-mail/senha)
│   │   ├── firebase.js         # Integração Firestore (numeração, chamados, equipamentos, histórico)
│   │   └── main.js             # Lógica principal (formulário, e-mail, assinaturas)
│   │
│   └── assets/
<<<<<<< HEAD
│       ├── logo.jpg            # Logo FSNH
│       └── hospital.jpg        # Foto do Hospital Municipal
│
├── docs/
│   └── EMAILJS.md              # Guia de configuração do EmailJS
│
├── firestore.rules            # Regras de segurança do Firestore (controle de acesso)
├── .gitignore
└── README.md
```

---

## 🔐 Áreas de Acesso

| Área | Caminho | Acesso | Descrição |
|---|---|---|---|
| **Abertura de chamado** | `/` | Público | Qualquer pessoa pode abrir um chamado |
| **Finalização de OS** | `/os/` | Via link | Técnico finaliza a OS pelo link recebido |
| **Dashboard** | `/dashboard/` | 🔒 Login | Relatórios, métricas e gestão de status |
| **Equipamentos** | `/equipamentos/` | 🔒 Login | Cadastro e histórico de equipamentos |

> 🔑 **Login seguro:** o acesso às áreas protegidas (Dashboard e Equipamentos) é feito por **e-mail e senha via Firebase Authentication**. Não existe senha armazenada no código — apenas e-mails previamente cadastrados pela administração conseguem entrar. A sessão é encerrada ao fechar o navegador.

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- [VS Code](https://code.visualstudio.com/)
- Extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/CGarroni/manutencao-clinica-fsnh.git
   ```
2. Abra a pasta no VS Code
3. Clique com botão direito em `index.html` → **"Open with Live Server"**
4. Acesse `http://127.0.0.1:5500`

> ⚠️ **Importante:** Abrir via `file://` não funciona — o Firebase e os módulos ES (`import/export`) exigem servidor HTTP.

---

## ⚙️ Configuração

> 🎯 Parâmetros não sensíveis (Firebase config pública, EmailJS e status) ficam em `src/js/config.js`. **Nenhuma senha fica no código.**

### 🔥 Firebase / 📧 EmailJS

Edite `src/js/config.js`:

```js
// Firebase (config pública — pode ficar no frontend, é protegida pelas Security Rules)
export const FIREBASE_CONFIG = { apiKey: '...', projectId: '...', /* ... */ };

// EmailJS
export const EMAILJS_CONFIG = {
  publicKey: 'SUA_PUBLIC_KEY',
  serviceId: 'SEU_SERVICE_ID',
  templateManutencao: 'ID_TEMPLATE_MANUTENCAO',
  templateArquivo: 'ID_TEMPLATE_ARQUIVO',
  emailResponsavel: 'responsavel@email.com'
};
```

> ℹ️ A `apiKey` do Firebase **não é um segredo** — ela é projetada para ser pública em apps web. Quem protege o banco são as **Firestore Security Rules** (ver abaixo), não o ocultamento da chave.

---

## 🔐 Segurança e Autenticação

A autenticação usa **Firebase Authentication (e-mail/senha)**. As credenciais ficam armazenadas, com hash, nos servidores do Google — **nunca no código, no repositório, no DevTools ou neste README**.

### 👥 Cadastrar usuários da equipe de manutenção

Os acessos são criados manualmente pela administração (não há tela de cadastro público):

1. Acesse o [Firebase Console](https://console.firebase.google.com/) → projeto **manutencao-clinica-fsnh**
2. Menu **Authentication** → aba **Sign-in method** → habilite **E-mail/senha**
3. Aba **Users** → **Adicionar usuário** → informe o e-mail e a senha de cada membro da equipe
4. Pronto — somente esses e-mails conseguem acessar Dashboard e Equipamentos

> 🔒 Para trocar/resetar uma senha, use o próprio Firebase Console (ou o fluxo de redefinição por e-mail). A senha **nunca** passa pelo código da aplicação.

### 🛡️ Firestore Security Rules

O arquivo [`firestore.rules`](./firestore.rules) define quem pode ler/gravar cada coleção:

- **`chamados`**: qualquer pessoa pode **abrir** um chamado (formulário público), mas **ler, editar e excluir** exige login da equipe.
- **`equipamentos`**: acesso restrito a usuários autenticados.
- **`contadores`**: usado para gerar a numeração da OS na abertura pública (sem dados sensíveis).
- Qualquer outra coleção é **negada por padrão**.

**Como publicar as regras:**
- Firebase Console → **Firestore Database** → aba **Rules** → cole o conteúdo de `firestore.rules` → **Publicar**
- Ou via CLI: `firebase deploy --only firestore:rules`

> ⚠️ **Importante:** sem publicar as Security Rules, o banco fica aberto mesmo com a tela de login. O login na tela e as regras no servidor são **camadas complementares** — ambas são necessárias.

---

## 🔄 Fluxo de Status da OS

```
┌─────────────┐     ┌───────────────┐     ┌──────────────────┐     ┌──────────────┐
│  EM ABERTO  │ ──▶ │ EM ANDAMENTO  │ ──▶ │     PENDENTE     │ ──▶ │  FINALIZADO  │
│  (laranja)  │     │   (azul)      │     │ (externo - roxo) │     │   (verde)    │
└─────────────┘     └───────────────┘     └──────────────────┘     └──────────────┘
   abertura          manutenção             calibração/conserto       concluído
                     interna                em fabricante / outro
                                            hospital
```

| Status | Quando usar |
|---|---|
| `aberto` | Chamado recém-aberto pelo setor |
| `em_andamento` | Manutenção interna em execução |
| `pendente` | Equipamento fora da unidade (calibração/conserto externo, empréstimo) |
| `finalizado` | Serviço concluído com assinaturas |

> Apenas usuários logados (equipe de manutenção) podem alterar status e editar a OS.

---

## 📧 Fluxo de E-mails

```
Setor abre chamado
       ↓
Número gerado no Firebase (sequencial atômico)
       ↓
E-mail 1 → Equipe de Manutenção Clínica
(número, equipamento, patrimônio, setor, problema)
       ↓
Técnico executa o serviço
       ↓
Assinatura técnico + responsável setor
       ↓
E-mail 2 → Responsável de Arquivamento
(relatório completo + assinaturas)
       ↓
Firebase → Atualização de status para registro e métricas
```

---

## 🗄️ Modelo de Dados (Firebase Firestore)

### Coleção `chamados`

| Campo | Descrição |
|---|---|
| `numero` | Número do chamado (ex: MC-2506-0001) |
| `dataHora` | Data e hora de abertura |
| `solicitante` | Nome do solicitante |
| `setor` | Setor solicitante |
| `leito` | Leito ou quarto |
| `equipamento` | Tipo de equipamento |
| `marca` | Marca e modelo |
| `patrimonio` | 🔗 Patrimônio do equipamento (rastreabilidade) |
| `patrimonioId` | 🔗 ID do documento de equipamento vinculado |
| `falha` | Tipo de falha identificada |
| `descricao` | Descrição do problema |
| `tecnico_nome` | Nome do técnico responsável |
| `resp_nome` | Nome do responsável do setor |
| `obs_tecnico` | Serviço executado |
| `dataFim` | Data e hora de finalização |
| `status` | `aberto` \| `em_andamento` \| `pendente` \| `finalizado` |
| `temAssinaturaTecnico` | `true/false` |
| `temAssinaturaResp` | `true/false` |
| `criadoEm` | Timestamp do servidor (abertura) |
| `atualizadoEm` | Timestamp da última atualização de status |
| `finalizadoEm` | Timestamp da finalização |

### Coleção `equipamentos`

| Campo | Descrição |
|---|---|
| `tipo` | Tipo de equipamento |
| `marca` | Marca / modelo |
| `patrimonio` | Número de patrimônio (chave de busca) |
| `setor` | Setor/localização |
| `criadoEm` | Timestamp do servidor |

### Coleção `contadores`

Garante a numeração sequencial atômica das OS por mês.

| Campo | Descrição |
|---|---|
| `ym` | Ano+mês (ex: `2506`) |
| `seq` | Último número sequencial usado no mês |
| `ultimaAtualizacao` | Timestamp da última geração |

> Documentos nomeados como `os_AAMM` (ex: `os_2506`). A geração usa `runTransaction` para evitar números duplicados em acessos simultâneos.

---

## 🚀 Deploy

O projeto está hospedado na **Vercel**:

🔗 **URL de produção:** `https://manutencaoclinica.vercel.app`

### Como fazer deploy na Vercel:
1. Faça push para o GitHub
2. Acesse [vercel.com](https://vercel.com) → importe o repositório
3. Clique em **Deploy** — sem configuração adicional (site estático)

---

## 📱 Acesso pelo Celular

Após o deploy, qualquer dispositivo pode acessar via:
- **URL direta** no navegador do celular
- **QR Code** fixado nos setores do hospital (recomendado)

---

## 🛣️ Roadmap

- [x] Dashboard de métricas
- [x] Filtros por status
- [x] Cadastro de equipamentos com histórico
- [x] Numeração sequencial centralizada no Firebase
- [x] Vínculo OS ↔ patrimônio (rastreabilidade)
- [x] Status de fluxo (Em Andamento / Pendente externo)
- [x] **Autenticação segura via Firebase Authentication (senha removida do código)**
- [x] **Firestore Security Rules (controle de acesso no servidor)**
- [ ] Exportação para PDF / Google Sheets
- [ ] Gráficos de métricas (tempo médio, volume por setor)
- [ ] Notificações push para técnicos
- [ ] Controle formal de equipamentos fora da unidade (formulário de recolhimento/entrega assinado)

---

## 🏗️ Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 / CSS3 / JS (ES Modules) | Base da aplicação |
| [Firebase Firestore](https://firebase.google.com) | Banco de dados em nuvem |
| [EmailJS](https://emailjs.com) | Envio de e-mails sem backend |
| [Signature Pad](https://github.com/szimek/signature_pad) | Assinatura digital |
| [Vercel](https://vercel.com) | Deploy e hospedagem |

---

## 👤 Desenvolvido para

**Fundação de Saúde Pública de Novo Hamburgo — FSNH**
Hospital Municipal de Novo Hamburgo

---

## 📄 Licença

<<<<<<< HEAD
Uso interno — FSNH © 2025
=======
Uso interno — FSNH © 2026
>>>>>>> 3bf9f76 (refactor: remove index.html legado e consolida versao atualizada no Next.js)
