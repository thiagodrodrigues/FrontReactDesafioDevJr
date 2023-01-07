import {
  createBrowserRouter,
} from "react-router-dom";
import AppLogin from "../pages/LoginPage";
import { CadastroDeUsuario } from "../pages/CadastroDeUsuário";
import { ListaClientes } from "../pages/ListaClientes";
import Usuarios from "../pages/ListaUsuario";
import { EditaCliente } from "../pages/EditaCliente";
import { EditaUsuario } from "../pages/EditaUsuario";
import { CadastroNovoCliente } from "../pages/CadastroNovoCliente";
import { APICats } from "../pages/APICats";
import { APIDogs } from "../pages/APIDogs";

const router = createBrowserRouter([
    {
        path: "/index",
        element: <AppLogin />,
    },
    {
        path: "/users/create",
        element: <CadastroDeUsuario />,
    },
    {
        path: "/users",
        element: <Usuarios decoded={[]} name={""} email={""} photo={""} username={""} age={""} _id={""} />,
    },
    {
        path: "/users/:_id",
        element: <EditaUsuario />,
    },
    {
        path: "/clients",
        element: <ListaClientes />,
    },
    {
        path: "/clients/create",
        element: <CadastroNovoCliente />,
    },
    {
        path: "/clients/:_id",
        element: <EditaCliente />,
    },
    {
        path: "/cats",
        element: <APICats />,
    },
    
    {
        path: "/dogs",
        element: <APIDogs />,
    },
    
])

export default router