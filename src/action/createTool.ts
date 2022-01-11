import { path } from 'zx'
import { generate } from '../utils/generate'

export const createTool = async (name: string) => {
  const input = path.join(__dirname, '../../template/tool')
  const output = path.join(process.cwd(), name)
  generate({
    input,
    output
  })
}
