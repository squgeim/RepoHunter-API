# RepoHunter

In any organization with freely working teams, there comes a time when nobody
really knows what everyone else is working on. This is especially true in the
case of javascript with the break-neck speed that the ecosystem is evolving in.

**RepoHunter** is a tool for your organization that lets you search who uses what
in your organization.

## APIs

You are starting a new project and are in a dilemma between `bookshelf` and
`sequelize` for you ORM. You wanna check who uses what and get some first
hand opinions:

```
GET /api/search/npm?q=bookshelf
```

For complete API documentation:

```
GET /api-docs
```


## Deployment

*You can replace `yarn` by `npm` in all of these commands, if you prefer to.*

#### 1. Clone this repo in your server.

```sh
git clone https://github.com/squgeim/RepoHunter-API
```

#### 2. Install the dependencies

```sh
yarn install
```

#### 3. Copy the `.env.example` file to `.env` file

```sh
cp .env.example .env
```

#### 4. Set the appropriate environment settings in the `.env` file.

Enter your organization's github name in `GITHUB_ORGANIZATION`. Enter the
admin's access token in `GITHUB_TOKEN`.

See here to know more about Personal Access Tokens in Github:
https://github.com/blog/1509-personal-api-tokens

Make sure you have the `repo` scope activated for this access token.

#### 5. Start the server

```sh
yarn start
```

For development server:

```sh
yarn start:dev
```

We have not included any process management tools like `forever` or `pm2` here.
Please feel free to use whatever you prefer if you need one.

### Contribution

Feel free to fork this project. Do send a pull request our way if you implement
something the world should see.

