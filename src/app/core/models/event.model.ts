import { AuditInfo } from './audit-info.model';
import { Currency } from './currency.model';
import { EventSchedule } from './event-schedule.model';
import { Topic } from './topic.model';

class Event extends AuditInfo {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  location: string;
  startTime: number;
  endTime: number;
  image: string;
  eventTopic: Topic;
  expectedQuantity: number;
  fee: number;
  currency: Currency;
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