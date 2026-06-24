"use client";

import { useEffect } from "react";

// Libs
import { useRouter } from "next/navigation";

// Components
import NavBarMenu from "@/components/NavBarMenu";

// Context
import { useAuth } from "@/hooks/context";

// Styles
import {
  PageContainer,
  MainContent,
  Header,
  Title,
  Subtitle,
  TableWrapper,
  Table,
  Th,
  Td,
  Tr,
  TypeBadge,
  StatusBadge,
  Description,
  EmptyState,
  RefreshButton,
} from "./styles";

const STATUS_LABELS = {
  ABERTO: "Aberto",
  ANALISE: "Em análise",
  CORRIGIDO: "Corrigido",
  FECHADO: "Fechado",
};

export default function MyRequests() {
  const router = useRouter();
  const { userData, bugReports, getBugReports } = useAuth();

  const isStaff = userData?.is_staff;

  // O acompanhamento e para o usuario comum. Admins tem a tela /support-requests
  // (onde gerenciam todas as solicitacoes), entao sao redirecionados para la.
  useEffect(() => {
    if (userData && isStaff) {
      router.push("/support-requests");
    }
  }, [userData, isStaff, router]);

  // Para o usuario comum, o backend ja retorna apenas as proprias solicitacoes.
  useEffect(() => {
    if (userData && !isStaff) {
      getBugReports();
    }
  }, [userData, isStaff, getBugReports]);

  const formatDate = (iso) => {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleString("pt-BR");
    } catch {
      return iso;
    }
  };

  if (isStaff) {
    return null;
  }

  return (
    <PageContainer>
      <NavBarMenu active="my-requests" />

      <MainContent>
        <Header>
          <Title>Minhas Solicitações</Title>
          <Subtitle>
            Acompanhe o andamento dos problemas e melhorias que você enviou
          </Subtitle>
        </Header>

        {bugReports?.length ? (
          <>
            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <Th>Título</Th>
                    <Th>Tipo</Th>
                    <Th>Descrição</Th>
                    <Th>Data de envio</Th>
                    <Th>Status</Th>
                  </tr>
                </thead>
                <tbody>
                  {bugReports.map((item) => (
                    <Tr key={item.id}>
                      <Td>{item.titulo}</Td>
                      <Td>
                        <TypeBadge $tipo={item.tipo}>
                          {item.tipo_display}
                        </TypeBadge>
                      </Td>
                      <Td>
                        <Description>{item.descricao}</Description>
                      </Td>
                      <Td>{formatDate(item.criado_em)}</Td>
                      <Td>
                        <StatusBadge $status={item.status}>
                          {item.status_display ||
                            STATUS_LABELS[item.status] ||
                            item.status}
                        </StatusBadge>
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>
            <RefreshButton type="button" onClick={getBugReports}>
              Atualizar
            </RefreshButton>
          </>
        ) : (
          <EmptyState>
            Você ainda não enviou nenhuma solicitação. Acesse a página de
            Suporte para relatar um problema ou sugerir uma melhoria.
          </EmptyState>
        )}
      </MainContent>
    </PageContainer>
  );
}
