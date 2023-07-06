# Welcome to Logo Icons Lookup API Serverless 👋

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Tests](https://github.com/frubesss/logo-icons-lookup-api-serverless/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/frubesss/logo-icons-lookup-api-serverless/actions/workflows/tests.yml)

> This API allows users to find logo icons based on string pattern matching. 
> This is useful when you only have a partial match of the logos name and need 
> to display the corresponding logo icon.
>
> For example, if you want the American Express logo icon, but the API you are 
> using provides the name "American Express Europe Ltd" this API will return the 
> American Express logo icon because "American Express" is a [truthy pattern match](https://github.com/mediaingenuity/Logo.Icons.Lookup.Api/blob/main/utils/findLogoIcon.ts#L5).
> 
> The API is designed to be an all-inclusive solution to this problem 
> and does not have any external dependencies. To use the API, simply host 
> it and add the desired logo icons to the "logoIcons" directory.

- [Gallery of all starter logo icons available](https://mediaingenuity.github.io/Logo.Icon.Lookup.App/)

## API Deployment

1. Install serverless globally if you haven't done so already:
`npm install -g serverless`
2. Install the necessary dependencies:
`npm install`
3. Set up your AWS credentials. You can do this via the AWS CLI, or by setting environment variables AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.
4. Deploy the service:
`serverless deploy --stage your-stage-name`

## API usage

### Get a list of all logo icons available

#### Request

`GET` - `/all_logo_icons`

#### Response

##### 200

`string array of all logo icons avaliable`

### Example

#### Request

`GET` - `https://rqz10ptwi9.execute-api.eu-west-1.amazonaws.com/prod/all_logo_icons`

#### Response

##### 200

```json
["118 118 Money", "American Express", "Octopus Energy", "RateSetter"]
```

### Lookup logo icon by name

#### Request

`GET` - `/lookup_logo_icon?logoIconName=:logoIconName`

| Query Parameter | Type   | Required | Description                                                                                                                                 |
|-----------------|--------|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| logoIconName    | string | Yes      | Name of logo icon you would like to find                                                                                                    |
| size            | number | No       | Size of the logo icon image to be returned. For performance, you want to set this to the same size you will be rendering in the application |

#### Response

##### 200

`The logo icon for the company name you provided in .png format.`

##### 400

` If a required parameter is missing or if an invalid size parameter is supplied.`

##### 404

`If no logo icon is found based on the provided logoIconName.`

### Example

#### Request

`GET` - `https://rqz10ptwi9.execute-api.eu-west-1.amazonaws.com/prod/lookup_logo_icon?logoIconName=monzo bank&size=50`

#### Response

##### 200

![Monzo Logo Icon](./logoIcons/monzo.png)

## Contributing

### Adding a new logo icon

- Find the company logo icon you would like to add.
  [Brandfetch](https://www.brandfetch.com) is a great resource for finding good,
  high quality logo icons. If Brandfetch does not find the logo you want, you can
  also try [Clearbit logo](https://clearbit.com/logo)
- Ensure the logo is:
  - a square in dimensions and no less than 200x200 pixels in size
  - not a duplicate of another logo icon in the repository
  - not an SVG
- Name the logo icon file after the company it is representing
- Add the logo icon to the `logoIcons` directory
- Create a PR, and GitHub actions will format it for you:
  - To a png
  - To a 200x200 pixel square
  - Compress the logo icon

### Other

Any other changes, or suggestions are welcome.
