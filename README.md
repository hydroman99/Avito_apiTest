# Автотесты для микросервиса объявлений

Этот проект содержит набор автотестов для микросервиса, который управляет объявлениями. Микросервис предоставляет 4 основные ручки (endpoints) для создания, получения и анализа объявлений. Автотесты написаны с использованием связки axios+jest

## Описание микросервиса

Микросервис позволяет:

- Создавать объявления.
- Получать объявление по его идентификатору.
- Получать все объявления по идентификатору продавца.
- Получать статистику по идентификатору объявления.

**Хост:** [https://qa-internship.avito.com](https://qa-internship.avito.com)

## Установка и настройка

### Предварительные требования

- Установите Node.js (версия 16 или выше).
- Установите npm (обычно поставляется вместе с Node.js).
- Убедитесь, что у вас есть доступ к серверу микросервиса ([https://qa-internship.avito.com](https://qa-internship.avito.com)).

### Установка зависимостей

1. Склонируйте репозиторий:
   
   git clone <ваш-репозиторий>
   

2. Перейдите в директорию проекта:
   
   cd <директория-проекта>
   

3. Установите зависимости:
   
   npm install
   

## Запуск автотестов

Для запуска всех автотестов выполните команду:

npm run test

### Что происходит при запуске:

- Запускаются все тесты, описанные в проекте.
- Результаты тестов выводятся в консоль.
- В случае успешного прохождения всех тестов вы увидите сообщение о том, что все тесты пройдены.
- В случае ошибок вы получите подробный отчёт о том, какие тесты не прошли и почему.

## Структура проекта

### Основные файлы и директории

- **tests/**: Директория с тестами.
- **test.js**: Основной файл с тестами.
- **src/utils/**: Вспомогательные функции для работы с API.
- **functions.js**: Функции для взаимодействия с ручками микросервиса.
- **package.json**: Файл с зависимостями и скриптами.
- **README.md**: Этот файл.

## Используемые библиотеки

- **jest**: Фреймворк для запуска тестов.
- **axios**: Для выполнения HTTP-запросов к микросервису.
- **@faker-js/faker**: Для генерации тестовых данных (например, случайных sellerID).
