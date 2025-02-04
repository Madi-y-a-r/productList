📦 E-Commerce Store (Next.js + Redux + React Query)
Этот проект — это e-commerce приложение, построенное с использованием Next.js, Redux, React Query и Tailwind CSS.

🚀 Установка и запуск проекта
1️⃣ Клонирование репозитория
sh
Копировать
Редактировать
git clone https://github.com/your-repo/ecommerce-store.git
cd ecommerce-store
2️⃣ Установка зависимостей
sh
Копировать
Редактировать
yarn install
3️⃣ Запуск в режиме разработки
sh
Копировать
Редактировать
yarn dev
После этого проект будет доступен по адресу http://localhost:3000

⚙️ Конфигурация окружения
Перед запуском убедись, что у тебя есть файл .env.local, содержащий нужные переменные окружения.

Создай .env.local и добавь:

ini
Копировать
Редактировать
NEXT_PUBLIC_API_URL=http://your-api-url.com
Замени http://your-api-url.com на реальный API.

🛠️ Дополнительные команды
📦 Сборка проекта
sh
Копировать
Редактировать
yarn build
Собирает проект для продакшена.

✅ Запуск в продакшене
sh
Копировать
Редактировать
yarn start
После сборки можно запустить Next.js сервер.

🔍 Линтинг кода
sh
Копировать
Редактировать
yarn lint
Проверяет код на ошибки и предупреждения.

🧹 Форматирование кода
sh
Копировать
Редактировать
yarn format
Форматирует код (если используется Prettier).

📂 Структура проекта
bash
Копировать
Редактировать
📂 ecommerce-store
├── 📂 components       # UI-компоненты (Cart, Header, ProductGrid, SearchBar)
├── 📂 lib              # Конфигурация Redux и API-запросов
├── 📂 pages            # Next.js страницы
├── 📂 store            # Redux slices
├── .env.local.example  # Пример файла конфигурации
├── .gitignore          # Игнорируемые файлы Git
├── package.json        # Описание проекта и зависимости
├── tailwind.config.js  # Настройки Tailwind CSS
└── tsconfig.json       # Конфигурация TypeScript
📌 Технологии
🚀 Next.js — React framework для SSR и SSG
🏪 Redux Toolkit — Управление состоянием приложения
🔄 React Query — Запросы к API с кешированием
🎨 Tailwind CSS — Стилизация UI
⚙️ TypeScript — Безопасность типов
👨‍💻 Автор
🛠 Твой ник или имя
📧 Email: your-email@example.com
📌 GitHub
