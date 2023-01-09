import BemVindo from "../components/BemVindo/BemVindo"
import Button from "../components/Button/Button"
import CardUsuario from "../components/CardUsuario/CardUsuario"
import { ListagemUsuarios, TopSection } from "./Pages"
import Header from '../components/Header'
import { Footer } from "../components/Footer/Footer"
import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import api from "../api/config"
import Pagination from "../components/ListaPagina/Paginas"


export type UsuariosProps = {
  decoded: Array<string>,
  name: string,
  email: string,
  photo: string,
  age: string,
  username: string,
  _id: string

}

const Usuarios = (props: UsuariosProps) => {

  const [currentPage, setCurrentPage] = useState(1);

  const [listaUsuarios, setUsers] = useState<UsuariosProps[]>([])
  const limitePorPagina = 10
  const lastPage = Math.ceil(listaUsuarios.length/limitePorPagina);
  const offset = (currentPage -1)*limitePorPagina
  const atualListaUsuarios = listaUsuarios.slice(offset, offset + limitePorPagina)
  const listaDivLeft = atualListaUsuarios.slice(0, Math.ceil(atualListaUsuarios.length/2))
  const listaDivRight = atualListaUsuarios.slice(Math.ceil(atualListaUsuarios.length/2))

  const USUARIO = localStorage.getItem('token');
/*   const ID = localStorage.getItem('_id'); */

  const token = USUARIO;
  const decoded : any = jwt_decode(token!);

  async function getUsuarios() {
    const { data } = await  api.get(`/users`, {
      headers: {
        Authorization: `Bearer ${USUARIO}`
      }
    })

    setUsers(data)
    }

  useEffect(() => {
    getUsuarios()

  }, [])

  let total = listaUsuarios.length +1


  return (
    <>
      <Header />
      <TopSection >
        <div>
          <BemVindo
            user={decoded.user.name}
            text={"Aqui estão todos os usuários cadastrados"}

            />
        </div>
        <div className="cadastro">
        <Button text="Cadastrar Usuário" link="/users/create"/>
        </div>
      </TopSection>
      
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage} maxLength={7}/> 
      {listaUsuarios.length === 0 ? 
        (<></>):
        (<div style={{display: "flex", flexDirection: "row", columns: "auto auto", columnWidth: "auto", justifyContent: "space-around"}}>
          <ListagemUsuarios >
          <div className="listaUsers" style={{display: "flex", flexDirection: "column", columns: "auto auto", columnWidth: "auto", maxWidth: "550px"}}>
            {listaDivLeft.slice(0).map((listaUsuarios, i) => (<CardUsuario
            key={i}
            index={total-=1}
            _id={listaUsuarios._id}
            username={listaUsuarios.username}
            name={listaUsuarios.name}
            email={listaUsuarios.email}
            age={listaUsuarios.age}
            photo={listaUsuarios.photo}
            />))}
          </div>
          </ListagemUsuarios>
          <ListagemUsuarios >
          <div className="listaUsers" style={{display: "flex", flexDirection: "column", columns: "auto auto", columnWidth: "auto", maxWidth: "550px"}}>
            {listaDivRight.slice(0).map((listaUsuarios, i) => (<CardUsuario
            key={i}
            index={total-=1}
            _id={listaUsuarios._id}
            username={listaUsuarios.username}
            name={listaUsuarios.name}
            email={listaUsuarios.email}
            age={listaUsuarios.age}
            photo={listaUsuarios.photo}
            />))}
          </div>
          </ListagemUsuarios>
          </div>
          )
        }
      <Footer />
    </>
  )
}

export default Usuarios