import {search} from '@inquirer/prompts'
import fs from "node:fs";
import * as process from "node:process";
import * as path from "node:path";


type Choice<Value> = {
  value: Value;
  name?: string;
  description?: string;
  short?: string;
  disabled?: boolean | string;
};

async function main(day: string | undefined, part : string | undefined, input: string | undefined) {
  if ((day ?? null) == null) {
    day = await search({
      message: "Select a day",
      source: async (input) => {
        if (!input) return fs.readdirSync("./", {withFileTypes: true})
          .filter(value => value.isDirectory())
          .filter(value => {
            return !value.name.match("node_modules")
          }).filter(value => {
            return !value.name.startsWith(".")
          }).map(value => value.name)

        return fs.readdirSync("./", {withFileTypes: true})
          .filter(value => {
            return (path.join(value.parentPath, value.name)).match(input)
          })
          .filter(value => value.isDirectory())
          .filter(value => {
            return !value.name.match("node_modules")
          }).filter(value => {
            return !value.name.startsWith(".")
          }).map(value => value.name)
      }
    })
  }

  if ((part ?? null) == null) {
    part = await search({
      message: "Select a Part",
      source: async (input) => {
        if (!input) return fs.readdirSync(`./${day}`, {withFileTypes: true})
          .filter(value => value.isDirectory())
          .filter(value => {
            return !value.name.match("node_modules")
          }).filter(value => {
            return !value.name.startsWith(".")
          }).map(value => value.name)

        return fs.readdirSync("./", {withFileTypes: true})
          .filter(value => {
            return (path.join(value.parentPath, value.name)).match(input)
          })
          .filter(value => value.isDirectory())
          .filter(value => {
            return !value.name.startsWith(".")
          }).map(value => value.name)
      }
    })
  }

  if ((input ?? null) == null) {

    const inputs = fs.readdirSync(`./${day}`, {withFileTypes: true})
      .filter(value => value.isFile())
      .filter(value => value.isFile()).filter(value => {
        return !value.parentPath.match("node_modules")
      }).filter(value => {
        return !value.parentPath.startsWith(".") || value.parentPath.startsWith("./")
      }).filter(value => {
        return !value.name.startsWith(".")
      }).map<Choice<string>>(value => {
        return {
          name: value.name,
          value: path.join(value.parentPath, value.name)
        }
      })


    input = await search({
      message: `Select file (Select within ./${day} or search within ./*))`,
      source: async (input) => {
        if (!input) return inputs;

        return fs.readdirSync("./", {recursive: true, withFileTypes: true})
          .filter(value => {
          return (path.join(value.parentPath, value.name)).match(input)
        }).filter(value => value.isFile())
          .filter(value => value.isFile()).filter(value => {
          return !value.parentPath.match("node_modules")
        }).filter(value => {
          return !value.parentPath.startsWith(".") || value.parentPath.startsWith("./")
        }).filter(value => {
          return !value.name.startsWith(".")
        }).map<Choice<string>>(value => {
          return {
            name: path.join(value.parentPath, value.name),
            value: path.join(value.parentPath, value.name)
          }
        })
      }
    })
  }

  console.log(input)

  const {default: runner} = await import(`./${day}/${part}/index.js`)
  runner(input)
}

const day = process.argv[2] === undefined ? process.argv[2] : 'Day ' + process.argv[2]
const part = process.argv[3] === undefined ? process.argv[3] : 'Part ' + process.argv[3]
const input = process.argv[4] === undefined ? process.argv[4] : `./${day}/` + process.argv[4]

main(day, part, input).then()