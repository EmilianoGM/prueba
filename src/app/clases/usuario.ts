export interface IUsuario {
  correo: string,
  tipo: string,
}

export interface IUsuarioUID extends IUsuario{
  uid: string
}
