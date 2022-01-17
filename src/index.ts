import { $, cd, question } from 'zx'
import { join } from 'path'
import { log, error } from './utils/log'

async function main(dir: string) {
  try {
    const name = await question('选择模板', {
      choices: ['tool']
    })
    const input = join(__dirname, '../templates', name)
    process.env.FORCE_COLOR = '3'
    await $`cp -R ${input}/. ${dir}`
    await cd(dir)
    await $`git init`
    await $`pnpm install`
    await $`pnpm changeset init`
    log('模板生成成功')
  } catch (e: any) {
    error(e.message)
  }
}

export { main }
