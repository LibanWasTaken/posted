import styled from "styled-components";

import gear from "./images/icons/gear.svg";
import journalCode from "./images/icons/journal-code.svg";
import clipboard from "./images/icons/clipboard.svg";
import fileEarmarkText from "./images/icons/file-earmark-text.svg";
import camera from "./images/icons/camera.svg";
import download from "./images/icons/download.svg";
import palette from "./images/icons/palette.svg";
import paintBucket from "./images/icons/paint-bucket.svg";
import typeBold from "./images/icons/type-bold.svg";
import typeItalic from "./images/icons/type-italic.svg";
import trash from "./images/icons/trash.svg";
import code from "./images/icons/code.svg";
import typeUnderline from "./images/icons/type-underline.svg";
import typeStrikethrough from "./images/icons/type-strikethrough.svg";
import typeSubscript from "./images/icons/type-subscript.svg";
import typeSuperscript from "./images/icons/type-superscript.svg";
import link from "./images/icons/link.svg";
import horizontalRule from "./images/icons/horizontal-rule.svg";
import plus from "./images/icons/plus.svg";
import caretRightFill from "./images/icons/caret-right-fill.svg";
import dropdownMore from "./images/icons/dropdown-more.svg";
import fontColor from "./images/icons/font-color.svg";
import fontFamily from "./images/icons/font-family.svg";
import bgColor from "./images/icons/bg-color.svg";
import fileImage from "./images/icons/file-image.svg";
import table from "./images/icons/table.svg";
import close from "./images/icons/close.svg";
import figma from "./images/icons/figma.svg";
import cardChecklist from "./images/icons/card-checklist.svg";
import columns3 from "./images/icons/3-columns.svg";
import tweet from "./images/icons/tweet.svg";
import youtube from "./images/icons/youtube.svg";
import textLeft from "./images/icons/text-left.svg";
import textCenter from "./images/icons/text-center.svg";
import textRight from "./images/icons/text-right.svg";
import justify from "./images/icons/justify.svg";
import indent from "./images/icons/indent.svg";
import markdown from "./images/icons/markdown.svg";
import outdent from "./images/icons/outdent.svg";
import arrowCounterclockwise from "./images/icons/arrow-counterclockwise.svg";
import arrowClockwise from "./images/icons/arrow-clockwise.svg";
import sticky from "./images/icons/sticky.svg";
import mic from "./images/icons/mic.svg";
import upload from "./images/icons/upload.svg";
import diagram2 from "./images/icons/diagram-2.svg";
import user from "./images/icons/user.svg";
import plusSlashMinus from "./images/icons/plus-slash-minus.svg";
import filetypeGif from "./images/icons/filetype-gif.svg";
import copy from "./images/icons/copy.svg";
import success from "./images/icons/success.svg";
import prettier from "./images/icons/prettier.svg";
import prettierError from "./images/icons/prettier-error.svg";
import scissors from "./images/icons/scissors.svg";
import pencilFill from "./images/icons/pencil-fill.svg";
import successAlt from "./images/icons/success-alt.svg";
import textParagraph from "./images/icons/text-paragraph.svg";
import typeH1 from "./images/icons/type-h1.svg";
import typeH2 from "./images/icons/type-h2.svg";
import typeH3 from "./images/icons/type-h3.svg";
import typeH4 from "./images/icons/type-h4.svg";
import typeH5 from "./images/icons/type-h5.svg";
import typeH6 from "./images/icons/type-h6.svg";
import listUl from "./images/icons/list-ul.svg";
import squareCheck from "./images/icons/square-check.svg";
import listOl from "./images/icons/list-ol.svg";
import chatSquareQuote from "./images/icons/chat-square-quote.svg";
import lockFill from "./images/icons/lock-fill.svg";
import lock from "./images/icons/lock.svg";
import plug from "./images/icons/plug.svg";
import plugFill from "./images/icons/plug-fill.svg";
import chevronDown from "./images/icons/chevron-down.svg";

export const EditorStyle1 = styled.main`
  /* :root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
} */

  /**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

  /* @import "https://fonts.googleapis.com/css?family=Reenie+Beanie";

body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, ".SFNSText-Regular",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #eee;
  padding: 0 20px;
}

header {
  max-width: 580px;
  margin: auto;
  position: relative;
  display: flex;
  justify-content: center;
}

header a {
  max-width: 220px;
  margin: 20px 0 0 0;
  display: block;
}

header img {
  display: block;
  height: 100%;
  width: 100%;
}

header h1 {
  text-align: left;
  color: #333;
  display: inline-block;
  margin: 20px 0 0 0;
} */

  .editor-shell {
    margin: 20px auto;
    border-radius: 2px;
    max-width: 1100px;
    color: #000;
    position: relative;
    line-height: 1.7;
    font-weight: 400;
  }

  .editor-shell .editor-container {
    background: #fff;
    position: relative;
    display: block;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    /* min-height: 350px; */
  }

  .editor-shell .editor-container.tree-view {
    border-radius: 0;
  }

  .editor-shell .editor-container.plain-text {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .editor-scroller {
    min-height: 150px;
    border: 0;
    display: flex;
    position: relative;
    outline: 0;
    z-index: 0;
    overflow: auto;
    resize: vertical;
  }

  .editor {
    flex: auto;
    position: relative;
    resize: vertical;
    z-index: -1;
  }

  .test-recorder-output {
    margin: 20px auto 20px auto;
    width: 100%;
  }

  pre {
    line-height: 1.1;
    background: #222;
    color: #fff;
    margin: 0;
    padding: 10px;
    font-size: 12px;
    overflow: auto;
    max-height: 400px;
  }

  .tree-view-output {
    display: block;
    background: #222;
    color: #fff;
    padding: 0;
    font-size: 12px;
    margin: 1px auto 10px auto;
    position: relative;
    overflow: hidden;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  pre::-webkit-scrollbar {
    background: transparent;
    width: 10px;
  }

  pre::-webkit-scrollbar-thumb {
    background: #999;
  }

  .editor-dev-button {
    position: relative;
    display: block;
    width: 40px;
    height: 40px;
    font-size: 12px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    outline: none;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
    background-color: #444;
  }

  .editor-dev-button::after {
    content: "";
    position: absolute;
    top: 10px;
    right: 10px;
    bottom: 10px;
    left: 10px;
    display: block;
    background-size: contain;
    filter: invert(1);
  }

  .editor-dev-button:hover {
    background-color: #555;
  }

  .editor-dev-button.active {
    background-color: rgb(233, 35, 35);
  }

  .test-recorder-toolbar {
    display: flex;
  }

  .test-recorder-button {
    position: relative;
    display: block;
    width: 32px;
    height: 32px;
    font-size: 10px;
    padding: 6px 6px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    outline: none;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.4);
    background-color: #222;
    transition: box-shadow 50ms ease-out;
  }

  .test-recorder-button:active {
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.4);
  }

  .test-recorder-button + .test-recorder-button {
    margin-left: 4px;
  }

  .test-recorder-button::after {
    content: "";
    position: absolute;
    top: 8px;
    right: 8px;
    bottom: 8px;
    left: 8px;
    display: block;
    background-size: contain;
    filter: invert(1);
  }

  #options-button {
    position: fixed;
    left: 20px;
    bottom: 20px;
  }

  #test-recorder-button {
    position: fixed;
    left: 70px;
    bottom: 20px;
  }

  #paste-log-button {
    position: fixed;
    left: 120px;
    bottom: 20px;
  }

  #docs-button {
    position: fixed;
    left: 170px;
    bottom: 20px;
  }

  #options-button::after {
    background-image: url(${gear});
  }

  #test-recorder-button::after {
    background-image: url(${journalCode});
  }

  #paste-log-button::after {
    background-image: url(${clipboard});
  }

  #docs-button::after {
    background-image: url(${fileEarmarkText});
  }

  #test-recorder-button-snapshot {
    margin-right: auto;
  }

  #test-recorder-button-snapshot::after {
    background-image: url(${camera});
  }

  #test-recorder-button-copy::after {
    background-image: url(${clipboard});
  }

  #test-recorder-button-download::after {
    background-image: url(${download});
  }

  .typeahead-popover {
    background: #fff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    position: fixed;
  }

  .typeahead-popover ul {
    padding: 0;
    list-style: none;
    margin: 0;
    border-radius: 8px;
    max-height: 200px;
    overflow-y: scroll;
  }

  .typeahead-popover ul::-webkit-scrollbar {
    display: none;
  }

  .typeahead-popover ul {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .typeahead-popover ul li {
    margin: 0;
    min-width: 180px;
    font-size: 14px;
    outline: none;
    cursor: pointer;
    border-radius: 8px;
  }

  .typeahead-popover ul li.selected {
    background: #eee;
  }

  .typeahead-popover li {
    margin: 0 8px 0 8px;
    padding: 8px;
    color: #050505;
    cursor: pointer;
    line-height: 16px;
    font-size: 15px;
    display: flex;
    align-content: center;
    flex-direction: row;
    flex-shrink: 0;
    background-color: #fff;
    border-radius: 8px;
    border: 0;
  }

  .typeahead-popover li.active {
    display: flex;
    width: 20px;
    height: 20px;
    background-size: contain;
  }

  .typeahead-popover li:first-child {
    border-radius: 8px 8px 0px 0px;
  }

  .typeahead-popover li:last-child {
    border-radius: 0px 0px 8px 8px;
  }

  .typeahead-popover li:hover {
    background-color: #eee;
  }

  .typeahead-popover li .text {
    display: flex;
    line-height: 20px;
    flex-grow: 1;
    min-width: 150px;
  }

  .typeahead-popover li .icon {
    display: flex;
    width: 20px;
    height: 20px;
    user-select: none;
    margin-right: 8px;
    line-height: 16px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .component-picker-menu {
    width: 200px;
  }

  .mentions-menu {
    width: 250px;
  }

  .auto-embed-menu {
    width: 150px;
  }

  .emoji-menu {
    width: 200px;
  }

  i.palette {
    background-image: url(${palette});
  }

  i.bucket {
    background-image: url(${paintBucket});
  }

  i.bold {
    background-image: url(${typeBold});
  }

  i.italic {
    background-image: url(${typeItalic});
  }

  i.clear {
    background-image: url(${trash});
  }

  i.code {
    background-image: url(${code});
  }

  i.underline {
    background-image: url(${typeUnderline});
  }

  i.strikethrough {
    background-image: url(${typeStrikethrough});
  }

  i.subscript {
    background-image: url(${typeSubscript});
  }

  i.superscript {
    background-image: url(${typeSuperscript});
  }

  i.link {
    background-image: url(${link});
  }

  i.horizontal-rule {
    background-image: url(${horizontalRule});
  }

  .icon.plus {
    background-image: url(${plus});
  }

  .icon.caret-right {
    background-image: url(${caretRightFill});
  }

  .icon.dropdown-more {
    background-image: url(${dropdownMore});
  }

  .icon.font-color {
    background-image: url(${fontColor});
  }

  .icon.font-family {
    background-image: url(${fontFamily});
  }

  .icon.bg-color {
    background-image: url(${bgColor});
  }

  .icon.table {
    background-color: #6c757d;
    mask-image: url(images/icons/table.svg);
    -webkit-mask-image: url(images/icons/table.svg);
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-size: contain;
    -webkit-mask-size: contain;
  }

  i.image {
    background-image: url(${fileImage});
  }

  i.table {
    background-image: url(${table});
  }

  i.close {
    background-image: url(${close});
  }

  i.figma {
    background-image: url(${figma});
  }

  i.poll {
    background-image: url(${cardChecklist});
  }

  i.columns {
    background-image: url(${columns3});
  }

  i.tweet {
    background-image: url(${tweet});
  }

  i.youtube {
    background-image: url(${youtube});
  }

  .icon.left-align,
  i.left-align {
    background-image: url(${textLeft});
  }

  .icon.center-align,
  i.center-align {
    background-image: url(${textCenter});
  }

  .icon.right-align,
  i.right-align {
    background-image: url(${textRight});
  }

  .icon.justify-align,
  i.justify-align {
    background-image: url(${justify});
  }

  i.indent {
    background-image: url(${indent});
  }

  i.markdown {
    background-image: url(${markdown});
  }

  i.outdent {
    background-image: url(${outdent});
  }

  i.undo {
    background-image: url(${arrowCounterclockwise});
  }

  i.redo {
    background-image: url(${arrowClockwise});
  }

  i.sticky {
    background-image: url(${sticky});
  }

  i.mic {
    background-image: url(${mic});
  }

  i.import {
    background-image: url(${upload});
  }

  i.export {
    background-image: url(${download});
  }

  i.diagram-2 {
    background-image: url(${diagram2});
  }

  i.user {
    background-image: url(${user});
  }

  i.equation {
    background-image: url(${plusSlashMinus});
  }

  i.gif {
    background-image: url(${filetypeGif});
  }

  i.copy {
    background-image: url(${copy});
  }

  i.success {
    background-image: url(${success});
  }

  i.prettier {
    background-image: url(${prettier});
  }

  i.prettier-error {
    background-image: url(${prettierError});
  }

  /* TODO: me */

  i.cog {
    background-image: url(${gear});
  }

  i.page-break,
  .icon.page-break {
    background-image: url(${scissors});
  }

  .link-editor .button.active,
  .toolbar .button.active {
    background-color: rgb(223, 232, 250);
  }

  .link-editor .link-input {
    display: block;
    width: calc(100% - 75px);
    box-sizing: border-box;
    margin: 12px 12px;
    padding: 8px 12px;
    border-radius: 15px;
    background-color: #eee;
    font-size: 15px;
    color: rgb(5, 5, 5);
    border: 0;
    outline: 0;
    position: relative;
    font-family: inherit;
  }

  .link-editor .link-view {
    display: block;
    width: calc(100% - 24px);
    margin: 8px 12px;
    padding: 8px 12px;
    border-radius: 15px;
    font-size: 15px;
    color: rgb(5, 5, 5);
    border: 0;
    outline: 0;
    position: relative;
    font-family: inherit;
  }

  .link-editor .link-view a {
    display: block;
    word-break: break-word;
    width: calc(100% - 33px);
  }

  .link-editor div.link-edit {
    background-image: url(${pencilFill});
    background-size: 16px;
    background-position: center;
    background-repeat: no-repeat;
    width: 35px;
    vertical-align: -0.25em;
    position: absolute;
    right: 30px;
    top: 0;
    bottom: 0;
    cursor: pointer;
  }

  .link-editor div.link-trash {
    background-image: url(${trash});
    background-size: 16px;
    background-position: center;
    background-repeat: no-repeat;
    width: 35px;
    vertical-align: -0.25em;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
  }

  .link-editor div.link-cancel {
    background-image: url(${close});
    background-size: 16px;
    background-position: center;
    background-repeat: no-repeat;
    width: 35px;
    vertical-align: -0.25em;
    margin-right: 28px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
  }

  .link-editor div.link-confirm {
    background-image: url(${successAlt});
    background-size: 16px;
    background-position: center;
    background-repeat: no-repeat;
    width: 35px;
    vertical-align: -0.25em;
    margin-right: 2px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
  }

  .link-editor .link-input a {
    color: rgb(33, 111, 219);
    text-decoration: underline;
    white-space: nowrap;
    overflow: hidden;
    margin-right: 30px;
    text-overflow: ellipsis;
  }

  .link-editor .link-input a:hover {
    text-decoration: underline;
  }

  .link-editor .font-size-wrapper,
  .link-editor .font-family-wrapper {
    display: flex;
    margin: 0 4px;
  }

  .link-editor select {
    padding: 6px;
    border: none;
    background-color: rgba(0, 0, 0, 0.075);
    border-radius: 4px;
  }

  .mention:focus {
    box-shadow: rgb(180 213 255) 0px 0px 0px 2px;
    outline: none;
  }

  .characters-limit {
    color: #888;
    font-size: 12px;
    text-align: right;
    display: block;
    position: absolute;
    left: 12px;
    bottom: 5px;
  }

  .characters-limit.characters-limit-exceeded {
    color: red;
  }

  .dropdown {
    z-index: 100;
    display: block;
    position: fixed;
    box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    min-height: 40px;
    background-color: #fff;
  }

  .dropdown .item {
    margin: 0 8px 0 8px;
    padding: 8px;
    color: #050505;
    cursor: pointer;
    line-height: 16px;
    font-size: 15px;
    display: flex;
    align-content: center;
    flex-direction: row;
    flex-shrink: 0;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 8px;
    border: 0;
    max-width: 250px;
    min-width: 100px;
  }

  .dropdown .item.fontsize-item,
  .dropdown .item.fontsize-item .text {
    min-width: unset;
  }

  .dropdown .item .active {
    display: flex;
    width: 20px;
    height: 20px;
    background-size: contain;
  }

  .dropdown .item:first-child {
    margin-top: 8px;
  }

  .dropdown .item:last-child {
    margin-bottom: 8px;
  }

  .dropdown .item:hover {
    background-color: #eee;
  }

  .dropdown .item .text {
    display: flex;
    line-height: 20px;
    flex-grow: 1;
    min-width: 150px;
  }

  .dropdown .item .icon {
    display: flex;
    width: 20px;
    height: 20px;
    user-select: none;
    margin-right: 12px;
    line-height: 16px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .dropdown .divider {
    width: auto;
    background-color: #eee;
    margin: 4px 8px;
    height: 1px;
  }

  @media screen and (max-width: 1100px) {
    .dropdown-button-text {
      display: none !important;
    }

    .dialog-dropdown > .dropdown-button-text {
      display: flex !important;
    }

    .font-size .dropdown-button-text {
      display: flex !important;
    }

    .code-language .dropdown-button-text {
      display: flex !important;
    }
  }

  .icon.paragraph {
    background-image: url(${textParagraph});
  }

  .icon.h1 {
    background-image: url(${typeH1});
  }

  .icon.h2 {
    background-image: url(${typeH2});
  }

  .icon.h3 {
    background-image: url(${typeH3});
  }

  .icon.h4 {
    background-image: url(${typeH4});
  }

  .icon.h5 {
    background-image: url(${typeH5});
  }

  .icon.h6 {
    background-image: url(${typeH6});
  }

  .icon.bullet-list,
  .icon.bullet {
    background-image: url(${listUl});
  }

  .icon.check-list,
  .icon.check {
    background-image: url(${squareCheck});
  }

  .icon.numbered-list,
  .icon.number {
    background-image: url(${listOl});
  }

  .icon.quote {
    background-image: url(${chatSquareQuote});
  }

  .icon.code {
    background-image: url(${code});
  }

  .switches {
    z-index: 6;
    position: fixed;
    left: 10px;
    bottom: 70px;
    animation: slide-in 0.4s ease;
  }

  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateX(-200px);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .switch {
    display: block;
    color: #444;
    margin: 5px 0;
    background-color: rgba(238, 238, 238, 0.7);
    padding: 5px 10px;
    border-radius: 10px;
  }

  #rich-text-switch {
    right: 0;
  }

  #character-count-switch {
    right: 130px;
  }

  .switch label {
    margin-right: 5px;
    line-height: 24px;
    width: 100px;
    font-size: 14px;
    display: inline-block;
    vertical-align: middle;
  }

  .switch button {
    background-color: rgb(206, 208, 212);
    height: 24px;
    box-sizing: border-box;
    border-radius: 12px;
    width: 44px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    outline: none;
    cursor: pointer;
    transition: background-color 0.1s;
    border: 2px solid transparent;
  }

  .switch button:focus-visible {
    border-color: blue;
  }

  .switch button span {
    top: 0px;
    left: 0px;
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 12px;
    background-color: white;
    transition: transform 0.2s;
  }

  .switch button[aria-checked="true"] {
    background-color: rgb(24, 119, 242);
  }

  .switch button[aria-checked="true"] span {
    transform: translateX(20px);
  }

  .editor-shell span.editor-image {
    cursor: default;
    display: inline-block;
    position: relative;
    user-select: none;
  }

  .editor-shell .editor-image img {
    max-width: 100%;
    cursor: default;
  }

  .editor-shell .editor-image img.focused {
    outline: 2px solid rgb(60, 132, 244);
    user-select: none;
  }

  .editor-shell .editor-image img.focused.draggable {
    cursor: grab;
  }

  .editor-shell .editor-image img.focused.draggable:active {
    cursor: grabbing;
  }

  .editor-shell .editor-image .image-caption-container .tree-view-output {
    margin: 0;
    border-radius: 0;
  }

  .editor-shell .editor-image .image-caption-container {
    display: block;
    position: absolute;
    bottom: 4px;
    left: 0;
    right: 0;
    padding: 0;
    margin: 0;
    border-top: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.9);
    min-width: 100px;
    color: #000;
    overflow: hidden;
  }

  .editor-shell .editor-image .image-caption-button {
    display: block;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    width: 30%;
    padding: 10px;
    margin: 0 auto;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    min-width: 100px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }

  .editor-shell .editor-image .image-caption-button:hover {
    background-color: rgba(60, 132, 244, 0.5);
  }

  .editor-shell .editor-image .image-edit-button {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    /* background-image: url(/src/components/Lexical/images/icons/pencil-fill.svg); */
    background-size: 16px;
    background-position: center;
    background-repeat: no-repeat;
    width: 35px;
    height: 35px;
    vertical-align: -0.25em;
    position: absolute;
    right: 4px;
    top: 4px;
    cursor: pointer;
    user-select: none;
  }

  .editor-shell .editor-image .image-edit-button:hover {
    background-color: rgba(60, 132, 244, 0.1);
  }

  .editor-shell .editor-image .image-resizer {
    display: block;
    width: 7px;
    height: 7px;
    position: absolute;
    background-color: rgb(60, 132, 244);
    border: 1px solid #fff;
  }

  .editor-shell .editor-image .image-resizer.image-resizer-n {
    top: -6px;
    left: 48%;
    cursor: n-resize;
  }

  .editor-shell .editor-image .image-resizer.image-resizer-ne {
    top: -6px;
    right: -6px;
    cursor: ne-resize;
  }

  .editor-shell .editor-image .image-resizer.image-resizer-e {
    bottom: 48%;
    right: -6px;
    cursor: e-resize;
  }

  .editor-shell .editor-image .image-resizer.image-resizer-se {
    bottom: -2px;
    right: -6px;
    cursor: nwse-resize;
  }

  .editor-shell .editor-image .image-resizer.image-resizer-s {
    bottom: -2px;
    left: 48%;
    cursor: s-resize;
  }

  .editor-shell .editor-image .image-resizer.image-resizer-sw {
    bottom: -2px;
    left: -6px;
    cursor: sw-resize;
  }

  .editor-shell .editor-image .image-resizer.image-resizer-w {
    bottom: 48%;
    left: -6px;
    cursor: w-resize;
  }

  .editor-shell .editor-image .image-resizer.image-resizer-nw {
    top: -6px;
    left: -6px;
    cursor: nw-resize;
  }

  .editor-shell span.inline-editor-image {
    cursor: default;
    display: inline-block;
    position: relative;
    z-index: 1;
  }

  .editor-shell .inline-editor-image img {
    max-width: 100%;
    cursor: default;
  }

  .editor-shell .inline-editor-image img.focused {
    outline: 2px solid rgb(60, 132, 244);
  }

  .editor-shell .inline-editor-image img.focused.draggable {
    cursor: grab;
  }

  .editor-shell .inline-editor-image img.focused.draggable:active {
    cursor: grabbing;
  }

  .editor-shell
    .inline-editor-image
    .image-caption-container
    .tree-view-output {
    margin: 0;
    border-radius: 0;
  }

  .editor-shell .inline-editor-image.position-full {
    margin: 1em 0 1em 0;
  }

  .editor-shell .inline-editor-image.position-left {
    float: left;
    width: 50%;
    margin: 1em 1em 0 0;
  }

  .editor-shell .inline-editor-image.position-right {
    float: right;
    width: 50%;
    margin: 1em 0 0 1em;
  }

  .editor-shell .inline-editor-image .image-edit-button {
    display: block;
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 6px 8px;
    margin: 0 auto;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    min-width: 60px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }

  .editor-shell .inline-editor-image .image-edit-button:hover {
    background-color: rgba(60, 132, 244, 0.5);
  }

  .editor-shell .inline-editor-image .image-caption-container {
    display: block;
    background-color: #f4f4f4;
    min-width: 100%;
    color: #000;
    overflow: hidden;
  }

  .emoji {
    color: transparent;
    caret-color: rgb(5, 5, 5);
    background-size: 16px 16px;
    background-position: center;
    background-repeat: no-repeat;
    vertical-align: middle;
    margin: 0 -1px;
  }

  .emoji-inner {
    padding: 0 0.15em;
  }

  .emoji-inner::selection {
    color: transparent;
    background-color: rgba(150, 150, 150, 0.4);
  }

  .emoji-inner::moz-selection {
    color: transparent;
    background-color: rgba(150, 150, 150, 0.4);
  }

  .emoji.happysmile {
    background-image: url(images/emoji/1F642.png);
  }

  .emoji.veryhappysmile {
    background-image: url(images/emoji/1F600.png);
  }

  .emoji.unhappysmile {
    background-image: url(images/emoji/1F641.png);
  }

  .emoji.heart {
    background-image: url(images/emoji/2764.png);
  }

  .keyword {
    color: rgb(241, 118, 94);
    font-weight: bold;
  }

  .actions {
    position: absolute;
    text-align: right;
    margin: 10px;
    bottom: 0;
    right: 0;
  }

  .actions.tree-view {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .actions i {
    background-size: contain;
    display: inline-block;
    height: 15px;
    width: 15px;
    vertical-align: -0.25em;
  }

  .actions i.indent {
    background-image: url(${indent});
  }

  .actions i.outdent {
    background-image: url(${outdent});
  }

  .actions i.lock {
    background-image: url(${lockFill});
  }

  .actions i.image {
    background-image: url(${fileImage});
  }

  .actions i.table {
    background-image: url(${table});
  }

  .actions i.unlock {
    background-image: url(${lock});
  }

  .actions i.left-align {
    background-image: url(${textLeft});
  }

  .actions i.center-align {
    background-image: url(${textCenter});
  }

  .actions i.right-align {
    background-image: url(${textRight});
  }

  .actions i.justify-align {
    background-image: url(${justify});
  }

  .actions i.disconnect {
    background-image: url(${plug});
  }

  .actions i.connect {
    background-image: url(${plugFill});
  }

  .table-cell-action-button-container {
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform;
  }

  .table-cell-action-button {
    background-color: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    position: relative;
    border-radius: 15px;
    color: #222;
    display: inline-block;
    cursor: pointer;
  }

  i.chevron-down {
    background-color: transparent;
    background-size: contain;
    display: inline-block;
    height: 8px;
    width: 8px;
    background-image: url(${chevronDown});
  }

  .action-button {
    background-color: #eee;
    border: 0;
    padding: 8px 12px;
    position: relative;
    margin-left: 5px;
    border-radius: 15px;
    color: #222;
    display: inline-block;
    cursor: pointer;
  }

  .action-button:hover {
    background-color: #ddd;
    color: #000;
  }

  .action-button-mic.active {
    animation: mic-pulsate-color 3s infinite;
  }

  button.action-button:disabled {
    opacity: 0.6;
    background: #eee;
    cursor: not-allowed;
  }

  @keyframes mic-pulsate-color {
    0% {
      background-color: #ffdcdc;
    }

    50% {
      background-color: #ff8585;
    }

    100% {
      background-color: #ffdcdc;
    }
  }

  .debug-timetravel-panel {
    overflow: hidden;
    padding: 0 0 10px 0;
    margin: auto;
    display: flex;
  }

  .debug-timetravel-panel-slider {
    padding: 0;
    flex: 8;
  }

  .debug-timetravel-panel-button {
    padding: 0;
    border: 0;
    background: none;
    flex: 1;
    color: #fff;
    font-size: 12px;
  }

  .debug-timetravel-panel-button:hover {
    text-decoration: underline;
  }

  .debug-timetravel-button {
    border: 0;
    padding: 0;
    font-size: 12px;
    top: 10px;
    right: 15px;
    position: absolute;
    background: none;
    color: #fff;
  }

  .debug-timetravel-button:hover {
    text-decoration: underline;
  }

  .debug-treetype-button {
    border: 0;
    padding: 0;
    font-size: 12px;
    top: 10px;
    right: 85px;
    position: absolute;
    background: none;
    color: #fff;
  }

  .debug-treetype-button:hover {
    text-decoration: underline;
  }

  .connecting {
    font-size: 15px;
    color: #999;
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    top: 10px;
    left: 10px;
    user-select: none;
    white-space: nowrap;
    display: inline-block;
    pointer-events: none;
  }

  .ltr {
    text-align: left;
  }

  .rtl {
    text-align: right;
  }

  .toolbar {
    display: flex;
    margin-bottom: 1px;
    background: #fff;
    padding: 4px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    vertical-align: middle;
    overflow: auto;
    height: 36px;
    position: sticky;
    top: 0;
    z-index: 2;
  }

  button.toolbar-item {
    border: 0;
    display: flex;
    background: none;
    border-radius: 10px;
    padding: 8px;
    cursor: pointer;
    vertical-align: middle;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
  }

  button.toolbar-item:disabled {
    cursor: not-allowed;
  }

  button.toolbar-item.spaced {
    margin-right: 2px;
  }

  button.toolbar-item i.format {
    background-size: contain;
    display: inline-block;
    height: 18px;
    width: 18px;
    vertical-align: -0.25em;
    display: flex;
    opacity: 0.6;
  }

  button.toolbar-item:disabled .icon,
  button.toolbar-item:disabled .text,
  button.toolbar-item:disabled i.format,
  button.toolbar-item:disabled .chevron-down {
    opacity: 0.2;
  }

  button.toolbar-item.active {
    background-color: rgba(223, 232, 250, 0.3);
  }

  button.toolbar-item.active i {
    opacity: 1;
  }

  .toolbar-item:hover:not([disabled]) {
    background-color: #eee;
  }

  .toolbar-item.font-family .text {
    display: block;
    max-width: 40px;
  }

  .toolbar .code-language {
    width: 150px;
  }

  .toolbar .toolbar-item .text {
    display: flex;
    line-height: 20px;
    vertical-align: middle;
    font-size: 14px;
    color: #777;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 20px;
    text-align: left;
    padding-right: 10px;
  }

  .toolbar .toolbar-item .icon {
    display: flex;
    width: 20px;
    height: 20px;
    user-select: none;
    margin-right: 8px;
    line-height: 16px;
    background-size: contain;
  }

  .toolbar i.chevron-down,
  .toolbar-item i.chevron-down {
    margin-top: 3px;
    width: 16px;
    height: 16px;
    display: flex;
    user-select: none;
  }

  .toolbar i.chevron-down.inside {
    width: 16px;
    height: 16px;
    display: flex;
    margin-left: -25px;
    margin-top: 11px;
    margin-right: 10px;
    pointer-events: none;
  }

  .toolbar .divider {
    width: 1px;
    background-color: #eee;
    margin: 0 4px;
  }

  .sticky-note-container {
    position: absolute;
    z-index: 9;
    width: 120px;
    display: inline-block;
  }

  .sticky-note {
    line-height: 1;
    text-align: left;
    width: 120px;
    margin: 25px;
    padding: 20px 10px;
    position: relative;
    border: 1px solid #e8e8e8;
    font-family: "Reenie Beanie";
    font-size: 24px;
    border-bottom-right-radius: 60px 5px;
    display: block;
    cursor: move;
  }

  .sticky-note:after {
    content: "";
    position: absolute;
    z-index: -1;
    right: -0px;
    bottom: 20px;
    width: 120px;
    height: 25px;
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 2px 15px 5px rgba(0, 0, 0, 0.4);
    transform: matrix(-1, -0.1, 0, 1, 0, 0);
  }

  .sticky-note.yellow {
    border-top: 1px solid #fdfd86;
    background: linear-gradient(
      135deg,
      #ffff88 81%,
      #ffff88 82%,
      #ffff88 82%,
      #ffffc6 100%
    );
  }

  .sticky-note.pink {
    border-top: 1px solid #e7d1e4;
    background: linear-gradient(
      135deg,
      #f7cbe8 81%,
      #f7cbe8 82%,
      #f7cbe8 82%,
      #e7bfe1 100%
    );
  }

  .sticky-note-container.dragging {
    transition: none !important;
  }

  .sticky-note div {
    cursor: text;
  }

  .sticky-note .delete {
    border: 0;
    background: none;
    position: absolute;
    top: 8px;
    right: 10px;
    font-size: 10px;
    cursor: pointer;
    opacity: 0.5;
  }

  .sticky-note .delete:hover {
    font-weight: bold;
    opacity: 1;
  }

  .sticky-note .color {
    border: 0;
    background: none;
    position: absolute;
    top: 8px;
    right: 25px;
    cursor: pointer;
    opacity: 0.5;
  }

  .sticky-note .color:hover {
    opacity: 1;
  }

  .sticky-note .color i {
    display: block;
    width: 12px;
    height: 12px;
    background-size: contain;
  }

  .excalidraw-button {
    border: 0;
    padding: 0;
    margin: 0;
    background-color: transparent;
  }

  .excalidraw-button.selected {
    outline: 2px solid rgb(60, 132, 244);
    user-select: none;
  }

  .github-corner:hover .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }

  @keyframes octocat-wave {
    0%,
    100% {
      transform: rotate(0);
    }

    20%,
    60% {
      transform: rotate(-25deg);
    }

    40%,
    80% {
      transform: rotate(10deg);
    }
  }

  @media (max-width: 500px) {
    .github-corner:hover .octo-arm {
      animation: none;
    }

    .github-corner .octo-arm {
      animation: octocat-wave 560ms ease-in-out;
    }
  }

  .spacer {
    letter-spacing: -2px;
  }

  .editor-equation {
    cursor: default;
    user-select: none;
  }

  .editor-equation.focused {
    outline: 2px solid rgb(60, 132, 244);
  }

  button.item i {
    opacity: 0.6;
  }

  button.item.dropdown-item-active {
    background-color: rgba(223, 232, 250, 0.3);
  }

  button.item.dropdown-item-active i {
    opacity: 1;
  }

  hr {
    padding: 2px 2px;
    border: none;
    margin: 1em 0;
    cursor: pointer;
  }

  hr:after {
    content: "";
    display: block;
    height: 2px;
    background-color: #ccc;
    line-height: 2px;
  }

  hr.selected {
    outline: 2px solid rgb(60, 132, 244);
    user-select: none;
  }

  .TableNode__contentEditable {
    min-height: 20px;
    border: 0px;
    resize: none;
    cursor: text;
    display: block;
    position: relative;
    outline: 0px;
    padding: 0;
    user-select: text;
    font-size: 15px;
    white-space: pre-wrap;
    word-break: break-word;
    z-index: 3;
  }

  .PlaygroundEditorTheme__blockCursor {
    display: block;
    pointer-events: none;
    position: absolute;
  }

  .PlaygroundEditorTheme__blockCursor:after {
    content: "";
    display: block;
    position: absolute;
    top: -2px;
    width: 20px;
    border-top: 1px solid black;
    animation: CursorBlink 1.1s steps(2, start) infinite;
  }

  @keyframes CursorBlink {
    to {
      visibility: hidden;
    }
  }

  .dialog-dropdown {
    background-color: #eee !important;
    margin-bottom: 10px;
    width: 100%;
  }

  /* Me */

  .customDisabledItem {
    opacity: 0.5;
    pointer-events: none;
  }
`;
