import React, { FormEvent, useContext, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { changePasswordRequest, clearUserState } from 'app/stores/user/actions';
import { NotificationContext } from 'app/shared/components/notifications/NotificationProvider';
import { LoadingContext } from 'app/shared/components/loading/LoadingProvider';
import { RootState } from 'app/stores/app-reducer';
import { PasswordOptions } from 'app/shared/types/Password';

const ChangePassword = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const schema = yup.object().shape({
    newPassword: yup
      .string()
      .min(8, 'New password must be more than 8 characters')
      .max(20, 'Password must be less than 20 characters')
      .required(),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  const [repeatPass, setRepeatPass] = useState<string>('');

  const { handleAddNotification } = useContext(NotificationContext);
  const { handleShowLoading } = useContext(LoadingContext);
  const { isLoading, message, error } = useSelector(
    (state: RootState) => state.userState
  );

  useEffect(() => {
    handleShowLoading(isLoading ? true : false);
    if (error) {
      dispatch(clearUserState());
      handleAddNotification({ type: 'ERROR', message: error });
    }
    if (message) {
      dispatch(clearUserState());
      handleAddNotification({ type: 'SUCCESS', message: 'Change password success' });
      // window.location.href = '/'
    }
  }, [isLoading, message, error]);

  useEffect(() => {
    return () => {
      dispatch(clearUserState());
    };
  }, []);

  const onSubmit = (data: PasswordOptions) => {
    if (data.newPassword === repeatPass) {
      dispatch(changePasswordRequest(data));
      reset();
    } else {
      setError('repeatPassword', {
        type: 'manual',
        message: 'Password does not matched',
      });
    }
  };

  return (
    <section className="section-change-pass">
      <div className="container">
        <h2 className="change-pass-title">Change your password</h2>
        <form className="change-pass-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="password"
            type="password"
            placeholder="Old password"
            {...register('oldPassword')}
          ></input>
          <input
            className="password"
            type="password"
            placeholder="New password"
            {...register('newPassword')}
          ></input>
          {errors.newPassword ? (
            <span className="error">{errors.newPassword.message}</span>
          ) : (
            ''
          )}
          <input
            className="password"
            type="password"
            placeholder="Repeat new password"
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setRepeatPass(e.currentTarget.value)
            }
          ></input>
          {errors.repeatPassword ? (
            <span className="error">{errors.repeatPassword.message}</span>
          ) : (
            ''
          )}
          <div className="form-btn">
            <button className="btn btn-primary" type="submit">
              Change password
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
