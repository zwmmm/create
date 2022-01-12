import { chalk } from 'zx'

export const log = (text: string) => {
  console.log(chalk.green('🖨  ' + text))
}
