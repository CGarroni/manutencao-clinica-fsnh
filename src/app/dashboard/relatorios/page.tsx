"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { observarEstadoAuth } from "@/services/authService";
import { listarChamados } from "@/lib/firebase";
import Image from "next/image";
import logoFsnh from "@/assets/logo-fsnh.png";
import Link from "next/link";

const getStatusBadgeStyle = (status: string) => {
  const statusLower = String(status || "aberto")
    .trim()
    .toLowerCase();

  switch (statusLower) {
    case "aberto":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "pendente":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "emprestimo":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "finalizado":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "descarte":
      return "bg-rose-50 text-rose-700 border-rose-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function RelatoriosPage() {
  const router = useRouter();
  const [chamados, setChamados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [relatorioGerado, setRelatorioGerado] = useState(false);

  // Estados dos Filtros (incluindo o status do dashboard)
  const [filtros, setFiltros] = useState({
    tipoPeriodo: "mensal", // diario, semanal, mensal, anual, personalizado
    dataInicio: "",
    dataFim: "",
    status: "todos", // todos, aberto, pendente, emprestimo, finalizado, descarte
    unidade: "todas",
    tecnico: "todos",
    patrimonio: "todos", // Base legítima para reincidência
  });

  useEffect(() => {
    const unsubscribe = observarEstadoAuth((user) => {
      if (!user) {
        router.push("/");
      }
    });

    carregarDadosRelatorio();

    return () => unsubscribe();
  }, [router]);

  async function carregarDadosRelatorio() {
    setLoading(true);
    try {
      const dados = await listarChamados();
      setChamados(dados || []);
    } catch (error) {
      console.error("Erro ao carregar dados para o relatório:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleGerarRelatorio = (e: React.FormEvent) => {
    e.preventDefault();
    setRelatorioGerado(true);
  };

  const handleImprimir = () => {
    window.print();
  };

  // Extração dinâmica de opções únicas para os selects com base nas OS reais
  const unidadesUnicas = Array.from(
    new Set(chamados.map((c) => c.setor || c.unidade).filter(Boolean)),
  );
  const tecnicosUnicos = Array.from(
    new Set(chamados.map((c) => c.tecnico).filter(Boolean)),
  );
  const equipamentosUnicos = Array.from(
    new Map(
      chamados
        .filter((c) => c.patrimonio || c.serie)
        .map((c) => [
          c.patrimonio || c.serie,
          `${c.equipamento} (Pat: ${c.patrimonio || c.serie})`,
        ]),
    ).entries(),
  );

  // Lógica de Filtragem Avançada
  const chamadosFiltrados = chamados.filter((item) => {
    // Filtro por Status do Dashboard (Converte ambos para minúsculo para comparar perfeitamente)
    if (filtros.status !== "todos") {
      const statusItem = String(item.status || "aberto")
        .trim()
        .toLowerCase();
      const statusFiltro = String(filtros.status).trim().toLowerCase();
      if (statusItem !== statusFiltro) return false;
    }

    // Filtro por Unidade / Setor
    const unidadeItem = item.setor || item.unidade;
    if (filtros.unidade !== "todas" && unidadeItem !== filtros.unidade)
      return false;

    // Filtro por Técnico
    if (filtros.tecnico !== "todos" && item.tecnico !== filtros.tecnico)
      return false;

    // Filtro por Patrimônio / Série (Reincidência)
    const patItem = item.patrimonio || item.serie || "";
    if (filtros.patrimonio !== "todos" && patItem !== filtros.patrimonio)
      return false;

    // Filtros Temporais
    if (
      filtros.tipoPeriodo !== "todos" &&
      filtros.tipoPeriodo !== "personalizado"
    ) {
      const dataStr = item.dataCriacao || item.dataHora || item.data;
      let dataItem: Date;

      if (typeof dataStr === "string" && dataStr.includes("/")) {
        const [dataPart, horaPart = "00:00:00"] = dataStr.split(" ");
        const [dia, mes, ano] = dataPart.split("/");
        dataItem = new Date(`${ano}-${mes}-${dia}T${horaPart}`);
      } else {
        dataItem = new Date(dataStr || Date.now());
      }

      const hoje = new Date();

      if (filtros.tipoPeriodo === "diario") {
        if (dataItem.toDateString() !== hoje.toDateString()) return false;
      } else if (filtros.tipoPeriodo === "mensal") {
        if (
          dataItem.getMonth() !== hoje.getMonth() ||
          dataItem.getFullYear() !== hoje.getFullYear()
        )
          return false;
      } else if (filtros.tipoPeriodo === "anual") {
        if (dataItem.getFullYear() !== hoje.getFullYear()) return false;
      }
    }

    if (
      filtros.tipoPeriodo === "personalizado" &&
      filtros.dataInicio &&
      filtros.dataFim
    ) {
      const dataItem = new Date(item.dataCriacao || item.dataHora || item.data);
      const inicio = new Date(filtros.dataInicio);
      const fim = new Date(filtros.dataFim);
      fim.setHours(23, 59, 59);
      if (dataItem < inicio || dataItem > fim) return false;
    }

    return true;
  });

  // Indicadores calculados dinamicamente
  const totalOS = chamadosFiltrados.length;
  const totalFinalizadas = chamadosFiltrados.filter(
    (i) => i.status === "finalizado",
  ).length;

  const contagemPatrimonios = chamadosFiltrados.reduce(
    (acc, curr) => {
      const ident = curr.patrimonio || curr.serie;
      if (ident) {
        acc[ident] = (acc[ident] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const alertasReincidencia = Object.values(contagemPatrimonios).filter(
    (qtd: any) => qtd > 1,
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <p className="text-slate-400 text-sm">
          Carregando dados do relatório...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen ">
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

      {/* Conteúdo Principal */}
      <div className="p-6 space-y-6 grow max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-300">
              Relatórios e Indicadores de Manutenção
            </h1>
            <p className="text-sm text-gray-500">
              Geração de métricas e histórico detalhado de ordens de serviço
            </p>
          </div>
        </div>

        {/* Formulário de Configuração de Filtros */}
        <form
          onSubmit={handleGerarRelatorio}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-4 print:hidden"
        >
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Configurar Relatório e Filtros
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Período */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Período
              </label>
              <select
                name="tipoPeriodo"
                value={filtros.tipoPeriodo}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="todos">Todos os Períodos</option>
                <option value="diario">Diário (Hoje)</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal (Atual)</option>
                <option value="anual">Anual</option>
                <option value="personalizado">Personalizado</option>
              </select>
            </div>

            {/* Status (Idêntico ao Dashboard) */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Status da OS
              </label>
              <select
                name="status"
                value={filtros.status}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="todos">Todos os Status</option>
                <option value="aberto">Em Aberto</option>
                <option value="pendente">Pendente</option>
                <option value="emprestimo">Empréstimo</option>
                <option value="finalizado">Finalizados</option>
                <option value="descarte">Descarte</option>
              </select>
            </div>

            {/* Unidade / Setor */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Unidade / Setor
              </label>
              <select
                name="unidade"
                value={filtros.unidade}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="todas">Todas as Unidades</option>
                {unidadesUnicas.map((u: any, idx) => (
                  <option key={idx} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            {/* Técnico */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Técnico Responsável
              </label>
              <select
                name="tecnico"
                value={filtros.tecnico}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="todos">Todos os Técnicos</option>
                {tecnicosUnicos.map((t: any, idx) => (
                  <option key={idx} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Equipamento por Patrimônio (Reincidência) */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Equipamento (Por Nº Patrimônio)
              </label>
              <select
                name="patrimonio"
                value={filtros.patrimonio}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="todos">Todos os Patrimônios</option>
                {equipamentosUnicos.map(([pat, label]: any, idx) => (
                  <option key={idx} value={pat}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Se período for personalizado */}
            {filtros.tipoPeriodo === "personalizado" ? (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Início
                  </label>
                  <input
                    type="date"
                    name="dataInicio"
                    value={filtros.dataInicio}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Fim
                  </label>
                  <input
                    type="date"
                    name="dataFim"
                    value={filtros.dataFim}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>🔍 Gerar e Visualizar Relatório</span>
                </button>
              </div>
            )}
          </div>

          {filtros.tipoPeriodo === "personalizado" && (
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm shadow transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>🔍 Gerar e Visualizar Relatório</span>
              </button>
            </div>
          )}
        </form>

        {/* ÁREA DE EXIBIÇÃO DO RELATÓRIO */}
        {relatorioGerado ? (
          <div className="space-y-6 animate-fadeIn">
            {/* Barra de Ações Internas (Imprimir / Fechar Visualização) */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex justify-between items-center print:hidden">
              <div>
                <p className="text-xs font-bold text-emerald-900">
                  Relatório Gerado com Sucesso (Pré-visualização Interna)
                </p>
                <p className="text-[11px] text-emerald-700">
                  Verifique os dados abaixo antes de realizar a impressão física
                  ou salvar em PDF.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleImprimir}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow transition cursor-pointer flex items-center gap-1.5"
                >
                  🖨️ Imprimir / Gerar PDF
                </button>
                <button
                  onClick={() => setRelatorioGerado(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer"
                >
                  Alterar Filtros
                </button>
              </div>
            </div>

            {/* Cartões de Indicadores */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs font-medium text-gray-500 uppercase">
                  Total de Ordens de Serviço
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{totalOS}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs font-medium text-gray-500 uppercase">
                  OS Finalizadas
                </p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {totalFinalizadas}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs font-medium text-gray-500 uppercase">
                  Alertas de Reincidência (Por Patrimônio)
                </p>
                <p className="text-2xl font-bold text-amber-600 mt-1">
                  {alertasReincidencia}
                </p>
              </div>
            </div>

            {/* Tabela de Resultados */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">
                  Registros do Relatório
                </h2>
                <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                  {chamadosFiltrados.length} registros encontrados
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                      <th className="py-3 px-4">Nº OS</th>
                      <th className="py-3 px-4">Data</th>
                      <th className="py-3 px-4">Equipamento / Patrimônio</th>
                      <th className="py-3 px-4">Setor</th>
                      <th className="py-3 px-4">Técnico</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    {chamadosFiltrados.length > 0 ? (
                      chamadosFiltrados.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono font-medium">
                            {item.numero || "N/A"}
                          </td>
                          <td className="py-3 px-4">
                            {item.dataHora || item.data || "N/A"}
                          </td>
                          <td className="py-3 px-4">
                            {item.equipamento || "N/A"} <br />
                            <span className="text-xs text-gray-400 font-mono">
                              Pat: {item.patrimonio || item.serie || "S/N"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {item.setor || item.unidade || "N/A"}
                          </td>
                          <td className="py-3 px-4">
                            {item.tecnico || "Não atribuído"}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-1 text-xs rounded-full font-semibold border uppercase ${getStatusBadgeStyle(item.status)}`}
                            >
                              {item.status || "aberto"}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-8 text-gray-400"
                        >
                          Nenhuma ordem de serviço encontrada para os filtros
                          selecionados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center space-y-3">
            <p className="text-gray-500 font-medium text-sm">
              Configure os filtros acima e clique em{" "}
              <strong className="text-blue-600">
                "Gerar e Visualizar Relatório"
              </strong>{" "}
              para inspecionar os dados internamente.
            </p>
          </div>
        )}
      </div>

      {/* Rodapé */}
      <footer className="text-center py-4 text-[11px] text-slate-500 border-t border-slate-200 mt-auto">
        Hospital Municipal de Novo Hamburgo — Setor de Manutenção e Engenharia
        Clínica © {new Date().getFullYear()}
      </footer>
    </div>
  );
}