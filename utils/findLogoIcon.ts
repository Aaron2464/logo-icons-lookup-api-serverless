import { getAllLogoIcons } from '../handler'

export const findLogoIcon = (logoIconToFind: string) => {
  return getAllLogoIcons.find((logoIcon) =>
      normaliseString(logoIconToFind).includes(normaliseString(logoIcon.name))
  )
}

const normaliseString = (string: string) =>
  string.toLowerCase().replace(/\s/g, '')
