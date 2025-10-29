import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY ?? "";

const key = crypto.scryptSync(ENCRYPTION_KEY, 'salt', 32);

export const encryptPrivateKey = (privateKeyString: string): string => {
  if (!privateKeyString) return privateKeyString;
  
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  let encrypted = cipher.update(privateKeyString, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  // Combine IV + authTag + encrypted data
  return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted;
}

export const decryptPrivateKey = (encryptedString: string): string => {
  if (!encryptedString) return encryptedString;
  
  try {
    const parts = encryptedString.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted string format');
    }
    
    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encrypted = parts[2];
    
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error: any) {
    throw new Error('Failed to decrypt private key: ' + error.message);
  }
}