import GitHub from 'github-api';

if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_ORGANIZATION) {
  throw new Error(
    'Invalid initialization. Have you entered your organization information in the .env file?'
  );
}

const ORG = process.env.GITHUB_ORGANIZATION;

const gh = new GitHub({
  token: process.env.GITHUB_TOKEN,
});

const org = gh.getOrganization(ORG);

const FILENAME = {
  npm: 'package.json',
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

        return [...repos, result.repository];
      })
    )
    .then(repos =>
      repos.map(repo => ({
        name: repo.name,
        full_name: repo.full_name,
        url: repo.html_url,
        api_url: repo.url,
        private: repo.private,
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
