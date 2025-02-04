productList (Next.js + Redux + React Query)

Этот проект — это e-commerce приложение, созданное с использованием Next.js, Redux Toolkit, React Query и Tailwind CSS.

Установка и запуск проекта:

Клонируй репозиторий: git clone https://github.com/your-repo/productList.git и перейди в папку проекта cd productList.
Установи зависимости с помощью yarn install.
Запусти проект в режиме разработки командой yarn dev. После этого проект будет доступен по адресу http://localhost:3000.
Конфигурация окружения:

Перед запуском убедись, что у тебя есть файл .env.local, содержащий нужные переменные окружения. Создай .env.local и добавь 
NEXT_PUBLIC_API_URL=https://my-json-server.typicode.com/Madi-y-a-r/mockData


Дополнительные команды:

Для сборки проекта используй yarn build.
Для запуска в продакшене yarn start (после сборки).
Для проверки кода на ошибки yarn lint.
Для форматирования кода yarn format (если используется Prettier).

В проекте есть папки components (UI-компоненты, такие как Cart, Header, ProductGrid, SearchBar), lib (конфигурация Redux и API-запросов), pages (страницы Next.js), store (Redux slices) и другие файлы, такие как package.json, .gitignore, tailwind.config.js и .env.local.example (пример файла конфигурации).
