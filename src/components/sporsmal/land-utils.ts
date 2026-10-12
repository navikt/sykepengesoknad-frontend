import { landlisteEøs } from './landliste'

export const STORBRITANNIA = 'Storbritannia'
export const STORBRITANNIA_LAND = ['England', 'Nord-Irland', 'Skottland', STORBRITANNIA, 'Wales']

export const erStorbritanniaLand = (land: string) => STORBRITANNIA_LAND.includes(land.trim())

export const erLandIEuEos = (land: string) => landlisteEøs.includes(land.trim())

export const erLandIEuEosEllerStorbritannia = (land: string) => erLandIEuEos(land) || erStorbritanniaLand(land)

export const harAlleLandIEuEosEllerStorbritannia = (land: string[]) =>
    land.length > 0 && land.every(erLandIEuEosEllerStorbritannia)
