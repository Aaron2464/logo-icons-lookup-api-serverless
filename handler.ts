import type { APIGatewayEvent } from 'aws-lambda'
import { readdirSync, readFileSync } from 'fs'
import sharp from 'sharp'

import { removeFileExtension } from './utils/removeFileExtension'
import { findLogoIcon } from './utils/findLogoIcon'

export const getAllLogoIcons = readdirSync('./logoIcons').map((logoIcon) => ({
  image: readFileSync(`./logoIcons/${logoIcon}`),
  name: removeFileExtension(logoIcon),
}))

export const allLogoIcons = async () => {
  const allLogoIconNames = getAllLogoIcons.map((logoIcon) => logoIcon.name)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(allLogoIconNames),
  }
}

export const lookupLogoIcon = async (event: APIGatewayEvent) => {
  const logoIconNameQueryParameter = event.queryStringParameters?.logoIconName

  if (typeof logoIconNameQueryParameter === 'string') {
    const logoIconFound = findLogoIcon(logoIconNameQueryParameter)

    if (logoIconFound !== undefined) {
      const logoIconFoundImage = logoIconFound.image

      const sizeQueryParameter = event.queryStringParameters?.size

      if (typeof sizeQueryParameter === 'string') {
        const sizeQueryParameterNumber = parseInt(sizeQueryParameter, 10)

        if (sizeQueryParameterNumber >= 1 && sizeQueryParameterNumber <= 200) {
          const resizedLogoIconImage = await sharp(logoIconFoundImage)
            .resize({
              width: sizeQueryParameterNumber,
              height: sizeQueryParameterNumber,
            })
            .toBuffer()

          return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'image/png',
              'Cache-Control': 'max-age=600',
            },
            body: resizedLogoIconImage.toString('base64'),
            isBase64Encoded: true,
          }
        } else {
          return {
            statusCode: 400,
            body: 'Request parameter size must be between 1 and 200.',
          }
        }
      } else {
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'image/png',
            'Cache-Control': 'max-age=600',
          },
          body: logoIconFoundImage.toString('base64'),
          isBase64Encoded: true,
        }
      }
    } else {
      return {
        statusCode: 404,
        body: 'No logo icon found.',
      }
    }
  } else {
    return {
      statusCode: 400,
      body: 'Missing required request parameter: logoIconName.',
    }
  }
}
