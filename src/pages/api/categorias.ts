import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const prerender = false;

// =========================
// CREAR CATEGORIA
// =========================
export const POST: APIRoute = async ({ request }) => {
  const categoria = await request.json();

  const { error } = await supabase
    .from("categorias")
    .insert({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      estado: true,
    });

  if (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 400 }
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: "Categoría registrada correctamente",
    })
  );
};

// =========================
// EDITAR CATEGORIA
// =========================
export const PUT: APIRoute = async ({ request }) => {
  const categoria = await request.json();

  const { error } = await supabase
    .from("categorias")
    .update({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
    })
    .eq("id", categoria.id);

  if (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 400 }
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: "Categoría actualizada correctamente",
    })
  );
};

// =========================
// ELIMINAR CATEGORIA
// =========================
export const DELETE: APIRoute = async ({ request }) => {
  const { id } = await request.json();

  const { error } = await supabase
    .from("categorias")
    .delete()
    .eq("id", id);

  if (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 400 }
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: "Categoría eliminada correctamente",
    })
  );
};