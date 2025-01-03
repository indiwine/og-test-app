export abstract class AbstractUpdateCommand<PayloadDto> {
  constructor(
    public readonly id: number,
    public readonly payload: PayloadDto,
  ) {}
}
