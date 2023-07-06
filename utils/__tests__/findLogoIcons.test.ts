import { findLogoIcon } from '../findLogoIcon'
import { getAllLogoIcons } from '../../handler'

const allLogoIconTestCases = getAllLogoIcons.map((logoIcon) => {
  return {
    logoIconToSearchedFor: logoIcon.name,
    logoIconReturned: logoIcon.name,
  }
})

describe('findLogoIcon', () => {
  // if this test fails on any logo icon it means you have added a logo icon that is too loose in its naming
  // causing the api to return the wrong logo icon for that company
  it.each(allLogoIconTestCases)(
    'returns $logoIconReturned image when searching for $logoIconToSearchedFor',
    ({ logoIconToSearchedFor, logoIconReturned }) => {
      expect(findLogoIcon(logoIconToSearchedFor)?.name).toBe(logoIconReturned)
    }
  )
})
