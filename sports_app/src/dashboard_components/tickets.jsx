import React from 'react'

const tickets_list = [
    { id: 1, title: "Broken Table Net", detail: "Table 3 net is torn", color: "bg-pink-500" },
    { id: 2, title: "Order New Balls", detail: "Stock running low", color: "bg-amber-400" },
    { id: 3, title: "Schedule Coach Meet", detail: "Set up strategy session", color: "bg-green-400" },
    { id: 4, title: "Clean Locker Room", detail: "Needs urgent cleaning", color: "bg-blue-400" },
    { id: 5, title: "Update Tournament Date", detail: "Check venue availability", color: "bg-indigo-400" },
    { id: 6, title: "Equipment Inventory", detail: "Audit rackets/bats", color: "bg-teal-400" },
    { id: 7, title: "Send Fee Reminder", detail: "Remind unpaid members", color: "bg-red-400" },
    { id: 8, title: "Repair Light Fixture", detail: "Hallway lights flickering", color: "bg-yellow-500" },
    { id: 9, title: "Order Jerseys", detail: "New team jerseys needed", color: "bg-purple-400" },
    { id: 10, title: "Lost Water Bottle", detail: "Check lost & found", color: "bg-fuchsia-400" },
];

const tickets = () => {
    return (
        <div className='bg-white p-6 rounded-lg shadow-lg min-w-full mx-auto'>
            <h3 className="text-xl font-bold mb-4">Tickets</h3>
            <div className="max-h-63 overflow-y-auto space-y-3 pr-2">
                {tickets_list.map(ticket => (
                    <div
                        key={ticket.id}
                        className={`${ticket.color} text-white rounded-lg px-4 py-3 shadow flex flex-col`}
                    >
                        <span className="font-semibold">{ticket.title}</span>
                        <span className="text-sm opacity-90">{ticket.detail}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default tickets