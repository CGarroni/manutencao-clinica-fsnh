"use client";

import { useState, useEffect } from "react";
import {
	db,
	gerarNumeroOS,
	salvarChamado,
	listarEquipamentos,
} from "@/lib/firebase";
import { EMAILJS_CONFIG, emailjs } from "@/lib/emailjs";
import Image from "next/image";
import Link from "next/link";
import logoFsnh from "@/assets/logo-fsnh.png";
import imgMain from "@/assets/img-main.jpg";

const EQUIPAMENTOS_PADRAO = [
	"Monitor",
	"Cama",
	"Oxímetro de Transporte",
	"ECG/Eletro",
	"Laringoscópio",
	"Esfigmomanômetro",
	"Ventilador",
	"Vent. de transporte",
	"MAP",
	"Berço",
	"Parede de Gases",
	"Outros",
];

export default function AberturaChamadoPage() {
	const [equipamentos, setEquipamentos] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [sucessoModal, setSucessoModal] = useState<string | null>(null);
	const [dataHoraAtual, setDataHoraAtual] = useState("");

	const [form, setForm] = useState({
		solicitante: "",
		setor: "",
		leitoQuarto: "",
		buscaIdentificador: "",
		equipamentoId: "",
		equipamentoNome: "",
		marcaModelo: "",
		numeroSerie: "",
		falhaIdentificada: "Não liga / Sem energia",
		descricao: "",
	});

	useEffect(() => {
		const agora = new Date();
		const dataFormatada = agora.toLocaleDateString("pt-BR");
		const horaFormatada = agora.toLocaleTimeString("pt-BR", {
			hour: "2-digit",
			minute: "2-digit",
		});
		setDataHoraAtual(`${dataFormatada} ${horaFormatada}`);

		carregarListaEquipamentos();
	}, []);

	async function carregarListaEquipamentos() {
		const lista = await listarEquipamentos();
		setEquipamentos(lista);
	}

	function handleBuscarEquipamento() {
		const termo = form.buscaIdentificador.trim().toLowerCase();
		if (!termo) {
			alert("Digite um número de Patrimônio ou Série para buscar.");
			return;
		}

		const encontrado = equipamentos.find(
			(eq) =>
				(eq.patrimonio && eq.patrimonio.toLowerCase() === termo) ||
				(eq.numeroSerie && eq.numeroSerie.toLowerCase() === termo) ||
				(eq.serie && eq.serie.toLowerCase() === termo),
		);

		if (encontrado) {
			setForm((prev) => ({
				...prev,
				equipamentoId: encontrado.id,
				equipamentoNome: encontrado.tipo || encontrado.nome || "",
				marcaModelo:
					`${encontrado.marca || ""} ${encontrado.modelo || encontrado.model || ""}`.trim(),
				numeroSerie: encontrado.numeroSerie || encontrado.serie || "",
				setor: encontrado.setor || prev.setor,
			}));
			alert("Equipamento encontrado e dados preenchidos com sucesso!");
		} else {
			alert("Nenhum equipamento cadastrado com este Patrimônio ou Série.");
		}
	}

	function handleSelectEquipamento(e: React.ChangeEvent<HTMLSelectElement>) {
		const valor = e.target.value;
		setForm((prev) => ({
			...prev,
			equipamentoNome: valor,
		}));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);

		try {
			const numeroOS = await gerarNumeroOS();

			const dadosChamado = {
				numero: numeroOS,
				solicitante: form.solicitante,
				setor: form.setor,
				leitoQuarto: form.leitoQuarto,
				dataHora: dataHoraAtual,
				patrimonio: form.buscaIdentificador,
				numeroSerie: form.numeroSerie,
				equipamento: form.equipamentoNome || "Não especificado",
				marcaModelo: form.marcaModelo,
				falha: form.falhaIdentificada,
				descricao: form.descricao,
				status: "aberto",
				dataAbertura: new Date().toISOString(),
			};

			const idSalvo = await salvarChamado(dadosChamado);

			if (idSalvo) {
				try {
					await emailjs.send(
						EMAILJS_CONFIG.serviceId,
						EMAILJS_CONFIG.templateManutencao,
						{
							numero_os: numeroOS,
							solicitante: dadosChamado.solicitante,
							setor: dadosChamado.setor,
							equipamento: dadosChamado.equipamento,
							patrimonio: dadosChamado.patrimonio,
							falha: dadosChamado.falha,
							descricao: dadosChamado.descricao,
							email_destino: EMAILJS_CONFIG.emailResponsavel,
						},
					);
				} catch (emailErr) {
					console.error("Erro ao enviar e-mail via EmailJS:", emailErr);
				}

				setSucessoModal(numeroOS);
				setForm({
					solicitante: "",
					setor: "",
					leitoQuarto: "",
					buscaIdentificador: "",
					equipamentoId: "",
					equipamentoNome: "",
					marcaModelo: "",
					numeroSerie: "",
					falhaIdentificada: "Não liga / Sem energia",
					descricao: "",
				});
			}
		} catch (error) {
			console.error(error);
			alert("Erro ao registrar a Ordem de Serviço.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen relative flex flex-col justify-between text-slate-800">
			<div className="absolute inset-0 z-0">
				<Image
					src={imgMain}
					alt="Hospital Municipal de Novo Hamburgo"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-[#0d233a]/85 backdrop-blur-[2px]"></div>
			</div>

			<header className="relative z-10 bg-[#0a192f]/90 border-b border-blue-900/50 py-3 px-4 sm:px-6 flex justify-between items-center shadow-md">
				<div className="flex items-center gap-3">
					<div className="bg-white p-1 rounded-full shadow shrink-0">
						<Image
							src={logoFsnh}
							alt="Logo FSNH"
							width={32}
							height={32}
							className="object-contain"
						/>
					</div>
					<div>
						<h1 className="font-bold text-sm sm:text-base tracking-wide text-white">
							MANUTENÇÃO CLÍNICA
						</h1>
						<p className="text-[10px] sm:text-[11px] text-blue-300">
							ORDEM DE SERVIÇO — FSNH
						</p>
					</div>
				</div>
				<Link
					href="/dashboard"
					className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-md font-semibold transition shadow whitespace-nowrap"
				>
					← Voltar ao Painel
				</Link>
			</header>

			{/* Ajustado p-4 no mobile e p-6 no desktop para evitar cortes laterais */}
			<main className="relative z-10 max-w-3xl w-full mx-auto p-4 sm:p-6 my-4 sm:my-8 bg-white/95 rounded-2xl shadow-2xl border border-white/20">
				<div className="bg-[#0a192f] text-white py-2 px-4 rounded-xl text-center mb-6 shadow-inner">
					<span className="text-[11px] tracking-wider text-blue-300 block uppercase font-semibold">
						Nº do Chamado
					</span>
					<span className="text-base sm:text-lg font-mono font-bold tracking-widest">
						— (Gerado ao Salvar)
					</span>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-blue-200 pb-2 mb-4 flex items-center gap-2">
							🏥 Identificação
						</h3>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
									Solicitante *
								</label>
								<input
									type="text"
									required
									value={form.solicitante}
									onChange={(e) =>
										setForm({ ...form, solicitante: e.target.value })
									}
									placeholder="Seu Nome"
									className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 sm:p-2.5 text-sm sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
								/>
							</div>

							<div>
								<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
									Setor *
								</label>
								<input
									type="text"
									required
									value={form.setor}
									onChange={(e) => setForm({ ...form, setor: e.target.value })}
									placeholder="Ex: UTI, Bloco Cirúrgico..."
									className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 sm:p-2.5 text-sm sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
								/>
							</div>

							<div>
								<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
									Leito / Quarto
								</label>
								<input
									type="text"
									value={form.leitoQuarto}
									onChange={(e) =>
										setForm({ ...form, leitoQuarto: e.target.value })
									}
									placeholder="Ex: 12A..."
									className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 sm:p-2.5 text-sm sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
								/>
							</div>

							<div>
								<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
									Data / Hora
								</label>
								<input
									type="text"
									disabled
									value={dataHoraAtual}
									className="w-full bg-slate-100 border border-gray-300 rounded-lg p-3 sm:p-2.5 text-sm sm:text-xs text-slate-500 font-mono cursor-not-allowed"
								/>
							</div>
						</div>
					</div>

					<div>
						<h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-blue-200 pb-2 mb-4 flex items-center gap-2">
							⚙️ Equipamento
						</h3>

						<div className="space-y-4">
							<div>
								<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
									Nº de Patrimônio ou Número de Série (Busca Automática)
								</label>
								{/* Flex empilhado no mobile se necessário ou mantido lado a lado com gap otimizado */}
								<div className="flex flex-col sm:flex-row gap-2">
									<input
										type="text"
										value={form.buscaIdentificador}
										onChange={(e) =>
											setForm({ ...form, buscaIdentificador: e.target.value })
										}
										placeholder="Digite o patrimônio ou série..."
										className="flex-1 bg-gray-50 border border-gray-300 rounded-lg p-3 sm:p-2.5 text-sm sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
									/>
									<button
										type="button"
										onClick={handleBuscarEquipamento}
										className="bg-blue-600 hover:bg-blue-500 text-white py-3 sm:py-0 px-5 rounded-lg text-xs font-semibold transition shadow flex items-center justify-center gap-1.5 cursor-pointer"
									>
										🔍 Buscar
									</button>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
										Tipo de Equipamento *
									</label>
									<select
										value={form.equipamentoNome}
										onChange={handleSelectEquipamento}
										required
										className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 sm:p-2.5 text-sm sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
									>
										<option value="">Selecione o equipamento...</option>
										{EQUIPAMENTOS_PADRAO.map((item, idx) => (
											<option key={idx} value={item}>
												{item}
											</option>
										))}
									</select>
								</div>

								<div>
									<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
										Marca / Modelo
									</label>
									<input
										type="text"
										value={form.marcaModelo}
										onChange={(e) =>
											setForm({ ...form, marcaModelo: e.target.value })
										}
										placeholder="Ex: Draeger Vista..."
										className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 sm:p-2.5 text-sm sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
									/>
								</div>
							</div>

							<div>
								<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
									Falha Identificada *
								</label>
								<select
									value={form.falhaIdentificada}
									onChange={(e) =>
										setForm({ ...form, falhaIdentificada: e.target.value })
									}
									className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 sm:p-2.5 text-sm sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
								>
									<option value="Não liga / Sem energia">
										Não liga / Sem energia
									</option>
									<option value="Erro de leitura / Calibração">
										Erro de leitura / Calibração
									</option>
									<option value="Dano físico / Peça quebrada">
										Dano físico / Peça quebrada
									</option>
									<option value="Outros">Outros</option>
								</select>
							</div>

							<div>
								<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
									Descrição Detalhada do Problema *
								</label>
								<textarea
									rows={3}
									required
									value={form.descricao}
									onChange={(e) =>
										setForm({ ...form, descricao: e.target.value })
									}
									placeholder="Descreva detalhadamente o comportamento do equipamento..."
									className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 sm:p-2.5 text-sm sm:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
								></textarea>
							</div>
						</div>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl text-xs tracking-wider uppercase transition shadow-lg disabled:opacity-50 cursor-pointer"
					>
						{loading ? "Registrando Chamado..." : "Abrir Ordem de Serviço"}
					</button>
				</form>
			</main>

			{sucessoModal && (
				<div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
					<div className="bg-white text-slate-800 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl space-y-3">
						<div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-lg font-bold">
							✓
						</div>
						<h3 className="text-lg font-bold">Chamado Registrado!</h3>
						<p className="text-xs text-slate-500">
							Número de controle da Ordem de Serviço:
						</p>
						<div className="bg-slate-100 py-2 rounded-lg font-mono font-bold text-blue-600 text-base">
							{sucessoModal}
						</div>
						<button
							onClick={() => setSucessoModal(null)}
							className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer"
						>
							Novo Chamado
						</button>
					</div>
				</div>
			)}

			<footer className="relative z-10 text-center py-3 px-4 text-[11px] text-blue-200/70 border-t border-blue-900/40">
				Hospital Municipal de Novo Hamburgo — Setor de Manutenção e Engenharia
				Clínica © {new Date().getFullYear()}
			</footer>
		</div>
	);
}
