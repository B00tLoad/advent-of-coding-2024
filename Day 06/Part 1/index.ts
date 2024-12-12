import fs from 'node:fs';

type Vec2d = {y: number, x: number}

let visited: Map<string, boolean> = new Map<string, boolean>()
let obstacles: boolean[][] = []
let position: Vec2d = {x: -1, y: -1}

let dir_NORTH: Vec2d = {x: 0, y: -1}
let dir_EAST: Vec2d = {x: 1, y: 0 }
let dir_SOUTH: Vec2d = {x: 0, y: 1}
let dir_WEST: Vec2d = {x: -1, y: 0}

let direction: Vec2d = dir_NORTH


export default function runner(input: string) {


  fs.readFile(`./${input}`, 'utf8', async (err, data) => {
    if (err) throw err;


    data.split("\n").forEach((value, index) => {
      for (let i = 0; i < value.length; i++) {
        if (obstacles[i] === undefined) obstacles[i] = []
        if (obstacles[i] === undefined) throw new Error();
        // @ts-ignore
        obstacles[i][index] = value.charAt(i) === '#'
        if (value.charAt(i) === '^') position = {x: i, y: index}
      }
    })

    console.log(position)
    console.log(position)
    console.log(position)
    console.log(position)
    console.log(position)

    // @ts-ignore
    while (position.x>0 && position.y>0 && position.x<obstacles[0].length-1 && position.y<obstacles.length-1){
        if (!move()) direction = rotate();
    }

    let count = visited.size

    console.log(visited)

    console.log()
    console.log()
    console.log()
    console.log()

    console.log(`Visited: ${count}`)

  })
}

function move(): boolean {
  // @ts-ignore
  if (obstacles[position.x+direction.x][position.y+direction.y]){
    return false
  }
  // const oldPos = {x: position.x, y: position.y}
  position.x = position.x+direction.x
  position.y = position.y+direction.y
  // console.log(`move ${positionToString(oldPos)} => ${positionToString(position)}`)
  // @ts-ignore
  visited.set(JSON.stringify(position), true)
  return true
}

function rotate(): { x: number, y: number } {
  switch (direction) {
    case dir_NORTH:
      console.log(`rotate ${positionToString(dir_NORTH)} => ${positionToString(dir_EAST)}`)
      return dir_EAST
    case dir_EAST:
      console.log(`rotate ${positionToString(dir_EAST)} => ${positionToString(dir_SOUTH)}`)
      return dir_SOUTH;
    case dir_SOUTH:
      console.log(`rotate ${positionToString(dir_SOUTH)} => ${positionToString(dir_WEST)}`)
      return dir_WEST;
    case dir_WEST:
      console.log(`rotate ${positionToString(dir_WEST)} => ${positionToString(dir_NORTH)}`)
      return dir_NORTH;
  }
  return dir_NORTH
}

const positionToString = function (a: Vec2d){
  return `x: ${a.x} | y:${a.y}`
}