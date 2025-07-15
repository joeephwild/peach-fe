import dayjs from 'dayjs'

export interface MessageProps {
  text: string
  timestamp: number
  user: string
  walletPk: string
}

const Messages = ({ messages }: { messages: MessageProps[] }) => {
  return (
    <div className="space-y-4">
      {messages
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((m) => (
          <Message message={m} key={m.walletPk + m.timestamp} />
        ))}
    </div>
  )
}

export default Messages

const Message = ({ message }: { message: MessageProps }) => {
  const { text, timestamp, user } = message
  return (
    <div className="flex items-start pl-1">
      <div className="h-6 w-6 rounded-full bg-th-bkg-4" />
      <div className="ml-2">
        <p className="mb-0 text-xxs capitalize leading-none text-th-fgd-3">
          {user}{' '}
          <span className="text-th-fgd-4">
            {dayjs(timestamp).format('h:mma')}
          </span>
        </p>
        <p className="mb-0 text-th-fgd-2">{text}</p>
      </div>
    </div>
  )
}
