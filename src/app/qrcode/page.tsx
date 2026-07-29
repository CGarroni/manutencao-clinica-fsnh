"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import logoFsnh from "@/assets/logo-fsnh.png";

export default function QRCodePage() {
	const handlePrint = () => {
		window.print();
	};

	useEffect(() => {
		// Função para gerar o QR Code assim que a biblioteca carregar
		const renderQRCode = () => {
			const container = document.getElementById("qrcode");
			if (container && (window as any).QRCode) {
				container.innerHTML = ""; // Limpa para evitar duplicidade
				new (window as any).QRCode(container, {
					text: "https://manutencaoclinica.vercel.app",
					width: 200,
					height: 200,
					colorDark: "#0a2342",
					colorLight: "#ffffff",
					correctLevel: (window as any).QRCode.CorrectLevel.H,
				});
			}
		};

		if ((window as any).QRCode) {
			renderQRCode();
		}
	}, []);

	return (
		<>
			{/* Script Externo do qrcode.js */}
			<Script
				src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"
				strategy="lazyOnload"
				onLoad={() => {
					const container = document.getElementById("qrcode");
					if (container && (window as any).QRCode) {
						container.innerHTML = "";
						new (window as any).QRCode(container, {
							text: "https://manutencaoclinica.vercel.app",
							width: 200,
							height: 200,
							colorDark: "#0a2342",
							colorLight: "#ffffff",
							correctLevel: (window as any).QRCode.CorrectLevel.H,
						});
					}
				}}
			/>

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
					← Voltar ao Painel
				</Link>
			</header>

			<div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 sm:p-8 gap-7 font-sans">
				<h1 className="font-['Barlow_Condensed'] text-[20px] text-[#0a2342] text-center tracking-wider uppercase print:hidden">
					🏥 QR Code — Manutenção Clínica FSNH
				</h1>

				<div className="bg-white rounded-2xl p-7 pt-7 pb-5 shadow-lg flex flex-col items-center gap-3.5 border-t-[5px] border-[#1a4a8a] w-70 print:shadow-none print:border print:border-slate-300">
					<div className="flex items-center gap-2.5 w-full">
						<div className="w-11 h-11 rounded-full border-2 border-[#00b4d8] bg-white p-1 relative overflow-hidden shrink-0">
							<Image
								src={logoFsnh}
								alt="Logo FSNH"
								width={35}
								height={35}
								className="object-contain"
							/>
						</div>
						<div>
							<h2 className="font-['Barlow_Condensed'] text-[15px] text-[#0a2342] uppercase tracking-wide leading-tight">
								Manutenção Clínica
							</h2>
							<p className="text-[10px] text-[#00b4d8] font-bold tracking-widest uppercase">
								FSNH
							</p>
						</div>
					</div>

					{/* Container do QR Code gerado via script */}
					<div
						id="qrcode"
						className="w-50 h-50 flex items-center justify-center my-1"
					></div>

					<div className="font-['Barlow_Condensed'] text-[18px] font-bold text-[#1a4a8a] uppercase tracking-wider text-center">
						📱 Abrir Chamado
					</div>
					<div className="text-[10px] text-slate-400 text-center tracking-wide">
						<a href="http://manutencaoclinica.vercel.app">
							manutencaoclinica.vercel.app
						</a>
					</div>
					<div className="text-[12px] text-slate-600 text-center leading-snug bg-slate-50 rounded-lg p-2.5 border-l-[3px] border-[#00b4d8]">
						Aponte a câmera do celular para o QR Code e abra o link para
						registrar um chamado de manutenção.
					</div>
				</div>

				<button
					onClick={handlePrint}
					className="print:hidden bg-linear-to-r from-[#1a4a8a] to-[#2d72d2] text-white border-none rounded-xl px-8 py-3 font-['Barlow_Condensed'] text-[16px] font-bold tracking-wider uppercase cursor-pointer shadow-md hover:opacity-95 transition-opacity"
				>
					🖨️ Imprimir QR Code
				</button>
			</div>
		</>
	);
}
