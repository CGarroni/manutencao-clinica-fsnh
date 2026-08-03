"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logoFsnh from "@/assets/logo-fsnh.png";
import Link from "next/link";
import {
	listarEstoque,
	salvarItemEstoque,
	atualizarItemEstoque,
	deletarItemEstoque,
	ItemEstoque,
} from "@/lib/firebase";

export default function EstoquePage() {
	const [itens, setItens] = useState<ItemEstoque[]>([]);
	const [loading, setLoading] = useState(true);
	const [busca, setBusca] = useState("");

	// Estados para o Modal de Cadastro / Edição
	const [modalAberto, setModalAberto] = useState(false);
	const [itemEmEdicao, setItemEmEdicao] = useState<ItemEstoque | null>(null);

	// Estados para o Modal de Detalhes
	const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
	const [itemSelecionado, setItemSelecionado] = useState<ItemEstoque | null>(
		null,
	);

	// Campos do Formulário
	const [codigo, setCodigo] = useState("");
	const [nome, setNome] = useState("");
	const [categoria, setCategoria] = useState("");
	const [quantidade, setQuantidade] = useState<string | number>("");
	const [minimo, setMinimo] = useState<string | number>("");
	const [unidade, setUnidade] = useState("un");

	useEffect(() => {
		carregarDados();
	}, []);

	async function carregarDados() {
		setLoading(true);
		try {
			const dados = await listarEstoque();
			setItens(dados || []);
		} catch (error) {
			console.error("Erro ao carregar estoque:", error);
		} finally {
			setLoading(false);
		}
	}

	const abrirModalNovo = () => {
		setItemEmEdicao(null);
		setCodigo(`PÇ-${String(itens.length + 1).padStart(3, "0")}`);
		setNome("");
		setCategoria("");
		setQuantidade("");
		setMinimo(5);
		setUnidade("un");
		setModalAberto(true);
	};

	const abrirModalEditar = (item: ItemEstoque, e?: React.MouseEvent) => {
		if (e) e.stopPropagation();
		setItemEmEdicao(item);
		setCodigo(item.codigo);
		setNome(item.nome);
		setCategoria(item.categoria);
		setQuantidade(item.quantidade);
		setMinimo(item.minimo);
		setUnidade(item.unidade);
		setModalAberto(true);
	};

	const abrirDetalhes = (item: ItemEstoque) => {
		setItemSelecionado(item);
		setModalDetalhesAberto(true);
	};

	const salvarItem = async (e: React.FormEvent) => {
		e.preventDefault();

		const dadosItem = {
			codigo,
			nome,
			categoria: categoria || "Geral",
			quantidade: Number(quantidade) || 0,
			minimo: Number(minimo) || 0,
			unidade,
		};

		try {
			if (itemEmEdicao) {
				await atualizarItemEstoque(itemEmEdicao.id, dadosItem);
			} else {
				await salvarItemEstoque(dadosItem);
			}
			setModalAberto(false);
			carregarDados();
		} catch (error) {
			console.error("Erro ao salvar item no estoque:", error);
			alert("Erro ao salvar item. Tente novamente.");
		}
	};

	const darBaixa = async (item: ItemEstoque, e: React.MouseEvent) => {
		e.stopPropagation();
		if (item.quantidade <= 0) return;

		try {
			await atualizarItemEstoque(item.id, { quantidade: item.quantidade - 1 });
			carregarDados();
		} catch (error) {
			console.error("Erro ao dar baixa:", error);
		}
	};

	const excluirItem = async (id: string, e: React.MouseEvent) => {
		e.stopPropagation();
		if (!confirm("Tem certeza que deseja remover este item do estoque?"))
			return;

		try {
			await deletarItemEstoque(id);
			carregarDados();
		} catch (error) {
			console.error("Erro ao excluir item:", error);
		}
	};

	const itensFiltrados = itens.filter(
		(item) =>
			item.nome?.toLowerCase().includes(busca.toLowerCase()) ||
			item.codigo?.toLowerCase().includes(busca.toLowerCase()) ||
			item.categoria?.toLowerCase().includes(busca.toLowerCase()),
	);

	return (
		<div className="flex flex-col min-h-screen">
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
					Voltar ao Dashboard
				</Link>
			</header>

			<div className="p-6 space-y-6 grow max-w-7xl mx-auto w-full">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
					<div>
						<h1 className="text-2xl font-bold text-blue-300">
							Controle de Estoque
						</h1>
						<p className="text-sm text-gray-500">
							Gerenciamento de peças e insumos para manutenção
						</p>
					</div>
					<button
						onClick={abrirModalNovo}
						className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
					>
						+ Novo Item
					</button>
				</div>

				{/* Cards de Indicadores */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
					<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
						<span className="text-sm text-gray-500">Total de Itens</span>
						<h3 className="text-2xl font-bold text-gray-800">{itens.length}</h3>
					</div>
					<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
						<span className="text-sm text-gray-500">
							Itens Críticos (Abaixo do Mínimo)
						</span>
						<h3 className="text-2xl font-bold text-red-600">
							{
								itens.filter((i) => Number(i.quantidade) <= Number(i.minimo))
									.length
							}
						</h3>
					</div>
					<div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
						<span className="text-sm text-gray-500">Unidades Cadastradas</span>
						<h3 className="text-2xl font-bold text-blue-600">
							{itens.reduce(
								(acc, curr) => acc + Number(curr.quantidade || 0),
								0,
							)}
						</h3>
					</div>
				</div>

				{/* Tabela */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
					<div className="p-4 border-b border-gray-100">
						<input
							type="text"
							placeholder="Pesquisar por código, nome da peça ou categoria..."
							value={busca}
							onChange={(e) => setBusca(e.target.value)}
							className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
						/>
					</div>

					<div className="overflow-x-auto">
						{loading ? (
							<div className="p-8 text-center text-gray-400">
								Carregando estoque...
							</div>
						) : (
							<table className="w-full text-left border-collapse">
								<thead>
									<tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
										<th className="p-4">Código</th>
										<th className="p-4">Nome da Peça</th>
										<th className="p-4">Categoria</th>
										<th className="p-4">Qtd Atual</th>
										<th className="p-4">Mínimo</th>
										<th className="p-4">Status</th>
										<th className="p-4 text-right">Ações</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-100 text-sm text-gray-700">
									{itensFiltrados.length > 0 ? (
										itensFiltrados.map((item) => {
											const abaixoMinimo =
												Number(item.quantidade) <= Number(item.minimo);
											return (
												<tr
													key={item.id}
													onClick={() => abrirDetalhes(item)}
													className="hover:bg-blue-50/50 transition-colors cursor-pointer"
													title="Clique para ver detalhes"
												>
													<td className="p-4 font-semibold text-blue-600 hover:underline">
														{item.codigo}
													</td>
													<td className="p-4 font-medium text-gray-900">
														{item.nome}
													</td>
													<td className="p-4">
														<span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs">
															{item.categoria}
														</span>
													</td>
													<td className="p-4 font-bold text-gray-900">
														{item.quantidade} {item.unidade}
													</td>
													<td className="p-4 text-gray-500">
														{item.minimo} {item.unidade}
													</td>
													<td className="p-4">
														{abaixoMinimo ? (
															<span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold">
																Estoque Baixo
															</span>
														) : (
															<span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold">
																Normal
															</span>
														)}
													</td>
													<td
														className="p-4 text-right space-x-2"
														onClick={(e) => e.stopPropagation()}
													>
														<button
															onClick={(e) => abrirModalEditar(item, e)}
															className="text-blue-600 hover:text-blue-800 font-medium text-xs cursor-pointer"
														>
															Editar
														</button>
														<button
															onClick={(e) => darBaixa(item, e)}
															className="text-amber-600 hover:text-amber-800 font-medium text-xs cursor-pointer"
															title="Dar baixa de 1 unidade"
														>
															Baixa (-1)
														</button>
														<button
															onClick={(e) => excluirItem(item.id, e)}
															className="text-red-500 hover:text-red-700 font-medium text-xs cursor-pointer"
														>
															Excluir
														</button>
													</td>
												</tr>
											);
										})
									) : (
										<tr>
											<td colSpan={7} className="p-6 text-center text-gray-400">
												Nenhum item encontrado.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						)}
					</div>
				</div>
			</div>

			{/* MODAL DE DETALHES */}
			{modalDetalhesAberto && itemSelecionado && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-gray-100">
						<div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
							<h3 className="font-bold text-base">Detalhes da Peça / Insumo</h3>
							<button
								onClick={() => setModalDetalhesAberto(false)}
								className="text-slate-300 hover:text-white font-bold cursor-pointer"
							>
								✕
							</button>
						</div>
						<div className="p-6 space-y-4 text-sm text-gray-700">
							<div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-lg">
								<div>
									<span className="block text-xs font-semibold text-gray-400 uppercase">
										Código
									</span>
									<span className="font-bold text-gray-900">
										{itemSelecionado.codigo}
									</span>
								</div>
								<div>
									<span className="block text-xs font-semibold text-gray-400 uppercase">
										Categoria
									</span>
									<span className="font-semibold text-blue-600">
										{itemSelecionado.categoria}
									</span>
								</div>
							</div>

							<div>
								<span className="block text-xs font-semibold text-gray-400 uppercase">
									Nome da Peça
								</span>
								<p className="font-medium text-gray-900 text-base">
									{itemSelecionado.nome}
								</p>
							</div>

							<div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 rounded-lg">
								<div>
									<span className="block text-xs font-semibold text-gray-400 uppercase">
										Qtd Atual
									</span>
									<span className="font-bold text-gray-900">
										{itemSelecionado.quantidade} {itemSelecionado.unidade}
									</span>
								</div>
								<div>
									<span className="block text-xs font-semibold text-gray-400 uppercase">
										Estoque Mín.
									</span>
									<span className="text-gray-600">
										{itemSelecionado.minimo} {itemSelecionado.unidade}
									</span>
								</div>
								<div>
									<span className="block text-xs font-semibold text-gray-400 uppercase">
										Status
									</span>
									<span
										className={`font-semibold ${Number(itemSelecionado.quantidade) <= Number(itemSelecionado.minimo) ? "text-red-600" : "text-green-600"}`}
									>
										{Number(itemSelecionado.quantidade) <=
										Number(itemSelecionado.minimo)
											? "Crítico"
											: "Normal"}
									</span>
								</div>
							</div>

							<div className="flex justify-end pt-2">
								<button
									onClick={() => setModalDetalhesAberto(false)}
									className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
								>
									Fechar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* MODAL DE CADASTRO / EDIÇÃO */}
			{modalAberto && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-gray-100">
						<div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
							<h3 className="font-bold text-gray-800">
								{itemEmEdicao
									? "Editar Item de Estoque"
									: "Cadastrar Novo Item"}
							</h3>
							<button
								onClick={() => setModalAberto(false)}
								className="text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
							>
								✕
							</button>
						</div>
						<form onSubmit={salvarItem} className="p-6 space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
										Código
									</label>
									<input
										type="text"
										required
										value={codigo}
										onChange={(e) => setCodigo(e.target.value)}
										className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50"
									/>
								</div>
								<div>
									<label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
										Categoria
									</label>
									<input
										type="text"
										required
										placeholder="Ex: Elétrica, Vedação"
										value={categoria}
										onChange={(e) => setCategoria(e.target.value)}
										className="w-full px-3 py-2 border rounded-lg text-sm"
									/>
								</div>
							</div>
							<div>
								<label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
									Nome da Peça / Insumo
								</label>
								<input
									type="text"
									required
									placeholder="Ex: Fusível de Ação Rápida"
									value={nome}
									onChange={(e) => setNome(e.target.value)}
									className="w-full px-3 py-2 border rounded-lg text-sm"
								/>
							</div>
							<div className="grid grid-cols-3 gap-4">
								<div>
									<label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
										Qtd Atual
									</label>
									<input
										type="number"
										required
										min={0}
										placeholder="0"
										value={quantidade}
										onChange={(e) => setQuantidade(e.target.value)}
										className="w-full px-3 py-2 border rounded-lg text-sm"
									/>
								</div>
								<div>
									<label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
										Estoque Mín.
									</label>
									<input
										type="number"
										required
										min={0}
										placeholder="0"
										value={minimo}
										onChange={(e) => setMinimo(e.target.value)}
										className="w-full px-3 py-2 border rounded-lg text-sm"
									/>
								</div>
								<div>
									<label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
										Unidade
									</label>
									<select
										value={unidade}
										onChange={(e) => setUnidade(e.target.value)}
										className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
									>
										<option value="un">un (Unidade)</option>
										<option value="m">m (Metros)</option>
										<option value="kit">kit (Kit)</option>
										<option value="cx">cx (Caixa)</option>
									</select>
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
									className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium cursor-pointer"
								>
									Salvar Item
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Rodapé */}
			<footer className="text-center py-4 text-[11px] text-slate-500 border-t border-slate-200 mt-auto">
				Hospital Municipal de Novo Hamburgo — Setor de Manutenção e Engenharia
				Clínica © {new Date().getFullYear()}
			</footer>
		</div>
	);
}
