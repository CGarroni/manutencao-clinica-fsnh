"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logoFsnh from "@/assets/logo-fsnh.png";
import Link from "next/link";
import { listarContratos, salvarContrato, atualizarContrato } from "@/lib/firebase";

interface Contrato {
  id: string;
  numero: string;
  fornecedor: string;
  objeto: string;
  dataInicio: string;
  dataFim: string;
  valorMensal: number;
  status: "Vigente" | "Vencendo" | "Vencido" | "Encerrado";
}

export default function ContratosPage() {
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  // Estados do Modal de Cadastro/Edição
  const [modalAberto, setModalAberto] = useState(false);
  const [contratoEmEdicao, setContratoEmEdicao] = useState<Contrato | null>(null);

  // Estados do Modal de Visualização de Detalhes
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [contratoSelecionado, setContratoSelecionado] = useState<Contrato | null>(null);

  // Campos do Formulário
  const [numero, setNumero] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [objeto, setObjeto] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [valorMensal, setValorMensal] = useState<string | number>("");
  const [statusManual, setStatusManual] = useState<"Vigente" | "Vencendo" | "Vencido" | "Encerrado">("Vigente");

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setLoading(true);
    try {
      const dados = await listarContratos();
      setContratos(dados || []);
    } catch (error) {
      console.error("Erro ao carregar contratos:", error);
    } finally {
      setLoading(false);
    }
  }

  const abrirModalNovo = () => {
    setContratoEmEdicao(null);
    setNumero(`CT-0${contratos.length + 1}/2026`);
    setFornecedor("");
    setObjeto("");
    setDataInicio("");
    setDataFim("");
    setValorMensal("");
    setStatusManual("Vigente");
    setModalAberto(true);
  };

  const abrirModalEditar = (c: Contrato, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setContratoEmEdicao(c);
    setNumero(c.numero);
    setFornecedor(c.fornecedor);
    setObjeto(c.objeto);
    setDataInicio(c.dataInicio);
    setDataFim(c.dataFim);
    setValorMensal(c.valorMensal);
    setStatusManual(c.status);
    setModalAberto(true);
  };

  const abrirDetalhes = (c: Contrato) => {
    setContratoSelecionado(c);
    setModalDetalhesAberto(true);
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();

    // Se o usuário não marcou manualmente como Encerrado, calculamos o status com base na data fim
    let statusFinal = statusManual;
    if (statusFinal !== "Encerrado") {
      const hoje = new Date();
      const fim = new Date(dataFim);
      const diffDias = Math.ceil((fim.getTime() - hoje.getTime()) / (1000 * 3600 * 24));

      if (diffDias < 0) statusFinal = "Vencido";
      else if (diffDias <= 30) statusFinal = "Vencendo";
      else statusFinal = "Vigente";
    }

    const dadosContrato = {
      numero,
      fornecedor,
      objeto,
      dataInicio,
      dataFim,
      valorMensal: Number(valorMensal) || 0,
      status: statusFinal,
    };

    try {
      if (contratoEmEdicao) {
        await atualizarContrato(contratoEmEdicao.id, dadosContrato);
      } else {
        await salvarContrato(dadosContrato);
      }
      setModalAberto(false);
      carregarDados();
    } catch (error) {
      console.error("Erro ao salvar contrato:", error);
      alert("Erro ao salvar contrato. Tente novamente.");
    }
  };

  const contratosFiltrados = contratos.filter(
    (c) =>
      c.fornecedor?.toLowerCase().includes(busca.toLowerCase()) ||
      c.numero?.toLowerCase().includes(busca.toLowerCase()) ||
      c.objeto?.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Cabeçalho */}
      <header className="bg-[#0a192f] z-10 text-white py-3 px-6 flex justify-between items-center shadow-md print:hidden">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-full shadow">
            <Image src={logoFsnh} alt="Logo FSNH" width={35} height={35} className="object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-wide text-white">MANUTENÇÃO CLÍNICA</h1>
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
            <h1 className="text-2xl font-bold text-blue-300">Gestão de Contratos</h1>
            <p className="text-sm text-gray-500">
              Controle de vigências, fornecedores e valores de prestação de serviços
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
            <h3 className="text-2xl font-bold text-gray-800">{contratos.length}</h3>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <span className="text-sm text-gray-500">Contratos Vigentes</span>
            <h3 className="text-2xl font-bold text-green-600">
              {contratos.filter((c) => c.status === "Vigente").length}
            </h3>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <span className="text-sm text-gray-500">Próximos ao Vencimento / Vencidos</span>
            <h3 className="text-2xl font-bold text-amber-600">
              {contratos.filter((c) => c.status === "Vencendo" || c.status === "Vencido").length}
            </h3>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <input
              type="text"
              placeholder="Pesquisar por fornecedor, número do contrato..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-gray-400">Carregando contratos...</div>
            ) : (
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
                        onClick={() => abrirDetalhes(contrato)}
                        className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                        title="Clique para ver detalhes"
                      >
                        <td className="p-4 font-semibold text-blue-600 hover:underline">
                          {contrato.numero}
                        </td>
                        <td className="p-4 font-medium text-gray-900">{contrato.fornecedor}</td>
                        <td className="p-4 text-gray-500 max-w-xs truncate">{contrato.objeto}</td>
                        <td className="p-4">
                          {contrato.dataFim ? new Date(contrato.dataFim).toLocaleDateString("pt-BR") : "N/A"}
                        </td>
                        <td className="p-4 font-semibold text-gray-900">
                          {Number(contrato.valorMensal || 0).toLocaleString("pt-BR", {
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
                                : contrato.status === "Vencido"
                                ? "bg-red-100 text-red-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {contrato.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => abrirModalEditar(contrato, e)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-xs cursor-pointer"
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
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE DETALHES */}
      {modalDetalhesAberto && contratoSelecionado && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-base">Detalhes do Contrato</h3>
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
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Nº do Contrato</span>
                  <span className="font-bold text-gray-900">{contratoSelecionado.numero}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Status</span>
                  <span className="font-bold text-blue-600">{contratoSelecionado.status}</span>
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-gray-400 uppercase">Fornecedor / Empresa</span>
                <p className="font-medium text-gray-900 text-base">{contratoSelecionado.fornecedor}</p>
              </div>

              <div>
                <span className="block text-xs font-semibold text-gray-400 uppercase">Objeto / Serviço Contratado</span>
                <p className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-gray-600 leading-relaxed">
                  {contratoSelecionado.objeto}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 rounded-lg">
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Início</span>
                  <span>{contratoSelecionado.dataInicio ? new Date(contratoSelecionado.dataInicio).toLocaleDateString("pt-BR") : "N/A"}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Fim</span>
                  <span>{contratoSelecionado.dataFim ? new Date(contratoSelecionado.dataFim).toLocaleDateString("pt-BR") : "N/A"}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-400 uppercase">Valor Mensal</span>
                  <span className="font-semibold text-gray-900">
                    {Number(contratoSelecionado.valorMensal || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
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
                {contratoEmEdicao ? "Editar Contrato" : "Cadastrar Novo Contrato"}
              </h3>
              <button onClick={() => setModalAberto(false)} className="text-gray-400 hover:text-gray-600 font-bold cursor-pointer">
                ✕
              </button>
            </div>
            <form onSubmit={handleSalvar} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Nº do Contrato</label>
                  <input
                    type="text"
                    required
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Valor Mensal (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    required
                    value={valorMensal}
                    onChange={(e) => setValorMensal(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Fornecedor / Empresa</label>
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
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Objeto do Contrato</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Descrição dos serviços ou equipamentos cobertos"
                  value={objeto}
                  onChange={(e) => setObjeto(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Início da Vigência</label>
                  <input
                    type="date"
                    required
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Fim da Vigência</label>
                  <input
                    type="date"
                    required
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Status do Contrato</label>
                <select
                  value={statusManual}
                  onChange={(e) => setStatusManual(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                >
                  <option value="Vigente">Vigente (Automático por Data)</option>
                  <option value="Vencendo">Vencendo (Automático por Data)</option>
                  <option value="Vencido">Vencido (Automático por Data)</option>
                  <option value="Encerrado">Encerrado (Não Renovado / Fechado)</option>
                </select>
                <span className="text-[11px] text-gray-400 mt-1 block">
                  Escolha "Encerrado" caso o contrato não tenha sido renovado ao fim da vigência.
                </span>
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
                  Salvar Contrato
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rodapé */}
      <footer className="text-center py-4 text-[11px] text-slate-500 border-t border-slate-200 mt-auto">
        Hospital Municipal de Novo Hamburgo — Setor de Manutenção e Engenharia Clínica © {new Date().getFullYear()}
      </footer>
    </div>
  );
}