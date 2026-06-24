"use client";

import { useEffect, useState } from "react";
import { listarPedidos } from "@/actions/pedidos";
import { marcarComoPago } from "@/actions/pedidos-publicos";

export default function OrdersPage() {
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const { data, error } = await listarPedidos();

            if (!error && data) {
                setPedidos(data);
            }

            setLoading(false);
        }

        load();
    }, []);

    return (
        <div className="page">
            <h1 className="title">Pedidos Recebidos</h1>

            {loading ? (
                <p>Carregando pedidos...</p>
            ) : (
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
                                            style={{
                                                padding: "4px 10px",
                                                borderRadius: 999,
                                                background:
                                                    p.status_pagamento === "pago"
                                                        ? "#16a34a"
                                                        : "#f59e0b",
                                                color: "white",
                                                fontSize: 12,
                                            }}
                                        >
                                            {p.status_pagamento}
                                        </span>
                                    </td>

                                    <td>
                                        {p.status_pagamento !== "pago" && (
                                            <button
                                                className="btn btn-primary btn-small"
                                                onClick={async () => {
                                                    await marcarComoPago(p.id);
                                                    window.location.reload();
                                                }}
                                            >
                                                ✔ Marcar como pago
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        {new Date(p.created_at).toLocaleString("pt-BR")}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>Nenhum pedido encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}