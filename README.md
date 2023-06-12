﻿# Task-Manager-TS

Данный проект является аналогом Trello.
Стек  - React(hooks), typescript, redux(thunk), css module, webSocket, nodeJs, express.

На данный момент реализована версия 3.0 приложения
 
https://github.com/SergeyShabalin/Task-Manager-TS/assets/95097311/9da5f538-e8f0-4be0-842d-5a9b25eca418

#Главные изменения
-Добавлен drag and drop колонок
-Реализован профайл пользователя с возможностью загрузки аватара и кастомизации обоев
-В профайле так же присутствует возможность смены пароля или email, так же изменение\добавление доп информации о пользователе
-Приложение теперь работает через веб-сокеты. Обновление информации у пользователей происходит в режиме реального времени
-К карточке теперь можно привязать участников через отдельное меню на самой карточке. Выбор происходит среди участников доски. Присутствует поиск участников через debounce
-Из списка участников на карточке или доске можно перейти в профайл любого пользователя для просмотра доп информации об участнике
-Срок(дедлайн) карточки и задачи карточки теперь добавляются так же через отдельное меню карточки. 
-Из задачи теперь можно преобразовать отдельную карточку
-Появилась возможность скрытия\показа выполненных задач у карточки
-Добавлены notification типа submit и warning(подверждающие и предупреждающие) помимо error(ошибок)

Демонстрацию разрабатываемого проекта версии 2.0 можно посмотреть в видео ниже
 
https://github.com/SergeyShabalin/Task-Manager-TS/assets/95097311/5891b809-5048-4e21-a8d7-94c0a36d869d

Изменения: 
- Добавлена возможность поделиться доской с другими пользователями
- У пользователей есть список уведомлений, в котором можно принять приглашение от другого пользователя
- В меню приглашения выведен список пользователей текущей доски
- Появилось меню "учетная запись" с информацией о текущем пользователе и дублированием кнопок выхода из учетной записи и в меню рабочих пространств
- Добавлены лоадеры на загрузку досок, текущей доски и подробной информации карточки
- Изменён дизайн контекстного меню колонки

В версии 1.0 реализован следующий функционал:
- регистрация, авторизация
- создание новой рабочей доски
- получение списка всех доступных досок пользователя
- создание\редактирование\удаление колонок
- создание\редактирование\удаление карточек 
- просмотр карточки
- установка дедлайна\описания карточки 
- добавление\удаление\редактирование подзадач карточки 
- drag and drop карточек
- возможность смены доски у пользователя





