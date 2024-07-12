import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { login } from '../features/auth/authSlice';
import { filtroProductos } from '../features/searchbarSlice'; 
//import { Link } from 'react-router-dom';
import "../css/Navbar.css"; // Importando desde la carpeta css
import { getProductos } from "../services/Productos";

function filtrar(){
  console.log("filtrando");
}


export default function Searchbar(){

  return(
    <div>
      <form>
        <label htmlFor="searchbar">Buscar Producto:</label>
        <input type="text" id="searchbar" onChange={filtrar}/>
      </form>
    </div>
  )

}