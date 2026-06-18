import type { Paciente } from "../prisma/generated/prisma/client";
import { pacienteRepository, type PacienteRepository } from "../repositories/PacienteRepository";

export class PacienteService {
    constructor(private readonly repository: PacienteRepository) {
    }

    async listarTodosPacientes(pagina?: number, limite?: number) {
        const pacientes = await this.repository.listarTodosPacientes(pagina, limite)
        return pacientes
    }

    async criarPaciente(dadosPaciente: Omit<Paciente, "id">) {
        const pacienteCriado = await this.repository.criarPaciente({
            nome: dadosPaciente.nome,
            cpf: dadosPaciente.cpf,
            telefone: dadosPaciente.telefone,
            email: dadosPaciente.email,
            data_nascimento: dadosPaciente.data_nascimento,
            sexo: dadosPaciente.sexo,
            responsavel: dadosPaciente.responsavel,
        })
        return pacienteCriado
    }

    async buscarPacienteId(idPaciente: number) {
        const paciente = await this.repository.buscarPacienteId(idPaciente);
        return paciente;
    }

    async atualizarPaciente(idPaciente: number, dadosParaAtualizar: Omit<Paciente, "id">) {
        const pacienteAtualizado = await this.repository.atualizarPaciente(idPaciente, dadosParaAtualizar)
        return pacienteAtualizado;
    }


    async deletarPaciente(idPaciente: number) {
        const paciente = await this.repository.deletarPaciente(idPaciente);
        return paciente;
    }
}

export const pacienteService = new PacienteService(pacienteRepository)