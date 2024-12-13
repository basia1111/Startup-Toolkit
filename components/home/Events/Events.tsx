'use client';

import React, { useState } from 'react';
import Event from './Event';

const EventsTimeline = () => {
  const [activeEvent, setActiveEvent] = useState(0);

  const events = [
    {
      day: '15',
      month: 'December 2024',
      title: 'AI in Modern Development Workshop',
      description:
        'Join us for an immersive workshop exploring the latest AI technologies and their practical applications in modern software development.',
      time: '2:00 PM PST',
      attendees: '234',
      location: 'Virtual',
      tags: ['AI/ML', 'Development', 'Innovation'],
    },
    {
      day: '18',
      month: 'December 2024',
      title: 'Open Source Contributors Meetup',
      description:
        'Connect with fellow open source enthusiasts and learn about exciting new projects and opportunities for collaboration.',
      time: '5:00 PM PST',
      attendees: '156',
      location: 'San Francisco',
      tags: ['Open Source', 'Networking', 'Collaboration'],
    },
    {
      day: '20',
      month: 'December 2024',
      title: 'Frontend Architecture Summit',
      description:
        'Discover the latest trends and best practices in frontend architecture from industry experts and thought leaders.',
      time: '10:00 AM PST',
      attendees: '189',
      location: 'Virtual',
      tags: ['Frontend', 'Architecture', 'Design'],
    },
  ];

  return (
    <div className="bg-[#0D1117] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Upcoming
            <span className="ml-2 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Events
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl text-lg">
            Join our community events to learn, share, and connect with fellow creators and
            innovators.
          </p>
        </div>

        <div className="space-y-6">
          {events.map((event, index) => (
            <Event
              key={index}
              event={event}
              isActive={activeEvent === index}
              onClick={() => setActiveEvent(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsTimeline;
