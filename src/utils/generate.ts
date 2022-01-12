import { $, cd } from 'zx'
import { log } from "./log";

export const generate = async (options: {
  input: string
  output: string
}) => {
  try {
    const { input, output } = options
    await $`cp -r ${input} ${output}`
    await cd(output)
    await $`pnpm install`
    await Promise.all([
      $`pnpm changeset init`,
      $`pnpm prepare`,
      $`pnpm husky add .husky/pre-commit "echo \"代码格式检查中...\"\nlint-staged"`,
      $`pnpm husky add .husky/commit-msg "echo \"commit msg 格式校验中...\"\nnpx --no-install commitlint --edit $1"`,
    ])
    log('模板生成成功')
  } catch (e) {
    console.error(e)
  }
}
