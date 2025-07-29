import { describe, expect, test } from "vitest";
import { getAPIKey } from "../src/api/auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  test("missing authorization header returns null", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  test("invalid authorization header returns null", () => {
    const headers1: IncomingHttpHeaders = { authorization: "NoSpaceToSplit" };
    const headers2: IncomingHttpHeaders = {
      authorization: "ApiToken 12348y19518734asdfhkln",
    };
    expect(getAPIKey(headers1)).toBeNull();
    expect(getAPIKey(headers2)).toBeNull();
  });

  test("returns auth key", () => {
    const headers: IncomingHttpHeaders = { authorization: "ApiKey 1345871" };
    expect(getAPIKey(headers)).toBe("1345871");
  });
});
