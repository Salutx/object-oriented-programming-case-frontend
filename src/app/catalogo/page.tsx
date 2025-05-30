'use client'

import Catalog from "@/containers/Catalog";
import ProtectedRoute from "../ProtectedRoute";

const Catalogo = () => {
  return <Catalog />;
};

export default ProtectedRoute(Catalogo);
