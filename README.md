# Todo on pure js

---

## [Link to todo(demo)](https://junfrenkixp.github.io/todo-js/)


---

### Процесс разработки

Изначально todo делался с помощью делегирования событий и тп, то есть без каких либо данных. Если таск удалялся, то он удалялся из вёрстки и навсегда. 
Так и планировалось изначально. Но потом я решил сделать фильтры по типу "выполненные", "активные". Без проблем делалось одно без другого. 
Если фильтровались выполненные, то никаких других больше не оставалось. Тогда я начал искать решение. Сделал массив тасков, которые добавляются из главного инпута. Круто. 
Теперь я мог не переживать за удаление таски из вёрстки, ведь она у меня есть в массиве и ничего с ней не случилось. 
Потом возник вопрос о полном удалении таски, чтобы её нельзя было вернуть. С этим возникла проблема, ведь сама таска в массиве - это объект, а объект удалить нельзя.
Тогда я додумался до такого решения: для удалённой таски я буду давать свойство deleted = true. Окей, теперь я знаю, какая таска удалена навсегда, 
больше она не будет рендериться (потому что я так хочу, ну и потому что сделал проверку на это свойство, если есть, то не рендерим). Без понятия насколько это решение верное, 
но работает и хорошо. Затем в процессе разработки возникла проблема: таски рендерятся не потому что в массиве они есть, а потому что я их создаю (пихаю в массив новую таску) 
и сразу рендерю. Пока что исправил поставив рендер всех тасков в массиве при ините. Может придумаю что-то лучше. Но явно не сейчас.
По поводу изменения статуса таски: у меня уже был скрипт, который меняет ей класс при клике на кнопку, теперь нужно добавить изменение статуса в объекте. 
Выходит повторение одного и того же кода: получаю id таски, на которую кликнул, прочесал массив тасок, нашёл нужную, поменял там статус. Ну такоое.
Поскльку у меня по сути только 2 статуса исключая 'active', то решил сделать новый метод, в который просто буду передавать строку 'done' или 'undone'; 
а уже в этом методе всё будет менятся. Избежал повторения кода, да и понятнее стало. Теперь новая проблема: таски рендерятся без нужных классов, если таска имеет 
какое-то состояние, логично, ведь я вставляю её через innerHTML = `task` и там нет никаких условий. Раньше я создавал вёрстку таски js'ом, думаю вернуть этот вариант 
и поставить условия. Всё таки решил не возвращать старый вариант; сделал новую переменную, где определяю статус таски и с помощью условных операторов "?" 
возвращаю строку с названием класса. Эту строку вставляю в генерируемую вёрстку. Работает, отлично.
Возник следующий недуг: старое исправление таски не перезаписывает исправленное в наш объект. Идём по тому же пути, находим нашу таску по id и исправляем 
в ней то, что нужно исправить. Исправил, работает, отлично. В этом же блоке о исправлениях: логично, что после ввода в инпут, легче нажать Enter, 
чтобы таска исправилась, но у меня нужно нажать на нужную иконку. Это как бы нормально, но всё равно на Enter хочется нажать и чтобы всё заработало.
Сделаю как-нибудь, возможно, когда-нибудь, потом.	 
Хорошо, теперь нужно реализовать фильтры, которые у меня есть, их всего 2: выполненные и активные. Делаем новые методы и думаем наперёд; фильтры будут фильтровать массив наших тасков 
по состоянию, окей, значит можно сделать общий метод, куда из "дочерник" уточняющих методов будет передоваться нужное нам состояние в виде строки. Готово, теперь нужно сделать "дополнительный" фильтр, который будет показывать все таски, то бишь возвращать в первоначальное состояние. Без проблем, создаём метод, который просто рендерит все таски при нажатии на кнопку. Готово. 
Ну и на последок можно сделать адаптив.