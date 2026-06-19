import type { Paciente } from "../prisma/generated/prisma/client";
import { pacienteRepository, type PacienteRepository } from "../repositories/PacienteRepository";

type PacienteDados = Omit<Paciente, "id">;

function prepararDadosPaciente(dados: Record<string, unknown>): PacienteDados {
    const opcional = (valor: unknown) => (valor === "" || valor === undefined ? null : valor as string);

    return {
        nome: dados.nome as string,
        sexo: dados.sexo as string,
        data_nascimento: new Date(dados.data_nascimento as string),
        cpf: dados.cpf as string,
        rg: opcional(dados.rg),
        estado_civil: opcional(dados.estado_civil),
        telefone: dados.telefone as string,
        email: dados.email as string,
        naturalidade: opcional(dados.naturalidade),
        contato_emergencia: opcional(dados.contato_emergencia),
        alergias: opcional(dados.alergias),
        cuidados_especiais: opcional(dados.cuidados_especiais),
        convenio: opcional(dados.convenio),
        numero_convenio: opcional(dados.numero_convenio),
        validade_convenio: dados.validade_convenio ? new Date(dados.validade_convenio as string) : null,
        cep: opcional(dados.cep),
        cidade: opcional(dados.cidade),
        estado: opcional(dados.estado),
        rua: opcional(dados.rua),
        numero: opcional(dados.numero),
        complemento: opcional(dados.complemento),
        bairro: opcional(dados.bairro),
        referencia: opcional(dados.referencia),
        responsavel: opcional(dados.responsavel),
    };
}

export class PacienteService {
    constructor(private readonly repository: PacienteRepository) {
    }

    async listarTodosPacientes(pagina?: number, limite?: number) {
        return await this.repository.listarTodosPacientes(pagina, limite);
    }

    async criarPaciente(dadosPaciente: Record<string, unknown>) {
        const dados = prepararDadosPaciente(dadosPaciente);
        return await this.repository.criarPaciente(dados);
    }

    async buscarPacienteId(idPaciente: number) {
        return await this.repository.buscarPacienteId(idPaciente);
    }

    async atualizarPaciente(idPaciente: number, dadosParaAtualizar: Record<string, unknown>) {
        const dados = prepararDadosPaciente(dadosParaAtualizar);
        return await this.repository.atualizarPaciente(idPaciente, dados);
    }

    async deletarPaciente(idPaciente: number) {
        return await this.repository.deletarPaciente(idPaciente);
    }
}

export const pacienteService = new PacienteService(pacienteRepository);
