# 📧 Guia de Configuração — EmailJS

Este guia explica como configurar o EmailJS para que o sistema envie e-mails automaticamente.

---

## 1. Criar conta

Acesse [emailjs.com](https://emailjs.com) e crie uma conta gratuita.
O plano gratuito permite **200 e-mails/mês** — suficiente para o volume hospitalar.

---

## 2. Conectar seu e-mail

1. No painel do EmailJS, clique em **"Email Services"**
2. Clique em **"Add New Service"**
3. Escolha **Gmail** ou **Outlook**
4. Autorize o acesso e salve
5. Anote o **Service ID** (ex: `service_utaq4mc`)

---

## 3. Criar os Templates

O sistema usa **2 templates**:

---

### 📨 Template 1 — Abertura do Chamado
**ID:** `template_7kxq2w1`
**Destino:** E-mail da equipe de Manutenção Clínica

**Assunto sugerido:**
```
🔧 Novo Chamado {{numero}} — {{equipamento}} | {{setor}}
```

**Corpo sugerido:**
```
MANUTENÇÃO CLÍNICA — FSPNH
Novo Chamado de Manutenção

Nº do Chamado: {{numero}}
Data/Hora: {{dataHora}}

SOLICITANTE
Nome: {{solicitante}}
Setor: {{setor}}
Leito/Quarto: {{leito}}

EQUIPAMENTO
Equipamento: {{equipamento}}
Marca/Modelo: {{marca}}
Falha: {{falha}}

DESCRIÇÃO DO PROBLEMA
{{descricao}}
```

---

### 📁 Template 2 — Arquivamento (com assinaturas)
**ID:** `template_1z6b5w9`
**Destino:** E-mail do responsável de arquivamento

**Assunto sugerido:**
```
✅ Chamado {{numero}} Finalizado — {{equipamento}} | {{setor}}
```

**Corpo sugerido:**
```
MANUTENÇÃO CLÍNICA — FSPNH
Ordem de Serviço Finalizada

Nº do Chamado: {{numero}}
Abertura: {{dataHora}}
Finalização: {{dataFim}}

SOLICITANTE
Nome: {{solicitante}}
Setor: {{setor}}
Leito/Quarto: {{leito}}

EQUIPAMENTO
Equipamento: {{equipamento}}
Marca/Modelo: {{marca}}
Falha: {{falha}}

DESCRIÇÃO DO PROBLEMA
{{descricao}}

SERVIÇO EXECUTADO
{{obs_tecnico}}

RESPONSÁVEIS
Técnico: {{tecnico_nome}}
Responsável do Setor: {{resp_nome}}

Assinatura Técnico:
{{sig_tecnico}}

Assinatura Responsável:
{{sig_resp}}
```

---

## 4. Variáveis disponíveis

| Variável | Descrição |
|---|---|
| `{{numero}}` | Número do chamado |
| `{{dataHora}}` | Data e hora de abertura |
| `{{solicitante}}` | Nome do solicitante |
| `{{setor}}` | Setor solicitante |
| `{{leito}}` | Leito ou quarto |
| `{{equipamento}}` | Equipamento |
| `{{marca}}` | Marca e modelo |
| `{{falha}}` | Tipo de falha |
| `{{descricao}}` | Descrição do problema |
| `{{tecnico_nome}}` | Nome do técnico |
| `{{resp_nome}}` | Nome do responsável do setor |
| `{{obs_tecnico}}` | Serviço executado |
| `{{sig_tecnico}}` | Assinatura do técnico (imagem base64) |
| `{{sig_resp}}` | Assinatura do responsável (imagem base64) |
| `{{dataFim}}` | Data e hora de finalização |
| `{{to_email}}` | E-mail do responsável de arquivamento |

---

## 5. Configurar no código

Edite o topo de `src/js/main.js`:

```js
const EMAILJS_PUBLIC_KEY  = 'SUA_PUBLIC_KEY';
const EMAILJS_SERVICE_ID  = 'SEU_SERVICE_ID';
const TEMPLATE_MANUTENCAO = 'ID_TEMPLATE_1';
const TEMPLATE_ARQUIVO    = 'ID_TEMPLATE_2';
const EMAIL_RESPONSAVEL   = 'responsavel@fspnh.com.br';
```

---

## ⚠️ Limite do plano gratuito

- 200 e-mails/mês
- Caso ultrapasse, o plano Personal custa ~$15/mês para 1.000 e-mails

Para o volume estimado do hospital, o plano gratuito é suficiente.