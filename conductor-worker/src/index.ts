import {
  TaskRunner,
  orkesConductorClient,
  simpleTask
} from '@io-orkes/conductor-javascript'
import { fraudWorker } from './worker/worker'

const config: Partial<typeof orkesConductorClient> = {
  serverUrl: 'http://localhost:8080/api'
}

async function main () {
  const client = await orkesConductorClient(config)
  const taskRunner = new TaskRunner({
    taskResource: client.taskResource,
    worker: fraudWorker,
    options: {
      pollInterval: 10,
      domain: undefined,
      concurrency: 1,
      workerID: 'fraud-worker-1'
    }
  })
  taskRunner.startPolling()
  // const executor = new WorkflowExecutor(client)
  // const taskDetails = await executor.getTask('fraudCheck')
  // console.log(`Task details: ${JSON.stringify(taskDetails, null, 2)}`)
  // const factoryWf: WorkflowDef = {
  //   name: 'idkman',
  //   version: 1,
  //   ownerEmail: 'fabiano.siqueirab@gmail.com',
  //   tasks: [
  //     simpleTask('fraudCheck', 'fraudCheck', {
  //       inputParameters: ['accountId', 'amount']
  //     })
  //   ],
  //   inputParameters: ['accountId', 'amount'],
  //   timeoutSeconds: 3600
  // }
  // const workflow = executor.registerWorkflow(true, factoryWf)
  // console.log(`Workflow details: ${JSON.stringify(workflow, null, 2)}`)
  // const executionId = await executor.startWorkflow({
  //   name: factoryWf.name,
  //   version: 1,
  //   input: {
  //     accountId: '123',
  //     amount: 1001
  //   }
  // })

  // console.log(`Workflow started with id: ${executionId}`)

  // const workflowStatus = await executor.getWorkflow(executionId, true)
  // console.log(`Workflow status: ${JSON.stringify(workflowStatus, null, 2)}`)
}

main()
