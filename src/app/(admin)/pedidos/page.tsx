"use client";

import { useEffect, useState } from "react";
import { listarPedidos } from "@/actions/pedidos";
import { marcarComoPago } from "@/actions/pedidos-publicos";
import { PageTitle } from "@/components/PageTitle/PageTitle";

type Pedido = {
    id: number;
    nome: string;
    telefone: string;
    tipo_revista: string;
    status_pagamento: "pago" | "pendente";
    created_at: string;
    classe_id: number;
    classes?: {
        nome: string;
    };
};

export default function OrdersPage() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [total, setTotal] = useState(0);

    async function load(pageNumber: number) {
        setLoading(true);

        const { data, error, total } = await listarPedidos(
            pageNumber,
            pageSize
        );

        if (!error && data) {
            setPedidos(data);
            setTotal(total || 0);
        }

        setLoading(false);
    }

    useEffect(() => {
        load(page);
    }, [page]);

    const totalPages = Math.ceil(total / pageSize);

    async function handleMarcarComoPago(id: number) {
        await marcarComoPago(id);

        setPedidos((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, status_pagamento: "pago" }
                    : p
            )
        );
    }

    return (
        <div className="page">

            <div className="page-card">

                {/*PAGE TITLE COMPONENTE */}
                <PageTitle
                    title="Pedidos Recebidos"
                />

                {loading ? (
                    <p style={{ color: "#94a3b8" }}>
                        Carregando pedidos...
                    </p>
                ) : (
                    <>
                        <div className="table-card">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Telefone</th>
                                        <th>Classe</th>
                                        <th>Tipo</th>
                                        <th>Status</th>
                                        <th>Ações</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {pedidos.length ? (
                                        pedidos.map((p) => (
                                            <tr key={p.id}>
                                                <td>{p.nome}</td>
                                                <td>{p.telefone}</td>
                                                <td>{p.classes?.nome}</td>
                                                <td>{p.tipo_revista}</td>

                                                <td>
                                                    <span
                                                        className={`status ${
                                                            p.status_pagamento === "pago"
                                                                ? "pago"
                                                                : "pendente"
                                                        }`}
                                                    >
                                                        {p.status_pagamento}
                                                    </span>
                                                </td>

                                                <td>
                                                    {p.status_pagamento !== "pago" && (
                                                        <button
                                                            className="btn btn-primary btn-small"
                                                            onClick={() =>
                                                                handleMarcarComoPago(p.id)
                                                            }
                                                        >
                                                            ✔ Marcar como pago
                                                        </button>
                                                    )}
                                                </td>

                                                <td>
                                                    {new Date(
                                                        p.created_at
                                                    ).toLocaleString("pt-BR")}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7}>
                                                Nenhum pedido encontrado
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* PAGINAÇÃO */}
                        <div className="pagination">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Anterior
                            </button>

                            <span>
                                Página {page} de {totalPages || 1}
                            </span>

                            <button
                                disabled={page >= totalPages}
                                onClick={() => setPage(page + 1)}
                            >
                                Próxima
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}