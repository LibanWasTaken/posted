import React, { useState, useEffect } from "react";
import Editor from "./Editor";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { SettingsContext, useSettings } from "./context/SettingsContext";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import { TableContext } from "./plugins/TablePlugin";
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";

import styled from "styled-components";

import Settings from "./Settings";

// Me
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LinearProgress } from "@mui/material";

function LexicalEditor() {
  const {
    settings: { isCollab, emptyEditor, measureTypingPerf },
  } = useSettings();

  const initialConfig = {
    editorState: isCollab
      ? null
      : emptyEditor
      ? undefined
      : // : prepopulatedRichText,
        null,
    namespace: "Playground",
    nodes: [...PlaygroundNodes],
    onError: (error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  const [switchEditorState, setSwitchEditorState] = useState(false);
  const [editorStateValue, setEditorStateValue] = useState();
  const [adminText, setAdminText] = useState();
  const [progress, setProgress] = useState();

  const dummy = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "anotha examply yk",
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

  const dummy2 = {
    dirtyElements: {},
    dirtyLeaves: {},
    editorState: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "example 2 ",
                type: "text",
                version: 1,
              },
              {
                detail: 0,
                format: 1,
                mode: "normal",
                style: "",
                text: "PLS ",
                type: "text",
                version: 1,
              },
              {
                detail: 0,
                format: 3,
                mode: "normal",
                style: "",
                text: "okay ",
                type: "text",
                version: 1,
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "idk why but im ",
                type: "text",
                version: 1,
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "background-color: #ff0000;color: #ffffff;",
                text: "scared",
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
                style: "color: #000000;",
                text: "are you not?? ",
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
            caption: {
              editorState: {
                root: {
                  children: [],
                  direction: null,
                  format: "",
                  indent: 0,
                  type: "root",
                  version: 1,
                },
              },
            },
            color: "yellow",
            type: "sticky",
            version: 1,
            xOffset: 731,
            yOffset: -19,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    },
    normalizedNodes: {},
    prevEditorState: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "example 2 ",
                type: "text",
                version: 1,
              },
              {
                detail: 0,
                format: 1,
                mode: "normal",
                style: "",
                text: "PLS ",
                type: "text",
                version: 1,
              },
              {
                detail: 0,
                format: 3,
                mode: "normal",
                style: "",
                text: "okay ",
                type: "text",
                version: 1,
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "idk why but im ",
                type: "text",
                version: 1,
              },
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "background-color: #ff0000;color: #ffffff;",
                text: "scared",
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
                style: "color: #000000;",
                text: "are you not?? ",
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
            caption: {
              editorState: {
                root: {
                  children: [],
                  direction: null,
                  format: "",
                  indent: 0,
                  type: "root",
                  version: 1,
                },
              },
            },
            color: "yellow",
            type: "sticky",
            version: 1,
            xOffset: 0,
            yOffset: 0,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    },
    tags: {},
  };

  function roughSizeOfObject(object) {
    const objectList = [];
    const stack = [object];
    let bytes = 0;

    while (stack.length) {
      const value = stack.pop();

      switch (typeof value) {
        case "boolean":
          bytes += 4;
          break;
        case "string":
          bytes += value.length * 2;
          break;
        case "number":
          bytes += 8;
          break;
        case "object":
          if (!objectList.includes(value)) {
            objectList.push(value);
            for (const prop in value) {
              if (value.hasOwnProperty(prop)) {
                stack.push(value[prop]);
              }
            }
          }
          break;
      }
    }
    console.log(`${bytes / 1000}kb`);
    // console.log(`${((bytes / 1000 / 1000) * 100).toFixed(2)}%`);
  }
  function estimateObjectSizeInKB(obj) {
    const jsonString = JSON.stringify(obj);
    const bytes = new Blob([jsonString]).size;
    const kilobytes = bytes / 1024;
    const megabytes = kilobytes / 1024;
    console.log(kilobytes.toFixed(2), megabytes.toFixed(2));
    console.log(progress);
    const percentage = Number(kilobytes / 500) * 100;
    setProgress(percentage);
    // if (percentage < 100) {
    //   setProgress(percentage);
    // } else {
    //   setProgress(100);
    // }
  }

  // ME
  function addAdminText(textState, text) {
    const objState = JSON.parse(textState);
    const textObj = {
      children: [
        {
          detail: 0,
          format: 0,
          mode: "normal",
          style: "background-color: #ffdfdf;color: #d0021b;",
          text: `Error: ${text}`,
          type: "text",
          version: 1,
        },
        {
          detail: 0,
          format: 0,
          mode: "normal",
          style: "",
          text: " ",
          type: "text",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "paragraph",
      version: 1,
    };
    if (!objState || !objState.root || !objState.root.children) {
      console.log("Invalid objState or missing 'root' or 'children' key.");
      return objState;
    }

    objState.root.children.push(textObj);
    console.log(objState);
    return JSON.stringify(objState);
  }

  function OnChangePlugin({ onChange }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      // setEditorValue(JSON.stringify(editor.getEditorState()));
      return editor.registerUpdateListener((editorState) => {
        console.log(JSON.stringify(editorState.editorState));
        roughSizeOfObject(JSON.stringify(editorState.editorState));
        estimateObjectSizeInKB(editorState.editorState);
        setEditorStateValue(JSON.stringify(editorState.editorState));
        onChange(editorState);
      });
    }, [editor, onChange]);
  }

  // This activates every time theres a change
  const UpdatePlugin = () => {
    const [editor] = useLexicalComposerContext();
    // console.log("activation");
    // useEffect(() => {
    //   console.log("change");
    //   if (switchEditorState) {
    //     editor.setEditorState(editor.parseEditorState(dummy));
    //   } else {
    //     editor.setEditorState(editor.parseEditorState(dummy2.editorState));
    //   }
    // }, [switchEditorState]);

    if (adminText && editorStateValue) {
      editor.setEditorState(
        editor.parseEditorState(addAdminText(editorStateValue, adminText))
      );
      setAdminText(null);
    }

    return null;
  };

  return (
    <Wrapper>
      <div className="lexical">
        <SettingsContext>
          <LexicalComposer initialConfig={initialConfig}>
            {/* <TableContext> */}
            {/* <SharedAutocompleteContext> */}
            {/* <header>
                <a href="https://lexical.dev" target="_blank" rel="noreferrer">
                  <img src={logo} alt="Lexical Logo" />
                </a>
              </header> */}
            <div className="editor-shell">
              <Editor />
              <LinearProgress
                sx={{
                  width: "100%",
                  borderRadius: "10px",
                  marginTop: 1,
                  bgcolor: "#ccc",
                  opacity: 0.5,
                }}
                variant={progress < 100 ? "determinate" : "indeterminate"}
                color={progress < 95 ? "primary" : "error"}
                value={progress}
              />

              <UpdatePlugin />
              <OnChangePlugin onChange={(editorState) => null} />
            </div>
            <Settings />
            {/*
            {isDevPlayground ? <DocsPlugin /> : null}
            {isDevPlayground ? <PasteLogPlugin /> : null}
            {isDevPlayground ? <TestRecorderPlugin /> : null}

            {measureTypingPerf ? <TypingPerfPlugin /> : null} */}
            {/* </SharedAutocompleteContext> */}
            {/* </TableContext> */}
          </LexicalComposer>
        </SettingsContext>
      </div>
      {/* <button
        onClick={() => {
          setSwitchEditorState(!switchEditorState);
        }}
      >
        Change
      </button>
      <button
        onClick={() => {
          setAdminText("Hello papi");
        }}
      >
        Change
      </button> */}
    </Wrapper>
  );
}

export default LexicalEditor;

const Wrapper = styled.main`
  /* background-color: whitesmoke; */
`;

const oasdasd = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "asdsssssssss ",
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
            style: "background-color: #ffdfdf;color: #d0021b;",
            text: "Hello papi",
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

const objjjj = {
  root: {
    children: [
      {
        children: [
          {
            data: '{"appState":{"exportBackground":true,"exportScale":1,"exportWithDarkMode":false,"isBindingEnabled":true,"isLoading":false,"name":"Untitled-2024-01-28-2220","theme":"light","viewBackgroundColor":"#ffffff","viewModeEnabled":false,"zenModeEnabled":false,"zoom":{"value":1}},"elements":[{"id":"f1oxmbrWGiAXqP8BZ0fRh","type":"freedraw","x":668.5,"y":210,"width":0.0001,"height":0.0001,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":439898489,"version":3,"versionNonce":1339061175,"isDeleted":false,"boundElements":null,"updated":1706458822460,"link":null,"locked":false,"points":[[0,0],[0.0001,0.0001]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[0.0001,0.0001]}],"files":{}}',
            height: 139,
            type: "excalidraw",
            version: 1,
            width: 139,
          },
        ],
        direction: null,
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
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "asdasdadasda",
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
            data: '{"appState":{"exportBackground":true,"exportScale":1,"exportWithDarkMode":false,"isBindingEnabled":true,"isLoading":false,"name":"Untitled-2024-01-28-2221","theme":"light","viewBackgroundColor":"#ffffff","viewModeEnabled":false,"zenModeEnabled":false,"zoom":{"value":1}},"elements":[{"id":"hsrxnz6MwSUrkzV3vJ2DH","type":"freedraw","x":444.5,"y":152,"width":404,"height":110,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":817420215,"version":194,"versionNonce":1710885689,"isDeleted":false,"boundElements":null,"updated":1706458889207,"link":null,"locked":false,"points":[[0,0],[-5,0],[-9,0],[-13,0],[-18,1],[-22,3],[-25,5],[-28,8],[-30,11],[-32,13],[-32,16],[-32,18],[-32,21],[-32,23],[-29,26],[-24,28],[-19,31],[-12,32],[-5,34],[3,36],[11,38],[20,40],[27,43],[35,45],[41,48],[46,51],[49,54],[53,58],[55,62],[56,65],[56,69],[56,73],[56,78],[54,81],[51,85],[48,89],[44,93],[40,96],[36,98],[31,100],[27,101],[24,102],[21,102],[20,103],[20,104],[20,105],[21,106],[23,107],[28,108],[32,109],[38,110],[44,110],[52,110],[59,110],[66,110],[75,110],[83,110],[90,109],[98,106],[105,104],[110,100],[115,96],[119,92],[123,87],[125,82],[127,76],[127,71],[127,65],[127,59],[127,54],[127,48],[125,43],[124,39],[122,35],[122,32],[121,28],[121,26],[121,24],[121,22],[121,21],[123,21],[126,20],[132,19],[138,19],[145,19],[154,19],[162,19],[170,19],[178,20],[183,22],[188,23],[192,25],[193,27],[195,30],[195,32],[195,36],[195,40],[195,45],[193,50],[192,56],[190,60],[189,66],[189,71],[189,77],[189,81],[191,85],[194,89],[198,92],[203,94],[208,97],[213,98],[220,99],[226,100],[232,100],[237,100],[243,98],[248,94],[251,90],[253,86],[255,81],[256,76],[256,70],[256,65],[256,58],[254,52],[252,46],[249,40],[248,36],[247,31],[246,28],[246,24],[246,22],[246,20],[248,18],[250,16],[254,14],[259,13],[263,13],[269,12],[275,12],[280,12],[286,12],[290,12],[294,12],[296,13],[298,14],[299,16],[300,18],[301,22],[302,25],[302,30],[302,35],[302,41],[302,47],[303,53],[304,59],[306,65],[308,69],[311,73],[315,77],[320,80],[326,82],[331,84],[338,84],[344,84],[350,84],[355,84],[361,81],[366,77],[369,73],[371,69],[372,63],[372,59],[372,54],[371,48],[369,42],[367,37],[364,33],[363,28],[361,25],[361,22],[360,20],[360,18],[360,16],[360,15],[361,14],[362,13],[364,12],[365,11],[367,10],[370,10],[372,9],[372,9]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[372,9]},{"id":"jG2XSY4dJ0QEkJ0oK_jvM","type":"freedraw","x":907.5,"y":125,"width":218,"height":128,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":415100407,"version":125,"versionNonce":1284849817,"isDeleted":false,"boundElements":null,"updated":1706458890431,"link":null,"locked":false,"points":[[0,0],[-4,0],[-8,1],[-11,4],[-13,6],[-15,10],[-16,14],[-16,18],[-16,22],[-15,27],[-12,33],[-8,39],[-2,45],[4,50],[9,55],[14,60],[19,64],[23,68],[26,72],[29,75],[30,79],[31,82],[31,86],[31,88],[29,91],[25,95],[20,98],[14,102],[9,105],[4,108],[0,111],[-3,114],[-5,116],[-5,118],[-5,119],[-4,121],[-1,123],[5,125],[11,127],[20,128],[30,128],[39,128],[50,128],[60,128],[70,128],[79,126],[86,122],[91,119],[95,115],[99,110],[101,105],[102,98],[102,91],[102,83],[101,76],[99,68],[97,60],[93,53],[91,47],[88,41],[86,36],[85,32],[83,28],[82,25],[82,22],[82,20],[82,18],[85,16],[90,14],[96,14],[102,13],[110,12],[117,12],[125,12],[131,12],[137,13],[141,14],[145,16],[148,19],[149,23],[150,27],[150,33],[150,39],[149,46],[146,53],[143,60],[141,68],[138,75],[137,81],[136,88],[136,93],[137,99],[141,105],[145,110],[151,114],[156,117],[162,120],[169,121],[175,123],[181,124],[185,125],[189,125],[191,125],[193,125],[194,125],[194,124],[195,122],[195,120],[195,117],[195,114],[195,111],[195,108],[195,103],[195,100],[195,97],[195,93],[196,91],[196,88],[197,86],[198,83],[199,82],[201,80],[202,78],[202,78]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[202,78]}],"files":{}}',
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
            text: " asdasdasd   ",
            type: "text",
            version: 1,
          },
          {
            data: '{"appState":{"exportBackground":true,"exportScale":1,"exportWithDarkMode":false,"isBindingEnabled":true,"isLoading":false,"name":"Untitled-2024-01-28-2223","theme":"light","viewBackgroundColor":"#ffffff","viewModeEnabled":false,"zenModeEnabled":false,"zoom":{"value":1}},"elements":[{"id":"A1h_A_1HExMMGPxBxXOLv","type":"text","x":391.5,"y":168,"width":81.15994262695312,"height":25,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":690449017,"version":34,"versionNonce":1938624345,"isDeleted":false,"boundElements":null,"updated":1706459039356,"link":null,"locked":false,"text":"asdasd ","fontSize":20,"fontFamily":1,"textAlign":"left","verticalAlign":"top","baseline":18,"containerId":null,"originalText":"asdasd ","lineHeight":1.25},{"id":"ABW7zjIz6PfBhvw1eS09h","type":"text","x":408.5,"y":133,"width":95.87992858886719,"height":25,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":1989148631,"version":66,"versionNonce":1591583831,"isDeleted":false,"boundElements":null,"updated":1706459043160,"link":null,"locked":false,"text":"adasdasd","fontSize":20,"fontFamily":1,"textAlign":"left","verticalAlign":"top","baseline":18,"containerId":null,"originalText":"adasdasd","lineHeight":1.25},{"id":"54_Iwh5pTNCZTf87_svAp","type":"freedraw","x":338.5,"y":107,"width":222,"height":150,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":157530775,"version":56,"versionNonce":922833305,"isDeleted":false,"boundElements":null,"updated":1706459045705,"link":null,"locked":false,"points":[[0,0],[-4,2],[-8,5],[-12,11],[-16,19],[-19,29],[-21,40],[-23,50],[-23,61],[-23,72],[-20,82],[-15,94],[-9,103],[-1,112],[11,122],[24,129],[40,135],[53,139],[67,141],[83,142],[98,142],[114,142],[129,140],[141,137],[155,132],[168,126],[176,120],[183,115],[190,108],[194,101],[196,94],[198,88],[199,81],[199,75],[199,69],[197,63],[193,56],[188,49],[182,42],[173,34],[164,28],[152,21],[137,15],[121,8],[108,2],[92,-2],[79,-5],[69,-7],[59,-8],[49,-8],[42,-8],[36,-8],[31,-8],[27,-6],[27,-6]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[27,-6]},{"id":"jcjTjoAs-Mq_LwYBkFCDV","type":"freedraw","x":679.5,"y":174,"width":16,"height":13,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":2118240663,"version":28,"versionNonce":1405747737,"isDeleted":false,"boundElements":null,"updated":1706459046368,"link":null,"locked":false,"points":[[0,0],[-1,0],[-2,1],[-2,3],[-2,5],[-2,6],[-1,8],[1,10],[3,11],[4,12],[6,12],[8,13],[10,13],[11,13],[12,13],[13,13],[14,13],[14,11],[14,10],[14,9],[14,8],[14,7],[14,6],[14,5],[14,4],[14,3],[14,3]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[14,3]},{"id":"YCE6dQVctieoDYdQx_DDS","type":"freedraw","x":715.5,"y":175,"width":8,"height":11,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":1878749463,"version":22,"versionNonce":708020569,"isDeleted":false,"boundElements":null,"updated":1706459046816,"link":null,"locked":false,"points":[[0,0],[0,1],[0,2],[1,3],[1,4],[2,4],[3,5],[5,5],[6,5],[7,5],[8,5],[8,4],[8,3],[8,2],[8,0],[8,-2],[8,-3],[8,-4],[8,-5],[8,-6],[8,-6]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[8,-6]},{"id":"EOs7qT3mlK-pXTGf0Tli9","type":"freedraw","x":702.5,"y":213,"width":15,"height":15,"angle":0,"strokeColor":"#1e1e1e","backgroundColor":"transparent","fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":1,"opacity":100,"groupIds":[],"frameId":null,"roundness":null,"seed":1433494999,"version":27,"versionNonce":2128847097,"isDeleted":false,"boundElements":null,"updated":1706459047256,"link":null,"locked":false,"points":[[0,0],[0,1],[0,2],[0,3],[1,4],[3,5],[4,5],[5,5],[7,5],[9,5],[10,5],[11,5],[12,4],[13,3],[14,2],[14,1],[15,0],[15,-2],[15,-4],[15,-5],[15,-6],[15,-7],[15,-8],[15,-9],[15,-10],[15,-10]],"pressures":[],"simulatePressure":true,"lastCommittedPoint":[15,-10]}],"files":{}}',
            height: "inherit",
            type: "excalidraw",
            version: 1,
            width: "inherit",
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
function logTypes(obj) {
  if (!obj || !obj.root || !obj.root.children) {
    console.log("Invalid object format or missing 'root' or 'children' key.");
    return;
  }

  const { children } = obj.root;

  if (!Array.isArray(children)) {
    console.log("'children' should be an array.");
    return;
  }

  children.forEach((child) => {
    logChildTypes(child);
  });
}

function logChildTypes(child) {
  let excalidrawCount = 0;

  if (child.type) {
    console.log(child.type);
    if (child.type == "excalidraw") {
      excalidrawCount += 1;
    }
  } else {
    console.log("Child object is missing 'type' key.");
  }

  if (child.children && child.children.length > 0) {
    child.children.forEach((subChild) => {
      logChildTypes(subChild);
    });
  }
  console.log(excalidrawCount);
}

function countExcalidrawTypes(obj) {
  let excalidrawCount = 0;

  function countChildTypes(child) {
    if (child.type === "excalidraw") {
      excalidrawCount++;
    }

    if (child.children && child.children.length > 0) {
      child.children.forEach((subChild) => {
        countChildTypes(subChild);
      });
    }
  }

  if (!obj || !obj.root || !obj.root.children) {
    console.log("Invalid object format or missing 'root' or 'children' key.");
    return;
  }

  const { children } = obj.root;

  if (!Array.isArray(children)) {
    console.log("'children' should be an array.");
    return;
  }

  children.forEach((child) => {
    countChildTypes(child);
  });

  console.log("Number of 'excalidraw' types:", excalidrawCount);
}

// Calling the function with the example object
// logTypes(objjjj);
// countExcalidrawTypes(objjjj);
