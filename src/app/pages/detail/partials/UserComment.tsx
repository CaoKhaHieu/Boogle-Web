import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'app/stores/app-reducer';
import { Link } from 'react-router-dom';

import { calculateTimeSince } from 'app/shared/helper/helper-function';

const UserComment = ({ props }: any) => {
  const { id, content, createdAt, user } = props;
  const { userCurrent }: any = useSelector(
    (state: RootState) => state.userState
  );
  const timeSince = calculateTimeSince(createdAt);
  return (
    <>
      {props ? (
        <li key={id} className="user-comment-item">
          <div className="user-picture">
            <img
              src={
                user && user.picture
                  ? `${user.picture}`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTht9-qZYmqErdGMhJVbRf7BfhLRGspNWaFnR8nddu3x7Da7nqh23vsG6VWtG_VE9G9kLU&usqp=CAU'
              }
              alt=""
            />
          </div>
          <div className="comment-detail">
            <div className="comment-header">
              <Link
                to={
                  userCurrent?.email === user?.email
                    ? '/wall/me'
                    : `/wall/${user._id}`
                }
              >
                {user && user.displayName ? user.displayName : user?.lastName}
              </Link>
              <p className="comment-moment">{timeSince}</p>
            </div>
            <div className="user-content">{content}</div>
          </div>
        </li>
      ) : (
        ''
      )}
    </>
  );
};
export default UserComment;
