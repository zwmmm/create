import { $, cd, chalk } from 'zx'
import { hasPnpm, hasYarn } from './env'

export const generate = async (options: {
  input: string
  output: string
  install?: boolean
}) => {
  try {
    const { input, output, install = false } = options
    await $`cp -r ${input} ${output}`
    console.log(chalk.green('模板生成成功'))
    await cd(output)
    if (install) {
      const packageManager = hasPnpm() ? 'pnpm' : hasYarn() ? 'yarn' : 'npm'
      await $`${packageManager}`
      console.log(chalk.green('下载成功'))
    }
  } catch (e) {
    console.error(e)
  }
}
