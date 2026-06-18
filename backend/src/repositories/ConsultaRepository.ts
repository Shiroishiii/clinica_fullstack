import type { Consulta, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class ConsultaRepository {

    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async listarTodasConsultas(pagina?: number, limite?: number) {
       const existePaginacao = pagina! && limite!
        if (!existePaginacao) return await prisma.consulta.findMany()
        const consultas = await prisma.consulta.findMany({
            skip: (pagina - 1) * limite,
            take: limite
        })

        const total = await prisma.consulta.count();
        const totalPaginas = Math.ceil(total / limite)
        return {
            consultas,
            total,
            totalPaginas
        }
    }

    async buscarConsultaId(idConsulta: number) {
        return await prisma.consulta.findUnique({
            where: { id: idConsulta }
        });
    }

    async criarConsulta(dadosConsulta: Omit<Consulta, "id">) {
        return await this.prisma.consulta.create({
            data: {
                motivo: dadosConsulta.motivo,
                data_consulta: dadosConsulta.data_consulta,
                observacoes: dadosConsulta.observacoes,
                medico_responsavel_id: dadosConsulta.medico_responsavel_id,
                paciente_id: dadosConsulta.paciente_id
            }
        });
    }

    async atualizarConsulta(idConsulta: number, dadosParaAtualizar: Omit<Consulta, "id">) {
        return await prisma.consulta.update({
            where: { id: idConsulta },
            data: { ...dadosParaAtualizar }
        });
    }

    async deletarConsulta(idConsulta: number) {
        return await prisma.consulta.delete({
            where: { id: idConsulta }
        });
    }
}

export const consultaRepository = new ConsultaRepository(prisma);