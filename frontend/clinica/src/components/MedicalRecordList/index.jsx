import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import apiClient from "../../api/api";
import Modal from "../Modal";
import { useAuth } from "../../contexts/AuthContext";

const MedicalRecordList = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [prontuarios, setProntuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    descricao: "",
    data: "",
  });

  const fetchData = async () => {
    try {
      const [patientsRes, prontuariosRes] = await Promise.all([
        apiClient.get("/paciente"),
        apiClient.get("/prontuario"),
      ]);
      setPatients(patientsRes.data);
      setProntuarios(prontuariosRes.data);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = patients.filter((patient) => {
    return (
      patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toString().includes(searchTerm)
    );
  });

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
    setFormData({ descricao: "", data: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient || !user?.id) return;

    try {
      setIsSaving(true);

      await apiClient.post("/prontuario", {
        descricao: formData.descricao,
        data: formData.data || null,
        paciente_id: selectedPatient.id,
        medico_responsavel_id: user.id,
      });

      toast.success("Prontuário cadastrado com sucesso!", {
        autoClose: 2000,
        hideProgressBar: true,
      });

      handleCloseModal();
      fetchData();
    } catch (error) {
      console.error("Erro ao cadastrar prontuário:", error);
      toast.error("Erro ao cadastrar prontuário!", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("pt-BR");
  };

  return (
    <section className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Listagem de Prontuários
      </h2>

      {prontuarios.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Prontuários registrados
          </h3>
          <ul className="space-y-3">
            {prontuarios.map((prontuario) => (
              <li
                key={prontuario.id}
                className="p-4 bg-white rounded-lg shadow-sm border"
              >
                <p className="text-sm text-gray-500">
                  <strong>Registro:</strong> {prontuario.id}
                </p>
                <p className="text-gray-700">
                  <strong>Paciente:</strong> {prontuario.paciente?.nome || "-"}
                </p>
                <p className="text-gray-700">
                  <strong>Data:</strong> {formatDate(prontuario.data)}
                </p>
                <p className="text-gray-700 mt-1">{prontuario.descricao}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Cadastrar novo prontuário
      </h3>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <label htmlFor="search" className="text-gray-700 font-medium">
          Buscar Paciente:
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Digite o nome ou identificador"
          className="w-full sm:w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
        />
      </div>

      <ul className="space-y-4">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <li
              key={patient.id}
              className="p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-500">
                  <strong className="text-gray-700">Registro:</strong> {patient.id}
                </p>
                <p className="text-gray-700">
                  <strong>Nome:</strong> {patient.nome}
                </p>
                <p className="text-gray-700">
                  <strong>Convênio:</strong> {patient.convenio || "-"}
                </p>
              </div>
              <button
                onClick={() => handleSelectPatient(patient)}
                className="bg-cyan-700 text-white px-3 py-2 rounded-lg hover:bg-cyan-600 cursor-pointer"
              >
                Adicionar prontuário
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-600">Nenhum paciente encontrado.</p>
        )}
      </ul>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedPatient && (
          <>
            <h2 className="text-lg font-bold mb-4 text-cyan-700">
              Novo prontuário para {selectedPatient.nome}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="data" className="block text-sm font-medium mb-1">
                  Data
                </label>
                <input
                  type="date"
                  name="data"
                  id="data"
                  value={formData.data}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none"
                />
              </div>

              <div>
                <label htmlFor="descricao" className="block text-sm font-medium mb-1">
                  Descrição
                </label>
                <textarea
                  name="descricao"
                  id="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 transition"
                >
                  {isSaving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </>
        )}
      </Modal>
    </section>
  );
};

export default MedicalRecordList;
