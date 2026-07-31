import bcrypt from 'bcryptjs'

export function generateOTPCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function hashCode(code: string): Promise<string> {
  return bcrypt.hash(code, 10)
}

export async function verifyCode(code: string, hash: string): Promise<boolean> {
  return bcrypt.compare(code, hash)
}
