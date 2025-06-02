


export function validateFormData(data){
  // Required fields validation
  const requiredFields = ["name", "email", "phone", "DOB", "course", "state", "city", "identity"]

  for (const field of requiredFields) {
    if (!data[field ] || data[field ].toString().trim() === "") {
      return { isValid: false, error: `${field} is required` }
    }
  }

  // Consent validation
  if (!data.consent) {
    return { isValid: false, error: "Consent is required" }
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { isValid: false, error: "Invalid email format" }
  }

  // Phone validation
  const phoneRegex = /^[0-9]{10}$/
  if (!phoneRegex.test(data.phone)) {
    return { isValid: false, error: "Phone number must be exactly 10 digits" }
  }

  // Date of Birth validation
  const dob = new Date(data.DOB)
  const currentDate = new Date()
  if (dob > currentDate) {
    return { isValid: false, error: "Date of birth cannot be in the future" }
  }

  // Age validation (must be at least 16 years old)
  const age = currentDate.getFullYear() - dob.getFullYear()
  if (age < 16) {
    return { isValid: false, error: "Must be at least 16 years old" }
  }

  // File validation
  if (data.file) {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg"]
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!allowedTypes.includes(data.file.type)) {
      return { isValid: false, error: "Only PDF or JPEG/JPG files are allowed" }
    }

    if (data.file.size > maxSize) {
      return { isValid: false, error: "File size should not exceed 10MB" }
    }
  }

  return { isValid: true }
}

export function normalizePhoneNumber(phone) {
  // Remove any non-digit characters and ensure it's 10 digits
  const cleaned = phone.replace(/\D/g, "")

  // If it starts with country code, remove it
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return cleaned.substring(2)
  }

  if (cleaned.length === 11 && cleaned.startsWith("0")) {
    return cleaned.substring(1)
  }

  return cleaned
}

export function validateDateOfBirth(dob) {
  const date = new Date(dob)
  const currentDate = new Date()

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return false
  }

  // Check if date is not in the future
  if (date > currentDate) {
    return false
  }

  // Check minimum age (16 years)
  const age = currentDate.getFullYear() - date.getFullYear()
  const monthDiff = currentDate.getMonth() - date.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < date.getDate())) {
    return age - 1 >= 16
  }

  return age >= 16
}
