import { fireEvent, screen } from "@testing-library/react-native"
import { TaskTestQuery } from "__generated__/TaskTestQuery.graphql"
import { Task } from "app/Components/Tasks/Task"
import { setupTestWrapper } from "app/utils/tests/setupTestWrapper"
import { graphql } from "react-relay"

// mock clear task function
const mockClearTask = jest.fn()
const mockDissmissTask = jest.fn()
const mockAcknowledgeTask = jest.fn()

jest.mock("app/utils/mutations/useDismissTask", () => ({
  useDismissTask: () => ({ submitMutation: mockDissmissTask }),
}))

jest.mock("app/utils/mutations/useAcknowledgeTask.ts", () => ({
  useAcknowledgeTask: () => ({ submitMutation: mockAcknowledgeTask }),
}))

describe("Task Component", () => {
  const { renderWithRelay } = setupTestWrapper<TaskTestQuery>({
    Component: ({ me }) => {
      return <Task task={me!.tasks![0]!} onClearTask={mockClearTask} />
    },
    query: graphql`
      query TaskTestQuery @relay_test_operation {
        me {
          tasks {
            ...Task_task
          }
        }
      }
    `,
  })

  it("should render without crashing", () => {
    renderWithRelay({ Task: () => mockTask })

    expect(screen.getByText("Test Task")).toBeOnTheScreen()
    expect(screen.getByText("Test Message")).toBeOnTheScreen()
  })

  it("should dismiss when the task is cleared", () => {
    renderWithRelay({ Task: () => mockTask })

    const clearButton = screen.getByText("Clear")

    fireEvent.press(clearButton)

    expect(mockClearTask).toHaveBeenCalled()
    expect(mockDissmissTask).toHaveBeenCalled()
  })

  it("should acknowledge the task when pressed", () => {
    renderWithRelay({ Task: () => mockTask })

    fireEvent.press(screen.getByText("Test Task"))

    expect(mockAcknowledgeTask).toHaveBeenCalled()
    expect(mockClearTask).toHaveBeenCalled()
  })
})

const mockTask = {
  imageUrl: "www.test.com/img.jpeg",
  title: "Test Task",
  message: "Test Message",
  actionLink: "www.test.com",
  actionMessage: "Test Action",
}
