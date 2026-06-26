import { useState, useEffect } from 'react'

import { useParams } from 'react-router'
import apiClient from '../../api/api'


const ExamsList = () => {
    const [page, setPage] = useState(1)
    const [exams, setExams] = useState()
    const [total, setTotal] = useState()
    const [totalPagina, setTotalPagina] = useState()
    const limite = 10
    useEffect(() => {
        const fethExames = async () => {
            try {
                const response = await apiClient.get(`/exames?pagina=${page}&limite=${limite}`)
                if (response.data) {
                    setExams(response.data.exames)
                    setTotal(response.data.total)
                    setTotalPagina(response.data.totalPaginas)
                }
            } catch (error) {
                console.error("Erro ao listar exames", error)
            }
        }
        fethExames()
    }, [page])

    return (
        <>
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-cyan-700">
                        Lista de Exames
                    </h2>
                </div>

                {exams?.length ? (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-cyan-700 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left">ID</th>
                                        <th className="px-4 py-3 text-left">Nome</th>
                                        <th className="px-4 py-3 text-left">Tipo</th>
                                        <th className="px-4 py-3 text-left">Descrição</th>
                                        <th className="px-4 py-3 text-left">Data</th>
                                        <th className="px-4 py-3 text-left">Valor</th>
                                        <th className="px-4 py-3 text-left">Resultado</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {exams.map((exame) => (
                                        <tr
                                            key={exame.id}
                                            className="border-b hover:bg-cyan-50 transition"
                                        >
                                            <td className="px-4 py-3">{exame.id}</td>

                                            <td className="px-4 py-3 font-medium">
                                                {exame.nome_exame}
                                            </td>

                                            <td className="px-4 py-3">
                                                {exame.tipo_exame}
                                            </td>

                                            <td className="px-4 py-3">
                                                {exame.descricao}
                                            </td>

                                            <td className="px-4 py-3">
                                                {new Date(
                                                    exame.data_exame
                                                ).toLocaleDateString("pt-BR")}
                                            </td>

                                            <td className="px-4 py-3">
                                                {Number(exame.valor).toLocaleString(
                                                    "pt-BR",
                                                    {
                                                        style: "currency",
                                                        currency: "BRL",
                                                    }
                                                )}
                                            </td>

                                            <td className="px-4 py-3">
                                                <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm">
                                                    {exame.resultado}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                            <span className="text-gray-600 text-sm">
                                Exibindo{" "}
                                <strong>
                                    {Math.min(page * limite, total)}
                                </strong>{" "}
                                de <strong>{total}</strong> exames
                            </span>

                            <div className="flex gap-2">
                                {Array.from({ length: totalPagina }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        className={`px-4 py-2 rounded-lg transition font-medium ${page === i + 1
                                                ? "bg-cyan-700 text-white"
                                                : "bg-gray-200 hover:bg-cyan-100"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-lg">Nenhum exame cadastrado.</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default ExamsList