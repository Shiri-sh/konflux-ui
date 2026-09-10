import React from 'react';
import { analyticsService, CallerEventProperties } from './AnalyticsService';
import { useIsAnalyticsEnabled } from './conditional-checks';
import { TrackEvents } from './gen/analytics-types';

export const useTrackAnalyticsEvent = (): (<E extends TrackEvents>(
  event: E,
  properties: CallerEventProperties<E>,
) => void) => {
  const isAnalyticsEnabled = useIsAnalyticsEnabled();

  return React.useCallback(
    <E extends TrackEvents>(event: E, properties: CallerEventProperties<E>) => {
      if (isAnalyticsEnabled) {
        void analyticsService.track<E>(event, properties);
      }
    },
    [isAnalyticsEnabled],
  );
};
