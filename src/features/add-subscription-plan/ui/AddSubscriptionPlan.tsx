import { RiAddLine } from '@remixicon/react';

import { Button, Typography } from '@/shared';

export const AddSubscriptionPlan = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 rounded-md border px-4 pb-4 pt-6 text-center shadow-lg">
      <div className="inline-block rounded-full border border-dashed p-4 text-center">
        <RiAddLine />
      </div>

      <div className="space-y-1">
        <Typography variant="paragraph" weight="medium">
          Add new paid plan
        </Typography>

        <Typography variant="caption" color="grey">
          You’re ready to take your establishment experience to the next level
        </Typography>
      </div>

      <Button size="xl" radius="full">
        Create plan
      </Button>
    </div>
  );
};
