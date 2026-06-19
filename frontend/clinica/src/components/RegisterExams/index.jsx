import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import Modal from '../Modal'
import apiClient from '../../api/api'

const RegisterExams = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [patients, setPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [formData, setFormData] = useState({
        tipo_exame: "",
        valor: "",
        descricao: "",
        resultado: "",
        data: "",
        hora: "",
    })

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await apiClient.get("/paciente")
                setPatients(response.data)
            } catch (error) {
                console.error("Erro ao obter dados dos pacientes", error)
            }
        }
        fetchPatients()
    }, [])

    const handleSearchChange = (e) => setSearchTerm(e.target.value)

    const filteredPatients = patients.filter(
        (patient) =>
            patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.id.toString().includes(searchTerm)
    )

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedPatient(null)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setFormData({
            tipo_exame: "",
            valor: "",
            descricao: "",
            resultado: "",
            data: "",
            hora: "",
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!selectedPatient) return

        try {
            setIsSaving(true)

            await apiClient.post("/exames", {
                tipo_exame: formData.tipo_exame,
                valor: Number(formData.valor),
                descricao: formData.descricao,
                resultado: formData.resultado,
                data: formData.data,
                hora: formData.hora,
                pacienteId: selectedPatient.id,
            })

            toast.success("Exame cadastrado com sucesso!", {
                autoClose: 2000,
                hideProgressBar: true
            })

            resetForm()
            handleCloseModal()
        } catch (error) {
            console.error("Erro ao cadastrar exame!", error)
            toast.error("Erro ao cadastrar exame!", {
                autoClose: 2000,
                hideProgressBar: true
            })
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <section className='p-6 text-gray-800'>
            <div className='mb-6'>
                <label className='block text-sm font-semibold mb-2'>
                    Buscar paciente para cadastrar o exame
                </label>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder='Digite o nome ou o registro do paciente'
                    className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none'
                />
            </div>

            <ul className='space-y-3'>
                {filteredPatients.map((patient) => (
                    <li
                        key={patient.id}
                        className='p-4 border rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-50 transition'
                    >
                        <div>
                            <p className='text-sm'><strong>Registro:</strong> {patient.id}</p>
                            <p className='text-sm'><strong>Nome:</strong> {patient.nome}</p>
                            <p className='text-sm'><strong>Convênio:</strong> {patient.convenio || "-"}</p>
                        </div>

                        <button
                            onClick={() => handleSelectPatient(patient)}
                            className='bg-cyan-700 text-white px-3 py-2 rounded-lg hover:bg-cyan-600 cursor-pointer'
                        >
                            Selecionar
                        </button>
                    </li>
                ))}
            </ul>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {selectedPatient && (
                    <>
                        <h2 className='text-lg font-bold mb-4 text-cyan-700'>
                            Cadastrar exame para {selectedPatient.nome}
                        </h2>

                        <div className='mb-4 text-sm text-gray-700'>
                            <p><strong>Email:</strong> {selectedPatient.email}</p>
                            <p><strong>Telefone:</strong> {selectedPatient.telefone}</p>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor='data' className='block text-sm font-medium mb-1'>Data</label>
                                    <input
                                        type='date'
                                        name='data'
                                        id='data'
                                        value={formData.data}
                                        onChange={handleInputChange}
                                        required
                                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none'
                                    />
                                </div>
                                <div>
                                    <label htmlFor='hora' className='block text-sm font-medium mb-1'>Horário</label>
                                    <input
                                        type='time'
                                        name='hora'
                                        id='hora'
                                        value={formData.hora}
                                        onChange={handleInputChange}
                                        required
                                        className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none'
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor='tipo_exame' className='block text-sm font-medium mb-1'>
                                    Tipo do exame
                                </label>
                                <input
                                    type='text'
                                    name='tipo_exame'
                                    id='tipo_exame'
                                    value={formData.tipo_exame}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none'
                                />
                            </div>

                            <div>
                                <label htmlFor='valor' className='block text-sm font-medium mb-1'>Valor (R$)</label>
                                <input
                                    type='number'
                                    name='valor'
                                    id='valor'
                                    min="0"
                                    step="0.01"
                                    value={formData.valor}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none'
                                />
                            </div>

                            <div>
                                <label htmlFor='descricao' className='block text-sm font-medium mb-1'>
                                    Descrição / Laboratório
                                </label>
                                <textarea
                                    name='descricao'
                                    id='descricao'
                                    value={formData.descricao}
                                    rows={3}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none resize-none'
                                />
                            </div>

                            <div>
                                <label htmlFor='resultado' className='block text-sm font-medium mb-1'>Resultado</label>
                                <textarea
                                    name='resultado'
                                    id='resultado'
                                    value={formData.resultado}
                                    rows={3}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none resize-none'
                                />
                            </div>

                            <div className='flex justify-end gap-3 pt-4'>
                                <button
                                    type='button'
                                    onClick={handleCloseModal}
                                    className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition'
                                >
                                    Fechar
                                </button>
                                <button
                                    type='submit'
                                    disabled={isSaving}
                                    className='px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 transition'
                                >
                                    {isSaving ? "Salvando..." : "Salvar"}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </Modal>
        </section>
    )
}

export default RegisterExams
