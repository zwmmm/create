import { $, cd } from 'zx'
import { log } from "./log";

export const generate = async (options: {
  input: string
  output: string
  install?: boolean
}) => {
  try {
    const { input, output, install = false } = options
    await $`cp -r ${input} ${output}`
    await cd(output)
    if (install) {
      await $`pnpm install`
      await $`pnpm changeset init`
    }
    log('模板生成成功')
  } catch (e) {
    console.error(e)
  }
}
