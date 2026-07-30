"use client";

import { useState, useEffect } from "react";
import {
	listarEquipamentos,
	salvarEquipamento,
	deletarEquipamento,
} from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import logoFsnh from "@/assets/logo-fsnh.png";

const LISTA_TIPOS = [
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
];

export default function EquipamentosDashboardPage() {
	const [equipamentos, setEquipamentos] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [modalAberto, setModalAberto] = useState(false);
	const [tipoSelecionado, setTipoSelecionado] = useState("Monitor");
	const [outroTipo, setOutroTipo] = useState("");

	const [novoEq, setNovoEq] = useState({
		tipo: "Monitor",
		marca: "",
		modelo: "",
		numeroSerie: "",
		patrimonio: "",
		setor: "",
		status: "Operacional",
		observacao: "",
		exigeCalibracao: false,
		intervaloCalibracaoMeses: 12,
		ultimaCalibracao: "",
	});

	useEffect(() => {
		carregarEquipamentos();
	}, []);

	async function carregarEquipamentos() {
		setLoading(true);
		const lista = await listarEquipamentos();
		setEquipamentos(lista);
		setLoading(false);
	}

	async function handleSalvarNovo(e: React.FormEvent) {
		e.preventDefault();
		const tipoFinal = tipoSelecionado === "OUTRO" ? outroTipo : tipoSelecionado;

		if (!tipoFinal.trim()) {
			alert("Por favor, informe o tipo de equipamento.");
			return;
		}

		const dadosParaSalvar = {
			...novoEq,
			tipo: tipoFinal,
		};

		const idSalvo = await salvarEquipamento(dadosParaSalvar);
		if (idSalvo) {
			setModalAberto(false);
			setTipoSelecionado("Monitor");
			setOutroTipo("");
			setNovoEq({
				tipo: "Monitor",
				marca: "",
				modelo: "",
				numeroSerie: "",
				patrimonio: "",
				setor: "",
				status: "Operacional",
				observacao: "",
				exigeCalibracao: false,
				intervaloCalibracaoMeses: 12,
				ultimaCalibracao: "",
			});
			carregarEquipamentos();
		} else {
			alert("Erro ao salvar equipamento.");
		}
	}

	async function handleDeletar(id: string) {
		if (confirm("Deseja realmente remover este equipamento?")) {
			const sucesso = await deletarEquipamento(id);
			if (sucesso) carregarEquipamentos();
		}
	}

	// Função auxiliar para verificar o status da calibração
	function verificarStatusCalibracao(eq: any) {
		if (!eq.exigeCalibracao || !eq.ultimaCalibracao) return null;

		const ultima = new Date(eq.ultimaCalibracao);
		const intervaloMeses = Number(eq.intervaloCalibracaoMeses) || 12;

		const vencimento = new Date(ultima);
		vencimento.setMonth(vencimento.getMonth() + intervaloMeses);

		const hoje = new Date();
		const diffTime = vencimento.getTime() - hoje.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays < 0) {
			return {
				texto: "Calibração Vencida",
				cor: "bg-red-100 text-red-700 border-red-200",
			};
		} else if (diffDays <= 30) {
			return {
				texto: `Vence em ${diffDays} dias`,
				cor: "bg-amber-100 text-amber-800 border-amber-200",
			};
		} else {
			return {
				texto: "Calibração em Dia",
				cor: "bg-emerald-100 text-emerald-700 border-emerald-200",
			};
		}
	}

	return (
		<div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
			<header className="bg-[#0a192f] text-white py-3 px-6 flex justify-between items-center shadow-md">
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
						<h1 className="font-bold text-sm tracking-wide">
							GESTÃO DE EQUIPAMENTOS
						</h1>
						<p className="text-[10px] text-blue-300">
							MANUTENÇÃO CLÍNICA — FSNH
						</p>
					</div>
				</div>
				<Link
					href="/dashboard"
					className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-md font-semibold transition shadow"
				>
					← Voltar ao Painel
				</Link>
			</header>

			<main className="max-w-6xl w-full mx-auto p-6 flex-1 space-y-6">
				<div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
					<div>
						<h2 className="text-sm font-bold uppercase text-blue-900">
							Parque de Equipamentos Hospitalares
						</h2>
						<p className="text-xs text-slate-500">
							Controle de patrimônio, número de série, calibrações e
							localizações.
						</p>
					</div>
					<button
						onClick={() => setModalAberto(true)}
						className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-semibold transition shadow cursor-pointer"
					>
						+ Cadastrar Equipamento
					</button>
				</div>

				<div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
					{loading ? (
						<div className="p-8 text-center text-xs text-slate-500">
							Carregando equipamentos...
						</div>
					) : equipamentos.length === 0 ? (
						<div className="p-8 text-center text-xs text-slate-500">
							Nenhum equipamento cadastrado até o momento.
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full text-left border-collapse text-xs">
								<thead>
									<tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px]">
										<th className="p-3">Patrimônio</th>
										<th className="p-3">Nº de Série</th>
										<th className="p-3">Tipo</th>
										<th className="p-3">Marca / Modelo</th>
										<th className="p-3">Setor</th>
										<th className="p-3">Calibração</th>
										<th className="p-3 text-center">Ações</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-100">
									{equipamentos.map((eq) => {
										const statusCalib = verificarStatusCalibracao(eq);
										return (
											<tr key={eq.id} className="hover:bg-slate-50/80">
												<td className="p-3 font-mono font-bold text-blue-900">
													{eq.patrimonio || "S/N"}
												</td>
												<td className="p-3 font-mono text-slate-600">
													{eq.numeroSerie || eq.serie || "N/A"}
												</td>
												<td className="p-3 font-medium">
													{eq.tipo || eq.nome || "Não especificado"}
												</td>
												<td className="p-3 text-slate-600">
													{eq.marca || ""} {eq.modelo || eq.model || ""}
												</td>
												<td className="p-3">{eq.setor || "Geral"}</td>
												<td className="p-3">
													{eq.exigeCalibracao ? (
														statusCalib ? (
															<span
																className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusCalib.cor}`}
															>
																{statusCalib.texto}
															</span>
														) : (
															<span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
																Sem data base
															</span>
														)
													) : (
														<span className="text-[10px] text-slate-400 italic">
															Não exigida
														</span>
													)}
												</td>
												<td className="p-3 text-center">
													<button
														onClick={() => handleDeletar(eq.id)}
														className="text-red-600 hover:text-red-800 font-semibold text-[11px] cursor-pointer"
													>
														Excluir
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</main>

			{modalAberto && (
				<div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
					<div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 my-8">
						<h3 className="text-sm font-bold uppercase text-blue-900 border-b pb-2">
							Cadastrar Novo Equipamento
						</h3>

						<form onSubmit={handleSalvarNovo} className="space-y-3">
							{/* TIPO DE EQUIPAMENTO COM OPÇÃO DE DIGITAR */}
							<div>
								<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
									Tipo de Equipamento *
								</label>
								<select
									value={tipoSelecionado}
									onChange={(e) => {
										setTipoSelecionado(e.target.value);
										if (e.target.value !== "OUTRO") {
											setNovoEq({ ...novoEq, tipo: e.target.value });
										}
									}}
									className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none mb-2"
								>
									{LISTA_TIPOS.map((item, idx) => (
										<option key={idx} value={item}>
											{item}
										</option>
									))}
									<option value="OUTRO">
										➕ Outro (Digitar personalizado...)
									</option>
								</select>

								{tipoSelecionado === "OUTRO" && (
									<input
										type="text"
										required
										value={outroTipo}
										onChange={(e) => setOutroTipo(e.target.value)}
										placeholder="Digite o nome do novo tipo de equipamento..."
										className="w-full bg-blue-50 border border-blue-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-blue-900"
									/>
								)}
							</div>

							<div className="grid grid-cols-2 gap-2">
								<div>
									<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
										Marca / Fabricante
									</label>
									<input
										type="text"
										value={novoEq.marca}
										onChange={(e) =>
											setNovoEq({ ...novoEq, marca: e.target.value })
										}
										placeholder="Ex: Draeger, GE..."
										className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
									/>
								</div>
								<div>
									<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
										Modelo
									</label>
									<input
										type="text"
										value={novoEq.modelo}
										onChange={(e) =>
											setNovoEq({ ...novoEq, modelo: e.target.value })
										}
										placeholder="Ex: Vista, B40..."
										className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-2">
								<div>
									<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
										Número de Série
									</label>
									<input
										type="text"
										value={novoEq.numeroSerie}
										onChange={(e) =>
											setNovoEq({ ...novoEq, numeroSerie: e.target.value })
										}
										placeholder="Ex: SN-12345"
										className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
									/>
								</div>
								<div>
									<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
										Patrimônio
									</label>
									<input
										type="text"
										value={novoEq.patrimonio}
										onChange={(e) =>
											setNovoEq({ ...novoEq, patrimonio: e.target.value })
										}
										placeholder="Ex: 12345"
										className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
									/>
								</div>
							</div>

							<div>
								<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
									Setor
								</label>
								<input
									type="text"
									value={novoEq.setor}
									onChange={(e) =>
										setNovoEq({ ...novoEq, setor: e.target.value })
									}
									placeholder="Ex: Unidade Águia, Bloco Cirúrgico"
									className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
								/>
							</div>

							{/* CONTROLE DE CALIBRAÇÃO PERIÓDICA */}
							<div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
								<label className="flex items-center gap-2 cursor-pointer">
									<input
										type="checkbox"
										checked={novoEq.exigeCalibracao}
										onChange={(e) =>
											setNovoEq({
												...novoEq,
												exigeCalibracao: e.target.checked,
											})
										}
										className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
									/>
									<span className="text-xs font-bold text-slate-700 uppercase">
										Este equipamento exige calibração periódica?
									</span>
								</label>

								{novoEq.exigeCalibracao && (
									<div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
										<div>
											<label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
												Intervalo (Meses)
											</label>
											<input
												type="number"
												min="1"
												value={novoEq.intervaloCalibracaoMeses}
												onChange={(e) =>
													setNovoEq({
														...novoEq,
														intervaloCalibracaoMeses: Number(e.target.value),
													})
												}
												className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
											/>
										</div>
										<div>
											<label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
												Data da Última Calibração
											</label>
											<input
												type="date"
												value={novoEq.ultimaCalibracao}
												onChange={(e) =>
													setNovoEq({
														...novoEq,
														ultimaCalibracao: e.target.value,
													})
												}
												className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
											/>
										</div>
									</div>
								)}
							</div>

							{/* CAMPO DE OBSERVAÇÕES / AVARIAS */}
							<div>
								<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
									Observações, Avarias ou Acessórios Inclusos
								</label>
								<textarea
									rows={2}
									value={novoEq.observacao}
									onChange={(e) =>
										setNovoEq({ ...novoEq, observacao: e.target.value })
									}
									placeholder="Ex: Chegou com cabo de força avariado, acompanha sensor SpO2..."
									className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
								></textarea>
							</div>

							<div className="flex gap-2 pt-2">
								<button
									type="button"
									onClick={() => setModalAberto(false)}
									className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
								>
									Cancelar
								</button>
								<button
									type="submit"
									className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
								>
									Salvar Equipamento
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			<footer className="text-center py-4 text-xs text-slate-500 border-t border-slate-800">
				Hospital Municipal de Novo Hamburgo — Setor de Manutenção e Engenharia
				Clínica © {new Date().getFullYear()}
			</footer>
		</div>
	);
}
