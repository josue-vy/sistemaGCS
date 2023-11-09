import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../components/Login";
import Layout from "../components/Layout/layout";
import Sidebar from "../components/shared/sidebar";
// import SolicitudAgregar from '../components/shared/sidebar/SolicitudAgregar';
import SolicitudListar from "../components/SolicitudListar";
import UsuariosRegistrar from "../components/UsuariosRegistrar";
import UsuariosListar from "../components/UsuariosListar";
import ProyectoRegistrar from "../components/proyecto/proyectoRegistrar";
import ProyectoListar from "../components/proyecto/proyectoListar";
import MetodologiaRegistrar from "../components/metodologia/MetodologiaRegistrar";
// import MetodologiaListar from '../components/MetodologiaListar';
import RegistrarFases from "../components/metodologia/fases/fasesRegistrar";
// import MetodologiaListarFases from '../components/MetodologiaListarFases';

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
        path="/solicitud/listar"
        element={
          <Layout>
            <Sidebar />
            <SolicitudListar />
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
        path="/metodologia/registrar-fases"
        element={
          <Layout>
            <Sidebar />
            <RegistrarFases />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRouter;
