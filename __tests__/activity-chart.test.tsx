import { render, screen } from '@testing-library/react'
import ActivityChart from '../components/activity-chart'

describe('ActivityChart', () => {
  it('renders chart labels', () => {
    render(<ActivityChart />)
    expect(screen.getByText('이력서')).toBeInTheDocument()
  })
})
