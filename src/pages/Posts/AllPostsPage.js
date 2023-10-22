import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDatabase, ref, onValue } from "firebase/database";
import { Spinner1 } from "../../components/Spinner";
import Card from "../../components/PostCard";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../services/firebase-config";

export default function AllProductPage() {
  // const db = getDatabase();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  async function getFSData() {
    await getDocs(collection(db, `/posts`)).then((querySnapshot) => {
      const postsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(postsData);
      setPosts(postsData);
      setLoading(false);
    });
  }
  useEffect(() => {
    getFSData();
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <Spinner1 />
      ) : (
        <section>
          <p>Posts:</p>
          <div className="posts">
            {Object.values(posts).map((post) => {
              return (
                <Card
                  key={post.id}
                  postTitle={post.title}
                  postID={post.id}
                  releaseDate={post.releaseDate}
                />
              );
            })}
          </div>
        </section>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  .posts {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 1420px) {
    .posts {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (max-width: 1120px) {
    .posts {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 820px) {
    .posts {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
