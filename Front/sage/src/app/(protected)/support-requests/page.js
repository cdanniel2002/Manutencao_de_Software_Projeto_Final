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
  StatusSelect,
  UserCell,
  Description,
  EmptyState,
} from "./styles";

const STATUS_OPTIONS = [
  { value: "ABERTO", label: "Aberto" },
  { value: "ANALISE", label: "Em análise" },
  { value: "CORRIGIDO", label: "Corrigido" },
  { value: "FECHADO", label: "Fechado" },
];

export default function SupportRequests() {
  const router = useRouter();
  const { userData, bugReports, getBugReports, updateBugReportStatus } =
    useAuth();

  const isStaff = userData?.is_staff;

  // Bloqueia acesso de usuarios comuns: redireciona para o dashboard.
  useEffect(() => {
    if (userData && !isStaff) {
      router.push("/dashboard");
    }
  }, [userData, isStaff, router]);

  useEffect(() => {
    if (isStaff) {
      getBugReports();
    }
  }, [isStaff, getBugReports]);

  const formatDate = (iso) => {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleString("pt-BR");
    } catch {
      return iso;
    }
  };

  if (!isStaff) {
    return null;
  }

  return (
    <PageContainer>
      <NavBarMenu active="support-requests" />

      <MainContent>
        <Header>
          <Title>Solicitações de Suporte</Title>
          <Subtitle>
            Gerencie os problemas e melhorias enviados pelos usuários
          </Subtitle>
        </Header>

        {bugReports?.length ? (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>Título</Th>
                  <Th>Tipo</Th>
                  <Th>Usuário</Th>
                  <Th>Descrição</Th>
                  <Th>Página</Th>
                  <Th>Data</Th>
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
                      <UserCell>
                        <strong>{item.usuario_nome || "-"}</strong>
                        <span>{item.usuario_email}</span>
                      </UserCell>
                    </Td>
                    <Td>
                      <Description>{item.descricao}</Description>
                    </Td>
                    <Td>{item.pagina || "-"}</Td>
                    <Td>{formatDate(item.criado_em)}</Td>
                    <Td>
                      <StatusSelect
                        value={item.status}
                        onChange={(e) =>
                          updateBugReportStatus(item.id, e.target.value)
                        }
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </StatusSelect>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        ) : (
          <EmptyState>Nenhuma solicitação recebida até o momento.</EmptyState>
        )}
      </MainContent>
    </PageContainer>
  );
}
