const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'dhtn8py6',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function checkSlugs() {
  const query = '*[_type == "project"] { title, "slug": slug.current }';
  const projects = await client.fetch(query);
  console.log('Projects and Slugs:');
  console.log(JSON.stringify(projects, null, 2));
}

checkSlugs();
