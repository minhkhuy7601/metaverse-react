/* eslint-disable @typescript-eslint/no-explicit-any */
export async function astar(grid: any, start: any, end: any) {
	console.log(start, end);
	const numRows = grid.length;
	const numCols = grid[0].length;
	const openList: any = [];
	openList.push({ node: start, g: 0, h: heuristic(start, end) });
	const cameFrom: any = {};
	const gScore = new Array(numRows)
		.fill(null)
		.map(() => new Array(numCols).fill(Infinity));
	gScore[start[0]][start[1]] = 0;
	const fScore = new Array(numRows)
		.fill(null)
		.map(() => new Array(numCols).fill(Infinity));
	fScore[start[0]][start[1]] = heuristic(start, end);

	const directions = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
	];

	while (openList.length > 0) {
		openList.sort((a: any, b: any) => a.g + a.h - (b.g + b.h));
		const current = openList.shift().node as any;

		if (current[0] === end[0] && current[1] === end[1]) {
			return reconstructPath(cameFrom, end);
		}

		for (const [dr, dc] of directions) {
			const newRow = current[0] + dr;
			const newCol = current[1] + dc;

			if (
				newRow >= 0 &&
				newRow < numRows &&
				newCol >= 0 &&
				newCol < numCols &&
				grid[newRow][newCol] !== 1
			) {
				const tentativeGScore = gScore[current[0]][current[1]] + 1;

				if (tentativeGScore < gScore[newRow][newCol]) {
					cameFrom[`${newRow}-${newCol}`] = current;
					gScore[newRow][newCol] = tentativeGScore;
					fScore[newRow][newCol] =
						tentativeGScore + heuristic([newRow, newCol], end);
					openList.push({
						node: [newRow, newCol],
						g: tentativeGScore,
						h: heuristic([newRow, newCol], end),
					});
				}
			}
		}
	}

	return null; // Không tìm thấy đường đi
}

function heuristic(a: any, b: any) {
	// Heuristic (ước tính) dự đoán khoảng cách từ a đến b, thường sử dụng khoảng cách Euclidean
	return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
}

function reconstructPath(cameFrom: any, current: any) {
	const path = [current];
	while (cameFrom[`${current[0]}-${current[1]}`]) {
		current = cameFrom[`${current[0]}-${current[1]}`];
		path.unshift(current);
	}
	return path;
}
