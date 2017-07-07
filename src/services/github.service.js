import axios from 'axios';
import GitHub from 'github-api';

if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_ORGANIZATION) {
  throw new Error(
    'Invalid initialization. Have you entered your organization information in the .env file?'
  );
}

const ORG = process.env.GITHUB_ORGANIZATION;
const TOKEN = process.env.GITHUB_TOKEN;

const gh = new GitHub({
  token: TOKEN,
});

const org = gh.getOrganization(ORG);

const FILENAME = {
  npm: 'package.json',
};

const getSnippet = (query, packageJson) => {
  const results = [];
  const dependencies = packageJson.dependencies;
  const devDependencies = packageJson.devDependencies;

  const pacInDep = Object.keys(dependencies).filter(
    p => p.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  if (pacInDep.length > 0) {
    pacInDep.forEach(pac =>
      results.push({
        package: pac,
        version: dependencies[pac],
      })
    );
  }

  const pacInDevDep = Object.keys(devDependencies).filter(
    p => p.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  if (pacInDevDep.length > 0) {
    pacInDevDep.forEach(pac =>
      results.push({
        package: pac,
        version: devDependencies[pac],
      })
    );
  }

  return results;
};

export const getOrganizationRepos = () => {
  return org.getRepos().then(response =>
    response.data.map(repo => ({
      name: repo.name,
      full_name: repo.full_name,
      url: repo.html_url,
      api_url: repo.url,
      private: repo.private,
    }))
  );
};

export const searchInNpm = query => {
  const resultRepos = new Set();

  return gh
    .search()
    .forCode({
      q: buildSearchQuery(query, {
        filename: FILENAME['npm'],
      }),
    })
    .then(results =>
      results.data.reduce((repos, result) => {
        if (resultRepos.has(result.repository.full_name)) {
          return repos;
        }

        resultRepos.add(result.repository.full_name);

        return [
          ...repos,
          Object.assign({}, result.repository, {
            fileUrl: result.html_url,
          }),
        ];
      })
    )
    .then(repos =>
      Promise.all(
        repos.map(repo =>
          axios
            .get(
              repo.fileUrl
                .replace('blob/', '')
                .replace('github.com', 'raw.githubusercontent.com'),
              {
                headers: {
                  Authorization: `token ${TOKEN}`,
                },
              }
            )
            .then(response => getSnippet(query, response.data))
            .then(snippet =>
              Object.assign({}, repo, {
                snippet,
              })
            )
        )
      )
    )
    .then(repos =>
      repos.map(repo => ({
        name: repo.name,
        fullName: repo.full_name,
        url: repo.html_url,
        apiUrl: repo.url,
        private: repo.private,
        description: repo.description,
        fileUrl: repo.fileUrl,
        snippet: repo.snippet,
      }))
    )
    .catch(err => {
      console.error(err); // eslint-disable-line no-console
    });
};

const buildSearchQuery = (q, { filename }) => {
  const query = [];
  query.push(q);
  query.push(`user:${ORG}`);
  filename && query.push(`filename:${filename}`);

  return query.join(' ');
};

export default {
  getOrganizationRepos,
  searchInNpm,
};
