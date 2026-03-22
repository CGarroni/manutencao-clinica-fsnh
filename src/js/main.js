// ============================================================
// main.js — Lógica principal do sistema de chamados
// Projeto: Manutenção Clínica FSPNH
// ============================================================

// ── CONFIG EMAILJS ─────────────────────────────────────────────────────────
  const EMAILJS_PUBLIC_KEY  = 'LRdHG7gjMde2p8TZv';
  const EMAILJS_SERVICE_ID  = 'service_utaq4mc';
  const TEMPLATE_MANUTENCAO = 'template_7kxq2w1'; // e-mail → equipe manutenção
  const TEMPLATE_ARQUIVO    = 'template_1z6b5w9'; // e-mail → responsável arquivamento

  // ── E-MAIL DO RESPONSÁVEL DE ARQUIVAMENTO ───────────────────────────────────
  // Altere aqui para o e-mail correto
  const EMAIL_RESPONSAVEL = 'relatoriosmanutclinica@gmail.com';

  emailjs.init(EMAILJS_PUBLIC_KEY);

  // ── ESTADO ─────────────────────────────────────────────────────────────────
  let sigTecnico = null, sigResp = null;
  let chamadoData = {};

  // ── NUMERAÇÃO AUTOMÁTICA ───────────────────────────────────────────────────
  function getNextNum() {
    const now  = new Date();
    const ym   = now.getFullYear().toString().slice(-2) + String(now.getMonth()+1).padStart(2,'0');
    const key  = 'mc_counter';
    const data = JSON.parse(localStorage.getItem(key) || '{"ym":"","seq":0}');
    const seq  = data.ym === ym ? data.seq + 1 : 1;
    localStorage.setItem(key, JSON.stringify({ ym, seq }));
    // Número completo salvo nos dados (ex: MC-2603-0001)
    chamadoData._numCompleto = 'MC-' + ym + '-' + String(seq).padStart(4,'0');
    // No header/badge: mobile mostra curto, desktop mostra completo
    return chamadoData._numCompleto;
  }

  // Retorna número curto para mobile (MC-0001) ou completo para desktop
  function getDisplayNum(numCompleto) {
    if (window.innerWidth <= 600) {
      const parts = numCompleto.split('-');
      return 'MC-' + parts[2]; // MC-0001
    }
    return numCompleto; // MC-2603-0001
  }

  // ── INIT ───────────────────────────────────────────────────────────────────
  window.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    document.getElementById('datetime').value =
      now.toLocaleDateString('pt-BR') + ' ' +
      now.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});

    const num = getNextNum();
    chamadoData.numero   = chamadoData._numCompleto; // sempre salva completo
    chamadoData.dataHora = document.getElementById('datetime').value;
    const displayNum     = getDisplayNum(num);
    document.getElementById('num-value').textContent   = displayNum;
    document.getElementById('num-value-2').textContent = displayNum;
    document.getElementById('done-num').textContent    = num; // sucesso mostra completo
    document.getElementById('header-num').textContent  = displayNum;
  });

// ── VALIDAÇÃO ──────────────────────────────────────────────────────────────
  function validate(fields) {
    for (const [id, lbl] of fields) {
      const el = document.getElementById(id);
      if (!el || !el.value.trim()) {
        showToast('Preencha: ' + lbl, 'error');
        el?.focus();
        return false;
      }
    }
    return true;
  }

  // ── ENVIAR CHAMADO ─────────────────────────────────────────────────────────
  async function enviarChamado() {
    if (!validate([
      ['solicitante','Solicitante'],
      ['setor','Setor'],
      ['equipamento','Equipamento'],
      ['falha','Falha Identificada'],
      ['descricao','Descrição do Problema'],
    ])) return;

    chamadoData = {
      ...chamadoData,
      solicitante: document.getElementById('solicitante').value.trim(),
      setor:       document.getElementById('setor').value.trim(),
      leito:       document.getElementById('leito').value.trim() || '—',
      equipamento: document.getElementById('equipamento').value,
      marca:       document.getElementById('marca').value.trim() || '—',
      falha:       document.getElementById('falha').value,
      descricao:   document.getElementById('descricao').value.trim(),
    };

    const btn = document.querySelector('#step-form .btn');
    btn.disabled = true; btn.textContent = '⏳ Enviando...';

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_MANUTENCAO, chamadoData);
      // Salva no Firebase com status "aberto"
      chamadoData.firebaseId = await window.salvarNoFirebase({
        ...chamadoData,
        status: 'aberto'
      });
      showToast('✅ Enviado para Manutenção Clínica!', 'success');
      goStep('step-sig');
      initSignatures();
    } catch(e) {
      console.error('EmailJS erro completo:', e);
      const msg = e?.text || e?.message || JSON.stringify(e) || 'Erro desconhecido';
      showToast('Erro: ' + msg, 'error');
      alert('❌ Erro EmailJS:\n\n' + msg + '\n\nStatus: ' + (e?.status || '—'));
      btn.disabled = false;
      btn.textContent = '📨 Enviar para Manutenção Clínica';
    }
  }

  // ── ASSINATURAS ────────────────────────────────────────────────────────────
  function initSignatures() {
    const ratio = window.devicePixelRatio || 1;
    ['sig-tecnico','sig-resp'].forEach(id => {
      const c = document.getElementById(id);
      c.width  = c.offsetWidth  * ratio;
      c.height = c.offsetHeight * ratio;
      c.getContext('2d').scale(ratio, ratio);
    });
    sigTecnico = new SignaturePad(document.getElementById('sig-tecnico'),
      { backgroundColor:'rgb(248,250,252)', penColor:'#0a2342' });
    sigResp = new SignaturePad(document.getElementById('sig-resp'),
      { backgroundColor:'rgb(248,250,252)', penColor:'#0a2342' });
  }

  function clearSig(who) {
    (who === 'tecnico' ? sigTecnico : sigResp)?.clear();
  }

  // ── COMPRESSOR DE ASSINATURA ─────────────────────────────────────────────────
  // Reduz assinatura para JPEG 400x150px com fundo branco — fica abaixo de 10KB
  function comprimirAssinatura(pad) {
    const offscreen = document.createElement('canvas');
    offscreen.width  = 400;
    offscreen.height = 150;
    const ctx = offscreen.getContext('2d');

    // Fundo branco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 400, 150);

    // Desenha assinatura original redimensionada
    const original = pad.toDataURL('image/png');
    const img = new Image();
    img.src = original;
    ctx.drawImage(img, 0, 0, 400, 150);

    // Exporta como JPEG com qualidade 0.6 (~8-12KB)
    return offscreen.toDataURL('image/jpeg', 0.6);
  }

  // ── FINALIZAR CHAMADO ──────────────────────────────────────────────────────
  async function finalizarChamado() {
    if (!validate([
      ['tecnico-nome','Nome do Técnico'],
      ['resp-nome','Nome do Responsável do Setor'],
      ['obs-tecnico','Descrição do Serviço Executado'],
    ])) return;
    if (!sigTecnico || sigTecnico.isEmpty()) { showToast('Colete a assinatura do técnico', 'error'); return; }
    if (!sigResp    || sigResp.isEmpty())    { showToast('Colete a assinatura do responsável', 'error'); return; }

    const btn = document.querySelector('#step-sig .btn');
    btn.disabled = true; btn.textContent = '⏳ Arquivando...';

    const dataFim     = new Date().toLocaleString('pt-BR');
    const tecnicoNome = document.getElementById('tecnico-nome').value.trim();
    const respNome    = document.getElementById('resp-nome').value.trim();
    const obsTecnico  = document.getElementById('obs-tecnico').value.trim();
    // Comprime assinaturas para JPEG com qualidade reduzida (limite EmailJS: 50KB)
    const sigTecImg  = comprimirAssinatura(sigTecnico);
    const sigRespImg = comprimirAssinatura(sigResp);

    const dadosFinais = {
      ...chamadoData,
      tecnico_nome:     tecnicoNome,
      resp_nome:        respNome,
      obs_tecnico:      obsTecnico,
      sig_tecnico:      sigTecImg,
      sig_resp:         sigRespImg,
      dataFim:          dataFim,
      to_email:         EMAIL_RESPONSAVEL,
      status:           'finalizado',
    };

    try {
      // 1. Envia e-mail de arquivamento com relatório + assinaturas
      await emailjs.send(EMAILJS_SERVICE_ID, TEMPLATE_ARQUIVO, dadosFinais);

      // 2. Salva chamado finalizado no Firebase
      await window.salvarNoFirebase(dadosFinais);

      showToast('✅ Chamado arquivado com sucesso!', 'success');
      goStep('step-done');
    } catch(e) {
      console.error('Erro ao finalizar:', e);
      const msg = e?.text || e?.message || JSON.stringify(e) || 'Erro desconhecido';
      showToast('Erro: ' + msg, 'error');
      alert('❌ Erro:\n\n' + msg + '\n\nStatus: ' + (e?.status || '—'));
      btn.disabled = false;
      btn.textContent = '✅ Finalizar e Arquivar Chamado';
    }
  }

  // ── NAVEGAÇÃO ──────────────────────────────────────────────────────────────
  function goStep(id) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function novoChamado() { location.reload(); }

  // ── TOAST ──────────────────────────────────────────────────────────────────
  function showToast(msg, type='') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'show ' + type;
    setTimeout(() => t.className = '', 3200);
  }