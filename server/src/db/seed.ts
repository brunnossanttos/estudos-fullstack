import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      {
        title: 'Wake up early',
        desiredWeeklyFrequency: 5,
      },
      {
        title: 'Read a book',
        desiredWeeklyFrequency: 7,
      },
      {
        title: 'Exercise',
        desiredWeeklyFrequency: 3,
      },
    ])
    .returning()

  const startDayOfWeek = dayjs().startOf('week')

  await db
    .insert(goalCompletions)
    .values(
      result.map(({ id }, index) => ({
        goalId: id,
        createdAt: startDayOfWeek.add(index, 'day').toDate(),
      }))
    )
    .returning()
}

seed().finally(() => {
  client.end()
})
