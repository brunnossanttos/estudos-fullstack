import { db } from '../db'
import { goals } from '../db/schema'
import type { ICreateGoalRequest } from './goal.interface'

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: ICreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({ title, desiredWeeklyFrequency })
    .returning()

  return {
    goal: result[0],
  }
}
