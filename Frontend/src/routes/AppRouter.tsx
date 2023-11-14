import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../components/Login";
import Layout from "../components/Layout/layout";
import Sidebar from "../components/shared/sidebar";
import UsuariosRegistrar from "../components/UsuariosRegistrar";
import UsuariosListar from "../components/UsuariosListar";
import ProyectoRegistrar from "../components/proyecto/proyectoRegistrar";
import ProyectoListar from "../components/proyecto/proyectoListar";
import MetodologiaRegistrar from "../components/metodologia/MetodologiaRegistrar";
import RegistrarFases from "../components/metodologia/fases/FasesRegistrar";
import TipoUsuarioRegistrar from "../components/tipousuario/TipoUsuarioRegistrar";
import TipoUsuariosListar from "../components/tipousuario/TipoUsuarioListar";
import SolicitudRegister from "../components/solicitudCambio/SolicitudRegister";
import SolicitudCambiosListar from "../components/solicitudCambio/SolicitudListar";
import RespuestaSolicitudCambio from "../components/solicitudCambio/solicitudRespuesta/SolicitudRespuesta";
import FaseListar from "../components/metodologia/fases/FasesListar";
import MetodologiaListar from "../components/metodologia/MetodologiaListar";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Sidebar />
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/solicitud/registrar"
        element={
          <Layout>
            <Sidebar />
            <SolicitudRegister />
          </Layout>
        }
      />
      <Route
        path="/solicitud/listar"
        element={
          <Layout>
            <Sidebar />
            <SolicitudCambiosListar />
          </Layout>
        }
      />
      <Route
        path="/solicitud/listar/respuesta"
        element={
          <Layout>
            <Sidebar />
            <RespuestaSolicitudCambio />
          </Layout>
        }
      />
      <Route
        path="/usuarios/listar"
        element={
          <Layout>
            <Sidebar />
            <UsuariosListar />
          </Layout>
        }
      />
      <Route
        path="/tipousuarios/registrar"
        element={
          <Layout>
            <Sidebar />
            <TipoUsuarioRegistrar />
          </Layout>
        }
      />
      <Route
        path="/tipousuarios/listar"
        element={
          <Layout>
            <Sidebar />
            <TipoUsuariosListar />
          </Layout>
        }
      />

      <Route
        path="/usuarios/registrar"
        element={
          <Layout>
            <Sidebar />
            <UsuariosRegistrar />
          </Layout>
        }
      />
      <Route
        path="/proyecto/listar"
        element={
          <Layout>
            <Sidebar />
            <ProyectoListar />
          </Layout>
        }
      />
      <Route
        path="/proyecto/registrar"
        element={
          <Layout>
            <Sidebar />
            <ProyectoRegistrar />
          </Layout>
        }
      />
      <Route
        path="/metodologia/registrar"
        element={
          <Layout>
            <Sidebar />
            <MetodologiaRegistrar />
          </Layout>
        }
      />
      <Route
        path="/metodologia/listar"
        element={
          <Layout>
            <Sidebar />
            <MetodologiaListar />
          </Layout>
        }
      />
      <Route
        path="/metodologia/registrar-fases"
        element={
          <Layout>
            <Sidebar />
            <RegistrarFases />
          </Layout>
        }
      />
      <Route
        path="metodologia/listar-fases"
        element={
          <Layout>
            <Sidebar />
            <FaseListar />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRouter;
