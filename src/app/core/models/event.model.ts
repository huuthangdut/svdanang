import { Volunteer } from './volunteer.model';
import { Currency } from './currency.model';
import { EventTopic } from './event-topic.model';
import { EventSchedule } from './event-schedule.model';

class Event {
  id: number;
  name: string;
  description: string;
  location: string;
  startTime: number;
  endTime: number;
  image: string;
  eventTopic: EventTopic;
  expectedQuantity: number;
  fee: number;
  currency: Currency;
  createdDate: number;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
  }
  updatedDate: number;
  updatedBy: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  eventSchedules: EventSchedule[];
  volunteers: Volunteer[];
}


class EventModel {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public location: string,
    public startTime: number,
    public endTime: number,
    public image: string,
    public eventTopicId: number,
    public expectedQuantity: number,
    public fee: number,
    public currencyId: number,
    public schedules: EventSchedule[]
  ) {
  }
}

export { Event, EventModel }