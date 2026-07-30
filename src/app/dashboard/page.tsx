"use client";

import { useState, useEffect, useRef } from "react";
import { listarChamados, atualizarChamado } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import logoFsnh from "@/assets/logo-fsnh.png";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
	const [chamados, setChamados] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [filtroStatus, setFiltroStatus] = useState("todos");
	const [busca, setBusca] = useState("");
	const [osSelecionada, setOsSelecionada] = useState<any | null>(null);

	// Estados dos campos de atendimento detalhado
	const [resolucao, setResolucao] = useState("");
	const [motivoPendencia, setMotivoPendencia] = useState("");
	const [novoStatus, setNovoStatus] = useState("em_andamento");

	// Referências para os Canvas de Assinatura Digital e controle de desenho
	const canvasSolicitanteRef = useRef<HTMLCanvasElement | null>(null);
	const canvasTecnicoRef = useRef<HTMLCanvasElement | null>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [temAssinaturaSolicitante, setTemAssinaturaSolicitante] =
		useState(false);
	const [temAssinaturaTecnico, setTemAssinaturaTecnico] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (!user) {
				router.push("/login");
			} else {
				carregarDadosDashboard();
			}
		});

		return () => unsubscribe();
	}, [router]);

	async function carregarDadosDashboard() {
		setLoading(true);
		const dados = await listarChamados();
		setChamados(dados || []);
		setLoading(false);
	}

	// Métricas calculadas para os Cards do Topo
	const totalOS = chamados.length;
	const emAberto = chamados.filter(
		(c) => c.status === "aberto" || !c.status,
	).length;
	const pendente = chamados.filter((c) => c.status === "pendente").length;
	const emprestimo = chamados.filter((c) => c.status === "emprestimo").length;
	const finalizados = chamados.filter((c) => c.status === "finalizado").length;
	const descarte = chamados.filter((c) => c.status === "descarte").length;

	// Filtragem dos chamados para a listagem
	const chamadosFiltrados = chamados.filter((c) => {
		const matchStatus =
			filtroStatus === "todos"
				? true
				: filtroStatus === "aberto"
					? c.status === "aberto" || !c.status
					: c.status === filtroStatus;

		const termo = busca.toLowerCase();
		const matchBusca =
			!busca ||
			c.numero?.toLowerCase().includes(termo) ||
			c.setor?.toLowerCase().includes(termo) ||
			c.equipamento?.toLowerCase().includes(termo) ||
			c.solicitante?.toLowerCase().includes(termo);

		return matchStatus && matchBusca;
	});

	// --- FUNÇÕES BLINDADAS DE DESENHO NO CANVAS (Com suporte a Touch Mobile e prevenção de scroll) ---
	const iniciarDesenho = (e: any, tipo: "solicitante" | "tecnico") => {
		if (osSelecionada?.status === "finalizado") return;
		if (e.cancelable) e.preventDefault(); // Impede o scroll da tela no celular

		const canvas =
			tipo === "solicitante"
				? canvasSolicitanteRef.current
				: canvasTecnicoRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const rect = canvas.getBoundingClientRect();
		const clientX = e.touches ? e.touches[0].clientX : e.clientX;
		const clientY = e.touches ? e.touches[0].clientY : e.clientY;

		const x = (clientX - rect.left) * (canvas.width / rect.width);
		const y = (clientY - rect.top) * (canvas.height / rect.height);

		setIsDrawing(true);
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		ctx.strokeStyle = "#0f172a";
	};

	const desenhar = (e: any, tipo: "solicitante" | "tecnico") => {
		if (!isDrawing) return;
		if (osSelecionada?.status === "finalizado") return;
		if (e.cancelable) e.preventDefault(); // Impede o scroll da tela no celular

		const canvas =
			tipo === "solicitante"
				? canvasSolicitanteRef.current
				: canvasTecnicoRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const rect = canvas.getBoundingClientRect();
		const clientX = e.touches ? e.touches[0].clientX : e.clientX;
		const clientY = e.touches ? e.touches[0].clientY : e.clientY;

		const x = (clientX - rect.left) * (canvas.width / rect.width);
		const y = (clientY - rect.top) * (canvas.height / rect.height);

		ctx.lineTo(x, y);
		ctx.stroke();

		if (tipo === "solicitante") setTemAssinaturaSolicitante(true);
		if (tipo === "tecnico") setTemAssinaturaTecnico(true);
	};

	const pararDesenho = () => {
		setIsDrawing(false);
	};

	const limparAssinatura = (tipo: "solicitante" | "tecnico") => {
		if (osSelecionada?.status === "finalizado") return;
		const canvas =
			tipo === "solicitante"
				? canvasSolicitanteRef.current
				: canvasTecnicoRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (tipo === "solicitante") {
			setTemAssinaturaSolicitante(false);
			setOsSelecionada((prev: any) => ({
				...prev,
				assinaturaSolicitante: null,
			}));
		}
		if (tipo === "tecnico") {
			setTemAssinaturaTecnico(false);
			setOsSelecionada((prev: any) => ({ ...prev, assinaturaTecnico: null }));
		}
	};

	async function handleSalvarAtendimento(e: React.FormEvent) {
		e.preventDefault();
		if (!osSelecionada) return;

		let assinaturaSolUrl = osSelecionada.assinaturaSolicitante || "";
		let assinaturaTecUrl = osSelecionada.assinaturaTecnico || "";

		if (canvasSolicitanteRef.current && temAssinaturaSolicitante) {
			assinaturaSolUrl = canvasSolicitanteRef.current.toDataURL("image/png");
		}
		if (canvasTecnicoRef.current && temAssinaturaTecnico) {
			assinaturaTecUrl = canvasTecnicoRef.current.toDataURL("image/png");
		}

		const agoraStr = new Date().toLocaleString("pt-BR");
		const usuarioAtual = auth.currentUser?.email || "Técnico Plantonista";

		const logsAtuais = Array.isArray(osSelecionada.historicoLogs)
			? osSelecionada.historicoLogs
			: [];

		let descricaoAlteracao = `Status alterado para: [${novoStatus.toUpperCase()}]`;
		if (resolucao && resolucao !== osSelecionada.resolucao) {
			descricaoAlteracao += ` | Resolução atualizada.`;
		}
		if (novoStatus === "pendente" && motivoPendencia) {
			descricaoAlteracao += ` | Pendência: ${motivoPendencia}`;
		}

		const novoLog = {
			data: agoraStr,
			autor: usuarioAtual,
			acao: descricaoAlteracao,
		};

		const historicoAtualizado = [novoLog, ...logsAtuais];

		const sucesso = await atualizarChamado(osSelecionada.id, {
			status: novoStatus,
			resolucao: resolucao,
			motivoPendencia: novoStatus === "pendente" ? motivoPendencia : "",
			assinaturaSolicitante: assinaturaSolUrl,
			assinaturaTecnico: assinaturaTecUrl,
			historicoLogs: historicoAtualizado,
			atualizadoEm: new Date().toISOString(),
		});

		if (sucesso) {
			alert("Ordem de Serviço, e histórico atualizados com sucesso!");
			setOsSelecionada(null);
			setResolucao("");
			setMotivoPendencia("");
			carregarDadosDashboard();
		} else {
			alert("Erro ao atualizar a Ordem de Serviço.");
		}
	}

	async function handleSair() {
		try {
			await signOut(auth);
			router.push("/login");
		} catch (error) {
			console.error("Erro ao fazer logout:", error);
		}
	}

	return (
		<div className="min-h-screen bg-slate-100 flex flex-col justify-between text-slate-800">
			{/* Header do Dashboard com Logotipo */}
			<header className="w-full bg-[#0a2342] text-white px-4 py-3 shadow-md border-b border-slate-800">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-4">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full border-2 border-[#00b4d8] bg-white p-1 relative overflow-hidden shrink-0">
							<Image
								src={logoFsnh}
								alt="Logo FSNH"
								width={35}
								height={35}
								className="object-contain"
							/>
						</div>
						<div>
							<h1 className="font-['Barlow_Condensed'] text-base md:text-lg font-bold uppercase tracking-wider leading-tight">
								Dashboard — Manutenção Clínica
							</h1>
							<p className="text-[10px] md:text-xs text-slate-400 tracking-wide">
								Hospital Municipal de Novo Hamburgo (FSNH)
							</p>
						</div>
					</div>

					{/* MENU DESKTOP */}
					<div className="hidden md:flex items-center flex-wrap gap-2 justify-end">
						{/* Operacional */}
						<Link
							href="/dashboard/equipamentos"
							className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
						>
							🔧 Equipamentos
						</Link>

						{/* Novo: Estoque */}
						<Link
							href="/dashboard/estoque"
							className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
						>
							📦 Estoque
						</Link>

						{/* Novo: Contratos */}
						<Link
							href="/dashboard/contratos"
							className="bg-violet-600 hover:bg-violet-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
						>
							📄 Contratos
						</Link>

						<Link
							href="/dashboard/relatorios"
							className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
						>
							📊 Relatórios
						</Link>

						{/* Utilitários */}
						<Link
							href="/manual"
							className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
						>
							📖 Manual
						</Link>
						<Link
							href="/qrcode"
							className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
						>
							📱 QR Code
						</Link>
						<button
							onClick={handleSair}
							className="bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
						>
							🚪 Sair
						</button>
					</div>

					{/* MENU MOBILE (Com rolagem horizontal fluida) */}
					<div className="flex md:hidden overflow-x-auto pb-1 gap-2 scrollbar-none">
						<Link
							href="/dashboard/equipamentos"
							className="shrink-0 bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"
						>
							🔧 Equipamentos
						</Link>
						<Link
							href="/dashboard/estoque"
							className="shrink-0 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"
						>
							📦 Estoque
						</Link>
						<Link
							href="/dashboard/contratos"
							className="shrink-0 bg-violet-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"
						>
							📄 Contratos
						</Link>
						<Link
							href="/dashboard/relatorios"
							className="shrink-0 bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"
						>
							📊 Relatórios
						</Link>
						<Link
							href="/manual"
							className="shrink-0 bg-cyan-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"
						>
							📖 Manual
						</Link>
						<Link
							href="/qrcode"
							className="shrink-0 bg-amber-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"
						>
							📱 QR Code
						</Link>
						<button
							onClick={handleSair}
							className="shrink-0 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1"
						>
							🚪 Sair
						</button>
					</div>
				</div>
			</header>

			{/* Conteúdo Principal */}
			<main className="max-w-7xl w-full mx-auto p-6 space-y-6 flex-1 print:p-0 print:m-0 print:max-w-none">
				{/* CARDS DE MÉTRICAS SUPERIORES */}
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 print:hidden">
					<div
						onClick={() => setFiltroStatus("todos")}
						className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-600 cursor-pointer hover:shadow-md transition"
					>
						<span className="text-[10px] font-bold uppercase text-slate-400 block">
							Total de OS
						</span>
						<span className="text-2xl font-bold text-slate-700">{totalOS}</span>
					</div>

					<div
						onClick={() => setFiltroStatus("aberto")}
						className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-amber-500 cursor-pointer hover:shadow-md transition"
					>
						<span className="text-[10px] font-bold uppercase text-amber-600 block">
							Em Aberto
						</span>
						<span className="text-2xl font-bold text-slate-700">
							{emAberto}
						</span>
					</div>

					<div
						onClick={() => setFiltroStatus("pendente")}
						className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-orange-500 cursor-pointer hover:shadow-md transition"
					>
						<span className="text-[10px] font-bold uppercase text-orange-600 block">
							Pendente
						</span>
						<span className="text-2xl font-bold text-slate-700">
							{pendente}
						</span>
					</div>

					<div
						onClick={() => setFiltroStatus("emprestimo")}
						className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-purple-500 cursor-pointer hover:shadow-md transition"
					>
						<span className="text-[10px] font-bold uppercase text-purple-700 block">
							Empréstimo
						</span>
						<span className="text-2xl font-bold text-slate-700">
							{emprestimo}
						</span>
					</div>

					<div
						onClick={() => setFiltroStatus("finalizado")}
						className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-500 cursor-pointer hover:shadow-md transition"
					>
						<span className="text-[10px] font-bold uppercase text-emerald-600 block">
							Finalizados
						</span>
						<span className="text-2xl font-bold text-slate-700">
							{finalizados}
						</span>
					</div>

					<div
						onClick={() => setFiltroStatus("descarte")}
						className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500 cursor-pointer hover:shadow-md transition"
					>
						<span className="text-[10px] font-bold uppercase text-red-600 block">
							Descarte
						</span>
						<span className="text-2xl font-bold text-slate-700">
							{descarte}
						</span>
					</div>
				</div>

				{/* BARRA DE FILTROS E BUSCA */}
				<div className="bg-white p-4 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
					<div className="flex flex-wrap gap-2">
						<button
							onClick={() => setFiltroStatus("todos")}
							className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${filtroStatus === "todos" ? "bg-[#0a192f] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
						>
							Todos
						</button>
						<button
							onClick={() => setFiltroStatus("aberto")}
							className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${filtroStatus === "aberto" ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
						>
							Em Aberto
						</button>
						<button
							onClick={() => setFiltroStatus("pendente")}
							className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${filtroStatus === "pendente" ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
						>
							Pendente
						</button>
						<button
							onClick={() => setFiltroStatus("emprestimo")}
							className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${filtroStatus === "emprestimo" ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
						>
							Empréstimo
						</button>
						<button
							onClick={() => setFiltroStatus("finalizado")}
							className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${filtroStatus === "finalizado" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
						>
							Finalizados
						</button>
						<button
							onClick={() => setFiltroStatus("descarte")}
							className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${filtroStatus === "descarte" ? "bg-red-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
						>
							Descarte
						</button>
					</div>

					<div className="w-full md:w-72">
						<input
							type="text"
							value={busca}
							onChange={(e) => setBusca(e.target.value)}
							placeholder="Buscar por setor, OS, equipamento..."
							className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
						/>
					</div>
				</div>

				{/* LISTAGEM DE CARDS DE ORDENS DE SERVIÇO */}
				<div className="bg-white rounded-xl shadow-sm p-6 print:hidden">
					<h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-slate-200 pb-3 mb-6 flex items-center justify-between">
						<span>📋 Ordens de Serviço ({chamadosFiltrados.length})</span>
						<Link
							href="/"
							target="_blank"
							className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold transition shadow"
						>
							+ Abrir Nova OS
						</Link>
					</h3>

					{loading ? (
						<p className="text-center py-10 text-xs text-slate-400">
							Carregando chamados...
						</p>
					) : chamadosFiltrados.length === 0 ? (
						<p className="text-center py-10 text-xs text-slate-400">
							Nenhuma Ordem de Serviço encontrada.
						</p>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{chamadosFiltrados.map((os) => (
								<div
									key={os.id}
									className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow transition"
								>
									<div className="space-y-2">
										<div className="flex justify-between items-center border-b border-slate-200 pb-2">
											<span className="font-mono font-bold text-sm text-blue-900">
												{os.numero || "MC-0000"}
											</span>
											<span
												className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
													os.status === "finalizado"
														? "bg-emerald-100 text-emerald-700"
														: os.status === "pendente"
															? "bg-orange-100 text-orange-700"
															: os.status === "emprestimo"
																? "bg-purple-100 text-purple-700"
																: os.status === "descarte"
																	? "bg-red-100 text-red-700"
																	: "bg-amber-100 text-amber-700"
												}`}
											>
												{os.status || "aberto"}
											</span>
										</div>

										<div className="text-xs space-y-1 text-slate-600">
											<p>
												<strong className="text-slate-700 uppercase text-[10px]">
													Setor:
												</strong>{" "}
												{os.setor}
											</p>
											<p>
												<strong className="text-slate-700 uppercase text-[10px]">
													Equipamento:
												</strong>{" "}
												{os.equipamento}
											</p>
											<p>
												<strong className="text-slate-700 uppercase text-[10px]">
													Falha:
												</strong>{" "}
												{os.falha}
											</p>
											<p>
												<strong className="text-slate-700 uppercase text-[10px]">
													Solicitante:
												</strong>{" "}
												{os.solicitante}
											</p>
											<p>
												<strong className="text-slate-700 uppercase text-[10px]">
													Abertura:
												</strong>{" "}
												{os.dataHora || os.dataAbertura}
											</p>
										</div>

										{os.descricao && (
											<div className="bg-white p-2 rounded border border-slate-200 text-[11px] text-slate-500 italic">
												"{os.descricao}"
											</div>
										)}
									</div>

									<div className="mt-4 pt-3 border-t border-slate-200 flex flex-col gap-2">
										<button
											onClick={() => {
												setOsSelecionada(os);
												setNovoStatus(os.status || "em_andamento");
												setResolucao(os.resolucao || "");
												setMotivoPendencia(os.motivoPendencia || "");
												setTemAssinaturaSolicitante(!!os.assinaturaSolicitante);
												setTemAssinaturaTecnico(!!os.assinaturaTecnico);
											}}
											className={`py-2 rounded-lg text-[11px] font-semibold transition text-center cursor-pointer shadow ${
												os.status === "finalizado"
													? "bg-slate-300 hover:bg-slate-400 text-slate-800"
													: "bg-blue-600 hover:bg-blue-500 text-white"
											}`}
										>
											{os.status === "finalizado"
												? "👁️ Visualizar OS"
												: "🔧 Abrir para finalizar"}
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</main>

			{/* MODAL: ATENDIMENTO DETALHADO DA OS COM LOGS, HISTÓRICO E ASSINATURAS */}
			{osSelecionada && (
				<div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-3 md:p-6 overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto">
					<div className="bg-white text-slate-800 rounded-2xl max-w-2xl w-full p-5 md:p-6 shadow-2xl space-y-4 my-6 print:shadow-none print:m-0 print:p-0 print:max-w-none">
						{/* CABEÇALHO PARA IMPRESSÃO / PDF */}
						<div className="hidden print:flex items-center justify-between border-b-2 border-slate-900 pb-3 mb-4">
							<div className="flex items-center gap-3">
								<Image
									src={logoFsnh}
									alt="Logo FSNH"
									width={40}
									height={40}
									className="object-contain"
								/>
								<div>
									<h1 className="font-bold text-sm uppercase text-slate-900">
										Hospital Municipal de Novo Hamburgo
									</h1>
									<p className="text-[10px] text-slate-600 uppercase font-semibold">
										Fundação de Saúde de Novo Hamburgo (FSNH) — Setor de
										Manutenção Clínica
									</p>
								</div>
							</div>
							<div className="text-right">
								<p className="font-mono font-bold text-sm">
									OS: {osSelecionada.numero}
								</p>
								<p className="text-[10px] text-slate-500">
									Data: {osSelecionada.dataHora || osSelecionada.dataAbertura}
								</p>
							</div>
						</div>

						{/* CABEÇALHO DA TELA (MODAL) */}
						<div className="flex items-start justify-between border-b border-slate-200 pb-4 gap-3 print:hidden">
							<div className="space-y-0.5">
								<div className="flex items-center gap-2 flex-wrap">
									<h3 className="text-xs md:text-sm font-extrabold uppercase tracking-wide text-blue-950 font-mono">
										Ordem de Serviço: {osSelecionada.numero}
									</h3>
								</div>
								<p className="text-[11px] text-slate-500">
									Atendimento Técnico e Histórico — Manutenção Clínica FSNH
								</p>
							</div>

							<div className="flex items-center gap-2 shrink-0">
								<button
									type="button"
									onClick={() => window.print()}
									className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
								>
									🖨️{" "}
									<span className="hidden sm:inline">Imprimir / Gerar PDF</span>
									<span className="sm:hidden">Imprimir</span>
								</button>
								<button
									onClick={() => setOsSelecionada(null)}
									className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold text-sm transition cursor-pointer"
									title="Fechar"
								>
									✕
								</button>
							</div>
						</div>

						{/* BOTÃO DE REABERTURA EXCEPCIONAL SE A OS ESTIVER FINALIZADA */}
						{osSelecionada.status === "finalizado" && (
							<div className="bg-amber-50 border border-amber-300 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 print:hidden">
								<div>
									<p className="text-xs font-bold text-amber-900">
										OS Finalizada (Modo Somente Leitura)
									</p>
									<p className="text-[11px] text-amber-700">
										Caso tenha chegado o laudo do fabricante ou precise de
										ajustes, você pode reabri-la.
									</p>
								</div>
								<button
									type="button"
									onClick={async () => {
										if (
											confirm(
												"Deseja reabrir esta OS para edição? O status passará para Pendente e o evento será registrado no histórico.",
											)
										) {
											const agoraStr = new Date().toLocaleString("pt-BR");
											const usuarioAtual =
												auth.currentUser?.email || "Técnico Plantonista";
											const logsAtuais = Array.isArray(
												osSelecionada.historicoLogs,
											)
												? osSelecionada.historicoLogs
												: [];

											const novoLog = {
												data: agoraStr,
												autor: usuarioAtual,
												acao: "🔓 OS Reaberta excepcionalmente para edição/ajuste.",
											};

											await atualizarChamado(osSelecionada.id, {
												status: "pendente",
												historicoLogs: [novoLog, ...logsAtuais],
											});
											alert("OS reaberta com sucesso!");
											setOsSelecionada(null);
											carregarDadosDashboard();
										}
									}}
									className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow cursor-pointer shrink-0"
								>
									🔓 Reabrir para Edição
								</button>
							</div>
						)}

						{/* CAMPO 1: Reclamação Inicial */}
						<div className="bg-slate-50/80 print:bg-white print:border print:border-slate-300 p-3.5 rounded-xl text-xs space-y-1.5 text-slate-700 border border-slate-200">
							<p className="font-bold text-blue-900 print:text-slate-900 uppercase text-[10px] tracking-wider">
								1. Reclamação / Problema Relatado:
							</p>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-600">
								<p>
									<strong>Setor:</strong> {osSelecionada.setor}
								</p>
								<p>
									<strong>Solicitante:</strong> {osSelecionada.solicitante}
								</p>
							</div>
							<p>
								<strong>Equipamento:</strong> {osSelecionada.equipamento}{" "}
								<span className="text-slate-400 font-mono text-[11px]">
									(Patrimônio: {osSelecionada.patrimonio || "S/N"})
								</span>
							</p>
							<div className="text-slate-700 print:text-slate-800 mt-2 bg-white print:bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 text-xs">
								<strong className="text-slate-900 font-semibold">
									Falha relatada:
								</strong>{" "}
								{osSelecionada.falha} —{" "}
								<span className="italic">"{osSelecionada.descricao}"</span>
							</div>
						</div>

						<form onSubmit={handleSalvarAtendimento} className="space-y-4">
							<div className="print:hidden">
								<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
									Alterar Status da OS
								</label>
								<select
									disabled={osSelecionada.status === "finalizado"}
									value={novoStatus}
									onChange={(e) => setNovoStatus(e.target.value)}
									className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold disabled:bg-slate-200 disabled:cursor-not-allowed text-slate-800 shadow-sm"
								>
									<option value="aberto">Aberto</option>
									<option value="em_andamento">Em Andamento (Interno)</option>
									<option value="pendente">
										Pendente (Calibração / Falta de Peça / Externo)
									</option>
									<option value="emprestimo">Empréstimo</option>
									<option value="finalizado">Finalizado / Consertado</option>
									<option value="descarte">Descarte</option>
								</select>
							</div>

							{/* Status exibido estaticamente na impressão */}
							<div className="hidden print:block text-xs font-bold uppercase text-slate-800 border-b pb-1">
								Status Atual da OS:{" "}
								<span className="text-blue-950 underline">{novoStatus}</span>
							</div>

							{/* CAMPO 2: Motivo da Pendência */}
							{(novoStatus === "pendente" || osSelecionada.motivoPendencia) && (
								<div className="bg-orange-50/70 print:bg-amber-50 p-3.5 rounded-xl border border-orange-200 print:border-amber-300 space-y-1.5">
									<label className="block text-[11px] font-bold uppercase text-orange-900 print:text-amber-900">
										Motivo da Pendência *
									</label>
									<div className="print:hidden">
										<textarea
											disabled={osSelecionada.status === "finalizado"}
											rows={2}
											value={motivoPendencia}
											onChange={(e) => setMotivoPendencia(e.target.value)}
											placeholder="Descreva detalhadamente o motivo pelo qual o equipamento ficou pendente..."
											className="w-full bg-white border border-orange-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none disabled:bg-slate-100 disabled:cursor-not-allowed shadow-sm"
										></textarea>
									</div>
									<p className="hidden print:block text-xs text-slate-700 italic">
										"{motivoPendencia || osSelecionada.motivoPendencia || "N/A"}
										"
									</p>
								</div>
							)}

							{/* CAMPO 3: Resolução / Serviço Executado */}
							<div>
								<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
									2. Resolução / Serviço Executado *
								</label>
								<div className="print:hidden">
									<textarea
										disabled={osSelecionada.status === "finalizado"}
										rows={3}
										value={resolucao}
										onChange={(e) => setResolucao(e.target.value)}
										placeholder="Descreva a solução aplicada, peças substituídas ou testes realizados..."
										className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none disabled:bg-slate-200 disabled:cursor-not-allowed shadow-sm"
									></textarea>
								</div>
								<div className="hidden print:block bg-slate-50 border border-slate-300 p-3 rounded-lg text-xs min-h-15 text-slate-800">
									{resolucao ||
										osSelecionada.resolucao ||
										"Serviço em andamento / Não informado."}
								</div>
							</div>

							{/* HISTÓRICO DE MOVIMENTAÇÕES / LOGS DE ALTERAÇÕES */}
							<div className="bg-slate-50/80 border border-slate-200 p-3.5 rounded-xl space-y-2 print:border-slate-300">
								<label className="block text-[11px] font-bold uppercase text-blue-900">
									📜 Histórico de Movimentações (Trilha de Auditoria)
								</label>
								{Array.isArray(osSelecionada.historicoLogs) &&
								osSelecionada.historicoLogs.length > 0 ? (
									<div className="max-h-32 overflow-y-auto space-y-1.5 text-[11px] pr-1">
										{osSelecionada.historicoLogs.map(
											(log: any, idx: number) => (
												<div
													key={idx}
													className="bg-white p-2.5 rounded-lg border border-slate-200/80 flex flex-col shadow-2xs"
												>
													<div className="flex justify-between text-[10px] text-slate-400 font-mono">
														<span>{log.data}</span>
														<span className="font-semibold text-slate-600">
															{log.autor}
														</span>
													</div>
													<p className="text-slate-700 mt-1">{log.acao}</p>
												</div>
											),
										)}
									</div>
								) : (
									<p className="text-[11px] text-slate-400 italic">
										Nenhum registro de movimentação anterior.
									</p>
								)}
							</div>

							{/* BLOCO DE ASSINATURAS DIGITAIS */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
								{/* Assinatura Solicitante */}
								<div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 space-y-2">
									<div className="flex justify-between items-center">
										<label className="text-[10px] font-bold uppercase text-slate-600 tracking-wider">
											Assinatura do Solicitante
										</label>
										{osSelecionada.status !== "finalizado" && (
											<button
												type="button"
												onClick={() => limparAssinatura("solicitante")}
												className="text-[10px] font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer bg-red-50 px-2 py-0.5 rounded"
											>
												Limpar
											</button>
										)}
									</div>

									{osSelecionada.assinaturaSolicitante &&
									!temAssinaturaSolicitante ? (
										<div className="bg-white p-2 rounded-xl border border-slate-200 text-center">
											<img
												src={osSelecionada.assinaturaSolicitante}
												alt="Assinatura Solicitante"
												className="max-h-16 mx-auto object-contain"
											/>
											<span className="text-[9px] text-emerald-600 font-bold block mt-1">
												✓ Assinado digitalmente
											</span>
										</div>
									) : (
										<div className="bg-white border border-slate-300 rounded-xl overflow-hidden flex justify-center shadow-2xs">
											<canvas
												ref={canvasSolicitanteRef}
												width={260}
												height={90}
												onMouseDown={(e) => iniciarDesenho(e, "solicitante")}
												onMouseMove={(e) => desenhar(e, "solicitante")}
												onMouseUp={pararDesenho}
												onMouseLeave={pararDesenho}
												onTouchStart={(e) => iniciarDesenho(e, "solicitante")}
												onTouchMove={(e) => desenhar(e, "solicitante")}
												onTouchEnd={pararDesenho}
												className="touch-none bg-white w-full cursor-crosshair h-20 md:h-24"
											></canvas>
										</div>
									)}
								</div>

								{/* Assinatura Técnico */}
								<div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200 space-y-2">
									<div className="flex justify-between items-center">
										<label className="text-[10px] font-bold uppercase text-slate-600 tracking-wider">
											Assinatura do Técnico (Eng. Clínica)
										</label>
										{osSelecionada.status !== "finalizado" && (
											<button
												type="button"
												onClick={() => limparAssinatura("tecnico")}
												className="text-[10px] font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer bg-red-50 px-2 py-0.5 rounded"
											>
												Limpar
											</button>
										)}
									</div>

									{osSelecionada.assinaturaTecnico && !temAssinaturaTecnico ? (
										<div className="bg-white p-2 rounded-xl border border-slate-200 text-center">
											<img
												src={osSelecionada.assinaturaTecnico}
												alt="Assinatura Técnico"
												className="max-h-16 mx-auto object-contain"
											/>
											<span className="text-[9px] text-emerald-600 font-bold block mt-1">
												✓ Assinado digitalmente
											</span>
										</div>
									) : (
										<div className="bg-white border border-slate-300 rounded-xl overflow-hidden flex justify-center shadow-2xs">
											<canvas
												ref={canvasTecnicoRef}
												width={260}
												height={90}
												onMouseDown={(e) => iniciarDesenho(e, "tecnico")}
												onMouseMove={(e) => desenhar(e, "tecnico")}
												onMouseUp={pararDesenho}
												onMouseLeave={pararDesenho}
												onTouchStart={(e) => iniciarDesenho(e, "tecnico")}
												onTouchMove={(e) => desenhar(e, "tecnico")}
												onTouchEnd={pararDesenho}
												className="touch-none bg-white w-full cursor-crosshair h-20 md:h-24"
											></canvas>
										</div>
									)}
								</div>
							</div>

							{/* Botões de Ação do Formulário */}
							<div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-slate-200 print:hidden">
								<button
									type="button"
									onClick={() => setOsSelecionada(null)}
									className="w-full sm:flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer"
								>
									Fechar
								</button>

								{osSelecionada.status !== "finalizado" && (
									<button
										type="submit"
										className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer shadow-md"
									>
										Salvar Atendimento
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
