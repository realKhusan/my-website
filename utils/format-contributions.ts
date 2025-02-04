interface ContributionDay {
  contributionCount: number
  date: string
}

interface FormattedContribution {
  date: string
  count: number
}

export function formatContributions(contributionData: any): FormattedContribution[] {
  const formattedData: FormattedContribution[] = []

  contributionData.weeks.forEach((week: { contributionDays: ContributionDay[] }) => {
    week.contributionDays.forEach((day: ContributionDay) => {
      formattedData.push({
        date: day.date,
        count: day.contributionCount,
      })
    })
  })

  return formattedData
}

