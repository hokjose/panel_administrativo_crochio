import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const prerender = false;


// =========================
// CREAR PRODUCTO
// =========================
export const POST: APIRoute = async ({ request }) => {

  const producto = await request.json();

  // Obtener el último código registrado
const { data: productosExistentes } = await supabase
  .from("productos")
  .select("codigo");


let numeroMayor = 0;

productosExistentes?.forEach((producto) => {

  if (producto.codigo) {

    const numero = parseInt(producto.codigo.split("-")[1]);

    if (numero > numeroMayor) {
      numeroMayor = numero;
    }

  }

});


const nuevoCodigo = `PROD-${String(numeroMayor + 1).padStart(3, "0")}`;

  const { error } = await supabase
    .from("productos")
    .insert({
  codigo: nuevoCodigo,

  nombre: producto.nombre,

  descripcion: producto.descripcion,

  precio: producto.precio,

  stock: producto.stock,

  imagen: producto.imagen,

  categoria_id: producto.categoria_id,

  estado: true,
});


  if (error) {

    return new Response(
      JSON.stringify({
        success:false,
        message:error.message,
      }),
      {status:400}
    );

  }


  return new Response(
    JSON.stringify({
      success:true,
      message:"Producto registrado correctamente",
    })
  );

};




// =========================
// OBTENER PRODUCTO POR ID
// =========================
export const GET: APIRoute = async ({ request }) => {


  const url = new URL(request.url);


  const id = url.searchParams.get("id");



  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("id", id)
    .single();



  if(error){

    return new Response(
      JSON.stringify({
        success:false,
        message:error.message
      }),
      {
        status:400
      }
    );

  }



  return new Response(
    JSON.stringify(data)
  );


};





// =========================
// ACTUALIZAR PRODUCTO
// =========================
export const PUT: APIRoute = async ({ request }) => {


  const producto = await request.json();



  const { error } = await supabase
    .from("productos")
    .update({

      nombre: producto.nombre,

      descripcion: producto.descripcion,

      precio: producto.precio,

      stock: producto.stock,

      imagen: producto.imagen,

      categoria_id: producto.categoria_id,

    })
    .eq("id", producto.id);



  if(error){

    return new Response(
      JSON.stringify({
        success:false,
        message:error.message
      }),
      {
        status:400
      }
    );

  }



  return new Response(
    JSON.stringify({
      success:true,
      message:"Producto actualizado correctamente"
    })
  );


};





// =========================
// ELIMINAR PRODUCTO
// =========================
export const DELETE: APIRoute = async ({ request }) => {


  const { id } = await request.json();



  const { error } = await supabase
    .from("productos")
    .delete()
    .eq("id", id);



  if(error){

    return new Response(
      JSON.stringify({
        success:false,
        message:error.message,
      }),
      {
        status:400
      }
    );

  }



  return new Response(
    JSON.stringify({
      success:true,
      message:"Producto eliminado correctamente",
    })
  );

};