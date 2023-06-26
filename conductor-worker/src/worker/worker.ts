import {
  ConductorWorker,
  Task,
  TaskResult
} from '@io-orkes/conductor-javascript'

export const fraudWorker: ConductorWorker = {
  taskDefName: 'fraudCheck',
  execute: async (task: Task) => {
    console.log(`Executing task: ${JSON.stringify(task, null, 2)}`)
    const amount = task?.inputData?.inputParameters?.amount ?? 0
    console.log(`Amount: ${amount}`)
    const isFraud = amount > 1000
    const result: TaskResult = {
      workflowInstanceId: task.workflowInstanceId ?? '',
      taskId: task.taskId ?? '',
      outputData: {
        fraudAnalysys: isFraud
      },
      status: 'COMPLETED'
    }
    return result
  }
}
