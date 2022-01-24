import { $, cd, path } from 'zx'
import { prompt } from 'enquirer'
import { log, error } from './utils/log'
import { json } from "./utils/io";

process.env.FORCE_COLOR = '3'

const { join, resolve } = path;

async function main(dir: string) {
  try {
    const { select, isMonorepo } = await prompt<{
      select: string;
      isMonorepo: 'true' | 'false';
    }>([
      {
        type: 'select',
        name: 'select',
        message: '请选择模板',
        choices: [
          'node',
          'node+cli'
        ]
      },
      {
        type: 'confirm',
        name: 'isMonorepo',
        message: '是否使用monorepo'
      }
    ])
    const templates = select.split('+');
    if (isMonorepo) {
      templates.push('monorepo')
    }
    await $`rsync -a ${join(__dirname, '../templates/base')}/. ${dir}`
    const { data, save } = json(resolve(process.cwd(), dir, './package.json'))
    await Promise.all(
      templates.map(async name => {
        const pathname = join(__dirname, '../templates', name);
        await $`rsync -a --exclude package.json ${pathname}/. ${dir}`
        const { data: _data } = json(resolve(pathname, 'package.json'))
        Object.assign(data, {
          ..._data,
          devDependencies: {
            ...data.devDependencies,
            ..._data.devDependencies,
          },
          peerDependencies: {
            ...data.peerDependencies,
            ..._data.peerDependencies,
          },
          dependencies: {
            ...data.dependencies,
            ..._data.dependencies,
          },
          scripts: {
            ...data.scripts,
            ..._data.scripts,
          },
        })
      })
    )
    save()
    await cd(dir)
    if (isMonorepo) {
      await $`mkdir packages`
    } else {
      await $`mkdir src`
    }
    await $`git init`
    await $`pnpm install`
    await $`pnpm install @changesets/cli -DW`
    await $`pnpm changeset init`
    log('模板生成成功')
  } catch (e: any) {
    error(e.message || '取消')
  }
}

export { main }
