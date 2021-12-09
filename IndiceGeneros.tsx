import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { generoDTO } from "./generos.model";
import { urlGeneros } from "../Utils/endpoints";
import ListadoGenerico from "../Utils/ListadoGenerico";
import Button from "../Utils/Button";
import Paginacion from "../Utils/Paginacion";

export default function IndiceGeneros() {
  const [generos, setGeneros] = useState<generoDTO[]>();
  const [totalDePaginas, setTotalDePaginas] = useState(0);  
  const [recordsPorPagina, setRecordsPorPagina] = useState(10);
  const [pagina,setPagina]=useState(1);
  useEffect(() => {
    axios.get(urlGeneros, {
       params: {pagina, recordsPorPagina: recordsPorPagina}
    })
    .then((respuesta: AxiosResponse<generoDTO[]>) => {
       const totalDeRegistros = 
       parseInt(respuesta.headers['cantidadtotalregistros'], 10); 
       setTotalDePaginas(Math.ceil(totalDeRegistros/recordsPorPagina));
      console.log(respuesta.data);
      setGeneros(respuesta.data);
    });
  },[pagina, recordsPorPagina]);
  return (
    <>
      <h3>Géneros</h3>
      <Link className="btn btn-primary" to="generos/crear"> Crear </Link>
      <div className="form-group" style={{width: '150px'}}>
        <label>Registros por página:</label>
      <select 
        className="input-group mb-1"
        defaultValue={10}
        onChange={e=> {
          setPagina(1);
          setRecordsPorPagina(parseInt(e.currentTarget.value,10))}}>            
      ||<option value="5">5</option>
        <option value="10" >10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>

      </div>

      <Paginacion cantidadTotalDePaginas={totalDePaginas} 
      paginaActual={pagina} onChange={nuevaPagina=> setPagina(nuevaPagina)}
      radio={0}
       />  

      <ListadoGenerico listado={generos}>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {generos?.map((genero) => (
              <tr key={genero.id}>
                <td>
                  <Link className="btn btn-success" to={`/generos/${genero.id}`}>
                    Editar
                  </Link>
                  <Button className="btn btn-warning">Borrar</Button>
                </td>
                <td>{genero.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ListadoGenerico>
    </>
  );
}
