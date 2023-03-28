export interface IUtilisateur {
  name: string,
  prenom: string,
  password: string,
  email: string,
  telephone?: string,
  role: string,
  id_disponibilite: number
  idZone?: number
}
