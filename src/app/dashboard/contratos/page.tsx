"use client";

import { useState } from "react";
import Image from "next/image";
import logoFsnh from "@/assets/logo-fsnh.png";
import Link from "next/link";

interface Contrato {
	id: string;
	numero: string;
	fornecedor: string;
	objeto: string;
	dataInicio: string;
	dataFim: string;
	valorMensal: number;
	status: "Vigente" | "Vencendo" | "Vencido";
}

const contratosIniciais: Contrato[] = [
	{
		id: "1",
		numero: "CT-045/2025",
		fornecedor: "MedTech Manutenção Hospitalar Ltda",
		objeto: "Manutenção preventiva e corretiva de Tomógrafos e Raio-X",
		dataInicio: "2025-02-01",
		dataFim: "2027-02-01",
		valorMensal: 12500.0,
		status: "Vigente",
	},
	{
		id: "2",
		numero: "CT-089/2024",
		fornecedor: "Bioengenharia Equipamentos S/A",
		objeto: "Suporte técnico e calibração de Monitores Multiparamétricos",
		dataInicio: "2024-06-15",
		dataFim: "2026-08-15",
		valorMensal: 4800.0,
		status: "Vencendo",
	},
];

export default function ContratosPage() {
	const [contratos, setContratos] = useState<Contrato[]>(contratosIniciais);
	const [busca, setBusca] = useState("");

	// Estados do Modal
	const [modalAberto, setModalAberto] = useState(false);
	const [contratoEmEdicao, setContratoEmEdicao] = useState<Contrato | null>(
		null,
	);

	// Campos do Formulário
	const [numero, setNumero] = useState("");
	const [fornecedor, setFornecedor] = useState("");
	const [objeto, setObjeto] = useState("");
	const [dataInicio, setDataInicio] = useState("");
	const [dataFim, setDataFim] = useState("");
	const [valorMensal, setValorMensal] = useState(0);

	const abrirModalNovo = () => {
		setContratoEmEdicao(null);
		setNumero(`CT-0${contratos.length + 1}/2026`);
		setFornecedor("");
		setObjeto("");
		setDataInicio("");
		setDataFim("");
		setValorMensal(0);
		setModalAberto(true);
	};

	const abrirModalEditar = (c: Contrato) => {
		setContratoEmEdicao(c);
		setNumero(c.numero);
		setFornecedor(c.fornecedor);
		setObjeto(c.objeto);
		setDataInicio(c.dataInicio);
		setDataFim(c.dataFim);
		setValorMensal(c.valorMensal);
		setModalAberto(true);
	};

	const salvarContrato = (e: React.FormEvent) => {
		e.preventDefault();

		// Regra simples para calcular status baseado na data fim
		const hoje = new Date();
		const fim = new Date(dataFim);
		const diffDias = Math.ceil(
			(fim.getTime() - hoje.getTime()) / (1000 * 3600 * 24),
		);

		let status: "Vigente" | "Vencendo" | "Vencido" = "Vigente";
		if (diffDias < 0) status = "Vencido";
		else if (diffDias <= 30) status = "Vencendo";

		if (contratoEmEdicao) {
			setContratos(
				contratos.map((c) =>
					c.id === contratoEmEdicao.id
						? {
								...c,
								numero,
								fornecedor,
								objeto,
								dataInicio,
								dataFim,
								valorMensal,
								status,
							}
						: c,
				),
			);
		} else {
			const novo: Contrato = {
				id: String(Date.now()),
				numero,
				fornecedor,
				objeto,
				dataInicio,
				dataFim,
				valorMensal,
				status,
			};
			setContratos([novo, ...contratos]);
		}
		setModalAberto(false);
	};

	const contratosFiltrados = contratos.filter(
		(c) =>
			c.fornecedor.toLowerCase().includes(busca.toLowerCase()) ||
			c.numero.toLowerCase().includes(busca.toLowerCase()) ||
			c.objeto.toLowerCase().includes(busca.toLowerCase()),
	);

	return (
		<div className="p-6 space-y-6">
			{/* Cabeçalho */}
			<header className="bg-[#0a192f] z-10 text-white py-3 px-6 flex justify-between items-center shadow-md print:hidden">
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
					className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md font-semibold transition shadow"
				>
					Voltar ao Início
				</Link>
			</header>

			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-800">
						Gestão de Contratos
					</h1>
					<p className="text-sm text-gray-500">
						Controle de vigências, fornecedores e valores de prestação de
						serviços
					</p>
				</div>
				<button
					onClick={abrirModalNovo}
					className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
				>
					+ Novo Contrato
				</button>
			</div>

			{/* Cards Indicadores */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
					<span className="text-sm text-gray-500">Total de Contratos</span>
					<h3 className="text-2xl font-bold text-gray-800">
						{contratos.length}
					</h3>
				</div>
				<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
					<span className="text-sm text-gray-500">Contratos Vigentes</span>
					<h3 className="text-2xl font-bold text-green-600">
						{contratos.filter((c) => c.status === "Vigente").length}
					</h3>
				</div>
				<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
					<span className="text-sm text-gray-500">Próximos ao Vencimento</span>
					<h3 className="text-2xl font-bold text-amber-600">
						{
							contratos.filter(
								(c) => c.status === "Vencendo" || c.status === "Vencido",
							).length
						}
					</h3>
				</div>
			</div>

			{/* Tabela */}
			<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
				<div className="p-4 border-b border-gray-100">
					<input
						type="text"
						placeholder="Buscar por número, fornecedor ou objeto..."
						value={busca}
						onChange={(e) => setBusca(e.target.value)}
						className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
					/>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse">
						<thead>
							<tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
								<th className="p-4">Nº Contrato</th>
								<th className="p-4">Fornecedor</th>
								<th className="p-4">Objeto / Serviço</th>
								<th className="p-4">Vigência Fim</th>
								<th className="p-4">Valor Mensal</th>
								<th className="p-4">Status</th>
								<th className="p-4 text-right">Ações</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100 text-sm text-gray-700">
							{contratosFiltrados.length > 0 ? (
								contratosFiltrados.map((contrato) => (
									<tr
										key={contrato.id}
										className="hover:bg-gray-50 transition-colors"
									>
										<td className="p-4 font-semibold text-gray-900">
											{contrato.numero}
										</td>
										<td className="p-4 font-medium">{contrato.fornecedor}</td>
										<td className="p-4 text-gray-500 max-w-xs truncate">
											{contrato.objeto}
										</td>
										<td className="p-4">
											{new Date(contrato.dataFim).toLocaleDateString("pt-BR")}
										</td>
										<td className="p-4 font-semibold text-gray-900">
											{contrato.valorMensal.toLocaleString("pt-BR", {
												style: "currency",
												currency: "BRL",
											})}
										</td>
										<td className="p-4">
											<span
												className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
													contrato.status === "Vigente"
														? "bg-green-100 text-green-700"
														: contrato.status === "Vencendo"
															? "bg-amber-100 text-amber-700"
															: "bg-red-100 text-red-700"
												}`}
											>
												{contrato.status}
											</span>
										</td>
										<td className="p-4 text-right space-x-2">
											<button
												onClick={() => abrirModalEditar(contrato)}
												className="text-violet-600 hover:text-violet-800 font-medium text-xs cursor-pointer"
											>
												Editar
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={7} className="p-6 text-center text-gray-400">
										Nenhum contrato encontrado.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* MODAL CONTRATOS */}
			{modalAberto && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-gray-100">
						<div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
							<h3 className="font-bold text-gray-800">
								{contratoEmEdicao
									? "Editar Contrato"
									: "Cadastrar Novo Contrato"}
							</h3>
							<button
								onClick={() => setModalAberto(false)}
								className="text-gray-400 hover:text-gray-600 font-bold"
							>
								✕
							</button>
						</div>
						<form onSubmit={salvarContrato} className="p-6 space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
										Nº do Contrato
									</label>
									<input
										type="text"
										required
										value={numero}
										onChange={(e) => setNumero(e.target.value)}
										className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50"
									/>
								</div>
								<div>
									<label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
										Valor Mensal (R$)
									</label>
									<input
										type="number"
										step="0.01"
										required
										value={valorMensal}
										onChange={(e) => setValorMensal(Number(e.target.value))}
										className="w-full px-3 py-2 border rounded-lg text-sm"
									/>
								</div>
							</div>
							<div>
								<label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
									Fornecedor / Empresa
								</label>
								<input
									type="text"
									required
									placeholder="Ex: MedTech Equipamentos"
									value={fornecedor}
									onChange={(e) => setFornecedor(e.target.value)}
									className="w-full px-3 py-2 border rounded-lg text-sm"
								/>
							</div>
							<div>
								<label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
									Objeto do Contrato
								</label>
								<textarea
									required
									rows={2}
									placeholder="Descrição dos serviços ou equipamentos cobertos"
									value={objeto}
									onChange={(e) => setObjeto(e.target.value)}
									className="w-full px-3 py-2 border rounded-lg text-sm"
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
										Início da Vigência
									</label>
									<input
										type="date"
										required
										value={dataInicio}
										onChange={(e) => setDataInicio(e.target.value)}
										className="w-full px-3 py-2 border rounded-lg text-sm"
									/>
								</div>
								<div>
									<label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
										Fim da Vigência
									</label>
									<input
										type="date"
										required
										value={dataFim}
										onChange={(e) => setDataFim(e.target.value)}
										className="w-full px-3 py-2 border rounded-lg text-sm"
									/>
								</div>
							</div>
							<div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
								<button
									type="button"
									onClick={() => setModalAberto(false)}
									className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
								>
									Cancelar
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium cursor-pointer"
								>
									Salvar Contrato
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
