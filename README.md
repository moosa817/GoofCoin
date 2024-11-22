# GoofCoin

GoofCoin is a blockchain-powered virtual currency platform built using Django and React. It features secure user authentication, transaction management, and a modern, responsive user interface.

## Features

- Blockchain-based transaction system with secure RSA encryption.
- User-friendly registration and login using JWT authentication.
- Dynamic and responsive frontend with React and Tailwind CSS.
- API documentation using DRF Spectacular (Swagger).
- Cloud storage support via AWS S3.

## Technologies Used

### Backend
- **Django** with Django REST Framework (DRF)
- **PostgreSQL** for database management
- **JWT** for authentication
- **Gunicorn** and **Whitenoise** for production-ready deployment
- **AWS S3** for static and media file storage

### Frontend
- **React** with React Router for seamless navigation
- **Material-UI (MUI)** and **Tailwind CSS** for styling and UI components
- **Vite** for optimized builds and development

### Tools
- **ESLint** for code linting
- **SendGrid** for email notifications

## Installation

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/moosa817/goofcoin.git
   cd goofcoin
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv env
   source env/bin/activate
   pip install -r requirements.txt
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory with the following placeholders:
   ```env
   SECRET_KEY="your-django-secret-key"
   DEBUG=True
   GUEST_PWD="your-guest-password"
   DATABASE_URL="your-database-url"
   AWS_ACCESS_KEY_ID="your-aws-access-key-id"
   AWS_SECRET_ACCESS_KEY="your-aws-secret-access-key"
   AWS_STORAGE_BUCKET_NAME="your-aws-s3-bucket-name"
   CLOUDFRONT_DOMAIN="your-cloudfront-domain"
   SENDGRID_API_KEY="your-sendgrid-api-key"
   SYSTEM_PRIVATE_KEY="your-system-private-key"
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
- After completing the setup, run the backend server:
   ```bash
   python manage.py runserver
   ```
- Access the application at `http://localhost:8000` (backend) or `http://localhost:5173` (frontend).

## Deployment
- Ensure all production settings, such as `DEBUG=False` and properly configured AWS S3 storage, are in place.
- Use `Gunicorn` as the WSGI server and deploy using services like AWS, Heroku, or Vercel for optimal performance.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
Made with ❤️ by [moosa817](https://github.com/moosa817).
