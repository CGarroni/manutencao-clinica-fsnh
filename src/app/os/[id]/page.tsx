"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { buscarChamadoPorId, atualizarChamado, STATUS } from "@/lib/firebase";
import { EMAILJS_CONFIG, emailjs } from "@/lib/emailjs";
import { observarEstadoAuth, realizarLogout } from "@/services/authService";
import Link from "next/link";

export default function DetalhesOSPage() {
	const params = useParams();
	const router = useRouter();
	const id = params?.id as string;

	const [chamado, setChamado] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [salvando, setSalvando] = useState(false);

	// Campos de Atendimento
	const [status, setStatus] = useState("aberto");
	const [laudoTecnico, setLaudoTecnico] = useState("");
	const [pecasUtilizadas, setPecasUtilizadas] = useState("");

	// Canvas para Assinatura
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [isDrawing, setIsDrawing] = useState(false);

	useEffect(() => {
		const unsubscribe = observarEstadoAuth((user) => {
			if (!user) {
				router.push("/");
			}
		});

		if (id) {
			carregarChamado(id);
		}

		return () => unsubscribe();
	}, [id, router]);

	async function carregarChamado(chamadoId: string) {
		setLoading(true);
		const dados = (await buscarChamadoPorId(chamadoId)) as any; // Força o TypeScript a aceitar as propriedades customizadas

		if (dados) {
			setChamado(dados);
			setStatus(dados.status || "aberto");
			setLaudoTecnico(dados.laudoTecnico || "");
			setPecasUtilizadas(dados.pecasUtilizadas || "");
		}
		setLoading(false); // Garantindo que o loading seja desativado após carregar
	}

	// Funções do Canvas de Assinatura
	function startDrawing(
		e:
			| React.MouseEvent<HTMLCanvasElement>
			| React.TouchEvent<HTMLCanvasElement>,
	) {
		setIsDrawing(true);
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const rect = canvas.getBoundingClientRect();
		const x =
			"touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
		const y =
			"touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

		ctx.beginPath();
		ctx.moveTo(x, y);
	}

	function draw(
		e:
			| React.MouseEvent<HTMLCanvasElement>
			| React.TouchEvent<HTMLCanvasElement>,
	) {
		if (!isDrawing) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const rect = canvas.getBoundingClientRect();
		const x =
			"touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
		const y =
			"touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

		ctx.strokeStyle = "#38bdf8";
		ctx.lineWidth = 2;
		ctx.lineTo(x, y);
		ctx.stroke();
	}

	function stopDrawing() {
		setIsDrawing(false);
	}

	function limparAssinatura() {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	async function handleSalvarAtendimento(e: React.FormEvent) {
		e.preventDefault();
		setSalvando(true);

		try {
			let assinaturaUrl = chamado.assinatura || "";
			const canvas = canvasRef.current;
			if (canvas) {
				// Verifica se o canvas foi preenchido convertendo para dataURL
				const dataUrl = canvas.toDataURL();
				// Uma verificação simples se não está totalmente em branco (opcional)
				assinaturaUrl = dataUrl;
			}

			const dadosAtualizados = {
				status,
				laudoTecnico,
				pecasUtilizadas,
				assinatura: assinaturaUrl,
				dataAtualizacao: new Date().toISOString(),
			};

			const sucesso = await atualizarChamado(id, dadosAtualizados);

			if (sucesso) {
				// Se foi finalizado, dispara e-mail via EmailJS
				if (status === "finalizado") {
					try {
						await emailjs.send(
							EMAILJS_CONFIG.serviceId,
							EMAILJS_CONFIG.templateManutencao,
							{
								numero_os: chamado.numero,
								equipamento: chamado.equipamento,
								patrimonio: chamado.patrimonio,
								setor: chamado.setor,
								solicitante: chamado.solicitante,
								status: "FINALIZADO",
								laudo: laudoTecnico,
								email_destino: EMAILJS_CONFIG.emailResponsavel,
							},
						);
					} catch (mailErr) {
						console.error("Erro ao enviar e-mail de encerramento:", mailErr);
					}
				}

				alert("Ordem de Serviço atualizada com sucesso!");
				router.push("/dashboard");
			} else {
				alert("Erro ao atualizar a Ordem de Serviço.");
			}
		} catch (error) {
			console.error(error);
			alert("Erro inesperado ao salvar.");
		} finally {
			setSalvando(false);
		}
	}

	async function handleLogout() {
		await realizarLogout();
		router.push("/");
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
				<p className="text-slate-400 text-sm">
					Carregando dados da Ordem de Serviço...
				</p>
			</div>
		);
	}

	if (!chamado) {
		return (
			<div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center gap-4">
				<p className="text-rose-400 font-semibold">
					Ordem de Serviço não encontrada.
				</p>
				<Link
					href="/dashboard"
					className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm"
				>
					Voltar ao Dashboard
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between">
			{/* Header */}
			<header className="bg-slate-950 border-b border-slate-800 py-4 px-6 flex justify-between items-center shadow-md">
				<div className="flex items-center gap-3">
					<div className="bg-sky-500/10 p-2 rounded-lg text-sky-400 font-bold tracking-wider">
						FSNH
					</div>
					<div>
						<h1 className="font-bold text-lg text-white">
							Atendimento de OS: {chamado.numero}
						</h1>
						<p className="text-xs text-slate-400">
							Hospital Municipal de Novo Hamburgo
						</p>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<Link
						href="/dashboard"
						className="text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-md font-medium transition"
					>
						Voltar ao Dashboard
					</Link>
					<button
						onClick={handleLogout}
						className="text-sm bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-800/50 px-3 py-2 rounded-md font-medium transition"
					>
						Sair
					</button>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-4xl w-full mx-auto p-4 sm:p-6 my-4 sm:my-6 flex-1 space-y-6">
				{/* Resumo do Chamado */}
				<div className="bg-slate-950 border border-slate-800 p-6 rounded-xl shadow-xl space-y-4">
					<div className="flex justify-between items-start border-b border-slate-800 pb-4">
						<div>
							<span className="text-xs uppercase text-sky-400 font-bold tracking-wider">
								Equipamento Solicitado
							</span>
							<h2 className="text-xl font-bold text-white">
								{chamado.equipamento}
							</h2>
							<p className="text-xs text-slate-400">
								Patrimônio: {chamado.patrimonio || "Não informado"}
							</p>
						</div>
						<div className="text-right">
							<span className="text-xs uppercase text-slate-400 font-bold tracking-wider">
								Prioridade
							</span>
							<div>
								<span
									className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold mt-1 ${
										chamado.prioridade === "Emergência (Crítico)"
											? "bg-rose-500/20 text-rose-400 border border-rose-800/40"
											: chamado.prioridade === "Urgente"
												? "bg-amber-500/20 text-amber-400 border border-amber-800/40"
												: "bg-slate-800 text-slate-300"
									}`}
								>
									{chamado.prioridade}
								</span>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
						<div>
							<span className="text-xs text-slate-500 uppercase block">
								Setor
							</span>
							<span className="text-slate-200 font-medium">
								{chamado.setor}
							</span>
						</div>
						<div>
							<span className="text-xs text-slate-500 uppercase block">
								Solicitante
							</span>
							<span className="text-slate-200 font-medium">
								{chamado.solicitante} ({chamado.ramal || "Sem ramal"})
							</span>
						</div>
						<div>
							<span className="text-xs text-slate-500 uppercase block">
								Tipo
							</span>
							<span className="text-slate-200 font-medium">
								{chamado.tipoManutencao || "Corretiva"}
							</span>
						</div>
					</div>

					<div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800/60">
						<span className="text-xs text-slate-500 uppercase block mb-1">
							Descrição do Problema Relatado
						</span>
						<p className="text-sm text-slate-300 whitespace-pre-wrap">
							{chamado.descricao}
						</p>
					</div>
				</div>

				{/* Formulário de Atendimento Técnico */}
				<form
					onSubmit={handleSalvarAtendimento}
					className="bg-slate-950 border border-slate-800 p-6 rounded-xl shadow-xl space-y-5"
				>
					<h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
						Encerramento Técnico
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Alterar Status */}
						<div>
							<label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
								Status da OS
							</label>
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
							>
								<option value="aberto">Aberto</option>
								<option value="em_andamento">Em Andamento</option>
								<option value="aguardando_peca">Aguardando Peça</option>
								<option value="finalizado">Finalizado</option>
							</select>
						</div>

						{/* Peças Utilizadas */}
						<div>
							<label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
								Peças / Componentes Utilizados
							</label>
							<input
								type="text"
								value={pecasUtilizadas}
								onChange={(e) => setPecasUtilizadas(e.target.value)}
								placeholder="Ex: Cabo de força, fusível 5A..."
								className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
							/>
						</div>
					</div>

					{/* Laudo Técnico */}
					<div>
						<label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
							Laudo Técnico / Ações Realizadas
						</label>
						<textarea
							rows={4}
							required
							value={laudoTecnico}
							onChange={(e) => setLaudoTecnico(e.target.value)}
							placeholder="Descreva o procedimento técnico realizado para solucionar o problema..."
							className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"
						></textarea>
					</div>

					{/* Assinatura Digital */}
					<div>
						<div className="flex justify-between items-center mb-1">
							<label className="block text-xs font-semibold uppercase text-slate-400">
								Assinatura do Responsável / Solicitante
							</label>
							<button
								type="button"
								onClick={limparAssinatura}
								className="text-xs text-sky-400 hover:underline"
							>
								Limpar Assinatura
							</button>
						</div>
						<div className="border border-slate-700 bg-slate-900 rounded-lg overflow-hidden w-full">
							<canvas
								ref={canvasRef}
								width={600}
								height={150}
								onMouseDown={startDrawing}
								onMouseMove={draw}
								onMouseUp={stopDrawing}
								onMouseLeave={stopDrawing}
								onTouchStart={startDrawing}
								onTouchMove={draw}
								onTouchEnd={stopDrawing}
								className="w-full h-37.5 cursor-crosshair touch-none bg-slate-950 block"
							/>
						</div>
						<p className="text-[11px] text-slate-500 mt-1">
							Desenhe com o mouse ou dedo para registrar a assinatura de
							validação.
						</p>
					</div>

					<button
						type="submit"
						disabled={salvando}
						className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 rounded-lg transition shadow-lg disabled:opacity-50"
					>
						{salvando
							? "Salvando Atendimento..."
							: "Salvar e Atualizar Ordem de Serviço"}
					</button>
				</form>
			</main>

			{/* Footer */}
			<footer className="text-center py-4 text-xs text-slate-500 border-t border-slate-800">
				Hospital Municipal de Novo Hamburgo — Setor de Manutenção e Engenharia
				Clínica © {new Date().getFullYear()}
			</footer>
		</div>
	);
}
