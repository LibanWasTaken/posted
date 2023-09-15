import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDatabase, ref, onValue } from "firebase/database";
import { Spinner1 } from "../../components/Spinner";
import Card from "../../components/PostCard";

export default function AllProductPage() {
  const db = getDatabase();
  const [users, setUsers] = useState();

  useEffect(() => {
    const prodRef = ref(db, "users/unposted/"); // TODO: change to posted late
    onValue(prodRef, (snapshot) => {
      let data = snapshot.val();
      setUsers(data);
    });
  }, []);

  return (
    <Wrapper>
      {users ? (
        <div className="section">
          USERS
          {Object.values(users).map((user) => {
            return <Card key={user.id} user={user} loading={false} />;
          })}
        </div>
      ) : (
        <Spinner1 />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  .section {
  }
`;
