/*
i. Animal: perro, gato o hurón.
ii. Raza: la raza del animal.
iii. Nombre.
iv. Edad.
v. Dueño.
vi. Foto de la mascota.
 */
export interface IMascota {
  animal: string,
  raza: string,
  nombre : string,
  edad: string,
  dueño: string,
}

export interface IMascotaID extends IMascota{
  id: string
}
