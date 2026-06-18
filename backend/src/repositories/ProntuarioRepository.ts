import type { Prontuario, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class ProntuarioRepository {

    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async listarTodosProntuarios(pagina?: number, limite?: number) {
        const existePaginacao = pagina! && limite!
        if (!existePaginacao) return await prisma.prontuario.findMany()
        const prontuario = await prisma.prontuario.findMany({
            skip: (pagina - 1) * limite,
            take: limite
        })

        const total = await prisma.prontuario.count();
        const totalPaginas = Math.ceil(total / limite)
        return {
            prontuario,
            total,
            totalPaginas
        }
    }

    async buscarProntuarioId(idProntuario: number) {
        return await prisma.prontuario.findUnique({
            where: { id: idProntuario }
        });
    }

    async criarProntuario(dadosProntuario: Omit<Prontuario, "id">) {
        return await this.prisma.prontuario.create({
            data: {
                descricao: dadosProntuario.descricao,
                data: dadosProntuario.data,
                medico_responsavel_id: dadosProntuario.medico_responsavel_id,
                paciente_id: dadosProntuario.paciente_id
            }
        });
    }

    async atualizarProntuario(idProntuario: number, dadosParaAtualizar: Omit<Prontuario, "id">) {
        return await prisma.prontuario.update({
            where: { id: idProntuario },
            data: { ...dadosParaAtualizar }
        });
    }

    async deletarProntuario(idProntuario: number) {
        return await prisma.prontuario.delete({
            where: { id: idProntuario }
        });
    }
}

export const prontuarioRepository = new ProntuarioRepository(prisma);