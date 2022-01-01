import { getDateFromISODate } from "../getDateFromISODate";

describe("utils / getDateFromISODate", () => {
  it("format a date from ISO to date", () => {
    const ISODate = new Date("2020-12-11").toISOString();
    const date = getDateFromISODate(ISODate);
    expect(date).toBe("2020-12-11");
  });
});
