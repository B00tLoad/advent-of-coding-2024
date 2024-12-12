import fs from 'node:fs';

export default function runner(input: string) {
  fs.readFile(`./${input}`, 'utf8', async (err, data) => {
    if (err) throw err;
    let count = 0;
    let grid: string[][] = []

    data.split("\n").forEach((value, index) => {
      for (let i = 0; i < value.length; i++) {
        if (grid[i] === undefined) grid[i] = []
        if (grid[i] === undefined) throw new Error();
        // @ts-ignore
        grid[i][index] = value.charAt(i)
      }
    })

    for (let x = 0; x < grid.length; x++) {
      // @ts-ignore
      for (let y = 0; y < grid[x].length; y++) {
        const found = findWord(grid, x, y)
        if (found) count++;
      }
    }

    console.log(count)
  })
}

function findWord(grid: string[][], x: number, y: number): boolean {
  // @ts-ignore
  if (x < 1 || x === grid.length-1 || y < 1 || y === grid[x].length-1) {
    return false;
  }

  // @ts-ignore
  return grid[x][y] === 'A' && ((grid[x-1][y-1] == "M" && grid[x+1][y+1] == 'S') || (grid[x-1][y-1] == "S" && grid[x+1][y+1] == 'M')) && ((grid[x+1][y-1] == "M" && grid[x-1][y+1] == 'S') || (grid[x+1][y-1] == "S" && grid[x-1][y+1] == 'M'))
}


// M . M
// . A .
// S . S