import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { CurrencyDollar as CurrencyDollarIcon } from '@phosphor-icons/react/dist/ssr/CurrencyDollar';

import { formatUSD } from '@/lib/money-formatter';

export interface BudgetProps {
  sx?: SxProps;
  paymentSubscriptionsCount: number;
  totalPendingBalance: number;
  totalAvailableBalance: number;
}

export function Budget({ sx, paymentSubscriptionsCount, totalPendingBalance, totalAvailableBalance }: BudgetProps) {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Subscriptions Count
              </Typography>
              <Typography variant="h4">{paymentSubscriptionsCount}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
              <CurrencyDollarIcon fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Total Pending Balance
              </Typography>
              <Typography variant="h4">{formatUSD(totalPendingBalance)}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Total Available Balance
              </Typography>
              <Typography variant="h4">{formatUSD(totalAvailableBalance)}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
