import NumberHelper from "@/util/cms/number.helper";
import { Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { CmsErrorLabel } from "./ErrorLabel";
import { CmsFormLabel } from "./Label";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import draftToHtml from "draftjs-to-html";
const htmlToDraft =
  typeof window === "object" && require("html-to-draftjs").default;
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";

export const CmsTextEditor = (props) => {
  let {
    label,
    value,
    disabled,
    required,
    className,
    onChange,
    error,
    isSingleLine,
    placeholder,
    rows = 4,
    resizeable = true,
  } = props;
  let checkLabel = "check " + label;
  let randomId = NumberHelper.randomId();
  let idLabel = checkLabel ? label : "field";
  idLabel = `${idLabel} ${randomId}`;

  console.log({ value });

  let textAreaClassName = !isSingleLine ? "ant-input" : "";
  let styleResizeable = resizeable == false ? { resize: "none" } : {};
  const customContentStateConverter = (contentState) => {
    // changes block type of images to 'atomic'
    const newBlockMap = contentState.getBlockMap().map((block) => {
      const entityKey = block.getEntityAt(0);
      if (entityKey !== null) {
        const entityBlock = contentState.getEntity(entityKey);
        const entityType = entityBlock.getType();
        switch (entityType) {
          case "IMAGE": {
            const newBlock = block.merge({
              type: "atomic",
              text: "img",
            });
            return newBlock;
          }
          default:
            return block;
        }
      }
      return block;
    });
    const newContentState = contentState.set("blockMap", newBlockMap);
    return newContentState;
  };

  useEffect(() => {
    // Jika value tidak terdefinisi atau kosong, keluar dari efek
    if (value === undefined || value === "" || value === null) return;

    const blocksFromHTML = htmlToDraft(value);
    const contentDataState = 
    // customContentStateConverter(
      ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      )
    // );
    const editorDataState = EditorState.createWithContent(contentDataState);
    setEditorState(editorDataState);
  }, []); // Tambahkan value ke dalam array dependensi

  const [editorState, setEditorState] = useState();
  useEffect(() => {
    if (editorState) {
      onChange(
        draftToHtml(
          convertToRaw(editorState.getCurrentContent()),
          {},
          false,
          ({ type, data }) => {
            if (type === "IMAGE") {
              const alignment = data.alignment || "none";
              const textAlign = alignment === "none" ? "center" : alignment;
              const convertStyle = () => {
                switch (textAlign) {
                  case "left":
                    return "flex-start";

                  case "center":
                    return "center";

                  case "right":
                    return "flex-end";
                }
              };
              return `
              <div style="display: flex; justify-content:${convertStyle()};">
                  <img src="${data.src}" alt="${data.alt}" style="height: ${data.height};width: ${data.width}"/>
              </div>
          `;
            }
          }
        )
      );
    }
  }, [editorState]);

  return (
    <CmsFormLabel
      label={label}
      id={idLabel}
      required={required}
      isSingleLine={isSingleLine}
    >
      <div className="border w-100">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
          editorStyle={{ height: "400px" }}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "list",
              "textAlign",
              "colorPicker",
              "emoji",
              "image",
              "remove",
              "history",
            ],
            list: { inDropdown: true },
          }}
          he
          id={idLabel}
          className={`${textAreaClassName} ${className} "border"`}
          value={value}
          required={required}
        />
        {/* )} */}
      </div>
      <CmsErrorLabel error={error} label={label} />
    </CmsFormLabel>
  );
};
