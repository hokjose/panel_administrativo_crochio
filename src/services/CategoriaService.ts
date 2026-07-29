import { supabase } from "../lib/supabase";

export async function obtenerCategorias() {

    const { data, error } = await supabase

        .from("categorias")

        .select("*")

        .order("id");

    if (error) {

        console.error(error);

        return [];

    }

    return data;

}

export async function crearCategoria(nombre:string, descripcion:string){

    const { error } = await supabase

        .from("categorias")

        .insert({

            nombre,

            descripcion,

            estado:true

        });

    return error;

}