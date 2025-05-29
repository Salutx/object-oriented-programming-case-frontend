"use client";

import Icon from "@/components/Icon";
import Styles from "./Login.module.scss";
import LoginInput from "./LoginInput";
import { useState } from "react";
import { LoginForm, LoginSection, RegisterForm } from "./Login.types";
import { useCreateUser, useLoginUser } from "@/queries/Users.queries";
import { UserRegisterPayload, UserSession } from "@/types/Users.types";
import { useLocalStorage } from "react-use";
import { CircularProgress } from "@mui/material";

const InitialLoginPayload: LoginForm = {
  username: "",
  password: "",
};

const InitialRegisterPayload: RegisterForm = {
  confirmPassword: "",
  email: "",
  password: "",
  username: "",
};

const Login = () => {
  const { mutate: registerUserMutate, isPending: isPendingRegister } =
    useCreateUser();
  const { mutate: loginUserMutate, isPending: isPendingLogin } = useLoginUser();

  const [selectedSection, setSelectedSection] = useState<LoginSection>("login");
  const [loginForm, setLoginForm] = useState<LoginForm>(InitialLoginPayload);
  const [registerForm, setRegisterForm] = useState<RegisterForm>(
    InitialRegisterPayload
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, saveUserSession] = useLocalStorage<UserSession | null>(
    "userSession",
    null
  );

  const handleSectionChange = (section: LoginSection) => {
    setSelectedSection(section);
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => {
      return {
        ...(prev || {}),
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prev) => {
      return {
        ...(prev || {}),
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleConfirm = (): void => {
    if (selectedSection === "login") {
      loginUserMutate(loginForm, {
        onSuccess: (data) => {
          alert("Login efetuado com sucesso! :)");
          saveUserSession(data);
        },
        onError: (error) => {
          alert("Ocorreu um erro ao fazer login. Tente novamente!");
          console.error("Login failed:", error);
        },
      });
    } else if (selectedSection === "register") {
      const registerPayload: UserRegisterPayload = {
        email: registerForm.email,
        password: registerForm.password,
        username: registerForm.username,
        name: registerForm.username,
      };

      registerUserMutate(registerPayload, {
        onSuccess: () => {
          alert("Usuário registrado com sucesso! Efetue o login. ;)");
          setRegisterForm(InitialRegisterPayload);
          setSelectedSection("login");
        },
        onError: (error) => {
          alert("Ocorreu um erro ao se registrar. Tente novamente!");
          console.error("Register failed:", error);
        },
      });
    }
  };

  const formIsValid = (): boolean => {
    if (selectedSection === "login") {
      return (
        loginForm.username.trim() !== "" && loginForm.password.trim() !== ""
      );
    }
    if (selectedSection === "register") {
      return (
        registerForm.username.trim() !== "" &&
        registerForm.email.trim() !== "" &&
        registerForm.password.trim() !== "" &&
        registerForm.confirmPassword.trim() !== "" &&
        registerForm.password === registerForm.confirmPassword
      );
    }
    return false;
  };

  const isLoading = isPendingLogin || isPendingRegister;

  return (
    <div className={Styles.Container}>
      <div className={Styles.Wrapper}>
        <div className={Styles.FormHeader}>
          <div className={Styles.FormLogo}>
            <Icon name="library" size={24} />
            <div className={Styles.FormLogo_Brand}>
              <p className={Styles.FormLogo_Label}>LibraryDB</p>
              <p className={Styles.FormLogo_Copyright}>by Salutx</p>
            </div>
          </div>

          <p className={Styles.FormHeader_Title}>
            Bem-vindo(a) ao <strong>LibraryDB</strong>
          </p>
        </div>

        <div className={Styles.FormContent}>
          {selectedSection === "login" && (
            <div className={Styles.FormContent__Inputs}>
              <LoginInput
                label="Usuário"
                type="text"
                value={loginForm?.username || ""}
                onChange={handleLoginChange}
                name="username"
                placeholder="Digite seu usuário"
                required
                onKeyDown={(e) => {
                  if (e.key === "Enter" && formIsValid() && !isLoading) {
                    e.preventDefault();
                    handleConfirm();
                  }
                }}
              />
              <LoginInput
                label="Senha"
                type="password"
                value={loginForm?.password || ""}
                onChange={handleLoginChange}
                name="password"
                placeholder="Digite sua senha"
                required
                onKeyDown={(e) => {
                  if (e.key === "Enter" && formIsValid() && !isLoading) {
                    e.preventDefault();
                    handleConfirm();
                  }
                }}
              />
            </div>
          )}

          {selectedSection === "register" && (
            <div className={Styles.FormContent__Inputs}>
              <LoginInput
                label="Usuário"
                type="text"
                value={registerForm?.username || ""}
                onChange={handleRegisterChange}
                name="username"
                placeholder="Digite seu usuário"
                required
                onKeyDown={(e) => {
                  if (e.key === "Enter" && formIsValid() && !isLoading) {
                    e.preventDefault();
                    handleConfirm();
                  }
                }}
              />
              <LoginInput
                label="Email"
                type="text"
                value={registerForm?.email || ""}
                onChange={handleRegisterChange}
                name="email"
                placeholder="Digite seu email"
                required
                onKeyDown={(e) => {
                  if (e.key === "Enter" && formIsValid() && !isLoading) {
                    e.preventDefault();
                    handleConfirm();
                  }
                }}
              />
              <LoginInput
                label="Senha"
                type="password"
                value={registerForm?.password || ""}
                onChange={handleRegisterChange}
                name="password"
                placeholder="Digite sua senha"
                required
                onKeyDown={(e) => {
                  if (e.key === "Enter" && formIsValid() && !isLoading) {
                    e.preventDefault();
                    handleConfirm();
                  }
                }}
              />
              <LoginInput
                label="Confirmar Senha"
                type="password"
                value={registerForm?.confirmPassword || ""}
                onChange={handleRegisterChange}
                name="confirmPassword"
                placeholder="Confirme sua senha"
                required
                onKeyDown={(e) => {
                  if (e.key === "Enter" && formIsValid() && !isLoading) {
                    e.preventDefault();
                    handleConfirm();
                  }
                }}
              />
            </div>
          )}

          <button
            onClick={handleConfirm}
            className={Styles.FormButton}
            disabled={!formIsValid() || isLoading}
          >
            {isLoading && (
              <div
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress size={16} color="inherit" />
              </div>
            )}
            {!isLoading && <p className={Styles.FormButton_Label}>Continuar</p>}
          </button>

          {selectedSection === "login" && (
            <p className={Styles.FormContent_Footer}>
              Não tem uma conta?{" "}
              <span
                className={Styles.FormContent_Footer_Link}
                onClick={() => handleSectionChange("register")}
              >
                Registrar
              </span>
            </p>
          )}

          {selectedSection === "register" && (
            <p className={Styles.FormContent_Footer}>
              Já tem uma conta?{" "}
              <span
                className={Styles.FormContent_Footer_Link}
                onClick={() => handleSectionChange("login")}
              >
                Fazer login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
