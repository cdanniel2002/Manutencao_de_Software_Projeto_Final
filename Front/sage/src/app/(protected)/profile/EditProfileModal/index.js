"use client";
import React, { useEffect, useState } from "react";

// Libs
import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "react-hot-toast";

// Validators
import {
  phoneMask,
  moneyMask,
  cpfMask,
  dateMask,
} from "../../../../validators/mask";
import {
  isValidPhone,
  checkCPF,
  validateBirthDate,
  formatDate,
  formatDate3,
} from "../../../../validators";

// Styles
import {
  Overlay,
  Content,
  Title,
  Form,
  Label,
  Input,
  ButtonGroup,
  ConfirmButton,
  CancelButton,
} from "./styles";

export const EditProfileModal = ({
  children,
  emailProp,
  phoneProp,
  moneyProp,
  onSubmit,
  dataOfBirthProp,
  nameProp,
  cpfProp,
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [money, setMoney] = useState("");

  useEffect(() => {
    if (open) {
      setName(nameProp || "");
      setEmail(emailProp || "");
      setCpf(cpfMask(cpfProp || ""));
      setDateOfBirth(dataOfBirthProp ? formatDate(dataOfBirthProp) : "");

      const cleanPhone = (phoneProp || "").replace(/\D/g, "");
      setPhone(phoneMask(cleanPhone));

      const cleanMoney = (moneyProp || "").replace(/\D/g, "");
      const maskedMoney = moneyMask(cleanMoney);
      setMoney(maskedMoney ? `R$ ${maskedMoney}` : "");
    }
  }, [open, nameProp, emailProp, cpfProp, dataOfBirthProp, phoneProp, moneyProp]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !money) {
      toast.error("Nome e renda mensal são obrigatórios.");
      return;
    }

    // Campos opcionais: validam apenas se preenchidos
    const cleanCpf = cpf.replace(/\D/g, "");
    if (cleanCpf && !checkCPF(cleanCpf)) {
      toast.error("CPF inválido.");
      return;
    }

    if (phone && !isValidPhone(phone)) {
      toast.error("Formato de telefone inválido.");
      return;
    }

    if (dateOfBirth && !validateBirthDate(dateOfBirth)) {
      toast.error("Data de nascimento inválida.");
      return;
    }

    if (onSubmit) {
      const submissionData = {
        name,
        email,
        cpf: cleanCpf || null,
        date_of_birth: dateOfBirth ? formatDate3(dateOfBirth) : null,
        phone: phone ? phone.replace(/\D/g, "") : null,
        money: money.replace(/[R$\s.]/g, "").replace(",", "."),
      };
      onSubmit(submissionData);
      setOpen(false);
    }
  };

  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      setName("");
      setEmail("");
      setCpf("");
      setDateOfBirth("");
      setPhone("");
      setMoney("");
    }
    setOpen(isOpen);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Form onSubmit={handleSubmit} noValidate>
            <Title>Editar perfil</Title>

            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite aqui o nome"
              />
            </div>

            <div>
              <Label htmlFor="email">E-mail (não pode ser alterado)</Label>
              <Input id="email" type="email" value={email} disabled />
            </div>

            <div>
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(cpfMask(e.target.value))}
                placeholder="999.999.999-99"
                maxLength={14}
              />
            </div>

            <div>
              <Label htmlFor="dateOfBirth">Data de nascimento</Label>
              <Input
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(dateMask(e.target.value))}
                placeholder="DD/MM/AAAA"
                maxLength={10}
              />
            </div>

            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(phoneMask(e.target.value))}
                placeholder="(99) 99999-9999"
              />
            </div>

            <div>
              <Label htmlFor="money">Renda mensal</Label>
              <Input
                id="money"
                value={money}
                onChange={(e) => {
                  const maskedValue = moneyMask(e.target.value);
                  setMoney(maskedValue ? `R$ ${maskedValue}` : "");
                }}
                placeholder="R$ 1.234,56"
              />
            </div>

            <ButtonGroup>
              <CancelButton
                type="button"
                onClick={() => handleOpenChange(false)}
              >
                Cancelar
              </CancelButton>
              <ConfirmButton type="submit">Atualizar</ConfirmButton>
            </ButtonGroup>
          </Form>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
