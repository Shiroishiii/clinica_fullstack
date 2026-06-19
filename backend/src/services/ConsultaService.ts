import type { Consulta } from "../prisma/generated/prisma/client";
import { consultaRepository, type ConsultaRepository } from "../repositories/ConsultaRepository";

type ConsultaDados = Omit<Consulta, "id">;

function prepararDadosConsulta(dados: Record<string, unknown>): ConsultaDados {
    let data_consulta: Date;

    if (dados.data && dados.hora) {
        data_consulta = new Date(`${dados.data}T${dados.hora}`);
    } else {
        data_consulta = new Date(dados.data_consulta as string);
    }

    return {
        motivo: dados.motivo as string,
        data_consulta,
        observacoes: dados.observacoes as string,
        medico_responsavel_id: Number(dados.medico_responsavel_id),
        paciente_id: Number(dados.paciente_id),
    };
}

export class ConsultaService {
    constructor(private readonly repository: ConsultaRepository) {}

    async listarTodasConsultas(pagina?: number, limite?: number) {
        return await this.repository.listarTodasConsultas(pagina, limite);
    }

    async criarConsulta(dadosConsulta: Record<string, unknown>) {
        const dados = prepararDadosConsulta(dadosConsulta);
        return await this.repository.criarConsulta(dados);
    }

    async buscarConsultaId(idConsulta: number) {
        return await this.repository.buscarConsultaId(idConsulta);
    }

    async atualizarConsulta(idConsulta: number, dadosParaAtualizar: Record<string, unknown>) {
        const dados = prepararDadosConsulta(dadosParaAtualizar);
        return await this.repository.atualizarConsulta(idConsulta, dados);
    }

    async deletarConsulta(idConsulta: number) {
        return await this.repository.deletarConsulta(idConsulta);
    }
}

export const consultaService = new ConsultaService(consultaRepository);
