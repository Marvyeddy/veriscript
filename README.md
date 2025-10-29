# Healthcare Platform - Complete Documentation

A comprehensive healthcare management platform connecting patients, doctors, pharmacies, and administrators. Built with Next.js, MongoDB, and modern web technologies.

## 🏥 Platform Overview

This platform facilitates healthcare delivery through:
- **Patients**: Book appointments, pay for consultations, receive diagnoses, and get referred to pharmacies
- **Doctors**: Manage appointments, diagnose patients, create prescriptions, and refer patients to pharmacies
- **Pharmacies**: Receive referrals from doctors, manage inventory, and serve referred patients
- **Admins**: Manage all users, verify healthcare professionals, and monitor platform activity

---

## 🎯 Core Features

### 1. **User Management & Authentication**
- **Multi-role system**: Patient, Doctor, Pharmacist, Admin
- **Secure authentication**: Email/password with bcrypt hashing
- **Profile management**: Upload profile pictures, update personal information
- **Online status tracking**: Real-time online/offline status with last online timestamps
- **Location tracking**: GPS coordinates for distance calculations

**Files**: 
- `lib/models/user.ts` - User schema with roles and verification
- `app/api/auth/register/route.ts` - Registration endpoint
- `app/api/auth/login/route.ts` - Login endpoint
- `app/api/user/profile/route.ts` - Profile management
- `app/api/user/online-status/route.ts` - Online status tracking

### 2. **Doctor Management**
- **Doctor profiles**: Specialization, license, experience, bio, consultation fees
- **Availability management**: Set working hours and availability slots
- **Verification system**: Pending/Verified/Rejected status
- **Rating system**: Patient reviews and ratings
- **Online status**: Shows if doctor is currently available

**Files**:
- `lib/models/doctor.ts` - Doctor schema
- `app/api/doctors/route.ts` - List all doctors
- `app/api/doctors/[id]/route.ts` - Get specific doctor details
- `app/dashboard/doctor/page.tsx` - Doctor dashboard
- `components/doctor/doctor-status-badge.tsx` - Online status display

### 3. **Pharmacy Management**
- **Pharmacy profiles**: Name, license, address, location, operating hours
- **Location-based discovery**: Find nearby pharmacies with distance calculation
- **Verification system**: Pending/Verified/Rejected status
- **Rating system**: Customer reviews and ratings
- **Referral management**: Receive and manage doctor referrals

**Files**:
- `lib/models/pharmacy.ts` - Pharmacy schema
- `app/api/pharmacy/nearby/route.ts` - Find nearby pharmacies with distance
- `app/dashboard/pharmacy/page.tsx` - Pharmacy dashboard
- `components/pharmacy/referral-list.tsx` - Manage referrals
- `lib/utils/distance.ts` - Haversine distance calculation

### 4. **Appointment & Consultation System**
- **Appointment booking**: Patients book appointments with doctors
- **Time slot management**: Doctors set available time slots
- **Appointment status**: Scheduled, Completed, Cancelled
- **Consultation fees**: Configurable per doctor

**Files**:
- `lib/models/appointment.ts` - Appointment schema
- `app/api/appointments/route.ts` - Create and retrieve appointments
- `components/payment/appointment-booking.tsx` - Booking interface
- `hooks/use-appointments.ts` - Appointment management hook

### 5. **Payment System**
- **Payment processing**: Card, Wallet, UPI methods
- **Transaction tracking**: Unique transaction IDs
- **Payment status**: Pending, Completed, Failed
- **Consultation fee collection**: Automatic payment for appointments

**Files**:
- `lib/models/payment.ts` - Payment schema
- `app/api/payments/route.ts` - Process payments
- `components/payment/payment-modal.tsx` - Payment UI
- `hooks/use-payments.ts` - Payment management hook

### 6. **Prescription Management**
- **Digital prescriptions**: Created by doctors after diagnosis
- **Medication details**: Name, dosage, frequency, duration
- **Doctor notes**: Additional instructions or warnings
- **Prescription history**: Patients can view all prescriptions

**Files**:
- `lib/models/prescription.ts` - Prescription schema
- `app/api/prescriptions/route.ts` - Create and retrieve prescriptions
- `hooks/use-prescriptions.ts` - Prescription management hook

### 7. **Doctor-to-Pharmacy Referral System** ⭐
The core feature enabling healthcare coordination:

#### **How It Works**:
1. **Patient pays** for consultation with doctor
2. **Doctor diagnoses** the patient
3. **Doctor selects pharmacy** and sends referral with diagnosis
4. **Pharmacy receives** referral and prepares for patient
5. **Patient views** referral status and pharmacy location
6. **Pharmacy manages** referral (accept/reject/complete)

#### **Key Points**:
- Only doctors can create referrals
- Only pharmacies can accept/reject referrals
- Patients cannot directly chat with pharmacies
- No payment to pharmacies on the app
- Referrals include diagnosis, doctor's message, and notes
- Pharmacies can see patient details and appointment history

**Files**:
- `lib/models/referral.ts` - Referral schema
- `app/api/referrals/create/route.ts` - Doctor creates referral
- `app/api/referrals/pharmacy/route.ts` - Pharmacy views referrals
- `app/api/referrals/[id]/status/route.ts` - Update referral status
- `app/api/referrals/patient/route.ts` - Patient views referrals
- `components/doctor/referral-modal.tsx` - Doctor referral interface
- `components/pharmacy/referral-list.tsx` - Pharmacy referral management
- `components/patient/referral-status.tsx` - Patient referral view
- `hooks/use-referrals.ts` - Referral management hook

### 8. **Admin Dashboard**
- **User management**: View all users with filtering
- **Verification controls**: Verify/unverify doctors and pharmacists
- **Statistics**: Total users, doctors, pharmacists, patients, verified users, online users
- **Search functionality**: Find users by name or email
- **User filtering**: Filter by user type (patient, doctor, pharmacist)

**Files**:
- `app/dashboard/admin/page.tsx` - Admin dashboard
- `app/api/admin/users/route.ts` - Get all users
- `app/api/admin/verify/route.ts` - Verify/unverify users

### 9. **Profile Management**
- **Profile picture upload**: All users can upload profile pictures
- **Dynamic profile data**: No hardcoded data
- **User information**: Display all user details from database
- **Profile editing**: Update personal information

**Files**:
- `app/dashboard/profile/page.tsx` - User profile page
- `components/profile/profile-picture-upload.tsx` - Upload component
- `app/api/upload/profile-picture/route.ts` - Upload endpoint

### 10. **Verification System**
- **Doctor verification**: Admins verify doctor credentials
- **Pharmacist verification**: Admins verify pharmacy licenses
- **Verification status**: Pending, Verified, Rejected
- **Toast notifications**: Users notified of verification status
- **Verification reason**: Optional reason for rejection

**Files**:
- `app/api/admin/verify/route.ts` - Verification endpoint
- `components/common/RegisterDoctor.tsx` - Doctor registration with toast
- `components/common/Pharmacist.tsx` - Pharmacist registration with toast

---

## 📁 Project Structure

\`\`\`
healthcare-platform/
├── app/
│   ├── api/                          # API routes
│   │   ├── admin/                    # Admin endpoints
│   │   ├── appointments/             # Appointment management
│   │   ├── auth/                     # Authentication
│   │   ├── doctors/                  # Doctor endpoints
│   │   ├── payments/                 # Payment processing
│   │   ├── pharmacy/                 # Pharmacy endpoints
│   │   ├── prescriptions/            # Prescription management
│   │   ├── referrals/                # Referral system
│   │   ├── upload/                   # File uploads
│   │   └── user/                     # User endpoints
│   ├── dashboard/                    # Protected dashboard routes
│   │   ├── admin/                    # Admin dashboard
│   │   ├── doctor/                   # Doctor dashboard
│   │   ├── pharmacy/                 # Pharmacy dashboard
│   │   ├── profile/                  # User profile
│   │   └── wallet/                   # Wallet management
│   ├── onboarding/                   # Registration flows
│   │   ├── register/                 # Patient registration
│   │   ├── doctorRegister/           # Doctor registration
│   │   ├── pharmacistRegister/       # Pharmacist registration
│   │   └── signin/                   # Login page
│   ├── globals.css                   # Global styles
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # Home page
├── components/
│   ├── admin/                        # Admin components
│   ├── auth/                         # Auth components
│   ├── common/                       # Shared components
│   ├── doctor/                       # Doctor-specific components
│   ├── home/                         # Home page components
│   ├── patient/                      # Patient-specific components
│   ├── payment/                      # Payment components
│   ├── pharmacy/                     # Pharmacy components
│   ├── profile/                      # Profile components
│   ├── providers/                    # Context providers
│   ├── theme-provider.tsx            # Theme configuration
│   └── ui/                           # shadcn/ui components
├── hooks/
│   ├── use-appointments.ts           # Appointment management
│   ├── use-auth.ts                   # Authentication
│   ├── use-doctors.ts                # Doctor queries
│   ├── use-geolocation.ts            # Location services
│   ├── use-online-status.ts          # Online status
│   ├── use-payments.ts               # Payment management
│   ├── use-prescriptions.ts          # Prescription management
│   ├── use-referrals.ts              # Referral management
│   └── use-toast.ts                  # Toast notifications
├── lib/
│   ├── api-client.ts                 # API client setup
│   ├── api-response.ts               # Response formatting
│   ├── auth.ts                       # Auth utilities
│   ├── db.ts                         # Database connection
│   ├── errors.ts                     # Error handling
│   ├── middleware/                   # Middleware
│   ├── models/                       # MongoDB schemas
│   ├── services/                     # Business logic
│   ├── utils/                        # Utility functions
│   └── validation.ts                 # Input validation
├── public/                           # Static assets
├── styles/                           # Additional styles
└── package.json                      # Dependencies
\`\`\`

---

## 🔄 User Flows

### **Patient Flow**
1. Register as patient
2. Upload profile picture
3. Browse doctors
4. Book appointment
5. Make payment
6. Receive diagnosis and prescription
7. View referral to pharmacy
8. Check pharmacy location on Google Maps

### **Doctor Flow**
1. Register as doctor
2. Upload profile picture
3. Wait for admin verification
4. Receive verification toast notification
5. View appointments
6. Diagnose patients
7. Create prescriptions
8. Refer patients to pharmacies
9. Track referral status

### **Pharmacist Flow**
1. Register as pharmacist
2. Upload profile picture
3. Wait for admin verification
4. Receive verification toast notification
5. View incoming referrals from doctors
6. Accept/reject referrals
7. Prepare for referred patients
8. Mark referrals as completed

### **Admin Flow**
1. Login as admin
2. View all users with statistics
3. Search and filter users
4. Verify/unverify doctors
5. Verify/unverify pharmacists
6. Monitor platform activity

---

## 🔐 Security Features

- **Password hashing**: bcrypt with salt rounds
- **Role-based access control**: Different permissions per user type
- **Protected routes**: Authentication middleware
- **Input validation**: Server-side validation for all inputs
- **Error handling**: Comprehensive error messages
- **Location privacy**: Optional location sharing

---

## 📊 Database Schema

### **User Collection**
- Email, password, full name, user type
- Profile picture, avatar
- Verification status
- Location (latitude, longitude)
- Online status, last online timestamp

### **Doctor Collection**
- User reference, specialization, license number
- Experience, bio, consultation fee
- Rating, total reviews
- Verification status
- Availability slots

### **Pharmacy Collection**
- User reference, pharmacy name, license number
- Address, location (latitude, longitude)
- Phone, operating hours
- Rating, total reviews
- Verification status

### **Appointment Collection**
- Patient and doctor references
- Appointment date, time slot
- Status (scheduled, completed, cancelled)
- Consultation fee, payment status

### **Payment Collection**
- User and appointment references
- Amount, payment method
- Transaction ID, status

### **Prescription Collection**
- Patient, doctor, appointment references
- Medications (name, dosage, frequency, duration)
- Notes

### **Referral Collection**
- Doctor, pharmacy, patient, appointment references
- Diagnosis, notes, referral message
- Status (pending, accepted, rejected, completed)

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+
- MongoDB database
- npm or pnpm

### **Installation**
\`\`\`bash
# Clone repository
git clone <repository-url>

# Install dependencies
npm install
# or
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
# or
pnpm dev
\`\`\`

### **Environment Variables**
\`\`\`
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret
\`\`\`

---

## 🎨 UI Components

The platform uses **shadcn/ui** components with Tailwind CSS:
- Buttons, inputs, forms
- Cards, dialogs, modals
- Tables, pagination
- Alerts, toasts, badges
- Dropdowns, menus, navigation
- And 50+ more components

---

## 📱 Responsive Design

- Mobile-first approach
- Responsive breakpoints (sm, md, lg, xl)
- Touch-friendly interfaces
- Optimized for all screen sizes

---

## ✅ Feature Checklist

- ✅ Multi-role authentication (Patient, Doctor, Pharmacist, Admin)
- ✅ Profile picture upload for all users
- ✅ Doctor and pharmacist verification system
- ✅ Verification toast notifications
- ✅ Admin dashboard with user management
- ✅ Online status tracking with last online
- ✅ Appointment booking and payment
- ✅ Prescription management
- ✅ Doctor-to-pharmacy referral system
- ✅ Pharmacy distance calculation
- ✅ Google Maps integration
- ✅ No hardcoded data
- ✅ Responsive design
- ✅ Error handling
- ✅ Input validation

---

## 🔄 API Endpoints

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### **Users**
- `GET /api/user/profile` - Get user profile
- `POST /api/user/online-status` - Update online status
- `GET /api/user/online-status` - Get online status
- `POST /api/upload/profile-picture` - Upload profile picture

### **Doctors**
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/[id]` - Get doctor details

### **Appointments**
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Create appointment

### **Payments**
- `POST /api/payments` - Process payment

### **Prescriptions**
- `GET /api/prescriptions` - Get prescriptions
- `POST /api/prescriptions` - Create prescription

### **Pharmacy**
- `POST /api/pharmacy/nearby` - Find nearby pharmacies

### **Referrals**
- `POST /api/referrals/create` - Doctor creates referral
- `GET /api/referrals/pharmacy` - Pharmacy views referrals
- `PATCH /api/referrals/[id]/status` - Update referral status
- `GET /api/referrals/patient` - Patient views referrals

### **Admin**
- `GET /api/admin/users` - Get all users
- `POST /api/admin/verify` - Verify/unverify user

---

## 🛠️ Technologies Used

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **State Management**: React Query (SWR)
- **Forms**: React Hook Form
- **Validation**: Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner Toast

---

## 📝 Notes

- All user data is dynamic - no hardcoded data
- Doctors and pharmacists receive verification notifications
- Patients cannot directly message pharmacies
- Distance calculations use Haversine formula
- Google Maps integration for pharmacy locations
- Real-time online status tracking
- Comprehensive error handling throughout

---

## 📞 Support

For issues or questions, please refer to the documentation or contact support.

---

## 📄 License

This project is licensed under the MIT License.
