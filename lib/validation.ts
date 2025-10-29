export interface ValidationRule {
  field: string
  validate: (value: any) => boolean
  message: string
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): boolean {
  return password.length >= 6
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-+$$$$]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10
}

export function validateRequired(value: any): boolean {
  return value !== null && value !== undefined && value !== ""
}

export function validateMinLength(value: string, min: number): boolean {
  return value.length >= min
}

export function validateMaxLength(value: string, max: number): boolean {
  return value.length <= max
}

export function validateNumber(value: any): boolean {
  return !isNaN(value) && typeof value === "number"
}

export function validateDate(date: string): boolean {
  return !isNaN(Date.parse(date))
}

export function validateObject(data: any, rules: ValidationRule[]): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  for (const rule of rules) {
    if (!rule.validate(data[rule.field])) {
      errors.push(rule.message)
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
