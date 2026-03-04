import React from 'react'
import { Chat } from '../src/components/Chat'
import { BbqHistory, bbqReply } from './data/groupChat1'
import { WorkTeamHistory } from './data/groupChat2'
import { WorkBotHistory, workBotReply } from './data/privateChat1'
import { SarahHistory } from './data/privateChat2'

export function App(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d1418]">
      <header className="flex shrink-0 items-center justify-center border-b border-white/10 px-8 py-5">
        <h1 className="text-base font-semibold tracking-widest text-white/50 uppercase">DEMO</h1>
      </header>

      <main className="flex flex-1 items-center justify-center p-10">
        <div className="grid grid-cols-2 gap-6">
          <Chat
            name="WorkBot 🤖"
            subtitle="online"
            avatarUrl="https://i.pravatar.cc/40?img=68"
            theme="dark"
            colorScheme="natural"
            width={550}
            height={450}
            className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
            onReply={workBotReply}
          >
            <WorkBotHistory />
          </Chat>

          <Chat
            name="Sarah Johnson"
            subtitle="last seen today at 10:35"
            avatarUrl="https://i.pravatar.cc/40?img=47"
            theme="dark"
            colorScheme="ocean"
            width={550}
            height={450}
            className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
          >
            <SarahHistory />
          </Chat>

          <Chat
            name="Weekend BBQ 🔥"
            subtitle="Me, Mats, Josh, Philipp, Ben, Mattis, Tobias, Aaron"
            avatarUrl="https://i.pravatar.cc/40?img=3"
            theme="dark"
            colorScheme="forest"
            width={550}
            height={450}
            className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
            locked
            onReply={bbqReply}
          >
            <BbqHistory />
          </Chat>

          <Chat
            name="Work Team 💼"
            subtitle="Me, Kai, Hannah, Tom, WorkBot 🤖"
            avatarUrl="https://i.pravatar.cc/40?img=12"
            theme="dark"
            colorScheme="rose"
            width={550}
            height={450}
            className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
            locked
          >
            <WorkTeamHistory />
          </Chat>
        </div>
      </main>
    </div>
  )
}
