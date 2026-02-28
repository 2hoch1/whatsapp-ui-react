import React from 'react'
import { Chat } from '../src/components/Chat'
import { bbqMessages, bbqReply } from './data/groupChat1'
import { workBotMessages, workBotReply } from './data/privateChat1'
import { sarahMessages } from './data/privateChat2'
import { WorkTeamAnimation } from './data/groupChat2'

export function App(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d1418]">
      <header className="flex shrink-0 items-center justify-center border-b border-white/10 px-8 py-5">
        <h1 className="text-base font-semibold tracking-widest text-white/50 uppercase">DEMO</h1>
      </header>

      <main className="flex flex-1 items-center justify-center p-10">
        <div className="grid grid-cols-2 gap-6">
          <div className="h-[450px] w-[550px] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
            <Chat
              name="WorkBot 🤖"
              subtitle="online"
              avatarUrl="https://i.pravatar.cc/40?img=68"
              className="h-full"
              messageHistory={workBotMessages}
              onReply={workBotReply}
            />
          </div>

          <div className="h-[450px] w-[550px] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
            <Chat
              name="Sarah Johnson"
              subtitle="last seen today at 10:35"
              avatarUrl="https://i.pravatar.cc/40?img=47"
              className="h-full"
              messageHistory={sarahMessages}
            />
          </div>

          <div className="h-[450px] w-[550px] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
            <Chat
              name="Weekend BBQ 🔥"
              subtitle="Me, Mats, Josh, Philipp, Ben, Mattis, Tobias, Aaron"
              avatarUrl="https://i.pravatar.cc/40?img=3"
              className="h-full"
              messageHistory={bbqMessages}
              locked
              onReply={bbqReply}
            />
          </div>

          <div className="h-[450px] w-[550px] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
            <Chat
              name="Work Team 💼"
              subtitle="Me, Kai, Hannah, Tom, WorkBot 🤖"
              avatarUrl="https://i.pravatar.cc/40?img=12"
              className="h-full"
              onReply={<WorkTeamAnimation />}
              locked
            />
          </div>
        </div>
      </main>
    </div>
  )
}
