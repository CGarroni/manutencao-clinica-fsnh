import emailjs from '@emailjs/browser';

export const EMAILJS_CONFIG = {
  publicKey: 'LRdHG7gjMde2p8TZv',
  serviceId: 'service_utaq4mc',
  templateManutencao: 'template_7kxq2w1',
  templateArquivo: 'template_1z6b5w9',
  emailResponsavel: 'relatoriosmanutclinica@gmail.com'
};

// Inicializa o EmailJS
if (typeof window !== 'undefined') {
  emailjs.init(EMAILJS_CONFIG.publicKey);
}

export { emailjs };