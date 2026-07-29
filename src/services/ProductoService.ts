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


export async function crearProducto(

    nombre:string,

    descripcion:string,

    precio:number,

    stock:number,

    imagen:string,

    categoria_id:number

){

    const { error } = await supabase

        .from("productos")

        .insert({

            nombre,

            descripcion,

            precio,

            stock,

            imagen,

            categoria_id,

            estado:true

        });

    return error;

}