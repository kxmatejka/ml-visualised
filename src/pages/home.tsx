import React, {useState, FC} from 'react'
import {Stage, Layer, Rect, Circle, Line} from 'react-konva'

interface Point {
  x: number,
  y: number,
}

const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 500

const h = (x: number, m: number, b: number) => b + m * x

const cost = (points: Point[], m: number, b: number) => {
  const M = points.length
  if (!M) {
    return 0
  }

  let sum = 0
  for (const point of points) {
    sum += (h(point.x, m, b) - point.y) ** 2
  }

  return sum / (2 * M)
}

const learn = (points: Point[], m: number, b: number) => {
  const LEARNING_RATE = 0.0002
  const M = points.length
  let bSum = 0
  let mSum = 0

  for (const point of points) {
    bSum += h(point.x, m, b) - point.y
    mSum += (h(point.x, m, b) - point.y) * point.x
  }

  return {
    m: m - (LEARNING_RATE / M * 0.1) * mSum,
    b: b - (LEARNING_RATE / M * 0.1) * bSum
  }
}

const gradientDescent = (points: Point[], m: number, b: number) => {
  let endM = m
  let endB = b

  for (let i = 0; i < 10000; i++) {
    const {m: newM, b: newB} = learn(points, endM, endB)
    endM = newM
    endB = newB
  }

  return {
    m: endM,
    b: endB
  }
}

const Point: FC<{point: Point}> = ({point}) => {
  return <Circle radius={5} x={point.x} y={point.y} fill={'#2d9cf1'}/>
}

const FunctionLine: FC<{m: number, b: number}> = ({m, b}) => {
  const x1 = 0
  const y1 = h(0, m, b)

  const x2 = CANVAS_WIDTH
  const y2 = h(CANVAS_WIDTH, m, b)

  return <Line points={[x1, y1, x2, y2]} stroke={'#e33939'} width={10}/>
}

export const Home = () => {
  const [points, setPoints] = useState<Point[]>([])
  const [m, setM] = useState(0)
  const [b, setB] = useState(0)
  const totalCost = cost(points, m, b)

  return (
    <>
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <Layer>
          <Rect
            width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill={'#ececec'}
            onClick={(e) => setPoints((points) => [...points, {x: e.evt.x, y: e.evt.y}])}/>
          {points.map((point, index) => <Point key={index} point={point}/>)}
          <FunctionLine m={m} b={b}/>
        </Layer>
      </Stage>
      <div>
        cost:&nbsp;{totalCost}
      </div>
      <div>
        <label>
          m:&nbsp;
          <input
            type={'number'} value={m} step={0.1}
            onChange={(event) => setM(Number(event.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          b:&nbsp;
          <input
            type={'number'} value={b}
            onChange={(event) => setB(Number(event.target.value))}
          />
        </label>
      </div>
      <div>
        <button onClick={() => {
          const {m: newM, b: newB} = gradientDescent(points, m, b)
          setM(newM)
          setB(newB)
        }}>
          Learn
        </button>
      </div>
    </>
  )
}
