import type { AnalyticsEvent, IEvent } from "apps/commerce/types.ts";

export interface UserParams {
  email?: string;
  name?: string;
}

export interface PostUserEvent extends IEvent<UserParams> {
  name: "user_info";
}

type AnalyticsCustomEvents = PostUserEvent;

export const sendEvent = <E extends AnalyticsEvent | AnalyticsCustomEvents>(
  event: E,
) => {
  console.log(JSON.stringify(event, null, 2));
  window.DECO.events.dispatch(event);
};
