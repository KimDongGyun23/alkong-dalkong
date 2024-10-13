'use client'
import type { TooltipProps } from 'recharts'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts'

const data = {
  '2024-10-1': 57,
  '2024-10-2': 58,
  '2024-10-3': 58,
  '2024-10-4': 55,
}

type DummyDataType = {
  name: string
  value: number
}[]

const dummyData = [
  { name: '첫째주', value: 57 },
  { name: '둘째주', value: 58 },
  { name: '셋째주', value: 59 },
  { name: '넷째주', value: 48 },
]

const getDomain = (data: DummyDataType) => {
  const values = data.map((item) => item.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)

  // 최솟값보다 낮은 가장 큰 5의 배수 계산
  const lowerBound = Math.floor(minValue / 5) * 5
  // 최댓값보다 높은 가장 낮은 5의 배수 계산
  const upperBound = Math.ceil(maxValue / 5) * 5

  // 최소한 3개의 tick이 나오도록 조정
  const range = upperBound - lowerBound
  if (range < 10) {
    const adjustment = Math.ceil((10 - range) / 5) * 5
    return [lowerBound - adjustment, upperBound]
  }

  return [lowerBound, upperBound]
}

const CustomizedTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload
    return (
      <div className="relative rounded-lg bg-mint-1 px-4 py-2 text-center">
        <p className="caption-M">{name}</p>
        <p className="headline-B">{`${value}kg`}</p>
      </div>
    )
  }
  return null
}

export const HealthChart = () => {
  const [minDomain, maxDomain] = getDomain(dummyData)
  const tickCount = Math.max(3, Math.ceil((maxDomain - minDomain) / 5) + 1)

  return (
    <ResponsiveContainer width="100%" aspect={4 / 3}>
      <LineChart data={dummyData} margin={{ top: 20, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="7 7" vertical={false} />
        <YAxis
          domain={[minDomain, maxDomain]}
          orientation="right"
          axisLine={false}
          tickLine={false}
          tickCount={tickCount}
          tickFormatter={(tick) => `${tick}kg`}
          interval={0}
          className="text-sm text-gray-7"
        />
        <Tooltip content={<CustomizedTooltip />} />
        <Line
          type="linear"
          dataKey="value"
          stroke="#27CD9B"
          strokeWidth={2}
          dot={{ r: 5, fill: '#0E8763', stroke: '#0E8763', strokeWidth: 2 }}
          activeDot={{ fill: 'white' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
