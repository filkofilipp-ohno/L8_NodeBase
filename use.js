const path = require('path');
const {
  loadJson,
  sortStringsIgnoreSpaces,
  writeFile,
  createDir
} = require('./customModules');

(async () => {
  const { data, error } = await loadJson('https://jsonplaceholder.typicode.com/users');
  if (error) {
    console.error('Ошибка загрузки:', error);
    return;
  }

  const names = data.map(u => u.name);
  const emails = data.map(u => u.email);

  const sortedNames = sortStringsIgnoreSpaces(names);

  const usersDir = path.join(process.cwd(), 'users');
  await createDir(usersDir);
  await writeFile(path.join(usersDir, 'names.txt'), sortedNames.join('\n'));
  await writeFile(path.join(usersDir, 'emails.txt'), emails.join('\n'));

  console.log('Файлы users/names.txt и users/emails.txt созданы.');
})();
