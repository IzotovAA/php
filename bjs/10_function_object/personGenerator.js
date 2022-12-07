"use strict";

const personGenerator = {
  surnameJson: `{  
        "count": 16,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
  firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артём",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
  firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Ольга",
            "id_2": "Наталья",
            "id_3": "Елена",
            "id_4": "Мария",
            "id_5": "Марина",
            "id_6": "Алина",
            "id_7": "Юлия",
            "id_8": "Анастасия",
            "id_9": "Вероника",
            "id_10": "Галина"
        }
    }`,
  secondNameJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александров",
            "id_2": "Максимов",
            "id_3": "Иванов",
            "id_4": "Артёмов",
            "id_5": "Дмитриев",
            "id_6": "Никитов",
            "id_7": "Михаилов",
            "id_8": "Алексеев",
            "id_9": "Егоров",
            "id_10": "Андреев"
        }
    }`,
  maleJobJson: `{
        "count": 12,
        "list": {     
            "id_1": "Инженер",
            "id_2": "Водитель",
            "id_3": "Военный",
            "id_4": "Программист",
            "id_5": "Строитель",
            "id_6": "Учитель",
            "id_7": "Врач",
            "id_8": "Слесарь",
            "id_9": "Шахтёр",
            "id_10": "Лётчик",
            "id_11": "Дизайнер",
            "id_12": "Технолог"
        }
    }`,
  femaleJobJson: `{
        "count": 12,
        "list": {     
            "id_1": "Инженер",
            "id_2": "Бухгалтер",
            "id_3": "Экономист",
            "id_4": "Программист",
            "id_5": "Воспитатель",
            "id_6": "Учитель",
            "id_7": "Врач",
            "id_8": "Продавец",
            "id_9": "Медсестра",
            "id_10": "Швея",
            "id_11": "Дизайнер",
            "id_12": "Секретарь"
        }
    }`,
  monthJson: `{
        "count": 12,
        "list": {     
            "id_1": "января",
            "id_2": "февраля",
            "id_3": "марта",
            "id_4": "апреля",
            "id_5": "мая",
            "id_6": "июня",
            "id_7": "июля",
            "id_8": "августа",
            "id_9": "сентября",
            "id_10": "октября",
            "id_11": "ноября",
            "id_12": "декабря"
        }
    }`,

  GENDER_MALE: "Мужчина,",
  GENDER_FEMALE: "Женщина,",

  // генератор случайного числа от min до max
  randomIntNumber: (max = 1, min = 0) =>
    Math.floor(Math.random() * (max - min + 1) + min),
  //...

  // случайный выбор конкретного значения (id_...) из свойста объекта list
  // аргумент функции это объект JSON
  randomValue: function (json) {
    const obj = JSON.parse(json);
    const prop = `id_${this.randomIntNumber(obj.count, 1)}`; // this = personGenerator
    return obj.list[prop];
  },
  //...

  // генерация пола
  randomGender: function () {
    return this.randomIntNumber() === 1 ? this.GENDER_MALE : this.GENDER_FEMALE;
  },
  //...

  // генерация имени
  randomFirstName: function () {
    if (this.person.gender === "Мужчина,") {
      return this.randomValue(this.firstNameMaleJson);
    } else return this.randomValue(this.firstNameFemaleJson);
  },
  //...

  // генерация отчества
  randomSecondName: function () {
    if (this.person.gender === "Мужчина,") {
      return `${this.randomValue(this.secondNameJson)}ич`;
    } else return `${this.randomValue(this.secondNameJson)}на`;
  },
  //...

  // генерация фамилии
  randomSurname: function () {
    if (this.person.gender === "Мужчина,") {
      return this.randomValue(this.surnameJson);
    } else return `${this.randomValue(this.surnameJson)}а`;
  },
  //...

  // генерация дня, месяца и года рождения
  randomBirthYear: function () {
    let month = this.randomValue(this.monthJson);
    let result = "";
    if (month === "февраля") {
      result = this.randomIntNumber(28, 1);
    } else if (
      month === "апреля" ||
      month === "июня" ||
      month === "сентября" ||
      month === "ноября"
    ) {
      result = this.randomIntNumber(30, 1);
    } else result = this.randomIntNumber(31, 1);
    return (result +=
      " " + month + " " + this.randomIntNumber(2005, 1970) + " " + "года");
  },
  //...

  // генерация профессии
  randomJob: function () {
    if (this.person.gender === "Мужчина,") {
      return this.randomValue(this.maleJobJson);
    } else return this.randomValue(this.femaleJobJson);
  },
  //...

  // создание объекта для вывода информации в браузер
  getPerson: function () {
    this.person = {};
    this.person.gender = this.randomGender();
    this.person.firstName = this.randomFirstName();
    this.person.surname = this.randomSurname();
    this.person.secondName = this.randomSecondName();
    this.person.birthYear = this.randomBirthYear();
    this.person.job = this.randomJob();

    return this.person;
  },
  //...
};
