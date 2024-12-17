'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Avatar, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { authClient } from '@/lib/auth/client';
// import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  email: zod.string().email(),
  firstName: zod.string().min(2),
  lastName: zod.string().min(2),
  password: zod.string().min(6),
  confirmPassword: zod.string().min(6),
});

const userData = {
  avatar: '/assets/avatar.png',
  country: 'USA',
  timezone: 'GTM-7',
} as const;

type Values = zod.infer<typeof schema>;

export function AccountDetailsForm(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [profileUpdatedSuccess, setProfileUpdatedSuccess] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>();

  const { user }: { user: any } = useUser();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      if (values.password !== values.confirmPassword) {
        setError('confirmPassword', { type: 'manual', message: 'Passwords do not match' });
        return;
      }

      setIsPending(true);

      const { error } = await authClient.updateUserInfo({
        _id: user?.id || '',
        ...values,
      });

      if (error) {
        setError('root', { type: 'server', message: error });
        setIsPending(false);
        setProfileUpdatedSuccess(false);
        return;
      }

      setProfileUpdatedSuccess(true);
      setIsPending(false);
    },
    [setError, user]
  );

  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <div>
              <Avatar src={userData.avatar} sx={{ height: '80px', width: '80px' }} />
            </div>
            <Stack spacing={1} sx={{ textAlign: 'center' }}>
              <Typography variant="h5">{user?.name}</Typography>
              <Typography color="text.secondary" variant="body2">
                {userData.country}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
        <Divider />
      </Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader subheader="The information can be edited" title="Profile" />
          <Divider />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          {profileUpdatedSuccess ? <Alert color="success">Profile updated successfully</Alert> : null}
          <CardContent>
            <Grid container spacing={3}>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="firstName"
                  defaultValue={user?.firstName || ''}
                  render={({ field }) => (
                    <FormControl fullWidth required error={Boolean(errors.firstName)}>
                      <InputLabel>First Name</InputLabel>
                      <OutlinedInput {...field} label="First Name" type="text" />
                      {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="lastName"
                  defaultValue={user?.lastName || ''}
                  render={({ field }) => (
                    <FormControl fullWidth required error={Boolean(errors.lastName)}>
                      <InputLabel>Last Name</InputLabel>
                      <OutlinedInput {...field} label="Last Name" type="text" />
                      {errors.lastName ? <FormHelperText>{errors.lastName.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={12} xs={12}>
                <Controller
                  control={control}
                  name="email"
                  defaultValue={user?.email || ''}
                  render={({ field }) => (
                    <FormControl fullWidth required error={Boolean(errors.email)}>
                      <InputLabel>Email address</InputLabel>
                      <OutlinedInput {...field} label="Email address" type="email" />
                      {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormControl fullWidth required error={Boolean(errors.password)}>
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput
                        {...field}
                        endAdornment={
                          showPassword ? (
                            <EyeIcon
                              cursor="pointer"
                              fontSize="var(--icon-fontSize-md)"
                              onClick={(): void => {
                                setShowPassword(false);
                              }}
                            />
                          ) : (
                            <EyeSlashIcon
                              cursor="pointer"
                              fontSize="var(--icon-fontSize-md)"
                              onClick={(): void => {
                                setShowPassword(true);
                              }}
                            />
                          )
                        }
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                      />
                      {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={6} xs={12}>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormControl fullWidth required error={Boolean(errors.confirmPassword)}>
                      <InputLabel>Confirm Password</InputLabel>
                      <OutlinedInput
                        {...field}
                        endAdornment={
                          showPassword ? (
                            <EyeIcon
                              cursor="pointer"
                              fontSize="var(--icon-fontSize-md)"
                              onClick={(): void => {
                                setShowPassword(false);
                              }}
                            />
                          ) : (
                            <EyeSlashIcon
                              cursor="pointer"
                              fontSize="var(--icon-fontSize-md)"
                              onClick={(): void => {
                                setShowPassword(true);
                              }}
                            />
                          )
                        }
                        label="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                      />
                      {errors.confirmPassword ? (
                        <FormHelperText>{errors.confirmPassword.message}</FormHelperText>
                      ) : null}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" disabled={isPending}>
              Save details
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
}
