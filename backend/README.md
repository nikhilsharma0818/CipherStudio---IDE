# CipherStudio - Backend (Node.js + Express)

## Setup
1. cd backend
2. cp .env.example .env   (edit with your MongoDB and AWS creds)
3. npm install
4. npm run start

## Notes
- This backend includes sample models for Project, File, and User.
- File content is stored in MongoDB `File.content`. For production, you may store large files in S3 and keep `s3Key`.
