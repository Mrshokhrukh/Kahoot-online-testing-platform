export const mockTeacherUser = {
  id: '1', name: 'Sardor Usmonov',
  email: 'teacher@test.com', role: 'teacher',
}
export const mockStudentUser = {
  id: '2', name: 'Ali Karimov',
  email: 'student@test.com', role: 'student',
}

// Faqat mock login uchun (haqiqiy backend ulanguncha)
export const mockPasswords = {
  'teacher@test.com': 'Ustoz2026!',
  'student@test.com': 'Oquvchi2026!',
}

// Ro'yxatdan o'tgan foydalanuvchilar mock tarzda localStorage da saqlanadi
const REGISTERED_KEY = 'mockRegisteredUsers'

export function getRegisteredUsers() {
  try {
    return JSON.parse(localStorage.getItem(REGISTERED_KEY)) || []
  } catch {
    return []
  }
}

export function isEmailTaken(email) {
  const normalized = email.trim().toLowerCase()
  const isBaseUser = [mockTeacherUser, mockStudentUser].some((u) => u.email === normalized)
  return isBaseUser || getRegisteredUsers().some((u) => u.email === normalized)
}

export function saveRegisteredUser({ name, email, password, role }) {
  const users = getRegisteredUsers()
  const newUser = {
    id: String(Date.now()),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role,
    password,
  }
  localStorage.setItem(REGISTERED_KEY, JSON.stringify([...users, newUser]))
}

// To'g'ri bo'lsa { id, name, email, role } qaytaradi, aks holda null
export function findMockUser(email, password) {
  const normalized = email.trim().toLowerCase()

  const baseUser = [mockTeacherUser, mockStudentUser].find((u) => u.email === normalized)
  if (baseUser) {
    return mockPasswords[normalized] === password ? baseUser : null
  }

  const registered = getRegisteredUsers().find((u) => u.email === normalized)
  if (registered && registered.password === password) {
    return {
      id: registered.id,
      name: registered.name,
      email: registered.email,
      role: registered.role,
    }
  }
  return null
}
