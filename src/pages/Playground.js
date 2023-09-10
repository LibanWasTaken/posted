import React, { useState, useEffect } from "react";
import styled from "styled-components";

import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebase-config";

const Playground = () => {
  const letterExample = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Okay hopefully this is the new ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 1,
              mode: "normal",
              style: "",
              text: "final ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "test of this ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 2,
              mode: "normal",
              style: "",
              text: "saga",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "..",
              type: "text",
              version: 1,
            },
            { type: "linebreak", version: 1 },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Though I ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 8,
              mode: "normal",
              style: "",
              text: "have to change",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: " stuff around...",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };

  const addDataToFS = async (e) => {
    e.preventDefault();
    console.log("pressed");

    try {
      const docRef = await addDoc(collection(db, "users"), {
        // first: "blabla",
        // last: "skrr",
        // born: 1815,
      });
      console.log("Document added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const setDataToFS = async (e) => {
    e.preventDefault();
    console.log("pressed");

    try {
      const customId = "your_custom_id_here";

      const docRef = doc(db, "users", customId);
      await setDoc(docRef, {
        first: "mamamaAda",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document with custom ID set: ", customId);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateDataToFS = async (e) => {
    e.preventDefault();
    console.log("pressed");

    try {
      const customId = "your_custom_id_here";
      // const docRef = doc(db, "users", customId);
      const docRef = doc(db, "posts/DZL3b9ij1vWSZ4d72aa2");
      const dataToUpdate = {
        // height: "short af",/
        letter: letterExample,
      };

      await updateDoc(docRef, dataToUpdate);
      console.log("Document with custom ID updated: ", customId);
    } catch (error) {
      console.error("Error updating document with custom ID: ", error);
    }
  };

  const fetchPost = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(newData);
    });
  };

  async function getCustomData() {
    const docRef = doc(db, "users", "your_custom_id_here");
    const docSnap = await getDoc(docRef);
    const userInfo = docSnap.data();
    console.log(userInfo.letter);
    if (userInfo) {
      const postsRef = doc(db, userInfo.posts.path);
      const postsDocSnap = await getDoc(postsRef);

      if (postsDocSnap.exists()) {
        const postsData = postsDocSnap.data();
        console.log(postsData);
      } else {
        console.log("No such posts");
      }
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <Wrapper>
      <h1>Playground</h1>
      <button onClick={addDataToFS}>Add Data</button>
      <button onClick={setDataToFS}>set Data</button>
      <button onClick={updateDataToFS}>Update Data</button>
      <button onClick={getCustomData}>Get user Data</button>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  button {
    margin: 1rem;
    padding: 1rem;
  }
`;

export default Playground;

/*

addDoc()
auto-generate an ID while creating doc

getDoc()
Reads the document referred to by this DocumentReference

getDocs()
Executes the query and returns the results as a QuerySnapshot

updateDoc()
Updates fields in the document referred to by the specified DocumentReference

users                      posts                  posted

ID                         diary:
                                                      

info:              ->   PostId                                 
  name            /         letter:                            
  age            /              bla blac                     
  height        /                                          
               /                                   
posts:        /                                          
  [PostIDRef]/                                                  

 
  
*/
