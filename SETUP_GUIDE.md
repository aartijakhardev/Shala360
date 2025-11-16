# 🎓 Student Admission System - Complete Setup Guide

This guide will help you set up the complete student admission system with MongoDB and Cloudinary integration.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas account)
- Cloudinary account (free tier works)

## 🚀 Quick Start

### Step 1: Clone and Install Dependencies

```bash
# Navigate to project root
cd /Users/sukrut/Downloads/edu-vue-demo-main

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**

```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo apt-get install mongodb
sudo systemctl start mongodb

# Windows
# Download and install from https://www.mongodb.com/try/download/community
```

**Option B: MongoDB Atlas (Recommended for beginners)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `myFirstDatabase` with `edu_admission`

Your connection string should look like:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/edu_admission?retryWrites=true&w=majority
```

### Step 3: Setup Cloudinary

1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up for a free account
3. Go to Dashboard
4. You'll see:
   - **Cloud Name**: `dxxxxxx`
   - **API Key**: `123456789012345`
   - **API Secret**: `xxxxxxxxxxxxxxxxxx`
5. Copy these credentials

### Step 4: Configure Environment Variables

**Backend Configuration:**

```bash
# Navigate to server directory
cd server

# Create .env file from example
cp .env.example .env

# Edit .env file with your credentials
nano .env  # or use your preferred editor
```

Add your credentials to `server/.env`:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/edu_admission

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=dxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxx

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**Frontend Configuration:**

```bash
# Navigate to project root
cd ..

# Create .env file
cp .env.example .env

# Edit .env
nano .env
```

Add to `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 5: Start the Application

**Terminal 1 - Start Backend Server:**

```bash
cd server
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0-xxxxx.mongodb.net
📊 Database: edu_admission
🚀 Server running on port 5000
```

**Terminal 2 - Start Frontend:**

```bash
# From project root
npm run dev
```

You should see:
```
  VITE ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

### Step 6: Test the Application

1. Open browser: `http://localhost:5173`
2. Navigate to Admission Form
3. Fill out the form with test data
4. Upload sample images/documents
5. Submit the form
6. Check MongoDB to see the data stored
7. Check Cloudinary dashboard to see uploaded files

## 🧪 Testing the API

### Using curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Get all admissions
curl http://localhost:5000/api/admissions

# Get stats
curl http://localhost:5000/api/admissions/stats
```

### Using MongoDB Compass (GUI):

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your MONGO_URI
3. Navigate to `edu_admission` database
4. View `students` collection

## 📁 Project Structure

```
edu-vue-demo-main/
├── src/                      # Frontend (React + TypeScript)
│   ├── pages/
│   │   └── AdmissionForm.tsx # Main admission form
│   ├── lib/
│   │   └── api.ts           # API client
│   └── ...
├── server/                   # Backend (Node.js + Express)
│   ├── config/
│   │   ├── database.js      # MongoDB config
│   │   └── cloudinary.js    # Cloudinary config
│   ├── models/
│   │   ├── Student.js       # Student schema
│   │   └── AuditLog.js      # Audit log schema
│   ├── controllers/
│   │   └── admissionController.js
│   ├── routes/
│   │   └── admissionRoutes.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── .env                 # Environment variables (create this)
│   └── server.js            # Entry point
├── .env                      # Frontend env (create this)
└── package.json
```

## 🎯 Key Features

### MongoDB Schema Features:
- ✅ Auto-generated application numbers
- ✅ Data validation (email, phone, pincode)
- ✅ Indexed fields for fast queries
- ✅ Virtual fields (e.g., age calculation)
- ✅ Timestamps (createdAt, updatedAt)
- ✅ Reference relationships

### Cloudinary Integration:
- ✅ Automatic image optimization
- ✅ Organized folder structure
- ✅ Secure file storage
- ✅ Multiple file format support
- ✅ File size management

### API Features:
- ✅ RESTful endpoints
- ✅ Pagination support
- ✅ Search and filter
- ✅ Status management
- ✅ Statistics dashboard
- ✅ Error handling

## 🐛 Common Issues & Solutions

### Issue 1: MongoDB Connection Failed

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**
- Check if MongoDB is running: `brew services list` (macOS)
- Verify MONGO_URI in `.env`
- For Atlas: Check network access whitelist (allow 0.0.0.0/0 for testing)
- Check internet connection

### Issue 2: Cloudinary Upload Failed

**Error:**
```
Error: Invalid cloud_name
```

**Solutions:**
- Verify Cloudinary credentials in `.env`
- Ensure no spaces in credential values
- Check if Cloudinary account is active
- Try regenerating API keys

### Issue 3: CORS Error

**Error:**
```
Access to fetch at 'http://localhost:5000' has been blocked by CORS policy
```

**Solutions:**
- Ensure backend server is running
- Check FRONTEND_URL in server `.env`
- Verify frontend is running on correct port
- Clear browser cache

### Issue 4: File Upload Too Large

**Error:**
```
PayloadTooLargeError: request entity too large
```

**Solutions:**
- Reduce image size before upload
- Images should be < 2MB
- Use image compression tools
- Check file format (JPG, PNG, PDF)

### Issue 5: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in server/.env
PORT=5001
```

## 📊 MongoDB Data Examples

### Sample Student Document:

```json
{
  "_id": "654abc123def456789012345",
  "studentName": "Rahul Kumar",
  "dateOfBirth": "2010-05-15T00:00:00.000Z",
  "gender": "Male",
  "bloodGroup": "B+",
  "photo": {
    "url": "https://res.cloudinary.com/xxx/image/upload/v123/edu-system/students/photos/abc.jpg",
    "publicId": "edu-system/students/photos/abc",
    "fileSize": 245678
  },
  "applicationNumber": "ADM202400001",
  "applicationStatus": "pending",
  "admission": {
    "class": "6th",
    "academicYear": "2024-25",
    "medium": "English"
  },
  "createdAt": "2024-11-16T10:30:00.000Z",
  "updatedAt": "2024-11-16T10:30:00.000Z"
}
```

## 🔐 Security Checklist

- [x] Environment variables not committed to git
- [x] Input validation on all fields
- [x] File size limits enforced
- [x] CORS properly configured
- [x] Error messages don't expose sensitive data
- [ ] Add authentication (TODO for production)
- [ ] Add rate limiting (TODO for production)
- [ ] Add request logging (TODO for production)

## 📈 Next Steps

1. **Add Authentication:**
   - Implement JWT-based auth
   - Add user roles (admin, staff)
   - Protect admin routes

2. **Email Notifications:**
   - Send confirmation emails
   - Status update notifications
   - Use services like SendGrid or Nodemailer

3. **Admin Dashboard:**
   - View all applications
   - Approve/reject applications
   - Generate reports

4. **PDF Generation:**
   - Generate admission receipts
   - Create application PDFs
   - Use libraries like PDFKit

5. **Analytics:**
   - Application trends
   - Demographics reports
   - Class-wise statistics

## 🆘 Need Help?

1. Check server logs in terminal
2. Check browser console for errors
3. Verify all environment variables
4. Test API endpoints using curl/Postman
5. Check MongoDB connection in Compass
6. Verify Cloudinary dashboard for uploads

## 📝 Development Tips

1. **Keep both servers running** during development
2. **Use MongoDB Compass** to visualize data
3. **Check Cloudinary dashboard** to verify uploads
4. **Use browser DevTools** to debug frontend
5. **Check server terminal** for backend logs
6. **Test with small images** first (< 500KB)

## ✅ Verification Checklist

- [ ] MongoDB is running and connected
- [ ] Cloudinary credentials are correct
- [ ] Backend server starts without errors
- [ ] Frontend connects to backend
- [ ] Can submit admission form
- [ ] Data appears in MongoDB
- [ ] Files appear in Cloudinary
- [ ] Can view submitted applications

## 🎉 Success!

If you've completed all steps, you should have:
- ✅ Working frontend application
- ✅ Backend server with MongoDB
- ✅ Cloudinary file storage
- ✅ Complete admission system

Congratulations! Your student admission system is now live! 🚀

