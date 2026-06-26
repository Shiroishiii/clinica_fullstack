import { useState, useEffect } from 'react'

import apiClient from '../../api/api'


const ConsultsList = () => {
    const [page, setPage] = useState(1)
    const [consults, setConsults] = useState([])
    const [total, setTotal] = useState()
    const [totalPagina, setTotalPagina] = useState()
    const limite = 10
    useEffect(() => {
        const fetchConsults = async () => {
            try {
                const response = await apiClient.get(`/consulta?pagina=${page}&limite=${limite}`)
                console.log("Resposta da API:", response.data);
                if (response.data) {
                    setConsults(response.data.consultas)
                    setTotal(response.data.total)
                    setTotalPagina(response.data.totalPaginas)
                }
            } catch (error) {
                console.error("Erro ao listar consultas", error)
            }
        }
        fetchConsults()
    }, [page])

    return (
        <>
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-cyan-700">
                        Lista de Consultas
                    </h2>
                </div>

                {consults?.length ? (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-cyan-700 text-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left">ID</th>
                                        <th className="px-4 py-3 text-left">Motivo</th>
                                        <th className="px-4 py-3 text-left">Data consulta</th>
                                        <th className="px-4 py-3 text-left">observações</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {consults.map((consulta) => (
                                        <tr
                                            key={consulta.id}
                                            className="border-b hover:bg-cyan-50 transition"
                                        >
                                            <td className="px-4 py-3">{consulta.id}</td>

                                            <td className="px-4 py-3 font-medium">
                                                {consulta.motivo}
                                            </td>

                                            <td className="px-4 py-3">
                                                {new Date(
                                                    consulta.data_consulta
                                                ).toLocaleDateString("pt-BR")}
                                            </td>

                                            <td className="px-4 py-3">
                                                {consulta.observacoes}
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
                                de <strong>{total}</strong> consultas
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
                        <p className="text-lg">Nenhuma consulta cadastrada.</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default ConsultsList