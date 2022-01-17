import { chalk } from 'zx'

export const log = (text: string) => {
  console.log(chalk.green('🖨  ' + text))
}

export const error = (text: string) => {
  console.log(chalk.red('🖨  ' + text))
}
