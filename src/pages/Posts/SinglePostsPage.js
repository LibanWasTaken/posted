import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Spinner3 } from "../../components/Spinner";
import { scrollToBottom } from "../../functions/functions";

import Viewer from "../../components/Editor/Viewer";
import Diary from "../../components/Diaries/DiaryList";
import { useUserContext } from "../../context/UserContext";
import DeletePost from "../../components/modals/DeletePost";
import Comments from "../../components/Comments";

import Editor from "components/Lexical/Editor";
// import "components/Lexical/index.css";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import {
  SettingsContext,
  useSettings,
} from "components/Lexical/context/SettingsContext";
import PlaygroundNodes from "components/Lexical/nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "components/Lexical/themes/PlaygroundEditorTheme";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import dayjs from "dayjs";
import { db } from "../../services/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Tooltip, Button } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";

function LinkList({ links }) {
  return (
    <div className="links">
      {links.map((link, index) => (
        <Tooltip
          title={link.secondary}
          key={link.secondary}
          placement="bottom"
          arrow
        >
          <a href={link.secondary} target="_blank">
            <p key={index} className="link">
              {link.primary}
            </p>
          </a>
        </Tooltip>
      ))}
    </div>
  );
}

export default function SinglePostPage() {
  const { user: currentUser, loading: loadingUser } = useUserContext();
  const { id } = useParams();
  const [postData, setPostData] = useState();
  const [userData, setUserData] = useState();
  const [diaryData, setDiaryData] = useState();
  const [postAdmin, setPostAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hearted, setHearted] = useState(false);
  const [likesCount, setLikesCount] = useState("uhh");
  const [hearting, setHearting] = useState(false);
  const [inValidPost, setInValidPost] = useState(false);
  const [settingsEnabled, setSettingsEnabled] = useState(false);
  const [hidePost, setHidePost] = useState(false);

  const [tempState, setTempState] = useState(false);
  // scrolling;
  const targetRef = useRef(null);
  useEffect(() => {
    if (settingsEnabled) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              // Call your function when the settingsContainer goes out of view
              handleSettingsExit();
            }
          });
        },
        { threshold: 0 } // Use a threshold of 0 to trigger when the element is not fully in view
      );

      // Start observing the settingsContainer element
      if (targetRef.current) {
        observer.observe(targetRef.current);
      }

      // Cleanup the observer when the component is unmounted
      return () => {
        if (targetRef.current) {
          observer.unobserve(targetRef.current);
        }
      };
    }
  }, [hidePost]);

  async function getFSData() {
    try {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      const postDataReceived = docSnap.data();
      // console.log(postDataReceived);
      if (postDataReceived == undefined) {
        setInValidPost(true);
        setLoading(false);
      } else {
        setPostData(postDataReceived);
        console.log(postDataReceived);
        console.log(postDataReceived.letter);
        !userData && getUserData(postDataReceived.user);
      }
    } catch (error) {
      console.error("Error fetching post data:", error);
      alert("Error fetching post data.");
    }
  }

  async function getUserData(uid) {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const userDataReceived = docSnap.data();
      // console.log(userDataReceived);
      if (userDataReceived == undefined) {
        setInValidPost(true);
        setLoading(false);
      } else {
        setUserData(userDataReceived);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Error fetching user data.");
    }
  }
  useEffect(() => {
    getFSData();
  }, []);

  useEffect(() => {
    if (currentUser && postData) {
      if (postData.likes) {
        const isCurrentUserLiked = postData.likes.includes(currentUser.uid);
        setHearted(isCurrentUserLiked);
        setLikesCount(postData.likes.length);
        // console.log(isCurrentUserLiked);
      }
      if (!postAdmin && currentUser.uid == postData.user) {
        setPostAdmin(true);
      }
    }
  }, [currentUser, postData]);

  // Lexical

  const dummyState = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "asd asdnashdlkjash dkasdbfkhabmfh,savd,hdf",
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
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "wait na this is the finla testasd",
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
        {
          children: [],
          direction: null,
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
        {
          children: [
            {
              data: '{"appState":{"exportBackground":true,"exportScale":1,"exportWithDarkMode":false,"isBindingEnabled":true,"isLoading":false,"name":"Untitled-2024-02-23-1647","theme":"light","viewBackgroundColor":"#ffffff","viewModeEnabled":false,"zenModeEnabled":false,"zoom":{"value":1}},"elements":[{"id":"UicRjsAy-iXPvD_M026El","type":"freedraw","x":451.296875,"y":221,"width":355,"height":272,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":148300209,"version":48,"versionNonce":306892703,"isDeleted":false,"boundElements":null,"updated":1708685275462,"link":null,"locked":false,"points":[[0,0],[-22,-17],[-50,-33],[-83,-47],[-115,-55],[-145,-60],[-169,-60],[-185,-57],[-194,-51],[-200,-42],[-201,-31],[-199,-18],[-190,3],[-176,26],[-157,51],[-139,73],[-123,95],[-108,113],[-99,130],[-93,144],[-93,155],[-95,164],[-102,173],[-113,179],[-128,185],[-149,188],[-171,188],[-194,188],[-213,183],[-226,176],[-232,168],[-234,157],[-232,145],[-219,127],[-198,104],[-167,80],[-128,55],[-88,33],[-45,12],[-3,-8],[37,-27],[71,-44],[96,-58],[112,-69],[119,-76],[121,-84],[121,-84]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[121,-84]}],"files":{}}',
              height: "inherit",
              type: "excalidraw",
              version: 1,
              width: "inherit",
            },
            {
              data: '{"appState":{"exportBackground":true,"exportScale":1,"exportWithDarkMode":false,"isBindingEnabled":true,"isLoading":false,"name":"Untitled-2024-02-23-1647","theme":"light","viewBackgroundColor":"#ffffff","viewModeEnabled":false,"zenModeEnabled":false,"zoom":{"value":1}},"elements":[{"id":"UicRjsAy-iXPvD_M026El","type":"freedraw","x":451.296875,"y":221,"width":355,"height":272,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":148300209,"version":48,"versionNonce":306892703,"isDeleted":false,"boundElements":null,"updated":1708685275462,"link":null,"locked":false,"points":[[0,0],[-22,-17],[-50,-33],[-83,-47],[-115,-55],[-145,-60],[-169,-60],[-185,-57],[-194,-51],[-200,-42],[-201,-31],[-199,-18],[-190,3],[-176,26],[-157,51],[-139,73],[-123,95],[-108,113],[-99,130],[-93,144],[-93,155],[-95,164],[-102,173],[-113,179],[-128,185],[-149,188],[-171,188],[-194,188],[-213,183],[-226,176],[-232,168],[-234,157],[-232,145],[-219,127],[-198,104],[-167,80],[-128,55],[-88,33],[-45,12],[-3,-8],[37,-27],[71,-44],[96,-58],[112,-69],[119,-76],[121,-84],[121,-84]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[121,-84]}],"files":{}}',
              height: "inherit",
              type: "excalidraw",
              version: 1,
              width: "inherit",
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "s",
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
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "yurwait na this is the finla test",
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
        {
          children: [],
          direction: null,
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
        {
          children: [
            {
              data: '{"appState":{"exportBackground":true,"exportScale":1,"exportWithDarkMode":false,"isBindingEnabled":true,"isLoading":false,"name":"Untitled-2024-02-23-1647","theme":"light","viewBackgroundColor":"#ffffff","viewModeEnabled":false,"zenModeEnabled":false,"zoom":{"value":1}},"elements":[{"id":"UicRjsAy-iXPvD_M026El","type":"freedraw","x":451.296875,"y":221,"width":355,"height":272,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":148300209,"version":48,"versionNonce":306892703,"isDeleted":false,"boundElements":null,"updated":1708685275462,"link":null,"locked":false,"points":[[0,0],[-22,-17],[-50,-33],[-83,-47],[-115,-55],[-145,-60],[-169,-60],[-185,-57],[-194,-51],[-200,-42],[-201,-31],[-199,-18],[-190,3],[-176,26],[-157,51],[-139,73],[-123,95],[-108,113],[-99,130],[-93,144],[-93,155],[-95,164],[-102,173],[-113,179],[-128,185],[-149,188],[-171,188],[-194,188],[-213,183],[-226,176],[-232,168],[-234,157],[-232,145],[-219,127],[-198,104],[-167,80],[-128,55],[-88,33],[-45,12],[-3,-8],[37,-27],[71,-44],[96,-58],[112,-69],[119,-76],[121,-84],[121,-84]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[121,-84]}],"files":{}}',
              height: "inherit",
              type: "excalidraw",
              version: 1,
              width: "inherit",
            },
            {
              data: '{"appState":{"exportBackground":true,"exportScale":1,"exportWithDarkMode":false,"isBindingEnabled":true,"isLoading":false,"name":"Untitled-2024-02-27-2054","theme":"light","viewBackgroundColor":"#ffffff","viewModeEnabled":false,"zenModeEnabled":false,"zoom":{"value":1}},"elements":[{"id":"SROSPpo7bl4iBl5kfznVL","type":"freedraw","x":381,"y":212,"width":103,"height":85,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":63758,"version":60,"versionNonce":596556882,"isDeleted":false,"boundElements":null,"updated":1709045645143,"link":null,"locked":false,"points":[[0,0],[2,0],[5,0],[9,0],[13,-2],[18,-5],[23,-9],[28,-13],[32,-18],[36,-24],[39,-30],[40,-35],[40,-41],[40,-44],[40,-47],[37,-49],[33,-49],[27,-49],[22,-46],[15,-39],[10,-31],[6,-22],[2,-10],[0,0],[0,10],[1,19],[5,25],[11,30],[19,34],[28,36],[37,36],[47,32],[57,27],[66,20],[74,12],[82,3],[87,-6],[90,-14],[93,-20],[94,-26],[95,-30],[95,-33],[95,-34],[95,-32],[95,-28],[95,-23],[95,-16],[95,-10],[96,-4],[97,0],[99,3],[100,5],[101,6],[102,6],[103,5],[103,3],[103,0],[103,-6],[103,-6]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[103,-6]},{"id":"VOuAeJVoyQPVXzJdcmcAE","type":"freedraw","x":465,"y":154,"width":7,"height":3,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":1314193422,"version":9,"versionNonce":1889972242,"isDeleted":false,"boundElements":null,"updated":1709045645318,"link":null,"locked":false,"points":[[0,0],[-1,-1],[-3,-3],[-2,-3],[0,-3],[4,-3],[0,0]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[4,-3]},{"id":"C3uj5JXThPCDyHHkogTjg","type":"freedraw","x":513,"y":129,"width":22,"height":90,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":1338515534,"version":18,"versionNonce":1319169938,"isDeleted":false,"boundElements":null,"updated":1709045645607,"link":null,"locked":false,"points":[[0,0],[0,2],[1,9],[3,16],[5,26],[7,38],[10,51],[13,62],[16,71],[18,79],[20,84],[21,88],[22,90],[20,90],[18,88],[16,85],[16,85]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[16,85]},{"id":"XSJLFgXp38G7dxeWSOUYF","type":"freedraw","x":523,"y":201,"width":28,"height":13,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":976259278,"version":13,"versionNonce":1290273362,"isDeleted":false,"boundElements":null,"updated":1709045645725,"link":null,"locked":false,"points":[[0,0],[0,-2],[0,-4],[1,-5],[3,-7],[6,-8],[9,-9],[13,-11],[17,-12],[22,-12],[28,-13],[28,-13]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[28,-13]},{"id":"6vZOey8G0ACIQV2hUqN4H","type":"freedraw","x":603,"y":177,"width":50,"height":49,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":2059917838,"version":39,"versionNonce":1934256786,"isDeleted":false,"boundElements":null,"updated":1709045646198,"link":null,"locked":false,"points":[[0,0],[-1,-1],[-3,-1],[-4,-1],[-6,-1],[-8,1],[-10,3],[-12,7],[-12,10],[-13,14],[-13,16],[-13,18],[-12,19],[-10,20],[-8,20],[-6,20],[-3,20],[-1,18],[0,15],[2,12],[2,11],[3,9],[3,8],[3,7],[3,8],[3,11],[3,14],[5,19],[7,23],[10,28],[15,33],[19,37],[24,40],[29,44],[33,46],[35,47],[37,48],[37,48]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[37,48]},{"id":"w_ldJXUAKFFt8cGg0wU_Y","type":"freedraw","x":570,"y":450,"width":107,"height":223,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":997301710,"version":27,"versionNonce":1211729362,"isDeleted":false,"boundElements":null,"updated":1709045646614,"link":null,"locked":false,"points":[[0,0],[3,7],[5,10],[7,13],[4,11],[-3,3],[-14,-10],[-26,-27],[-42,-51],[-56,-77],[-70,-104],[-83,-131],[-92,-154],[-98,-172],[-100,-184],[-100,-193],[-99,-200],[-95,-205],[-89,-208],[-81,-210],[-74,-210],[-67,-210],[-61,-208],[-56,-204],[-53,-198],[-53,-198]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[-53,-198]},{"id":"ybcaVcPdo8BQq6Dlh-Q_X","type":"freedraw","x":490,"y":341,"width":429,"height":98,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":1201651342,"version":135,"versionNonce":1668843026,"isDeleted":false,"boundElements":null,"updated":1709045647806,"link":null,"locked":false,"points":[[0,0],[2,2],[7,4],[14,5],[23,5],[33,5],[42,3],[51,-1],[58,-4],[64,-8],[68,-11],[70,-14],[71,-16],[71,-17],[72,-17],[74,-15],[77,-9],[81,-1],[88,8],[94,19],[101,29],[107,40],[112,48],[115,54],[118,59],[118,62],[118,63],[118,64],[116,62],[112,57],[107,52],[104,44],[101,34],[99,24],[98,15],[98,6],[98,-2],[103,-7],[108,-12],[113,-15],[120,-16],[127,-16],[134,-16],[140,-14],[146,-11],[150,-7],[156,-1],[160,5],[165,11],[169,16],[173,20],[177,23],[181,24],[185,25],[189,25],[194,25],[198,21],[201,17],[203,11],[205,4],[206,-1],[206,-5],[204,-9],[203,-11],[199,-12],[195,-11],[192,-7],[190,-2],[188,6],[188,14],[189,23],[192,32],[199,39],[207,44],[216,48],[227,50],[239,50],[251,50],[264,46],[277,38],[286,31],[293,23],[299,14],[302,5],[303,-9],[302,-14],[298,-17],[293,-19],[288,-19],[282,-19],[276,-15],[272,-10],[269,-4],[266,4],[266,10],[267,17],[271,23],[278,27],[289,31],[301,33],[315,33],[333,33],[352,29],[372,22],[388,13],[402,3],[410,-5],[415,-13],[418,-21],[418,-26],[417,-30],[414,-33],[411,-34],[405,-34],[399,-32],[392,-25],[387,-17],[384,-7],[381,6],[380,17],[380,28],[382,38],[386,45],[391,52],[397,57],[404,60],[409,62],[415,62],[420,62],[424,62],[426,61],[428,60],[429,60],[429,60]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[429,60]},{"id":"pIaHu9XMX4PphjJyhQA1r","type":"freedraw","x":1010,"y":598,"width":183,"height":210,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":1405446734,"version":68,"versionNonce":553540882,"isDeleted":false,"boundElements":null,"updated":1709045648645,"link":null,"locked":false,"points":[[0,0],[0,1],[-2,-2],[-8,-9],[-16,-20],[-30,-38],[-46,-58],[-62,-78],[-75,-98],[-86,-115],[-93,-129],[-96,-139],[-97,-147],[-96,-155],[-91,-160],[-84,-164],[-73,-165],[-61,-165],[-51,-165],[-41,-161],[-32,-156],[-26,-150],[-21,-143],[-18,-136],[-16,-130],[-16,-126],[-16,-123],[-16,-122],[-15,-123],[-15,-126],[-13,-132],[-9,-141],[-4,-153],[5,-164],[15,-174],[27,-184],[39,-191],[51,-196],[61,-199],[69,-199],[76,-198],[81,-194],[84,-187],[86,-179],[86,-168],[84,-154],[77,-136],[66,-113],[52,-90],[39,-68],[26,-49],[16,-34],[11,-23],[7,-14],[6,-8],[6,-4],[8,1],[13,4],[17,7],[23,8],[29,10],[33,11],[37,11],[39,11],[41,11],[42,11],[42,11]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[42,11]}],"files":{}}',
              height: "inherit",
              type: "excalidraw",
              version: 1,
              width: "inherit",
            },
          ],
          direction: null,
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

  const {
    settings: { isCollab, emptyEditor, measureTypingPerf },
  } = useSettings();
  const initialConfig = {
    // editorState: JSON.stringify(dummyState),
    editorState: null,
    editable: false,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  const UpdatePlugin = () => {
    const [editor] = useLexicalComposerContext();
    // console.log(editor);
    // const editor1 = editor;
    // console.log(editor.isEditable());
    // editor.setEditable(false);
    // // console.log(editor == editor1);
    // console.log(editor.isEditable());
    // editor.setEditable(false);
    useEffect(() => {
      if (postData.letter) {
        const editorState = editor.parseEditorState(postData.letter);
        editor.setEditorState(editorState);
      }
    }, [postData]);
    // editor.setEditable(false);
    // setTimeout(() => {
    //   editor.setEditable(false);
    // }, 100);
    // const removeEditableListener = editor.registerEditableListener(
    //   (isEditable) => {
    //     // The editor's mode is passed in!
    //     console.log(isEditable);
    //   }
    // );
  };

  async function handleHeart() {
    try {
      setHearting(true);
      const docRef = doc(db, "posts", id); // TODO: change to posted
      const docSnap = await getDoc(docRef);
      const postDataReceived = docSnap.data();
      console.log(postDataReceived);
      let postDataLikes = postDataReceived.likes || [];
      const uid = currentUser.uid;

      if (hearted) {
        postDataLikes = postDataLikes.filter((userId) => userId !== uid);
        setLikesCount(likesCount - 1);
      } else {
        postDataLikes.push(uid);
        setLikesCount(likesCount + 1);
      }

      const postRef = doc(db, "posts", id); // TODO: change to posted
      await updateDoc(postRef, {
        likes: postDataLikes,
      });

      setHearted(!hearted);
      setHearting(false);

      // console.log(hearted ? "Disliked" : "Liked");
    } catch (error) {
      console.error("Error handling like/dislike", error);
      setHearting(false);
    }
  }

  function handleSettings() {
    setSettingsEnabled(true);
    setTimeout(() => {
      scrollToBottom(null, 1000);
      // scrollPosition = window.scrollY;

      // Disable scrolling
      // document.body.style.overflow = "hidden";
    }, 10);
    setTimeout(() => {
      setHidePost(true);
    }, 1000);
  }
  function handleSettingsExit() {
    setHidePost(false);
    // scrollToBottom(null, 1);
    scrollToBottom(0.1, 1000);
    setTimeout(() => {
      setSettingsEnabled(false);
      // document.body.style.overflow = "auto";
    }, 1000);
  }

  const [diaryOpenMUI, setDiaryOpenMUI] = useState(false);
  const [deletePostOpen, setDeletePostOpen] = useState(false);
  const handleDiaryCloseMUI = () => setDiaryOpenMUI(false);
  const handleDiaryOpenMUI = () => setDiaryOpenMUI(true);
  const handleDeletePostOpen = () => setDeletePostOpen(true);
  const handleDeletePostClose = () => setDeletePostOpen(false);

  return (
    <Wrapper>
      {loading ? (
        <div className="error">
          <Spinner3 />
        </div>
      ) : inValidPost ? (
        <div className="error">
          <h1>Post Not Found</h1>
          <a href="/">
            <button className="classicBtn">Go home</button>
          </a>
        </div>
      ) : (
        <section className="Container">
          <div className={`postContainer ${hidePost && "hidden"}`}>
            <section className="info">
              {/* <div style={{ display: "flex", gap: "5rem", alignItems: "center" }}> */}
              <div>
                <div>
                  <p className="title">{postData.title}</p>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Tooltip
                      title={dayjs(postData.releaseDate).format("HH:mm:ss")}
                      placement="right"
                      arrow
                    >
                      <h2 className="releaseDate">
                        {dayjs(postData.releaseDate).format("DD MMM, YYYY")}
                      </h2>
                    </Tooltip>
                  </span>
                </div>
              </div>
              <div style={{ textAlign: "center", margin: "0 2rem" }}>
                <h4 className="description">
                  {postData.description && postData.description}
                </h4>
                <p className="username">
                  {postData.anonymity ? (
                    "- Anonymous"
                  ) : (
                    <a href={`/user/${postData.user}`}>
                      - {userData.displayName || "This Guy"}
                    </a>
                  )}
                </p>{" "}
              </div>

              <div className="buttons">
                {postData.diary ||
                  (true && (
                    <span
                      className="buttonIcon material-symbols-outlined"
                      onClick={handleDiaryOpenMUI}
                    >
                      book_5
                    </span>
                  ))}
                {/* {currentUser && postData && ( */}
                <Tooltip
                  title={currentUser ? likesCount : "Log in"}
                  placement="top"
                  arrow
                >
                  <span
                    className={`heart material-symbols-outlined ${
                      hearted && "hearted"
                    } ${hearting && "liking"}`}
                    onClick={currentUser && handleHeart}
                  >
                    {hearted ? "heart_check" : "favorite"}
                  </span>
                  {/* <FavoriteBorderIcon fontSize="large" />
                  <FavoriteOutlinedIcon fontSize="large" />
                  <FavoriteTwoToneIcon fontSize="large" /> */}
                </Tooltip>
                {/* )} */}
                {postAdmin && (
                  <span
                    className="buttonIcon material-symbols-outlined settings"
                    onClick={handleSettings}
                  >
                    settings
                  </span>
                )}
              </div>
            </section>

            <section className="post">
              {/* <div className="letter">
                {postData.letter && <Viewer state={postData.letter} />}
              </div> */}
              {postData.letter && (
                <LexicalComposer initialConfig={initialConfig}>
                  <div className="editor-shell viewOnlySPP">
                    <Editor />
                    <UpdatePlugin />
                  </div>
                  {/* <Settings /> */}
                </LexicalComposer>
              )}
              {postData.links && <LinkList links={postData.links} />}
            </section>
            <Comments postID={id} postAdminUID={postData.user} />

            {postData.diary ||
              (true && (
                // FIXME: {postData.diary && }
                <Diary
                  open={diaryOpenMUI}
                  handleClose={handleDiaryCloseMUI}
                  info={id}
                  editable={false}
                  viewer={true}
                />
              ))}
          </div>

          {settingsEnabled && (
            <div ref={targetRef} className="settingsContainer">
              <div className="title">
                <span
                  className="buttonIcon material-symbols-outlined"
                  onClick={handleSettingsExit}
                >
                  keyboard_double_arrow_up
                </span>
                <h1>Settings</h1>
              </div>
              <div className="form">
                <p>Show comments?</p>
                <p>Change this</p>
                <p>Also Change this</p>
                <p>what about this Change this</p>
                <p>see views = pay money</p>
                {/* With prem?: */}
                <div className="buttons">
                  <button className="deleteBtn" onClick={() => {}}>
                    Remove Anonymity
                  </button>
                  <button className="deleteBtn" onClick={() => {}}>
                    Change Publicity
                  </button>
                  <button className="deleteBtn" onClick={handleDeletePostOpen}>
                    delete post
                  </button>
                </div>
              </div>
              <span className="material-symbols-outlined settingImg">
                settings
              </span>

              <DeletePost
                open={deletePostOpen}
                handleClose={handleDeletePostClose}
                postID={id}
                userID={currentUser.uid}
                fromDB="posts" // TODO: change to posted
              />
            </div>
          )}
        </section>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  /* margin: 1rem 0; */
  overflow-x: hidden;
  padding: 1.5rem 0 1rem 0;
  background-color: rgb(250, 250, 250);
  min-height: 100vh;

  .postContainer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 100%;

    /* width: 95vw; */
    section {
      /* padding: 1rem 2rem; */
    }

    .info {
      width: 95%;
      max-width: 100vw;
      padding-bottom: 2rem;
      border-bottom: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        user-select: none;

        .settings:hover {
          transition: 0.3s;
          transform: rotate(60deg);
        }
        .heart {
          background-color: whitesmoke;
          cursor: pointer;
          border-radius: 50%;
          fill: black;
          padding: 1rem;
          transition: 0.5s ease-in-out;

          /* color: white; */
        }
        .hearted {
          /* transition: 0.3s ease-in-out; */
          background-color: black;
          color: white;
        }
        .liking {
          background-color: #ddd;
          pointer-events: none;
        }
      }
      p {
        padding: 0;
        margin: 0;
      }
      .title {
        font-size: 3.5rem;
        padding: 0;
        margin: 0;
        max-width: 35rem;
        word-wrap: break-word;
      }
      .releaseDate {
        padding: 0;
        /* margin: 0 0 2rem 0; */
        margin: 0;
      }
      .description {
        padding: 0;
        margin: 0 0 0.5rem 0;
        max-width: 50rem;
        word-wrap: break-word;
      }

      .username {
        a {
          text-decoration: none;
          color: black;
        }
      }
    }

    .post {
      /* border: 1px solid #ddd; */
      display: flex;
      flex-direction: column;
      gap: 2rem;
      margin: 2rem 0;
      width: 95%;

      .letter {
        border: 1px solid red;
      }

      .links {
        /* border: 1px solid red; */
        max-height: 3rem;
        overflow-x: scroll;
        padding: 0.5rem;
        padding-bottom: 1.5rem;
        display: flex;
        gap: 1rem;
        grid-template-columns: 1fr 1fr 1fr;

        a {
          text-decoration: none;
          color: black;
          margin: 0;
        }
        .link {
          cursor: pointer;
          width: 10rem;
          height: 3rem;
          margin: 0;
          text-align: center;

          /* padding: 1rem 1rem; */
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: whitesmoke;
        }
      }
    }
  }

  .settingsContainer {
    /* width: 95%; */
    padding: 1rem;
    height: 85vh;
    /* margin-bottom: 2rem; */
    margin: 1rem;
    margin-top: 300vh;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    p {
      font-size: 1.25rem;
      margin: 2rem;
    }

    .buttons {
      position: absolute;
      bottom: 2rem;
    }
    .settingImg {
      position: block;
      right: -20rem;
      bottom: -20rem;
      font-size: 50rem;
      color: #eee;
      animation: spin 30s linear infinite;
      user-select: none;
      z-index: -1;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .title {
      display: flex;
      margin: 0 2rem;
      align-items: center;
      gap: 2rem;
      border-bottom: 1px solid #ddd;
      padding-bottom: 1rem;
      margin-bottom: 2rem;
    }

    .form {
      /* display: flex;
      /* align-items: center;
      flex-direction: column;
      justify-content: space-around;
      height: 50%; */
    }

    .deleteBtn {
      margin: 0 1rem;
      padding: 1rem;
      outline: none;
      border: none;
      cursor: pointer;
      background: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: 0.3s;
    }
    .deleteBtn {
      background-color: tomato;
      color: white;
    }
    .deleteBtn:hover {
      background-color: #dd573f;
    }
  }

  .error {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 100vw;
    height: 50vh;
  }

  .hidden {
    visibility: hidden;
  }

  .buttonIcon {
    background-color: whitesmoke;
    padding: 1rem;
    border-radius: 50%;
    cursor: pointer;
  }
  .buttonIcon:hover {
    background-color: #eee;
  }
  .buttonIcon:active {
    background-color: #ddd;
  }
`;
