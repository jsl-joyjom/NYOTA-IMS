

## **HOW TO START THE SYSTEM**

### **Option 1: Quick Start (Recommended)**

1. **Open 2 Terminal Windows**

2. **Terminal 1 - Frontend:**
   ```bash
   cd C:\Users\Joel\Desktop\NYOTA
   npm run dev
   ```

3. **Terminal 2 - Backend:**
   ```bash
   cd C:\Users\Joel\Desktop\NYOTA\server
   npm run postgres
   ```

4. **Open Browser:**
   - Go to: **http://localhost:3000**

### **Option 2: Simple Mode (No Database)**

1. **Terminal 1 - Frontend:**
   ```bash
   cd C:\Users\Joel\Desktop\NYOTA
   npm run dev
   ```

2. **Terminal 2 - Backend:**
   ```bash
   cd C:\Users\Joel\Desktop\NYOTA\server
   npm run simple
   ```

---

## 🔑 **TEST CREDENTIALS**

### **Login Credentials:**
- **ID Number**: `12345678`
- **Password**: `password`
- **Email**: `john.doe@example.com`

### **Registration Test:**
- Use any valid ID number
- Any email format
- Any phone number
- Any password

---

## 🌐 **ACCESS POINTS**

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **API Documentation**: http://localhost:3001/api

---

## 📱 **FEATURES TO TEST**

### **✅ Working Features:**
1. **Landing Page** - Beautiful UI with proper text fitting
2. **Registration** - ID-based signup with validation
3. **Login** - JWT authentication with mock credentials
4. **Dashboard** - Complete overview with real data
5. **Training Module** - Course enrollment and progress
6. **Savings Dashboard** - Charts and analytics
7. **Entrepreneurship** - Business ideas and grants
8. **Messages** - Communication with MSME Department
9. **Marketplace** - Product showcasing

### **🔧 Backend API Endpoints:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification
- `GET /api/user/profile` - User profile
- `GET /api/user/dashboard` - Dashboard data
- `GET /api/training/courses` - Training courses
- `GET /api/savings/account` - Savings data
- `GET /api/entrepreneurship/business-ideas` - Business ideas
- `GET /api/communication/messages` - Messages
- `GET /api/market/products` - Marketplace products

---

## 🛠️ **TROUBLESHOOTING**

### **If Frontend Won't Start:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### **If Backend Won't Start:**
```bash
# Check if port 3001 is free
netstat -an | findstr :3001

# Kill process on port 3001
npx kill-port 3001

# Try simple mode
cd server
npm run simple
```

### **If Database Connection Fails:**
- The system automatically falls back to mock data
- No database setup required for testing
- All features work with mock data

### **If UI Looks Broken:**
- Clear browser cache (Ctrl+F5)
- Check browser console for errors
- Ensure both frontend and backend are running

---

## 🎯 **NEXT STEPS**

Once the system is running:

1. **Test Registration Flow:**
   - Go to http://localhost:3000/register
   - Fill in the form with test data
   - Complete OTP verification (mock)

2. **Test Login Flow:**
   - Use credentials: ID `12345678`, Password `password`
   - Access the dashboard

3. **Explore Features:**
   - Navigate through all dashboard modules
   - Test training enrollment
   - Check savings analytics
   - Submit business ideas

4. **Customize:**
   - Modify styling in `src/app/globals.css`
   - Add new features in dashboard modules
   - Update mock data in backend

---

## 📊 **SYSTEM STATUS**

- ✅ **Frontend**: Next.js 14 with TypeScript
- ✅ **Backend**: Node.js with Express
- ✅ **Database**: PostgreSQL (with mock fallback)
- ✅ **Authentication**: JWT with bcrypt
- ✅ **UI**: Tailwind CSS with responsive design
- ✅ **API**: RESTful endpoints with CORS
- ✅ **Charts**: Chart.js for analytics
- ✅ **Forms**: React Hook Form with validation

---

**🌟 The Nyota Platform is now fully functional and ready for testing!**
