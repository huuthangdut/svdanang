import { Volunteer } from './volunteer.model';
import { Currency } from './currency.model';
import { EventTopic } from './event-topic.model';
import { EventSchedule } from './event-schedule.model';

class Event {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  location: string;
  startTime: number;
  endTime: number;
  image: string;
  topicId: number;
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
}


class EventModel {
  constructor(
    public id: number,
    public name: string,
    public shortDescription: string,
    public description: string,
    public location: string,
    public startTime: number,
    public endTime: number,
    public image: string,
    public topicId: number,
    public expectedQuantity: number,
    public fee: number,
    public currencyId: number,
    public schedules: EventSchedule[]
  ) {
  }
}

export { Event, EventModel }