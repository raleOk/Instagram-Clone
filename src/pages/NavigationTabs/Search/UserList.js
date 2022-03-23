import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getUsers } from "../../../api/api";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [searchParams] = useSearchParams({});

  useEffect(() => {
    const searchTerm = searchParams.get("search");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const getUserData = async () => {
      try {
        const response = await getUsers(searchTerm, page, limit);
        const { users } = response.data;

        setUserList(users);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [searchParams]);

  return (
    <>
      {userList.map(user => {
        return <div key={user._id}>{user.username}</div>;
      })}
    </>
  );
};

export default UserList;
