import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "./AxiosAuth";
import {Form, Input, Button} from 'semantic-ui-react';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, getData }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log(colorToEdit);
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        getData();
        setEditing(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        getData();
        setEditing(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const [newColor, setNewColor] = useState({
    color: "",
    code: {
      hex: ""
    }
  });
  const handleAdd = e =>{
    e.preventDefault();
    axiosWithAuth()
    .post('/colors', newColor)
    .then(res=>{
      // console.log(res);
      updateColors(res.data);
      setNewColor({
        color: "",
        code: {
          hex: ""
        }
      });
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={handleAdd} className="add-form">
        <Input placeholder="Color Name" name="color" value={newColor.color} onChange={(e)=>{setNewColor({
          ...newColor,
          color: e.target.value
        })}} />
        <Input placeholder="Hex Code" name="hex" value={newColor.code.hex} onChange={e=>{
          setNewColor({
            ...newColor,
            code: {
              hex: e.target.value
            }
          })
        }} />
        <Button>Add New Color</Button>
      </form>
      <div className="spacer" />
      {/* color: "",
    code: {
      hex: ""
    } */}
      
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
