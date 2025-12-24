require('dotenv').config();
console.log('Имя:', process.env.FIRST_NAME);
console.log('Фамилия:', process.env.LAST_NAME);
console.log('Группа:', process.env.GROUP);
console.log('Номер в списке:', process.env.NUMBER);
console.log('Текущий режим:', process.env.MODE);
console.log('Режим доступа:', process.env.ACCESS_MODE);