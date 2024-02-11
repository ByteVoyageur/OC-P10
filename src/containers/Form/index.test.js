import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from './index'

// use jest.mock to mock the API call
jest.spyOn(Form, 'mockContactApi').mockImplementation(
  (shouldFail = false) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error('API call failed'))
        } else {
          resolve()
        }
      }, 1000)
    })
)

describe('Form Component', () => {
  it('calls onSuccess when the API call is successful', async () => {
    const onSuccess = jest.fn()
    const onError = jest.fn()

    render(<Form onSuccess={onSuccess} onError={onError} />)

    const messageInput = screen.getByTestId('field-testid') // 使用 getByTestId 获取 Message 输入框
    await userEvent.type(messageInput, 'Test message') // 模拟用户输入
    fireEvent.click(screen.getByTestId('button-test-id')) // 模拟点击提交按钮

    await waitFor(() => expect(onSuccess).toHaveBeenCalled()) // 等待 onSuccess 回调函数被调用
  })

  it('calls onError when the API call fails', async () => {
    const onSuccess = jest.fn()
    const onError = jest.fn()

    // 假设 mockContactApi 是一个异步函数，这里模拟它的拒绝（失败）状态
    jest
      .requireMock('./index')
      .mockContactApi.mockRejectedValue(new Error('API call failed'))

    render(<Form onSuccess={onSuccess} onError={onError} />)

    const messageInput = screen.getByTestId('field-testid') // 使用 getByTestId 获取 Message 输入框
    await userEvent.type(messageInput, 'Test message') // 模拟用户输入
    fireEvent.click(screen.getByTestId('button-test-id')) // 模拟点击提交按钮

    await waitFor(() => expect(onError).toHaveBeenCalled()) // 等待 onError 回调函数被调用
  })
})
