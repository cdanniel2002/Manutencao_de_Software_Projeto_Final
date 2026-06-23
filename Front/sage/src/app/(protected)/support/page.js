"use client";

import { useState } from "react";

// Libs
import { toast } from "react-hot-toast";

// API
import api from "@/api";

// Components
import NavBarMenu from "@/components/NavBarMenu";

// Styles
import {
  PageContainer,
  MainContent,
  Header,
  HeaderInfo,
  Title,
  Subtitle,
  Content,
  FormContainer,
  Form,
  Label,
  Input,
  Select,
  FileInput,
  TextArea,
  Button,
  GuideContainer,
  GuideTitle,
  GuideStep,
} from "./styles";

export default function Support() {
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("PROBLEMA");
  const [descricao, setDescricao] = useState("");
  const [arquivo, setArquivo] = useState(null);
  const [loading, setLoading] = useState(false);

  const enviarBug = async () => {
    if (!titulo || !descricao) {
      toast.error("Por favor, preencha o título e a descrição.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("tipo", tipo);
      formData.append("descricao", descricao);
      formData.append("pagina", window.location.pathname);

      if (arquivo) {
        formData.append("anexo", arquivo);
      }

      await api.post("bug-reports/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Solicitação enviada com sucesso!");

      setTitulo("");
      setDescricao("");
      setArquivo(null);
      setTipo("PROBLEMA");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar solicitação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <NavBarMenu active="support" />

      <MainContent>
        <Header>
          <HeaderInfo>
            <Title>Suporte e Feedback</Title>
            <Subtitle>
              Relate problemas ou sugira melhorias para o FinanSee
            </Subtitle>
          </HeaderInfo>
        </Header>

        <Content>
          <FormContainer>
            <Form>
              <Label>Título da Solicitação</Label>
              <Input
                type="text"
                placeholder="Ex: Meu saldo não está sendo exibido na tela inicial"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />

              <Label>Tipo de Solicitação</Label>
              <Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="PROBLEMA">Reportar Problema</option>
                <option value="MELHORIA">Sugerir Melhoria</option>
              </Select>

              <Label>Imagem ou Arquivo (Opcional)</Label>
              <FileInput
                type="file"
                accept="image/*,.pdf,.txt"
                onChange={(e) => setArquivo(e.target.files[0])}
              />

              <Label>Descrição Detalhada</Label>
              <TextArea
                rows={6}
                placeholder="Ex: Ao acessar o dashboard, o saldo aparece zerado mesmo existindo movimentações cadastradas."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />

              <Button type="button" onClick={enviarBug} disabled={loading}>
                {loading ? "Enviando..." : "Enviar Solicitação"}
              </Button>
            </Form>
          </FormContainer>

          <GuideContainer>
            <GuideTitle>Guia de Preenchimento</GuideTitle>

            <GuideStep>
              <strong>1. Título da Solicitação</strong>
              Informe um resumo curto do problema ou da melhoria desejada.
              <br />
              <br />
              <strong>Exemplos:</strong>
              <ul>
                <li>Meu saldo não aparece na tela inicial</li>
                <li>Erro ao cadastrar uma despesa</li>
                <li>Adicionar filtro por categoria no dashboard</li>
              </ul>
            </GuideStep>

            <GuideStep>
              <strong>2. Tipo de Solicitação</strong>
              Escolha a opção que melhor representa sua necessidade.
              <ul>
                <li>
                  <strong>Reportar Problema:</strong> quando alguma
                  funcionalidade não está funcionando corretamente.
                </li>
                <li>
                  <strong>Sugerir Melhoria:</strong> quando deseja propor uma
                  nova funcionalidade ou melhorar uma já existente.
                </li>
              </ul>
            </GuideStep>

            <GuideStep>
              <strong>3. Imagem ou Arquivo</strong>
              Anexe evidências que ajudem a equipe a entender a situação.
              <br />
              <br />
              <strong>Exemplos:</strong>
              <ul>
                <li>Captura de tela do erro.</li>
                <li>Mensagem exibida pelo sistema.</li>
                <li>Documento explicando a melhoria desejada.</li>
              </ul>
            </GuideStep>

            <GuideStep>
              <strong>4. Descrição Detalhada</strong>
              Explique claramente o ocorrido ou a melhoria sugerida. Quanto mais
              detalhes forem informados, mais fácil será analisar a solicitação.
              <br />
              <br />
              <strong>Exemplo de problema:</strong>
              <br />
              &quot;Ao acessar a página de despesas e clicar em salvar, o sistema
              apresenta uma mensagem de erro e não registra a despesa.&quot;
              <br />
              <br />
              <strong>Exemplo de melhoria:</strong>
              <br />
              &quot;Seria interessante permitir filtrar despesas por categoria para
              facilitar a análise dos gastos mensais.&quot;
            </GuideStep>

            <GuideStep>
              <strong>Boas Práticas</strong>
              <ul>
                <li>Utilize títulos curtos e objetivos.</li>
                <li>Descreva o que aconteceu e o que era esperado acontecer.</li>
                <li>Anexe imagens sempre que possível.</li>
                <li>Evite descrições muito genéricas como &quot;não funciona&quot;.</li>
              </ul>
            </GuideStep>
          </GuideContainer>
        </Content>
      </MainContent>
    </PageContainer>
  );
}
