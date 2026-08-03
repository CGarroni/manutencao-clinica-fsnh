"use client";


import Image from "next/image";
import Link from "next/link";
import logoFsnh from "@/assets/logo-fsnh.png";

export default function ManualPage() {
	const handlePrint = () => {
		window.print();
	};

	return (
		<div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
			{/* Header */}
			<header className="bg-[#0a192f] text-white py-3 px-6 flex justify-between items-center shadow-md print:hidden">
				<div className="flex items-center gap-3">
					<div className="bg-white p-1 rounded-full shadow">
						<Image
							src={logoFsnh}
							alt="Logo FSNH"
							width={35}
							height={35}
							className="object-contain"
						/>
					</div>
					<div>
						<h1 className="font-bold text-base tracking-wide text-white">
							MANUTENÇÃO CLÍNICA
						</h1>
						<p className="text-[11px] text-blue-300">ACESSO RESTRITO — FSNH</p>
					</div>
				</div>
				<Link 
          href="/dashboard" 
          className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-md font-semibold transition shadow"
        >
          Voltar ao Dashboard
        </Link>
			</header>

			<main className="max-w-200 mx-auto mt-8 px-4">
				{/* Print Button */}
				<button
					onClick={handlePrint}
					className="print:hidden bg-linear-to-r from-[#1a4a8a] to-[#2d72d2] text-white border-none rounded-xl px-7 py-3 font-['Barlow_Condensed'] text-[16px] font-bold tracking-wider uppercase cursor-pointer block mx-auto mb-8 shadow-lg hover:opacity-95 transition-opacity"
				>
					🖨️ Imprimir Manual
				</button>

				{/* Intro */}
				<section className="bg-white rounded-xl p-7 shadow-sm mb-6 border-l-4 border-cyan-400">
					<h2 className="font-['Barlow_Condensed'] text-[22px] text-[#1a4a8a] mb-2">
						Sobre o Sistema
					</h2>
					<p className="text-slate-600 text-[14px] leading-relaxed">
						O Sistema de Manutenção Clínica da FSPNH é uma plataforma digital
						para abertura, acompanhamento e finalização de Ordens de Serviço de
						equipamentos hospitalares. Substitui fichas físicas e garante
						rastreabilidade completa de todos os chamados.
					</p>
				</section>

				{/* Flow */}
				<div className="bg-linear-to-br from-[#0a2342] to-[#1a4a8a] rounded-xl p-6 mb-6 text-white max-w-xl mx-auto">
					<h2 className="font-['Barlow_Condensed'] text-[18px] tracking-wider uppercase text-cyan-400 mb-4 text-center">
						⚡ Fluxo Completo
					</h2>
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
							<span className="text-xl shrink-0">📱</span>
							<div className="text-[13px] leading-snug">
								<strong className="text-cyan-400 block text-[11px] uppercase tracking-wider mb-0.5">
									Setor Solicitante
								</strong>
								Escaneia QR Code fixado no setor e abre o formulário
							</div>
						</div>
						<div className="text-center text-cyan-400 text-lg my-0.5">↓</div>
						<div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
							<span className="text-xl shrink-0">📝</span>
							<div className="text-[13px] leading-snug">
								<strong className="text-cyan-400 block text-[11px] uppercase tracking-wider mb-0.5">
									Abertura da OS
								</strong>
								Preenche os dados do equipamento e problema e envia
							</div>
						</div>
						<div className="text-center text-cyan-400 text-lg my-0.5">↓</div>
						<div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
							<span className="text-xl shrink-0">📧</span>
							<div className="text-[13px] leading-snug">
								<strong className="text-cyan-400 block text-[11px] uppercase tracking-wider mb-0.5">
									E-mail Manutenção
								</strong>
								Equipe recebe e-mail com dados + link para abrir a OS
							</div>
						</div>
						<div className="text-center text-cyan-400 text-lg my-0.5">↓</div>
						<div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
							<span className="text-xl shrink-0">🔧</span>
							<div className="text-[13px] leading-snug">
								<strong className="text-cyan-400 block text-[11px] uppercase tracking-wider mb-0.5">
									Técnico executa o serviço
								</strong>
								Vai ao setor, realiza a manutenção
							</div>
						</div>
						<div className="text-center text-cyan-400 text-lg my-0.5">↓</div>
						<div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
							<span className="text-xl shrink-0">✍️</span>
							<div className="text-[13px] leading-snug">
								<strong className="text-cyan-400 block text-[11px] uppercase tracking-wider mb-0.5">
									Finalização e Assinaturas
								</strong>
								Abre OS pelo link do e-mail, preenche serviço executado e coleta
								assinaturas
							</div>
						</div>
						<div className="text-center text-cyan-400 text-lg my-0.5">↓</div>
						<div className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
							<span className="text-xl shrink-0">📊</span>
							<div className="text-[13px] leading-snug">
								<strong className="text-cyan-400 block text-[11px] uppercase tracking-wider mb-0.5">
									Arquivamento
								</strong>
								Relatório enviado por e-mail e OS salva no Firebase para
								métricas
							</div>
						</div>
					</div>
				</div>

				{/* Section 1: Setor Solicitante */}
				<div className="bg-white rounded-xl p-7 shadow-sm mb-5">
					<div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-slate-200">
						<div className="w-9 h-9 rounded-full bg-[#1a4a8a] text-white font-['Barlow_Condensed'] text-[18px] font-bold flex items-center justify-center shrink-0">
							1
						</div>
						<div>
							<h2 className="font-['Barlow_Condensed'] text-[20px] text-[#1a4a8a] uppercase tracking-wider">
								Abrindo um Chamado
							</h2>
							<span className="text-[11px] text-[#00b4d8] font-semibold tracking-wider uppercase block mt-0.5">
								👥 Quem usa: Setor Solicitante
							</span>
						</div>
					</div>

					<div className="flex gap-3.5 mb-4 items-start">
						<span className="text-2xl shrink-0 mt-0.5">📱</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Escaneie o QR Code
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								Aponte a câmera do celular para o QR Code fixado no seu setor. O
								link abrirá automaticamente no navegador.
							</p>
							<div className="bg-slate-100 rounded-md p-2.5 text-[12px] text-slate-600 mt-1.5 border-l-2 border-[#00b4d8]">
								💡 O QR Code leva diretamente para o formulário de abertura de
								chamado.
							</div>
						</div>
					</div>
					<div className="h-px bg-slate-200 my-3.5"></div>

					<div className="flex gap-3.5 mb-4 items-start">
						<span className="text-2xl shrink-0 mt-0.5">👤</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Preencha a Identificação
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								Informe seu <strong>nome</strong>, o <strong>setor</strong> e o{" "}
								<strong>leito/quarto</strong> onde está o equipamento com
								problema.
							</p>
						</div>
					</div>
					<div className="h-px bg-slate-200 my-3.5"></div>

					<div className="flex gap-3.5 mb-4 items-start">
						<span className="text-2xl shrink-0 mt-0.5">🔧</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Informe o Equipamento
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								Selecione o <strong>equipamento</strong> na lista, informe a{" "}
								<strong>marca/modelo</strong> se souber, selecione o{" "}
								<strong>tipo de falha</strong> e descreva detalhadamente o
								problema.
							</p>
							<div className="bg-slate-100 rounded-md p-2.5 text-[12px] text-slate-600 mt-1.5 border-l-2 border-[#00b4d8]">
								💡 Quanto mais detalhes na descrição, mais rápido o técnico
								resolverá o problema.
							</div>
						</div>
					</div>
					<div className="h-px bg-slate-200 my-3.5"></div>

					<div className="flex gap-3.5 items-start">
						<span className="text-2xl shrink-0 mt-0.5">📨</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Clique em &quot;Enviar para Manutenção Clínica&quot;
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								O chamado será enviado automaticamente para a equipe de
								manutenção. Guarde o <strong>número da OS</strong> gerado para
								acompanhamento.
							</p>
							<div className="bg-slate-100 rounded-md p-2.5 text-[12px] text-slate-600 mt-1.5 border-l-2 border-[#00b4d8]">
								💡 O número da OS segue o padrão MC-AAMM-0000 (ex: MC-2603-0042)
							</div>
						</div>
					</div>
				</div>

				{/* Section 2: Técnico */}
				<div className="bg-white rounded-xl p-7 shadow-sm mb-5">
					<div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-slate-200">
						<div className="w-9 h-9 rounded-full bg-[#1a4a8a] text-white font-['Barlow_Condensed'] text-[18px] font-bold flex items-center justify-center shrink-0">
							2
						</div>
						<div>
							<h2 className="font-['Barlow_Condensed'] text-[20px] text-[#1a4a8a] uppercase tracking-wider">
								Executando e Finalizando a OS
							</h2>
							<span className="text-[11px] text-[#00b4d8] font-semibold tracking-wider uppercase block mt-0.5">
								🔧 Quem usa: Técnico de Manutenção
							</span>
						</div>
					</div>

					<div className="flex gap-3.5 mb-4 items-start">
						<span className="text-2xl shrink-0 mt-0.5">📧</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Receba o e-mail
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								Um e-mail chegará na caixa da Manutenção Clínica com os dados do
								chamado: número da OS, equipamento, setor, falha e descrição do
								problema.
							</p>
						</div>
					</div>
					<div className="h-px bg-slate-200 my-3.5"></div>

					<div className="flex gap-3.5 mb-4 items-start">
						<span className="text-2xl shrink-0 mt-0.5">📱</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Clique em &quot;Abrir OS no Celular&quot;
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								O botão verde no e-mail abre a OS diretamente no celular com
								todos os dados preenchidos. Você também pode acessar pelo link
								abaixo do botão.
							</p>
							<div className="bg-slate-100 rounded-md p-2.5 text-[12px] text-slate-600 mt-1.5 border-l-2 border-[#00b4d8]">
								💡 Ou acesse diretamente:
								<br />
								<div className="bg-white border border-slate-200 rounded p-2 font-mono text-[12px] text-[#1a4a8a] mt-1 break-all">
									manutencaoclinica.vercel.app/os/?os=MC-2603-0001
								</div>
								Substitua o número pelo da OS desejada.
							</div>
						</div>
					</div>
					<div className="h-px bg-slate-200 my-3.5"></div>

					<div className="flex gap-3.5 mb-4 items-start">
						<span className="text-2xl shrink-0 mt-0.5">🔨</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Execute o serviço
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								Realize a manutenção no equipamento. Após concluir, preencha o
								campo <strong>&quot;Serviço Executado&quot;</strong> descrevendo
								o que foi feito e as peças substituídas.
							</p>
						</div>
					</div>
					<div className="h-px bg-slate-200 my-3.5"></div>

					<div className="flex gap-3.5 mb-4 items-start">
						<span className="text-2xl shrink-0 mt-0.5">✍️</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Colete as assinaturas
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								O <strong>técnico responsável</strong> assina primeiro, depois o{" "}
								<strong>responsável do setor solicitante</strong> assina
								confirmando o serviço. Ambos devem assinar com o dedo
								diretamente na tela do celular.
							</p>
							<div className="bg-slate-100 rounded-md p-2.5 text-[12px] text-slate-600 mt-1.5 border-l-2 border-[#00b4d8]">
								💡 Se errar a assinatura, clique em &quot;Limpar&quot; e assine
								novamente.
							</div>
						</div>
					</div>
					<div className="h-px bg-slate-200 my-3.5"></div>

					<div className="flex gap-3.5 items-start">
						<span className="text-2xl shrink-0 mt-0.5">✅</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Clique em &quot;Finalizar e Arquivar OS&quot;
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								O relatório completo será enviado para o e-mail de arquivamento
								e a OS ficará registrada no sistema com status{" "}
								<span className="inline-block bg-[#16a34a] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full tracking-wider">
									finalizado
								</span>
								.
							</p>
						</div>
					</div>
				</div>

				{/* Section 3: Arquivamento */}
				<div className="bg-white rounded-xl p-7 shadow-sm mb-5">
					<div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-slate-200">
						<div className="w-9 h-9 rounded-full bg-[#1a4a8a] text-white font-['Barlow_Condensed'] text-[18px] font-bold flex items-center justify-center shrink-0">
							3
						</div>
						<div>
							<h2 className="font-['Barlow_Condensed'] text-[20px] text-[#1a4a8a] uppercase tracking-wider">
								Arquivamento e Relatório
							</h2>
							<span className="text-[11px] text-[#00b4d8] font-semibold tracking-wider uppercase block mt-0.5">
								📊 Quem usa: Responsável de Arquivamento
							</span>
						</div>
					</div>

					<div className="flex gap-3.5 mb-4 items-start">
						<span className="text-2xl shrink-0 mt-0.5">📧</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Receba o relatório
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								Após a finalização, um e-mail completo chegará em{" "}
								<strong>relatoriosmanutclinica@gmail.com</strong> com todos os
								dados da OS: solicitante, equipamento, problema, serviço
								executado e assinaturas.
							</p>
						</div>
					</div>
					<div className="h-px bg-slate-200 my-3.5"></div>

					<div className="flex gap-3.5 mb-4 items-start">
						<span className="text-2xl shrink-0 mt-0.5">🖨️</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Imprima se necessário
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								O e-mail de relatório é formatado para impressão. Use{" "}
								<strong>Ctrl+P</strong> ou a opção &quot;Imprimir&quot; do Gmail
								para gerar uma cópia física da OS.
							</p>
						</div>
					</div>
					<div className="h-px bg-slate-200 my-3.5"></div>

					<div className="flex gap-3.5 items-start">
						<span className="text-2xl shrink-0 mt-0.5">📊</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Consulte o histórico no Firebase
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								Todos os chamados ficam registrados no Firebase Firestore para
								consulta e geração de métricas futuras.
							</p>
							<div className="bg-slate-100 rounded-md p-2.5 text-[12px] text-slate-600 mt-1.5 border-l-2 border-[#00b4d8]">
								💡 Acesse em: <strong>console.firebase.google.com</strong> →
								projeto manutencao-clinica-fsnh → Firestore
							</div>
						</div>
					</div>
				</div>

				{/* Dicas Gerais */}
				<div className="bg-white rounded-xl p-7 shadow-sm mb-8">
					<div className="flex items-center gap-3 mb-5 pb-3 border-b-2 border-slate-200">
						<div className="w-9 h-9 rounded-full bg-[#1a4a8a] text-white font-['Barlow_Condensed'] text-[18px] font-bold flex items-center justify-center shrink-0">
							💡
						</div>
						<div>
							<h2 className="font-['Barlow_Condensed'] text-[20px] text-[#1a4a8a] uppercase tracking-wider">
								Dicas e Informações
							</h2>
							<span className="text-[11px] text-[#00b4d8] font-semibold tracking-wider uppercase block mt-0.5">
								Para todos os usuários
							</span>
						</div>
					</div>

					<div className="flex gap-3.5 mb-4 items-start">
						<span className="text-2xl shrink-0 mt-0.5">🌐</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Acesse pelo navegador
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								O sistema funciona em qualquer celular ou computador com acesso
								à internet, sem necessidade de instalar aplicativo.
							</p>
						</div>
					</div>
					<div className="h-px bg-slate-200 my-3.5"></div>

					<div className="flex gap-3.5 mb-4 items-start">
						<span className="text-2xl shrink-0 mt-0.5">🔢</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Entendendo o número da OS
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								O número segue o padrão <strong>MC-AAMM-0000</strong>:<br />
								MC = Manutenção Clínica | AA = ano | MM = mês | 0000 = sequência
							</p>
							<div className="bg-slate-100 rounded-md p-2.5 text-[12px] text-slate-600 mt-1.5 border-l-2 border-[#00b4d8]">
								💡 Exemplo: MC-2603-0042 = 42º chamado de março de 2026
							</div>
						</div>
					</div>
					<div className="h-px bg-slate-200 my-3.5"></div>

					<div className="flex gap-3.5 mb-4 items-start">
						<span className="text-2xl shrink-0 mt-0.5">🔗</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Acessar OS diretamente
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								Para abrir uma OS específica, acesse a URL com o número:
							</p>
							<div className="bg-slate-100 border border-slate-200 rounded p-2 font-mono text-[12px] text-[#1a4a8a] mt-1 break-all">
								manutencaoclinica.vercel.app/os/?os=MC-2603-0001
							</div>
						</div>
					</div>
					<div className="h-px bg-slate-200 my-3.5"></div>

					<div className="flex gap-3.5 items-start">
						<span className="text-2xl shrink-0 mt-0.5">📶</span>
						<div>
							<h3 className="text-[15px] font-semibold text-slate-800 mb-1">
								Precisa de internet
							</h3>
							<p className="text-[13px] text-slate-600 leading-relaxed">
								O sistema requer conexão com a internet para enviar e-mails e
								salvar no banco de dados. Use o Wi-Fi do hospital.
							</p>
						</div>
					</div>
				</div>

				<button
					onClick={handlePrint}
					className="print:hidden bg-linear-to-r from-[#1a4a8a] to-[#2d72d2] text-white border-none rounded-xl px-7 py-3 font-['Barlow_Condensed'] text-[16px] font-bold tracking-wider uppercase cursor-pointer block mx-auto shadow-lg hover:opacity-95 transition-opacity"
				>
					🖨️ Imprimir Manual
				</button>
			</main>
		</div>
	);
}
