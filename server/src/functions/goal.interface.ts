export interface ICreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

export interface ICreateGoalCompletionRequest {
  goalId: string
}
