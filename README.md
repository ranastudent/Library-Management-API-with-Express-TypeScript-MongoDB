
Video Link :  https://www.loom.com/share/78256f347dd242dcb13f342a1d61c4cd?sid=c2c4ac97-8f1b-4535-9318-f0498a77b4a6



🚀 Run Locally

1️⃣ Clone the Repository
git clone https://github.com/ranastudent/Library-Management-API-with-Express-TypeScript-MongoDB.git
cd Library-Management-API-with-Express-TypeScript-MongoDB

2️⃣ Install Dependencies
npm install

3️⃣ Set Up Environment Variables
PORT=5000
DATABASE_URL=your_mongodb_connection_uri

4️⃣ Run the Project
For Development:
This will run the TypeScript code directly using ts-node-dev:
npm run dev

✅ Tools Required
* Node.js (v18 or above recommended)
* MongoDB installed locally or use a cloud DB (e.g., MongoDB Atlas)

📌 Features

✅ Create Book

Add new books with validation (title, author, genre, ISBN, etc.)

🔍 Get All Books
Supports filtering by genre, sorting (asc/desc), and result limiting.

📄 Get Book by ID
Retrieve full details of a specific book by its MongoDB ID.

📝 Update Book
Update any field of a book, including available copies.

❌ Delete Book
Permanently remove a book from the database.

📚 Borrow a Book

Verifies if enough copies are available.

Deducts the quantity from the book’s total.

Sets available to false when copies become 0.

Implements Mongoose instance method for availability control.

📊 Borrow Summary (Aggregation)

Returns total quantity borrowed for each book.

Includes book title and ISBN.

Built using MongoDB Aggregation Pipeline.

⚙️ Proper Validation & Error Handling

Uses zod for schema validation.

Custom error responses match expected structure.

🧩 Clean Architecture

Follows MVC pattern (Models, Controllers, Routes).

Uses separate interfaces, utils, and middlewares.

🌱 MongoDB & Mongoose Integration

Connected to MongoDB via Mongoose.

Uses built-in timestamps and data relations.

