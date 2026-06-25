"use client";

import { useState } from "react";
import ModalCadastroClasse from "./ModalCadastroClasse";
import "../page.css";
import Link from "next/link";
import { PageTitle } from "@/components/PageTitle/PageTitle";

export default function ClassesClient({ classes }: any) {
    const [aberto, setAberto] = useState(false);

    return (
        <div className="page">

            {/* CABEÇALHO */}
            <div className="cabecalho">
                <PageTitle
                    title="Classes"
                />

                <button onClick={() => setAberto(true)}>
                    + Nova Classe
                </button>
            </div>

            {/* MODAL */}
            <ModalCadastroClasse
                aberto={aberto}
                aoFechar={() => setAberto(false)}
            />

            {/* TABELA */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Professor</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {classes?.length > 0 ? (
                        classes.map((classe: any) => (
                            <tr key={classe.id}>
                                <td>{classe.nome}</td>
                                <td>
                                    <span className="badge">
                                        {classe.professor || "Sem professor"}
                                    </span>
                                </td>
                                <td>
                                    <div className="actions">
                                        <Link href={`/alunos/${classe.id}`}>
                                            <button className="btn btn-view">
                                                Ver alunos
                                            </button>
                                        </Link>

                                        <button className="btn btn-edit">Editar</button>
                                        <button className="btn btn-delete">Excluir</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} style={{ textAlign: "center", padding: 20 }}>
                                Nenhuma classe cadastrada
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}