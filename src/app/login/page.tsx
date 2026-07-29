"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { realizarLogin } from "@/services/authService";
import Image from "next/image";
import Link from "next/link";
import logoFsnh from "@/assets/logo-fsnh.png";
import imgMain from "@/assets/img-main.jpg";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [erro, setErro] = useState("");
	const [mostrarSenha, setMostrarSenha] = useState(false);
	const [carregando, setCarregando] = useState(false);
	const router = useRouter();

	async function handleLogin(e: React.FormEvent) {
		e.preventDefault();
		setCarregando(true);
		setErro("");

		try {
			const sucesso = await realizarLogin(email, senha);
			if (sucesso) {
				router.push("/dashboard");
			} else {
				setErro("E-mail ou senha inválidos.");
			}
		} catch (err) {
			setErro("Ocorreu um erro ao tentar entrar. Verifique suas credenciais.");
		} finally {
			setCarregando(false);
		}
	}

	return (
		<div className="min-h-screen relative flex flex-col justify-between text-slate-800">
			{/* Imagem de Fundo */}
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

			{/* Header */}
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
					href="/"
					className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md font-semibold transition shadow"
				>
					Voltar ao Início
				</Link>
			</header>

			{/* Caixa de Login */}
			<main className="relative z-10 max-w-md w-full mx-auto p-6 my-auto bg-white/95 rounded-2xl shadow-2xl border border-white/20">
				<div className="mb-6 text-center">
					<h2 className="text-xl font-bold text-slate-800">
						Identificação da Equipe
					</h2>
					<p className="text-xs text-slate-500 mt-1">
						Insira suas credenciais para acessar o painel de ordens de serviço e
						equipamentos.
					</p>
				</div>

				{erro && (
					<div className="mb-4 bg-rose-50 border border-rose-200 text-rose-600 p-3 rounded-lg text-xs font-medium text-center">
						{erro}
					</div>
				)}

				<form onSubmit={handleLogin} className="space-y-4">
					<div>
						<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
							E-mail
						</label>
						<input
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="seu.email@fsnh.com.br"
							className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
						/>
					</div>

					<div>
						<label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
							Senha
						</label>
						<div className="relative">
							<input
								type={mostrarSenha ? "text" : "password"}
								required
								value={senha}
								onChange={(e) => setSenha(e.target.value)}
								placeholder="********"
								className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none pr-12"
							/>
							<button
								type="button"
								onClick={() => setMostrarSenha(!mostrarSenha)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 text-[11px] font-semibold cursor-pointer"
							>
								{mostrarSenha ? "Ocultar" : "Mostrar"}
							</button>
						</div>
					</div>

					<button
						type="submit"
						disabled={carregando}
						className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg text-xs tracking-wide uppercase transition shadow-lg disabled:opacity-50"
					>
						{carregando ? "Autenticando..." : "Entrar no Sistema"}
					</button>
				</form>
			</main>

			{/* Footer */}
			<footer className="relative z-10 text-center py-3 text-[11px] text-blue-200/70 border-t border-blue-900/40">
				Hospital Municipal de Novo Hamburgo — Setor de Manutenção e Engenharia
				Clínica © {new Date().getFullYear()}
			</footer>
		</div>
	);
}
