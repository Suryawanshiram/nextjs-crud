# AI CRUD App - Todo Management System

A modern, full-stack CRUD application built with Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, and MongoDB. Experience the future of task management with AI-powered features.

![Hero Section](image1.png)
*Experience Future of Dining with AI CRUD App*<img width="1903" height="929" alt="Screenshot 2026-01-20 225950" src="https://github.com/user-attachments/assets/f77df5f9-233c-4543-954c-c97ca6f6c300" />


## 📸 Screenshots

### Todo List View
![Todo List](image3.png)
*Responsive todo list with card-based <img width="1678" height="915" alt="Screenshot 2026-01-20 223750" src="https://github.com/user-attachments/assets/72288229-68cf-4439-964a-cf1877586ad6" />
layout*

### Edit Todo Modal
![Edit Todo](image2.png)
*Clean and intuitive edit i<img width="1697" height="924" alt="Screenshot 2026-01-20 223811" src="https://github.com/user-attachments/assets/57e1ca68-b6ec-4616-bb27-d251270b576b" />
nterface*

### Updated Hero
![Updated Hero](image4.png)
*Explore our todos feature*

## ✨ Features

- **Full CRUD Operations** - Create, Read, Update, and Delete todos
- **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- **Responsive Design** - Works seamlessly on all devices
- **Type Safety** - Full TypeScript implementation
- **Server-Side Rendering** - Powered by Next.js 15
- **MongoDB Integration** - Efficient data storage and retrieval
- **Real-time Updates** - Instant UI updates after operations
- **Search Functionality** - Filter todos by title or description
- **Clean Architecture** - Well-organized code structure

## 🚀 Tech Stack

- **Framework:** Next.js 15
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Database:** MongoDB
- **Icons:** Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm or yarn or pnpm
- MongoDB (local or Atlas)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-crud-app.git
cd ai-crud-app
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=your_database_name
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├─ app/
│  ├─ layout.tsx
│  ├─ globals.css
│  ├─ page.tsx                  # landing
│  │
│  ├─ (auth)/
│  │  ├─ login/
│  │  │  └─ page.tsx
│  │  ├─ signup/
│  │  │  └─ page.tsx
│  │  └─ layout.tsx             # auth layout
│  │
│  ├─ (dashboard)/
│  │  ├─ layout.tsx             # protected layout
│  │  ├─ dashboard/
│  │  │  └─ page.tsx
│  │  └─ items/                 # CRUD entity
│  │     ├─ page.tsx            # list
│  │     ├─ new/page.tsx        # create
│  │     └─ [id]/page.tsx       # update
│  │
│  └─ api/
│     └─ auth/[...nextauth]/route.ts
│
├─ components/
│  ├─ ui/                       # shadcn
│  ├─ Navbar.tsx
│  └─ ItemForm.tsx
│
├─ lib/
│  ├─ db.ts
│  ├─ auth.ts
│  └─ validators.ts
│
├─ models/
│  ├─ User.ts
│  └─ Item.ts
│
├─ services/
│  └─ item.service.ts
│
├─ actions/
│  ├─ auth.actions.ts
│  └─ item.actions.ts
│
├─ middleware.ts
└─ types/
   └─ index.ts

```

## 🔌 API Endpoints

### Get All Todos
```
GET /api/todos
```

### Create Todo
```
POST /api/todos
Content-Type: application/json

{
  "title": "Todo title",
  "description": "Todo description"
}
```

### Update Todo
```
PUT /api/todos
Content-Type: application/json

{
  "id": "todo_id",
  "title": "Updated title",
  "description": "Updated description"
}
```

### Delete Todo
```
DELETE /api/todos?id=todo_id
```

## 💾 Database Schema

```typescript
interface Todo {
  _id: ObjectId;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🎨 Components

### TodoCard
Individual todo card with edit and delete functionality.

### TodoList
Grid layout displaying all todos with responsive design.

### EditTodoModal
Modal dialog for editing todo details with form validation.

## 🔧 Configuration

### Tailwind CSS
The project uses a custom Tailwind configuration with shadcn/ui theming.

### TypeScript
Strict mode enabled for maximum type safety.

## 📝 Usage Examples

### Creating a Todo
1. Click the "Add Todo" button
2. Fill in the title and description
3. Click "Save"

### Editing a Todo
1. Click the edit icon on any todo card
2. Modify the fields in the modal
3. Click "Save" to update

### Deleting a Todo
1. Click the delete icon on any todo card
2. Confirm the deletion

### Searching Todos
1. Use the search bar to filter by title or description
2. Results update in real-time

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS
- DigitalOcean

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@RamSuryawanshi](https://github.com/Suryawanshiram)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Lucide Icons](https://lucide.dev/)

## 📞 Support

If you have any questions or need help, please open an issue or contact me directly.

---

⭐ If you found this project helpful, please consider giving it a star!
