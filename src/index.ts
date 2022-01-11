import { Command } from "commander";
// @ts-ignore
import { version } from "../package.json";
import { createTool } from "./action/createTool";

const program = new Command();

program.version(
  version
)

program.command('tool <name>').description('创建工具模板').action(createTool)

program.parse(process.argv);
