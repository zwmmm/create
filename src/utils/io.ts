import { fs } from 'zx'

export const json = (path: string) => {
  const data = JSON.parse(fs.readFileSync(path, 'utf-8'))
  return {
    data,
    save: () => {
      fs.writeFileSync(path, JSON.stringify(data, null, 2))
    }
  }
}
