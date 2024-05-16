import { http } from "./Http.js"

export default {
    listar(page=1, q=""){
        return http().get(`/producto?page=${page}&q=${q}`);
    },
    guardar(datos){
        return http().post("/producto", datos);
    },
    mostrar(id){
        return http().get(`/producto/${id}`);
    },
    modificar(datos, id){
        return http().put(`/producto/${id}`, datos);
    },
    eliminar(id){
        return http().delete(`/producto/${id}`);
    }
}