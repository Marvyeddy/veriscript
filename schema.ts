// MongoDB/Mongoose-compatible TypeScript interfaces for main entities used in Veriscript

/**
 * Doctor schema
 */
export interface Doctor {
  _id?: string;
  name: string;
  image?: string;
  type: string; // e.g., "Paediatrician"
  doctorId: string;
  fee: number;
  rating: number;
  distance?: string;
  isBooked?: boolean;
  location: string;
  // relations
  profileId?: string; // link to Profile/Patient if needed
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Pharmacy schema
 */
export interface Pharmacy {
  _id?: string;
  name: string;
  image?: string;
  type: string;
  pharmacyId: string;
  rating: number;
  distance?: string;
  isBooked?: boolean;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Patient (Profile) schema
 */
export interface PatientProfile {
  _id?: string;
  name: string;
  gender: string;
  blood_type: string;
  genotype: string;
  weight: string;
  allergies: string[];
  height: string;
  phone: string;
  email: string;
  emergency: string;
  symptom: string;
  // relations
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Diagnosis schema
 */
export interface Diagnosis {
  _id?: string;
  prescription: string[]; // drug names
  frequency: string[];
  date: string; // could be Date
  duration?: string;
  time?: string;
  doctorId: string;
  patientId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Prescription schema
 */
export interface Prescription {
  _id?: string;
  patientId: string;
  doctorId: string;
  diagnosisId: string;
  pharmacyId?: string;
  date: string;
  fee: number;
  status: "Pending" | "Completed";
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Wallet schema
 */
export interface Wallet {
  _id?: string;
  userId: string;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Booking schema (for doctor or pharmacy bookings)
 */
export interface Booking {
  _id?: string;
  userId: string;
  doctorId?: string;
  pharmacyId?: string;
  status: "Active" | "Completed" | "Cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}
