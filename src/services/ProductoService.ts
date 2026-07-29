import { supabase } from "../lib/supabase";

export async function obtenerProductos(){

    const { data,error } = await supabase

        .from("productos")

        .select(`
            *,
            categorias(nombre)
        `)

        .order("id");

    if(error){

        console.error(error);

        return [];

    }

    return data;

}
