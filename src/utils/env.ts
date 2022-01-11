import { execSync } from 'child_process'

let _hasYarn: boolean | undefined
let _hasPnpm: boolean | undefined

export const hasYarn = () => {
  if (_hasYarn !== undefined) {
    return _hasYarn
  }
  try {
    execSync('yarn --version', { stdio: 'ignore' })
    _hasYarn = true
  } catch (e) {
    _hasYarn = false
  }
  return _hasYarn
}

export const hasPnpm = () => {
  if (_hasPnpm !== undefined) {
    return _hasPnpm
  }
  try {
    execSync('pnpm --version', { stdio: 'ignore' })
    _hasPnpm = true
  } catch (e) {
    _hasPnpm = false
  }
  return _hasPnpm
}
