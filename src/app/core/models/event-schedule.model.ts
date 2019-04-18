
export class EventSchedule {
  constructor(
    public id: number,
    public startTime: number,
    public endTime: number,
    public location: string,
    public schedule: string
  ) { }
}
